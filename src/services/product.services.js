const productRepositories = require('../repositories/product.repositories.js')

exports.servProductAll = async (usernameManager) => await productRepositories.repoProductAll(usernameManager);

exports.servProductByID = async (usernameManager, id) =>
  await productRepositories.repoProductByID(usernameManager, id);

exports.servProductByName = async (usernameManager, nameProduct) =>
  await productRepositories.repoProductByName(usernameManager, nameProduct);

exports.servAddProduct = async (product1, usernameManager, file) =>
  await productRepositories.repoAddProduct({
    manager: usernameManager, ...product1, imageproduct: file ? file.filename : ""
  });

exports.servUpdateProduct = async (product1, usernameManager, id, file) => {
  const updated = await productRepositories.repoUpdateProduct(id, {...product1, imageproduct: file ? file.filename : result.image});
    if (updated) {
      return await productRepositories.repoProductByID(usernameManager, id);
  }
  return null;
};

exports.servDeleteProduct = async (usernameManager, id) =>
  await productRepositories.repoRemoveProduct(usernameManager, id);
