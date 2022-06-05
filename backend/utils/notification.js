const User = require("./../models/userModel");
exports.notify = async (userId, type, message, id = null) => {
  try {
    for (uid of userId) {
      const user = await User.findByIdAndUpdate(uid, {
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
exports.notifyAdmin = async (type, message, role, id = null) => {
  try {
    const Ids = await User.find({ role }).select("id");

    for (uid of Ids) {
      const user = await User.findByIdAndUpdate(uid, {
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
