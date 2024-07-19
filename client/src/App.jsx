import React, { useState } from "react";
import * as XLSX from "xlsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; // Bootstrap JS ve bağımlılıkları dahil edin
import "./App.css";
import services from "./services";

function App() {
  const [__html, setHTML] = useState("");
  const [jsonExcel, setJsonExcel] = useState(null);
  const [errorValid, setErrorValid] = useState(true);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();

    const wb = XLSX.read(data);
    const ws = wb.Sheets[wb.SheetNames[0]];

    const json = XLSX.utils.sheet_to_json(ws);
    setHTML(XLSX.utils.sheet_to_html(ws, { id: "tabeller" }));
    setJsonExcel(json);
    setErrorValid(true);
  };

  // Modal gösteren fonksiyon
  const handleOpenModal = () => {
    if (!jsonExcel) {
      setErrorValid(false);
    } else {
      const modal = new window.bootstrap.Modal(
        document.getElementById("exampleModal")
      );
      modal.show();
      setErrorValid(true);
    }
  };

  const handleReqJsonData = async () => {
    try {
      console.log(`jsonExcel: ${JSON.stringify(jsonExcel)}`);
      const response = await services.uploadJsonExcel(jsonExcel);

      const downloadButtonDom = document.querySelector("#downloadButton");
      downloadButtonDom.classList.remove("btn-secondary");
      downloadButtonDom.classList.remove("disabled");
      downloadButtonDom.classList.add("btn-danger");

      if (response && response.data) {
        console.log(`Response data: ${response.data}`);
        setErrorValid(true);
      } else {
        console.log("No response data or error occurred.");
        setErrorValid(false);
      }
    } catch (error) {
      console.log(`Handle error: ${error}`);
      setErrorValid(false);
    }
  };

  const handleDownloadExcel = async () => {
    await services.downloadExcel();
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
        {errorValid ? (
          <div
            className="w-100 table table-bordered m-auto"
            dangerouslySetInnerHTML={{ __html }}
          />
        ) : (
          <div className="w-100 text-danger text-center m-auto">
            Lütfen doğru dosya seçin.
          </div>
        )}
        <div className="text-center gap-2 w-100 d-flex">
          <button
            onClick={handleOpenModal}
            className="btn btn-warning text-light font-weight-bold d-flex m-auto align-middle w-50"
          >
            <span className="d-flex m-auto ">Dosyayı işle</span>
          </button>
          <button
            onClick={handleDownloadExcel}
            id="downloadButton"
            className="disabled btn btn-secondary w-50 m-auto text-light font-weight-bold"
          >
            İndir
          </button>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Uyarı
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              Bu dosyayı işlemek istediğinize emin misiniz?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                İptal et
              </button>
              <button
                onClick={handleReqJsonData}
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
              >
                Evet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
