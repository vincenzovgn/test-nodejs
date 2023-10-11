module.exports = ({ productRepository }) => ({
  execute: async (data) => {
    const response = await productRepository.findCompleteProductBySku(data);
    return response;
  }
});
