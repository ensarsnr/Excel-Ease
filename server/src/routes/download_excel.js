const express = require("express");
const router = express.Router();
const downloadExcelController = require("../controllers/download_excel");

router.get("/download-excel", downloadExcelController.downloadExcel);

module.exports = router;