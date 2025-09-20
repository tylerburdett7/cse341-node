const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Import routes
const nameRoutes = require("./routes/nameRoutes");

// Use routes
app.use("/", nameRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
