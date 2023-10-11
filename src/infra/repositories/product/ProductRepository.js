const Repository = require('../Repository');
const { Op } = require('sequelize');

class ProductRepository extends Repository {
  constructor({ sequelize, productMapper, exceptions }) {
    const { Product, ProductWarehouse, Warehouse } = sequelize.models;
    super({
      ResourceModel: Product,
      ResourceMapper: productMapper,
      Exceptions: exceptions
    });
    this.associateModels = { ProductWarehouse, Warehouse };
  }

  async findBySku(sku) {
    const resource = await this.findOne({ where: { sku } });
    return resource;
  }

  async removeById(productId) {
    const resource = await this.remove({ where: { id: productId } });
    return resource;
  }

  async removeBySku(sku) {
    const resource = await this.remove({ where: { sku } });
    return resource;
  }

  async findCompleteProductBySku(sku) {
    const resource = await this.findAll({
      where: { sku },
      include: {
        model: this.associateModels.ProductWarehouse,
        include: { model: this.associateModels.Warehouse }
      }
    });
    return resource;
  }
}

module.exports = ProductRepository;
