const express = require("express");
const router = express.Router();
const manipulateExcelController = require("../controllers/manipulate_excel");


router.post("/manipulate-excel", manipulateExcelController.manipulateExcel);


module.exports = router;