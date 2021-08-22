const dataDynamic = require('../models/SchemaDynamic');
let jsonDynamic = require("../models/DataDynamic")
const addData = async (req, res) => {
    try {
        for (let index = 0; index < 100000; index++) {
            let jsonSend = Object.keys(jsonDynamic.jsonData)
            let objectTemp = {}
            jsonSend.forEach(element => {
                objectTemp[element] = element + index;
            });
            let data = await new dataDynamic(objectTemp);
            await data.save();
        }
        res.status(200).json("success");
    }
    catch (err) {
        res.status(400).json("error");
    }
}
const updateField = async (req, res) => {
    try {
        console.log(req.body.newItem)
        dataDynamic.findByIdAndUpdate({ _id: req.body.newItem._id }, req.body.newItem, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
                console.log("success Update" + result)
            }
        });
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
}
const duplicateField = async (req, res) => {

    try {
        console.log(req.body.newItem);
        delete req.body.newItem._id
        itemAdd = await new dataDynamic(req.body.newItem);
        console.log(itemAdd)
        await itemAdd.save();
        res.status(200).json({ duplicateField: itemAdd })
    }
    catch (err) {
        console.log(err)
        res.status(400).json("error");
    }


}




const getAllData = async (req, res) => {
    let jsonSend = Object.keys(jsonDynamic.jsonData)
    try { 
        dataDynamic.find({}, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }

        }).limit(req.body.limit).skip(req.body.skip)
    }
    catch (err) { 
        console.log(err)
        res.status(400).json({ message: err }); 
    }
}


const getAllKeys = async (req, res) => {
    try {
        let jsonSend = Object.keys(jsonDynamic.jsonData)
        res.status(200).json(jsonSend);
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
}

const deleteField = async (req, res) => {
    try {
        dataDynamic.findByIdAndRemove(req.body.id, function (err) {
            if (err) {
                console.log("error delete")
            } else {
                console.log("success delete")
            }
        });
        res.status(200).json("success delete");
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
}

module.exports = { addData, getAllData, getAllKeys, deleteField, duplicateField, updateField }
