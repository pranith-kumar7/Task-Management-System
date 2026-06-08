const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const auth = require("./middleware/auth");
const roleMiddleware = require("./middleware/role");
const taskRoutes = require("./routes/taskRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);

// Test Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Backend Running Successfully"
    });
});

app.get("/api/v1/profile", auth, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

app.get(
  "/api/v1/admin",
  auth,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
    });
  }
);


app.use(
  "/api/v1/tasks",
  taskRoutes
);

app.use(
 "/api-docs",
 swaggerUi.serve,
 swaggerUi.setup(swaggerSpec)
);

module.exports = app;