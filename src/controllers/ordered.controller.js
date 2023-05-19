const orderedServices = require("../services/ordered.services");
var bill = 0;

exports.getOrderedAll = async (req, res) => {
  const result = await orderedServices.servGetOrderedAll(req.sub);
  if (result != "") {
    res.json({ result });
  } else {
    res.status(200).json({ msg: "ไม่พบรายการอาหาร", Status: false });
  }
};
exports.getOrderedByBill = async (req, res) => {
  const result = await orderedServices.servGetOrderedByBill(
    req.sub,
    req.params.bill
  );
  if (result != "") {
    res.json({ result });
  } else {
    res.status(200).json({ msg: "ไม่พบรายการอาหาร", Status: false });
  }
};
exports.getOrderedByTable = async (req, res) => {
  const result = await orderedServices.servgetOrderedByTable(req.sub, req.params.table)
  if (result != "") {
    res.json({ result });
  } else {
    res.status(200).json({ msg: "ไม่พบรายการอาหาร", Status: false });
  }
}

exports.getOrderedBynameCustomer = async (req, res) => {
  const result = await orderedServices.servGetOrderedByCustomer(
    req.sub,
    req.body.namecustomer
  );
  if (result != "") {
    res.json({ result });
  } else {
    res.status(200).json({ msg: "ไม่พบรายการอาหาร", Status: false });
  }
};

exports.SumOrderedAll = async (req, res) => {
  const { name, price, countorder, sumpriceAll, sumAll } =
    await orderedServices.servSumOrderedAll(req.sub);
  if (name !== undefined) {
    res.status(200).json({ name, price, countorder, sumpriceAll, sumAll });
  } else {
    res.status(200).json({ msg: "ไม่พบรายการอาหาร", Status: false });
  }
};

exports.sumOrderedAllByUsername = async (req, res) => {
  username = req.body.username;
  const { name, price, countorder, sumpriceAll, sumAll } =
    await orderedServices.servSumOrderedAll(username);
  if (name !== undefined) {
    res.status(200).json({ name, price, countorder, sumpriceAll, sumAll });
  } else {
    res.status(200).json({ msg: "ไม่พบรายการอาหาร", Status: false });
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
  const { name, price, countorder, sumpriceAll, sumAll } =
    await orderedServices.servSumOrderedToday(req.sub);
  if (name !== undefined) {
    res.status(200).json({ name, price, countorder, sumpriceAll, sumAll });
  } else {
    res.status(200).json({ msg: "ไม่พบรายการอาหาร", Status: false });
  }
};

exports.GetOrderedYesterday = async (req, res) => {
  const result = await orderedServices.servGetOrderedYesterday(req.sub);
  if (result != "") {
    res.status(200).json({ result });
  } else {
    res.status(200).json({ msg: "ไม่พบรายการอาหาร", Status: false });
  }
};

exports.SumOrderedYesterday = async (req, res) => {
  const { name, price, countorder, sumpriceAll, sumAll } =
    await orderedServices.servSumOrderedYesterday(req.sub);
  if (name !== undefined) {
    res.status(200).json({ name, price, countorder, sumpriceAll, sumAll });
  } else {
    res.status(200).json({ msg: "ไม่พบรายการอาหาร", Status: false });
  }
};

exports.GetOrderedWeek = async (req, res) => {
  const result = await orderedServices.servGetOrderedWeek(req.sub);
  if (result != "") {
    res.status(200).json({ result });
  } else {
    res.status(200).json({ msg: "ไม่พบรายการอาหาร", Status: false });
  }
};

exports.SumOrderedWeek = async (req, res) => {
  const { name, price, countorder, sumpriceAll, sumAll } =
    await orderedServices.servSumOrderedWeek(req.sub);
  if (name !== undefined) {
    res.status(200).json({ name, price, countorder, sumpriceAll, sumAll });
  } else {
    res.status(200).json({ msg: "ไม่พบรายการอาหาร", Status: false });
  }
};

exports.GetOrderedMonth = async (req, res) => {
  const result = await orderedServices.servGetOrderedMonth(req.sub);
  if (result != "") {
    res.status(200).json({ result });
  } else {
    res.status(200).json({ msg: "ไม่พบรายการอาหาร", Status: false });
  }
};

exports.SumOrderedMonth = async (req, res) => {
  const { name, price, countorder, sumpriceAll, sumAll } =
    await orderedServices.servSumOrderedMonth(req.sub);
  if (name !== undefined) {
    res.status(200).json({ name, price, countorder, sumpriceAll, sumAll });
  } else {
    res.status(200).json({ msg: "ไม่พบรายการอาหาร", Status: false });
  }
};

exports.GetOrderedYear = async (req, res) => {
  const result = await orderedServices.servGetOrderedYear(req.sub);
  if (result != "") {
    res.status(200).json({ result });
  } else {
    res.status(200).json({ msg: "ไม่พบรายการอาหาร", Status: false });
  }
};

exports.SumOrderedYear = async (req, res) => {
  const { name, price, countorder, sumpriceAll, sumAll } =
    await orderedServices.servSumOrderedYear(req.sub);
  if (name !== undefined) {
    res.status(200).json({ name, price, countorder, sumpriceAll, sumAll });
  } else {
    res.status(200).json({ msg: "ไม่พบรายการอาหาร", Status: false });
  }
};

exports.GetOrdered2Years = async (req, res) => {
  const result = await orderedServices.servGetOrdered2Years(req.sub);
  if (result != "") {
    res.status(200).json({ result });
  } else {
    res.status(200).json({ msg: "ไม่พบรายการอาหาร", Status: false });
  }
};

exports.SumOrdered2Years = async (req, res) => {
  const { name, price, countorder, sumpriceAll, sumAll } =
    await orderedServices.servSumOrdered2Years(req.sub);
  if (name !== undefined) {
    res.status(200).json({ name, price, countorder, sumpriceAll, sumAll });
  } else {
    res.status(200).json({ msg: "ไม่พบรายการอาหาร", Status: false });
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
    res.status(200).json({ msg: "ไม่พบรายการอาหาร", Status: false });
  }
};

exports.SumOrderedBySelect = async (req, res) => {
  const { name, price, sumpriceAll, sumAll } =
    await orderedServices.servSumOrderedBySelect(req.sub, req.body.date);
  if (name !== undefined) {
    res.status(200).json({ name, price, sumpriceAll, sumAll });
  } else {
    res.status(200).json({ msg: "ไม่พบรายการอาหาร", Status: false });
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
    res.status(200).json({ msg: "ไม่พบรายการอาหาร", Status: false });
  }
};

exports.SumOrderedBySelectBetweenDay = async (req, res) => {
  const { datestart, datestop } = req.body;
  const { name, price, sumpriceAll, sumAll } =
    await orderedServices.servSumOrderedBySelectBetweenDay(
      req.sub,
      datestart,
      datestop
    );
  if (name !== undefined) {
    res.status(200).json({ name, price, sumpriceAll, sumAll });
  } else {
    res.status(200).json({ msg: "ไม่พบรายการอาหาร", Status: false });
  }
};

exports.AddOrdered = async (req, res) => {
  const orered = await orderedServices.servGetOrderedAll(req.sub);
  if (orered.length == 0) {
    bill = 1;
  } else {
    bill = orered[orered.length - 1]["billnumber"] + 1;
  }
  var data = [];
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
