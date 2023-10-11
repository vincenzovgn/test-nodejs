module.exports = ({ findCompleteProductBySkuUsecase }) => ({
  execute: async (data) => {
    try {
      const products = await findCompleteProductBySkuUsecase.execute(data);
      if (!products || !products.length) {
        return;
      }
      return products;
    } catch (error) {
      return error;
    }
  }
});
