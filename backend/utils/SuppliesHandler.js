const Supply = require("./../models/supplyModel");
const addSupply = async (added) => {
  let documents = [];
  for (let i = 0; i < added.length; i++) {
    const docs = await Supply.findById(added[i].supply);
    if (!docs) return false;
    documents.push(docs);
  }
  for (let i = 0; i < documents.length; i++) {
    documents[i].quantity += added[i].quantity;
    await documents[i].save();
  }
  return true;
};

const useSupply = async (removed) => {
  let documents = [];
  for (let i = 0; i < removed.length; i++) {
    const docs = await Supply.findById(removed[i].supply);
    if (!docs) return false;
    documents.push(docs);
  }
  for (let i = 0; i < documents.length; i++) {
    document[i].quantity -= removed[i].quantity;
    await documents[i].save();
  }
  return true;
};

exports.addSupply = addSupply;
