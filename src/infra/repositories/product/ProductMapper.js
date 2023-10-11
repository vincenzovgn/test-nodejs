const { Product, ProductOutputDB } = require('../../../domain/entities/Product');

const ProductMapper = {
  toInputDatabase(product) {
    return new Product({ ...product }).toJSON();
  },
  toOutputDabase({ dataValues }) {
    return new ProductOutputDB({ ...dataValues }).toJSON();
  }
};

module.exports = () => ProductMapper;
