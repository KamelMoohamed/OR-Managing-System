const AppError = require("./appError");

const updateSchedule = async (doc, Model, userId, start, end) => {
  const User = await Model.findById(userId);
  if (!User.schedule) return false;
  const Ids = User.schedule.map((el) => {
    return el.operation;
  });
  let index = null;
  for (let i = 0; i < Ids.length; i++) {
    if (Ids[i].equals(doc._id)) {
      index = i;
      break;
    }
  }
  if (index == null) index = Ids.length;

  User.schedule[index] = {
    start: start,
    end: end,
    operation: doc._id,
  };
  await User.markModified("schedule");
  await User.save();
  return true;
};

const checkUserSchedule = async (doc, Model, userId, next) => {
  const Schedule = await Model.findById(userId).select("schedule Name");
  Schedule["schedule"].forEach((element) => {
    if (doc.start <= element.end && element.start <= doc.end) {
      return next(
        new AppError(
          `there is a reservation at this time for ${Schedule.Name}`,
          400
        )
      );
    }
  });
};
const checkRoomSchedule = async (start, end, Model, roomId, next) => {
  const Schedule = await Model.findById(roomId).select("schedule RID capacity");
  let times = 0;
  Schedule["schedule"].forEach((element) => {
    if (start <= element.end && element.start <= end) {
      times = times + 1;
    }
  });
  if (times > Schedule.capacity)
    return next(
      new AppError(
        `there is a reservation at this time at room ${Schedule.RID}`,
        500
      )
    );
};
const addUserSchedule = async (doc, Model, userId) => {
  await Model.findByIdAndUpdate(userId, {
    $push: {
      schedule: { start: doc.start, end: doc.end, operation: doc._id },
    },
  });
};
const addRoomSchedule = async (doc, Model, element) => {
  await Model.findByIdAndUpdate(element.room, {
    $push: {
      schedule: {
        start: element.start,
        end: element.end,
        operation: doc._id,
      },
    },
  });
};
const deleteSchedule = async (doc, Model, id, start = null) => {
  if (start) options = { operation: doc._id, start };
  else options = { operation: doc._id };
  await Model.findByIdAndUpdate(
    id,
    {
      $pull: {
        schedule: options,
      },
    },
    { multi: true }
  );
};

const checkRoomChange = (oldRooms, newRooms) => {
  for (var a = [], i = 0; i < oldRooms.length; i++) {
    console.log(oldRooms[i], newRooms[i]);
    if (oldRooms[i].room != newRooms[i].room) a.push(oldRooms[i]);
  }
  return a;
};

exports.checkRoomChange = checkRoomChange;
exports.checkRoomSchedule = checkRoomSchedule;
exports.checkUserSchedule = checkUserSchedule;
exports.updateSchedule = updateSchedule;
exports.addUserSchedule = addUserSchedule;
exports.addRoomSchedule = addRoomSchedule;
exports.deleteSchedule = deleteSchedule;
