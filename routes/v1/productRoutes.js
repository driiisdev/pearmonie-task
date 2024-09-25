const express = require('express');
const productController = require('../../controller/v1/productController');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     security: []
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/products', productController.getAllProducts);

/**
 * @swagger
 * /api/v1/product/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: A single product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The product name
 *                   maxLength: 255
 *                 description:
 *                   type: string
 *                   description: The product description
 *                 price:
 *                   type: number  #price is a decimal value
 *                   description: The product price
 *                   minimum: 0.0  # Optional: Set minimum price if needed
 *                 quantity:
 *                   type: integer
 *                   description: The product quantity
 *                   minimum: 0  # Set minimum to 0 for quantity
 *                 category:
 *                    type: string
 *                    description: The product category
 *       404:
 *         description: Product not found
 */
router.get('/product:id', productController.getProductById);

/**
 * @swagger
 * /api/v1/product:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The product name
 *                 maxLength: 255
 *               description:
 *                 type: string
 *                 description: The product description
 *               price:
 *                 type: number  #price is a decimal value
 *                 description: The product price
 *                 minimum: 0.0  # Optional: Set minimum price if needed
 *               quantity:
 *                 type: integer
 *                 description: The product quantity
 *                 minimum: 0  # Set minimum to 0 for quantity
 *               category:
 *                 type: string
 *                 description: The product category
 *     responses:
 *       201:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 */
router.post('/product', authMiddleware.authenticate, authMiddleware.rbac(['admin', 'user']), productController.createProduct);

/**
 * @swagger
 * /api/v1/product/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: The product was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.put('/product:id', authMiddleware.authenticate, authMiddleware.rbac(['admin', 'user']), productController.updateProduct);

/**
 * @swagger
 * /api/v1/product/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     responses:
 *       204:
 *         description: The product was successfully deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.delete('/product:id', authMiddleware.authenticate, authMiddleware.rbac(['admin']), productController.deleteProduct);

module.exports = router;
