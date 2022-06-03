const handlerFactory = require("./handlerFactory");
const catchAsync = require("./../utils/CatchAsync");
const Room = require("./../models/roomModel");
const AppError = require("../utils/appError");
// const AppError = require("./")

exports.createRoom = handlerFactory.CreateOne(Room);
exports.getRoom = handlerFactory.getOne(Room, { path: "operations" });
exports.deleteRoom = handlerFactory.deleteOne(Room);
exports.updateRoom = handlerFactory.updateOne(Room);
exports.getAllRooms = handlerFactory.getAll(Room);

exports.getAvailableRooms = catchAsync(async (req, res, next) => {
  const roomType = req.query.type;
  const duration = req.query.duration;
  const within = req.query.within;
  const [from, to] = within.split(",");
  if (!from || !to) {
    next(
      new AppError("Please provide operation time the format from,to.", 400)
    );
  }
  const Days = getDaysBetween(from, to);
  const rooms = await Room.find({
    rtype: roomType,
  });

  rooms.forEach((element) => {
    //SORTING ACCORDITING TO START TIMES //
    element.schedule.sort((a, b) => {
      if (a.start < b.start) return -1;
      if (a.start > b.start) return 1;
      return 0;
    });
  });
  rooms.forEach((element) => {
    durations = getDurations(element.schedule, element.RID);
    avaDays = getavaDays(element.schedule, element.RID, Days);
  });
  durations = durations.filter((x) => x.duration > duration);
  res.status(200).json({
    status: "success",

    AvailableTimes: {
      AvailableDays: avaDays,
      AvailableDurations: durations,
    },
  });
});

exports.sterilization = catchAsync(async (req, res, next) => {
  room = await Room.findByIdAndUpdate(req.params.id, {
    lastSterilazation: new Date(),
  });
  if (!room) return next(new AppError("No room found with this id", 400));
  res.status(200).json({
    status: "success",
    message: "sterilization is successfully recorded",
  });
});

const getDurations = (schedule, RID) => {
  durations = [{}];

  for (var i = 0; i < schedule.length - 1; i++) {
    if (i === 0) {
      openingHours = schedule[i].start.getHours() - 2 - 9;

      duration = openingHours + schedule[i].start.getMinutes() / 60;

      durations.push({
        duration: duration,
        from: dateConverter(schedule[i].start, 9 + 2, "day"),
        to: schedule[i].start,
        RID,
      });
    }
    if (!checkDay(schedule[i].start, schedule[i + 1].start)) {
      openingHours = schedule[i + 1].start.getHours() - 2 - 9;
      duration = openingHours + schedule[i + 1].start.getMinutes() / 60;
      durations.push({
        duration: duration,
        from: dateConverter(schedule[i + 1].start, 9 + 2, "day"),
        to: schedule[i + 1].start,
        RID,
      });
    }
  }

  for (var i = schedule.length - 1; i > 0; i--) {
    if (i === schedule.length - 1) {
      closingHours = 21 - (schedule[i].end.getHours() - 2);
      duration = closingHours - schedule[i].end.getMinutes() / 60;
      durations.push({
        duration: duration,
        from: schedule[i].end,
        to: dateConverter(schedule[i].start, 21 + 2, "day"),
        RID,
      });
    }
    if (checkDay(schedule[i].start, schedule[i - 1].start)) {
      duration =
        (schedule[i].start.getTime() - schedule[i - 1].end.getTime()) /
        (1000 * 60 * 60);
      durations.push({
        duration: duration,
        from: schedule[i - 1].end,
        to: schedule[i].start,
        RID,
      });
    } else {
      closingHours = 21 - (schedule[i - 1].end.getHours() - 2);
      duration = closingHours - schedule[i - 1].end.getMinutes() / 60;
      durations.push({
        duration: duration,
        from: schedule[i - 1].end,
        to: dateConverter(schedule[i - 1].end, 21 + 2, "day"),
        RID,
      });
    }
  }
  return durations;
};
const checkDay = (date1, date2) => {
  if (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
    return true;
  return false;
};
const dateConverter = (date, hour, val) => {
  var date2 = new Date(date);
  if ((val = "day")) {
    date2.setHours(hour);
    date2.setMinutes(0);
  } else {
    date2.setHours(hour);
    date2.setMinutes(0);
    date2.setDate(0);
  }
  var isodate = date2.toISOString();
  return isodate;
};

var getDaysBetween = function (from, to) {
  for (
    var a = [], d = new Date(from);
    d <= new Date(to);
    d.setDate(d.getDate() + 1)
  ) {
    a.push(new Date(d).toISOString());
  }
  return a;
};

const getavaDays = (schedule, RID, Days) => {
  busyDays = [];
  avaDays = [];
  schedule.forEach((el) => {
    busyDays.push(dateConverter(el.start, 24, "date"));
  });
  const avaDaysr = Days.filter((x) => !busyDays.includes(x));

  avaDays.push({ RID, "Avaliable Days": avaDaysr });
  return avaDays;
};
