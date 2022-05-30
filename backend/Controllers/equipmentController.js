const handlerFactory = require("./handlerFactory");
const Equipment = require("./../models/equipmentModel");
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/appError");

const addCheckup = CatchAsync(async (req, res, next) => {
  const equipment = await Equipment.findById(req.params.id).then((equip) => {
    const checkup = { ...req.body };
    equip.Checkups.push(checkup);
    equip.save();
  });

  if (!equipment) {
    return next(new AppError("No Equipment with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      equipment,
    },
  });
});

const checkCalibration = CatchAsync(async (req, res, next) => {
  const equipment = await Equipment.findById(req.params.id);
  if (!equipment) {
    return next(new AppError("No Equipment with that id", 404));
  }
  const { Valid } = equipment;

  res.status(200).json({
    status: "success",
    data: { Valid },
  });
});

const needCalibtation = CatchAsync(async (req, res, next) => {
  const equipment = await Equipment.findById(req.params.id).then((equip) => {
    equip.Valid = false;
    equip.save();
  });

  if (!equipment) {
    return next(new AppError("No Equipment with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      equipment,
    },
  });
});

exports.getAvailableEquip = async (start, end, name, next) => {
  const equips = await Equipment.find({ name: name });

  let num = 0;
  equips.forEach((element) => {
    for (var i = element.schedule.length - 1; i >= 0; i--)
      if (
        start <= element.schedule[i].end &&
        element.schedule[i].start <= end
      ) {
        times = times + 1;
      }
  });
  if (num >= equips.length)
    return next(
      new AppError(`there is no available ${name} for this time`, 500)
    );
};

exports.getEquipment = handlerFactory.getOne(Equipment);
exports.createEquipment = handlerFactory.CreateOne(Equipment);
exports.updateEquipment = handlerFactory.updateOne(Equipment);
exports.deleteEquipment = handlerFactory.deleteOne(Equipment);
exports.addCheckup = addCheckup;
exports.checkCalibration = checkCalibration;
exports.needCalibtation = needCalibtation;
