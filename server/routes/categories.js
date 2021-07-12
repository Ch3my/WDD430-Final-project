var express = require('express');
const sequenceGenerator = require('./sequenceGenerator');
const Category = require('../models/category');

var router = express.Router();

//GET the list of documents in the documents collection in the database.
router.get('/', (req, res, next) => {
    //retrieve all documents
    Category.find()
        .then(cat => {
            //send scucessful response with mssage and documents
            res.status(200).json(
                cat
            );
        })
        .catch(error => {
            //return error if something happens
            console.log(error)
            res.status(500).json({
                err: error
            })
        });
})

module.exports = router;
