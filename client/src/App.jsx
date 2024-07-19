import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import services from "./services";

function App() {
  const [__html, setHTML] = useState("");
  const [jsonExcel, setJsonExcel] = useState(null);

  // Dosya seçme işlevi burada oluyor..
  // Valid eklenmesi lazım sadece excel dosyalarını alması için.
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();

    const wb = XLSX.read(data);
    const ws = wb.Sheets[wb.SheetNames[0]];

    // Json formatında veriyi al
    const json = XLSX.utils.sheet_to_json(ws);
    setHTML(XLSX.utils.sheet_to_html(ws, { id: "tabeller" }));
    setJsonExcel(json);
  };

  const handleClick = () => {
    console.log(jsonExcel);
    services.uploadJsonExcel(jsonExcel);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">ExcelEaser</h1>
      {/* Dosya Yükleme Input */}
      <div className="mb-3">
        <label htmlFor="formFile" className="form-label">
          Excel Dosyasını Girin
        </label>
        <input
          className="form-control"
          type="file"
          id="formFile"
          onChange={handleFileChange}
        />
      </div>
      {/* HTML önizlemesi */}
      <div className="table-responsive d-flex justify-between">
        <div
          className="w-100 table table-bordered m-auto"
          dangerouslySetInnerHTML={{ __html }}
        />
        <div className="text-center w-100 d-flex">
          <button
            onClick={handleClick}
            className="btn btn-warning text-light font-weight-bold d-flex m-auto align-middle w-50"
          >
            <span className="d-flex m-auto">İşlemek için tıkla</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;