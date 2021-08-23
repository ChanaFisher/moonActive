const dataDynamic = require('../models/SchemaDynamic');
let jsonDynamic = require("../models/DataDynamic.json")

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
        delete req.body.newItem._id;
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
    let jsonSend = Object.keys(jsonDynamic[0])
    try {
        dataDynamic.find({}, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            } 

        }).sort(jsonSend[0]).limit(req.body.limit).skip(req.body.skip) 
    }
    catch (err) {
        console.log(err) 
        res.status(400).json({ message: err });
    }
}

 
const getAllKeys = async (req, res) => {

    try {
        let jsonSend = Object.keys(jsonDynamic[0])
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

const addData = async (req, res) => {
    let jsonSend = Object.keys(jsonDynamic[0])
    try {
        for (let index = 0; index < 1; index++) {
            let startDate = new Date(Math.floor(Math.random() * 1000) + 1000, Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)).toLocaleDateString("fr-FR");
            let endDate = new Date(Math.floor(Math.random() * 1000) + 1000, Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)).toLocaleDateString("fr-FR");
            let objectTemp = {}
            jsonSend.forEach(element => {
               
                if (element == "type") {
                    if (index % 2 == 0)
                        objectTemp["type"] = "Basic";
                    else
                        objectTemp["type"] = "Common";
                    if (index % 3 == 0)
                        objectTemp["type"] = "Epic";
                }
            });
            console.log(objectTemp)
            let data = await new dataDynamic(objectTemp);
            await data.save();
        }
        res.status(200).json("success");
    }
    catch (err) {
        res.status(400).json("error");
    }
}

module.exports = { addData, getAllData, getAllKeys, deleteField, duplicateField, updateField }
