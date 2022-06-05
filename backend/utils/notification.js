const Operation = require("./../models/operationModel");
const User = require("./../models/userModel");
exports.patientOP = async (patientId) => {
  let Today = new Date();
  Today.setHours(0, 0, 0, 0);
  let Tomorrow = new Date();
  Tomorrow.setHours(23, 59, 59, 0);
  const patientOp = await Operation.find({
    patient: patientId,
    rooms: {
      $elemMatch: { start: { $gte: Today, $lte: Tomorrow } },
    },
  });
  let notification = [];
  if (patientOp) {
    for (op of patientOp) {
      const notify = {
        type: "Upcoming operation",
        message: `you have an operation from ${op.start.toLocaleString(
          "en-US",
          { hour: "2-digit", minute: "2-digit" }
        )} to ${op.end.toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })} today`,
        priority: 1,
      };
      notification.push(notify);
    }
  }
  return notification;
};
exports.patientPending = async (patientId) => {
  const patientOp = await Operation.find({
    patient: patientId,
    OperationStatus: { $ne: "pending" },
  });
  let notification = [];
  if (!patientOp) return notification;
  for (op of patientOp) {
    if (op.doctorAcceptance == "Accept") {
      const notify = {
        type: "doctor pending OP",
        message: `the operation you had accepted at ${op.start.toLocaleString(
          "en-Us",
          { month: "short", day: "numeric" }
        )} waiting doctor to aprove`,
        priority: 3,
      };
      notification.push(notify);
    } else if (op.patientAcceptance == "pending") {
      const notify = {
        type: "patient pending OP",
        message: `you have an operation at ${op.start.toLocaleString("en-US", {
          hour: "2-digits",
          minute: "2-digits",
          month: "short",
          day: "numeric",
        })} that needs your permission`,
        priority: 1,
      };
      notification.push(notify);
    }
  }
  return notification;
};

exports.notify = async (userId, type, message, id = null) => {
  try {
    for (id of userId) {
      const user = await User.findByIdAndUpdate(id, {
        $push: {
          notification: { type, message, id },
        },
      });
    }
    return true;
  } catch (err) {
    return false;
  }
};
exports.notifyAdmin = async (type, message, id = null) => {
  try {
    const Ids = await User.find({ role: "ORadmin" }).select("id");
    for (id of Ids) {
      const user = await User.findByIdAndUpdate(id, {
        $push: {
          notification: { type, message, id },
        },
      });
    }
    return true;
  } catch (err) {
    return false;
  }
};
