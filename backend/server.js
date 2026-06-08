const dotenv = require("dotenv");
dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI);

const app = require("./src/app");
const connectDB = require("./src/config/db");
const User = require("./src/models/User");

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});