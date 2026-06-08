const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const roleMiddleware = require("../middleware/role");

const {
  getAllTasks,
} = require("../controllers/adminController");

/**
 * @swagger
 * /api/v1/admin/tasks:
 *   get:
 *     summary: Get all tasks (Admin only)
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All tasks fetched successfully
 */
router.get(
  "/tasks",
  auth,
  roleMiddleware("admin"),
  getAllTasks
);

module.exports = router;