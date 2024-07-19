const express = require("express");
const cors = require("cors");


const app = express();
const PORT = 3000;

// App
app.use(cors());
app.use(express.json());

// Routes
const excelRoutes = require("./routes/excel_file");
const downloadRoutes = require("./routes/download_excel");

// Endpoints
app.use('/api', excelRoutes);
app.use('/api', downloadRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})