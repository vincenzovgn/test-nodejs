const { Router } = require('express');
const Status = require('http-status');

module.exports = ({ createProductOperation, removeProductOperation, findAllProductOperation }) => ({
  create: async (req, res, next) => {
    try {
      const { body } = req;
      await createProductOperation.execute(body);
      return res.status(Status.CREATED).end();
    } catch (error) {
      next(error);
    }
  },

  removeBySku: async (req, res, next) => {
    try {
      const { sku } = req.params;
      const responseOperation = await removeProductOperation.execute(typeof sku === 'string' ? Number(sku) : sku);
      return res.status(Status.OK).json(responseOperation);
    } catch (error) {
      next(error);
    }
  },

  fetchProductsBySku: async (req, res, next) => {
    try {
      const { sku } = req.params;
      const responseOperation = await findAllProductOperation.execute(typeof sku === 'string' ? Number(sku) : sku);
      return res.status(Status.OK).json(responseOperation);
    } catch (error) {
      next(error);
    }
  },

  get router() {
    return Router().post('/', this.create).delete('/sku/:sku', this.removeBySku).get('/sku/:sku', this.fetchProductsBySku);
  }
});
