import api from "../api";

const downloadExcel = async () => {
  try {
    const response = await api.get("/api/download-excel", { responseType: "blob" });

    // Blob'u indirilebilir bir dosyaya dönüştürün
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.xlsx"); // İndirme dosya adını belirtin
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.log(`Download Error: ${error}`);
  }
};

export default downloadExcel;
