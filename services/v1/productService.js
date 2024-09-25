const { Products, Users } = require('../../models');
const cache = require('../../cache/inMemoryCache');

exports.getAllProducts = async () => {
  const cachedProducts = cache.get('all_products');
  if (cachedProducts) {
    return JSON.parse(cachedProducts);
  }
  
  const products = await Products.findAll();
  cache.set('all_products', JSON.stringify(products), 'EX', 3600);
  return products;
};

exports.getProductById = async (id) => {
  const cachedProduct = cache.get(`product:${id}`);
  if (cachedProduct) {
    return JSON.parse(cachedProduct);
  }
  
  const product = await Products.findByPk(id);
  if (product) {
    cache.set(`product:${id}`, JSON.stringify(product), 'EX', 3600); // Cache for 1 hour
  }
  return product;
};

exports.createProduct = async (productData, userId) => {
  const product = await Products.create({ ...productData, UserId: userId });
  cache.del('all_products'); // Invalidate cache
  return product;
};

exports.updateProduct = async (id, productData, user) => {
  const product = await Products.findByPk(id);
  if (!product) return null;
  
  if (user.role !== 'admin' && product.UserId !== user.id) {
    throw new Error('Not authorized to update this product');
  }
  
  await product.update(productData);
  cache.del(`product:${id}`);
  cache.del('all_products');
  return product;
};

exports.deleteProduct = async (id, user) => {
  const product = await Products.findByPk(id);
  if (!product) return null;
  
  if (user.role !== 'admin' && product.UserId !== user.id) {
    throw new Error('Not authorized to delete this product');
  }
  
  await product.destroy();
  cache.del(`product:${id}`);
  cache.del('all_products');
  return true;
};
