const Supply = require("./../models/supplyModel");
const { notifyAdmin } = require("./notification");
const addSupply = async (added) => {
  let documents = [];
  for (let i = 0; i < added.length; i++) {
    const docs = await Supply.findById(added[i].id);
    if (!docs) return false;
    documents.push(docs);
  }
  for (let i = 0; i < documents.length; i++) {
    documents[i].quantity += added[i].quantity;
    documents[i].needed -= added[i].quantity;
    if (documents[i].needed <= 0) {
      documents[i].inNeed = false;
      documents[i].needed = 0;
    }

    await documents[i].save();
  }
  return true;
};

const useSupply = async (removed) => {
  let documents = [];
  for (let i = 0; i < removed.length; i++) {
    const docs = await Supply.findById(removed[i].id);
    if (!docs) return false;
    documents.push(docs);
  }
  for (let i = 0; i < documents.length; i++) {
    document[i].quantity -= removed[i].quantity;
    await documents[i].save();
  }
  return true;
};
const checkSupplies = async (removed) => {
  let documents = [];
  for (let i = 0; i < removed.length; i++) {
    const docs = await Supply.findById(removed[i].id);
    if (!docs) return false;
    documents.push(docs);
  }
  let notiFlag = false;
  for (let i = 0; i < documents.length; i++) {
    if (documents[i].quantity - removed[i].quantity < 0) {
      documents[i].inNeed = true;
      documents[i].needed = -documents[i].quantity + removed[i].quantity;
      notiFlag = true;
    }
    await documents[i].save();
  }
  if (notiFlag)
    await Notification.notifyAdmin(
      "Supllies Alert",
      "You need to check rooms supllies, Some is running out",
      "ORadmin"
    );
  return true;
};

const supplySum = (supList1, supList2) => {
  if (!supList2) return supList1;

  for (i of supList1) {
    const Ids = supList2.map((el) => {
      return el.id;
    });
    let index = null;
    for (let j = 0; j < Ids.length; j++) {
      if (Ids[j].equals(i.id)) {
        index = j;
        break;
      }
    }
    if (index == null) {
      supList2[Ids.length] = i;
    } else {
      supList2[index]["quantity"] = supList2[index]["quantity"] + i.quantity;
    }
  }
  return supList2;
};

exports.supplySum = supplySum;
exports.addSupply = addSupply;
exports.useSupply = useSupply;
exports.checkSupply = checkSupplies;
