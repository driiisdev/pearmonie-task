const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const { Products, Users } = require('../models');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Product API', () => {
  let testUser, testProduct, authToken;

  before(async () => {
    // Create a test user and get auth token
    testUser = await Users.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    const loginRes = await chai.request(app)
      .post('/api/v1/login')
      .send({ email: 'test@example.com', password: 'password123' });
    authToken = loginRes.body.token;

    // Create a test product
    testProduct = await Products.create({
      name: 'Test Product',
      description: 'This is a test product',
      price: 19.99,
      quantity: 100,
      category: 'Test Category',
      UserId: testUser.id
    });
  });

  describe('GET /api/v1/products', () => {
    it('should get all products', async () => {
      const res = await chai.request(app).get('/api/products');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.greaterThan(0);
    });
  });

  describe('GET /api/v1/product/:id', () => {
    it('should get a single product', async () => {
      const res = await chai.request(app).get(`/api/products/${testProduct.id}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.name).to.equal('Test Product');
    });

    it('should return 404 for non-existent product', async () => {
      const res = await chai.request(app).get('/api/products/999999');
      expect(res).to.have.status(404);
    });
  });

  describe('POST /api/v1/product', () => {
    it('should create a new product', async () => {
      const newProduct = {
        name: 'New Test Product',
        description: 'This is a new test product',
        price: 29.99,
        quantity: 50,
        category: 'New Test Category'
      };
      const res = await chai.request(app)
        .post('/api/v1/products')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newProduct);
      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body.name).to.equal('New Test Product');
    });
  });

  // Add more tests for update and delete operations

  after(async () => {
    // Clean up test data
    await Products.destroy({ where: {} });
    await Users.destroy({ where: {} });
  });
});
