const express = require("express");
const cors = require("cors");


const app = express();
const PORT = 3000;

// App
app.use(cors());
app.use(express.json());

// Routes
const excelRoutes = require("./routes/excel_file");

// Endpoints
app.use('/api', excelRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})