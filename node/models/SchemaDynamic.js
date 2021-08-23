const mongoose = require('mongoose');
const jsonDynamic=require("../models/DataDynamic.json")
const dataSchema = mongoose.Schema(jsonDynamic[0])
module.exports = mongoose.model('dataDynamic', dataSchema);

