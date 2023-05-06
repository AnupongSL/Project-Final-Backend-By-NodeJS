const sumProductServices = require("../services/sumproduct.service");

exports.getSumProductAll = async (req, res) =>
  res.json(await sumProductServices.servSumProductAll(req.sub));

exports.get1sumProductToday = async (req, res) => {
  const result = await sumProductServices.servSumProductToday1(req.sub);
  if (result != "") {
    res.status(200).json({ result });
  } else {
    res.status(200).json("ไม่พบรายการอาหาร");
  }
};

exports.getsumProductToday = async (req, res) => {
  const result = await sumProductServices.servSumProductToday(req.sub);
  if (result != "") {
    res.status(200).json({ result });
  } else {
    res.status(200).json("ไม่พบรายการอาหาร");
  }
};

exports.get1sumProductYesterday = async (req, res) => {
  const result = await sumProductServices.servSumProductYesterday1(req.sub);
  if (result != "") {
    res.status(200).json({ result });
  } else {
    res.status(200).json("ไม่พบรายการอาหาร");
  }
};

exports.getsumProductYesterday = async (req, res) => {
  const result = await sumProductServices.servSumProductYesterday(req.sub);
  if (result != "") {
    res.status(200).json({ result });
  } else {
    res.status(200).json("ไม่พบรายการอาหาร");
  }
};

exports.get1SumProductSelect = async (req, res) => {
  const result = await sumProductServices.servSumProductSelect1(
    req.sub,
    req.body.date
  );
  if (result != "") {
    res.status(200).json({ result });
  } else {
    res.status(200).json("ไม่พบรายการอาหาร");
  }
};

exports.getSumProductSelect = async (req, res) => {
  const result = await sumProductServices.servSumProductSelect(
    req.sub,
    req.body.date
  );
  if (result != "") {
    res.status(200).json({ result });
  } else {
    res.status(200).json("ไม่พบรายการอาหาร");
  }
};

exports.get1SumProductSelectBetweenDay = async (req, res) => {
  const { datestart, datestop } = req.body;
  const result = await sumProductServices.servSumProductSelectBetweenDay1(
    req.sub,
    datestart,
    datestop
  );
  if (result != "") {
    res.status(200).json({ result });
  } else {
    res.status(200).json("ไม่พบรายการอาหาร");
  }
};

exports.getSumProductSelectBetweenDay = async (req, res) => {
  const { datestart, datestop } = req.body;
  const result = await sumProductServices.servSumProductSelectBetweenDay(
    req.sub,
    datestart,
    datestop
  );
  if (result != "") {
    res.status(200).json({ result });
  } else {
    res.status(200).json("ไม่พบรายการอาหาร");
  }
};

exports.addSumProduct = async (req, res) => {
  console.log(req.usernameadmin);
  console.log(req.nameadmin);  
  const result = await sumProductServices.servAddSumproduct(
    req.sub,
    req.usernameadmin,
    req.nameadmin,
    req.body
  );
  if (result != "") {
    res.status(200).json({
      msg: "เพิ่มข้อมูลที่ลูกค้าสั่งเรียบร้อยแล้ว",
      Status: true,
      result,
    });
  } else {
    res.status(200).json({ msg: "error" });
  }
};

exports.deleteSumProduct = async (req, res) => {
  const result = await sumProductServices.servDeleteSumProduct(
    req.sub,
    req.params.id
  );
  if (result) {
    res.status(204).json("ลบเมนูอาหารที่ลูกค้าสั่งเรียบร้อยแล้ว");
  } else {
    res.status(404).json({});
  }
};
