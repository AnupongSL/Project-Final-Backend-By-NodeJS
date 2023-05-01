const multer = require("multer");
const productServices = require("../services/product.services");
const multerConfig = require("../configs/multer");
const upload = multer(multerConfig.config).single(multerConfig.keyUpload);

exports.getProductAll = async (req, res) =>
  res.json(await productServices.servProductAll(req.sub));

exports.getProductByID = async (req, res) => {
  const result = await productServices.servProductByID(req.sub, req.params.id);
  if (result != "") {
    res.json(result);
  } else {
    res.status(200).json("ไม่พบรายการอาหาร");
  }
};

exports.getProductByName = async (req, res) => {
  const result = await productServices.servProductByName(
    req.sub,
    req.body.nameproduct
  );
  if (result !== "") {
    res.json(result);
  } else {
    res.status(404).json({});
  }
};

exports.addProduct = async (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      console.log(`error: ${JSON.stringify(error)}`);
      return res.status(200).json({ msg: error.message, Status: false });
    }
    const result = await productServices.servProductByName(
      req.sub,
      req.body.nameproduct
    );
    console.log(result);
    if (result != "") {
      res
        .status(200)
        .json({ msg: "ชื่อเมนูดังกล่าวถูกใช้งานไปแล้ว", Status: false });
    } else {
      const newData = await productServices.servAddProduct(
        req.body,
        req.sub,
        req.file
      );
      res.status(200).json({msg: "เพิ่มข้อมูลสินค้าแล้ว" , Status: true ,newData});
    }
  });
};

exports.updateProduct = async (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      console.log(`error: ${JSON.stringify(error)}`);
      return res.status(500).json({ message: error.message });
    }
    const result = await productServices.servProductByID(
      req.sub,
      req.params.id
    );
    if (result) {
      res
        .status(201)
        .json(
          await productServices.servUpdateProduct(
            req.body,
            req.sub,
            req.params.id,
            req.file
          )
        );
    } else {
      res.status(404).json({});
    }
  });
};

exports.deleteProduct = async (req, res) => {
  const result = await productServices.servDeleteProduct(
    req.sub,
    req.params.id
  );
  if (result) {
    res.status(204).json("ลบเมนูอาหารเรียบร้อยแล้ว");
  } else {
    res.status(404).json({});
  }
};
