const path = require("path");
const fs = require("fs");

const downloadExcel = (req, res) => {
  const fileName = "data.xlsx";
  const filePath = path.join(__dirname, "uploads", fileName);

  console.log(`Checking file at path: ${filePath}`);

  // Dosyanın mevcut olup olmadığını kontrol edin
  if (fs.existsSync(filePath)) {
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${fileName}`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    // Dosyayı response'a gönderin
    res.download(filePath, (err) => {
      if (err) {
        console.log(`Download Error: ${err}`);
        res.status(500).json({ error: err.message });
      }
    });
  } else {
    console.log(`File not found at path: ${filePath}`);
    res.status(404).json({ error: "Dosya bulunamadı" });
  }
};

module.exports = { downloadExcel };
