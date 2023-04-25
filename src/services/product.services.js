const productRepositories = require('../repositories/product.repositories.js')

exports.findProductManager = async (manager) => await productRepositories.findManager(manager);

exports.findProductAll = async () => await productRepositories.findAll();

exports.findProductByID = async (id) => await productRepositories.findByID(id);

exports.findProductName = async (nameproduct) => await productRepositories.findByName(nameproduct);

exports.findAddProduct = async (product1) => await productRepositories.add({...product1});

exports.findUpdateProduct = async (id, product1) => {
  const result = await productRepositories.findByID(id);
  if (result) {
    const updated = await productRepositories.update(result.id, { ...product1 });
    if (updated) {
        return await productRepositories.findByID(id);
      }
  }
  return null;
};

exports.findDeleteProduct = async (id) => await productRepositories.remove(id)