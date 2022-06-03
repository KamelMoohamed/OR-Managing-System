const CatchAsync = require("./../utils/CatchAsync");
const User = require("./../models/userModel");
const Operation = require("./../models/operationModel");
const Room = require("./../models/roomModel");
const Supply = require("./../models/supplyModel");
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
        Name: { $first: "$name" },
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

exports.rooms = CatchAsync(async (req, res, next) => {
  const data = await Room.aggregate([
    {
      $group: {
        _id: `$rtype`,
        Num: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({
    data,
  });
});
exports.busyRooms = CatchAsync(async (req, res, next) => {
  const all = await Room.find({ rtype: ["Operation", "Recovery"] });
  let busyRooms = [{}];
  all.forEach((element) => {
    for (var i = element.schedule.length - 1; i >= 0; i--)
      if (
        checkTimeBetween(
          element.schedule[i].start,
          element.schedule[i].end,
          new Date()
        )
      ) {
        busyRooms.push(element);
      }
  });
  res.status(200).json({
    busyRooms: busyRooms.length - 1,
    emptyRooms: all.length - (busyRooms.length - 1),
  });
});
checkTimeBetween = (d1, d2, d3) => {
  d3 > d1 && d3 < d2 ? true : false;
};
exports.RoomsHours = CatchAsync(async (req, res, next) => {
  let match = {
    rtype: {
      $in: ["Operation", "Recovery"],
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
  const data = await Room.aggregate([
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
        RID: { $first: "$RID" },
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

exports.mostSupplies = CatchAsync(async (req, res, next) => {
  let start = {};
  if (req.body.start) {
    start["$gte"] = new Date(req.body.start);
  }
  if (req.body.end) {
    start["$lte"] = new Date(req.body.end);
  }
  const data = await Operation.aggregate([
    {
      $match: {
        rooms: {
          $elemMatch: {
            start,
          },
        },
      },
    },
    {
      $unwind: "$supplies",
    },
    {
      $group: {
        _id: "$supplies.id",
        total: { $sum: "$supplies.quantity" },
      },
    },
    {
      $lookup: {
        from: "supplies",
        localField: "_id",
        foreignField: "_id",
        as: "supply",
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{ $arrayElemAt: ["$supply", 0] }, "$$ROOT"],
        },
      },
    },
    { $project: { supply: 0, quantity: 0, __v: 0, inNeed: 0, needed: 0 } },
  ]);
  res.status(200).json({
    data,
  });
});
exports.staffNumber = staffNumber;
exports.staffWorkingHours = staffWorkingHours;
exports.operationEach = operationEach;
