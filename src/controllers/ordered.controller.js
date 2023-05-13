const orderedServices = require("../services/ordered.services");
var bill = 0;

exports.getOrderedAll = async (req, res) =>
  res.json(await orderedServices.servGetOrderedAll(req.sub));

exports.getOrderedByBill = async (req, res) =>
  res.json(
    await orderedServices.servGetOrderedByBill(req.sub, req.params.bill)
  );

exports.getOrderedBynameCustomer = async (req, res) => {
  const result = await orderedServices.servGetOrderedByCustomer(
    req.sub,
    req.body.namecustomer
  );
  if (result) {
    res.json({ result });
  } else {
    res.status(200).json("ไม่พบรายการอาหารที่ลูกค้าสั่ง");
  }
};

exports.SumOrderedAll = async (req, res) => {
  const result = await orderedServices.servSumOrderedAll(req.sub);
  if (result != "") {
    res.status(200).json({ result });
  } else {
    res.status(200).json("ไม่พบรายการอาหาร");
  }
};

exports.getOrderedToday = async (req, res) => {
  const result = await orderedServices.servGetOrderedToday(req.sub);
  if (result != "") {
    res.status(200).json({ result });
  } else {
    res.status(200).json({ msg: "ไม่พบรายการอาหาร", Status: false });
  }
};

exports.SumOrderedToday = async (req, res) => {
  const result = await orderedServices.servSumOrderedToday(req.sub);
  if (result != "") {
    res.status(200).json({ result });
  } else {
    res.status(200).json("ไม่พบรายการอาหาร");
  }
};

exports.GetOrderedYesterday = async (req, res) => {
  const result = await orderedServices.servGetOrderedYesterday(req.sub);
  if (result != "") {
    res.status(200).json({ result });
  } else {
    res.status(200).json("ไม่พบรายการอาหาร");
  }
};

exports.SumOrderedYesterday = async (req, res) => {
  const result = await orderedServices.servSumOrderedYesterday(req.sub);
  if (result != "") {
    res.status(200).json({ result });
  } else {
    res.status(200).json("ไม่พบรายการอาหาร");
  }
};

exports.SumOrderedWeek = async (req, res) => {
  const result = await orderedServices.servSumOrderedWeek(req.sub);
  if (result != "") {
    res.status(200).json({ result });
  } else {
    res.status(200).json("ไม่พบรายการอาหาร");
  }
};

exports.SumOrderedMonth = async (req, res) => {
  const result = await orderedServices.servSumOrderedMonth(req.sub);
  if (result != "") {
    res.status(200).json({ result });
  } else {
    res.status(200).json("ไม่พบรายการอาหาร");
  }
};

exports.GetOrderedBySelect = async (req, res) => {
  const result = await orderedServices.servGetOrderedBySelect(
    req.sub,
    req.body.date
  );
  if (result != "") {
    res.status(200).json({ result });
  } else {
    res.status(200).json("ไม่พบรายการอาหาร");
  }
};

exports.SumOrderedBySelect = async (req, res) => {
  const result = await orderedServices.servSumOrderedBySelect(
    req.sub,
    req.body.date
  );
  if (result != "") {
    res.status(200).json({ result });
  } else {
    res.status(200).json("ไม่พบรายการอาหาร");
  }
};

exports.GetOrderedBySelectBetweenDay = async (req, res) => {
  const { datestart, datestop } = req.body;
  const result = await orderedServices.servGetOrderedBySelectBetweenDay(
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

exports.SumOrderedBySelectBetweenDay = async (req, res) => {
  const { datestart, datestop } = req.body;
  const result = await orderedServices.servSumOrderedBySelectBetweenDay(
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

exports.AddOrdered = async (req, res) => {
  var data = [];
  bill +=1;
  data = req.body;
  for (let i = 0; i < req.body.length; i++) {
    await orderedServices.servAddOrdered(
      bill,
      req.sub,
      req.usernameadmin,
      data[i]
    );
  }

  res.status(200).json({
    msg: "เพิ่มข้อมูลที่ลูกค้าสั่งเรียบร้อยแล้ว",
    Status: true,
  });
};

exports.DeleteOrdered = async (req, res) => {
  const result = await orderedServices.servDeleteOrdered(
    req.sub,
    req.params.bill
  );
  if (result) {
    res.status(200).json({
      msg: `ลบออเดอร์ที่ ${req.params.bill} เรียบร้อยแล้ว`,
      Status: true,
    });
  } else {
    res.status(200).json({ msg: "ไม่พบเมนูอาหาร", Status: false });
  }
};
