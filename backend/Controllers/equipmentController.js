const handlerFactory = require("./handlerFactory");
const Equipment = require("./../models/equipmentModel");
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/appError");

exports.addCheckup = CatchAsync(async (req, res, next) => {
  const checkup = req.body;
  var equip = await Equipment.findByIdAndUpdate(req.params.id, {
    $push: {
      Checkups: checkup,
    },
  });
  res.status(200).json({
    status: "success",
    message: "Check up added successfully",
  });
});

exports.needCalibtation = CatchAsync(async (req, res, next) => {
  const equipment = await Equipment.findByIdAndUpdate(req.params.id, {
    valid: false,
  });

  if (!equipment) {
    return next(new AppError("No Equipment with that id", 404));
  }

  res.status(200).json({
    status: "success",
    message: `this ${equipment.name} with EID ${equipment.EID} is not valid now `,
  });
});

exports.getAvailableEquip = CatchAsync(async (req, res, next) => {
  const equips = await Equipment.find({ name: req.query.name });
  if (!equips) return next(new AppError("No Equipment with this name", 400));
  const start = req.query.start;
  const end = req.query.end;
  if (!start || !end)
    return next(
      new AppError(
        "pleeas mention the end and start of the duration intervel",
        400
      )
    );
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
  res.status(200).json({
    status: "success",
    equipments: "Check up added successfully",
  });
});

exports.getEquipment = handlerFactory.getOne(Equipment);
exports.createEquipment = handlerFactory.CreateOne(Equipment);
exports.updateEquipment = handlerFactory.updateOne(Equipment);
exports.deleteEquipment = handlerFactory.deleteOne(Equipment);
