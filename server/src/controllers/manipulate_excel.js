const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs");

const manipulateExcel = async (req, res) => {
  try {
    console.log("Request Body: " + req.body);

    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ error: "Invalid data format" });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    // Başlık satırı..
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);

    // JSON verisini Excel'e dönüştür, ekle
    data.forEach((item, index) => {
      const row = worksheet.addRow(Object.values(item));

      // Excel'deki kutucukları değiştiriyor.. 2. satır değiştiriliyor.
      if (index === 1) {
        row.getCell(1).value = "elma";
        row.getCell(2).value = "armut";
        row.getCell(3).value = "vişne";
      }
    });

    // Dosyayı proje içinde bir klasöre kaydetme
    const filePath = path.join(__dirname, "uploads", "data.xlsx");

    // Klasörün mevcut olup olmadığını kontrol edin ve oluşturun
    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath));
    }

    // Dosyayı belirtilen yola kaydedin
    await workbook.xlsx.writeFile(filePath);

    // Dosya kaydedildiğinde, kullanıcının erişebileceği bir yol sağlayabilirsiniz
    res
      .status(200)
      .json({ message: `Dosya başarıyla kaydedildi: ${filePath}` });
  } catch (error) {
    console.log(`Manipulate Excel Error: ${error}`);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { manipulateExcel };
