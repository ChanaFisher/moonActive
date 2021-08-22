const mongoose = require('mongoose');
let jsonDynamic=require("../models/DataDynamic")
let dataSchema = mongoose.Schema(jsonDynamic.jsonData)
module.exports = mongoose.model('dataDynamic', dataSchema);

