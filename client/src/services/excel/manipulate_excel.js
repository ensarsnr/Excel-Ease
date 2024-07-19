import api from "../api";

const uploadJsonExcel = async (jsonData) => {
  try {
    console.log("Sending datA: ", JSON.stringify(jsonData));
    const response = await api.post(
      "/api/manipulate-excel",
      { data: jsonData },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(`Upload Json Excel error: ${error}`);
    throw error;
  }
};

export default uploadJsonExcel;
