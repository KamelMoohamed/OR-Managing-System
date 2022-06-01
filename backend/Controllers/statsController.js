const CatchAsync = require("./../utils/CatchAsync");
const User = require("./../models/userModel");
const Operation = require("./../models/operationModel");

const staffNumber = CatchAsync(async (req, res, next) => {
  let groupby = {};
  if (req.body.groupby) {
    let groups = req.body.groupby.trim().split(" ");
    for (i of groups) {
      groupby[i] = `$${i}`;
    }
  }

  const data = await User.aggregate([
    {
      $group: {
        _id: groupby,
        Num: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({
    data,
  });
});
const staffWorkingHours = CatchAsync(async (req, res, next) => {
  let match = {
    role: {
      $in: [
        "lead-doctor",
        "doctor-training",
        "doctor-Assistant",
        "lead-nurse",
        "nurse",
      ],
    },
  };
  let start = {};
  if (req.body.start) {
    start["$gte"] = new Date(req.body.start);
  }
  if (req.body.end) {
    start["$lte"] = new Date(req.body.end);
    match["schedule.start"] = start;
  }
  const data = await User.aggregate([
    {
      $match: match,
    },
    {
      $unwind: "$schedule",
    },
    {
      $addFields: {
        totalHours: {
          $divide: [
            { $subtract: ["$schedule.end", "$schedule.start"] },
            3600 * 1000,
          ],
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        Name: { $first: "$Name" },
        total: {
          $sum: "$totalHours",
        },
      },
    },
  ]);
  res.status(200).json({
    data,
  });
});

const operationEach = CatchAsync(async (req, res, next) => {
  let group = {};
  let groupdate = {};
  if (req.body.groupdate) {
    if (req.body.groupdate == "day") groupdate["$dayOfWeek"] = "$rooms.end";
    else if (req.body.groupdate == "week") groupdate["$week"] = "$rooms.end";
    else if (req.body.groupdate == "month") groupdate["$month"] = "$rooms.end";
    else if (req.body.groupdate == "year") groupdate["$year"] == "$rooms.end";
    group[req.body.groupdate] = groupdate;
  }
  let match = {};
  let start = {};
  if (req.body.start) {
    start["$gte"] = new Date(req.body.start);
  }
  if (req.body.end) {
    start["$lte"] = new Date(req.body.end);
    match["rooms.end"] = start;
  }
  if (req.body.field) {
    group[req.body.field] = `$${req.body.field}`;
  }
  const data = await Operation.aggregate([
    {
      $unwind: "$rooms",
    },
    {
      $match: match,
    },
    {
      $group: {
        _id: group,
        number: { $sum: 0.5 },
      },
    },
  ]);
  res.status(200).json({
    data,
  });
});

exports.staffNumber = staffNumber;
exports.staffWorkingHours = staffWorkingHours;
exports.operationEach = operationEach;
