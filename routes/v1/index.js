const express = require('express');
const authRoutes = require("./authRoutes");
const productRoutes = require("./productRoutes");


const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     security: []
 *     summary: Check API health
 *     description: Returns a message indicating the API is healthy
 *     tags:
 *       - Default
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: API is healthy!
 */
router.get('/', (req, res) => {
  res.status(200).json({ message: 'API is healthy!' });
});

router.use("/api/v1", [authRoutes, productRoutes]);

module.exports = router;
