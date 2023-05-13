const orderRepositories = require("../repositories/ordered.repositories");
const moment = require("moment");

exports.servGetOrderedAll = async (usernameManager) =>
  await orderRepositories.repoOrderedAll(usernameManager);

exports.servGetOrderedByBill = async (usernameManager, billedit) => {
  return await orderRepositories.repoOrderedByBill(
    usernameManager,
    billedit,
  );
};

exports.servGetOrderedByCustomer = async (usernameManager, namecustomer) =>
  await orderRepositories.repoOrderedByCustomer(usernameManager, namecustomer);

exports.servSumOrderedAll = async (usernameManager) => {
  const result = await orderRepositories.repoOrderedAll(usernameManager);
  if (result != "") {
    const SumAll = await sumPrice(result);
    return SumAll;
  }
  return "ไม่พบข้อมูล";
};

exports.servGetOrderedToday = async (usernameManager) => {
  const timeIn = moment();
  timeIn.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const timeOut = moment();
  return await orderRepositories.repoSumOrdered(
    usernameManager,
    timeIn,
    timeOut
  );
};

exports.servSumOrderedToday = async (usernameManager) => {
  const timeIn = moment();
  timeIn.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const timeOut = moment();
  const result = await orderRepositories.repoSumOrdered(
    usernameManager,
    timeIn,
    timeOut
  );
  if (result != "") {
    const SumAll = await sumPrice(result);
    return SumAll;
  }
  return "ไม่พบข้อมูล โปรดตรวจสอบความถูกต้องของวันที่ที่กรอก!!";
};

exports.servGetOrderedYesterday = async (usernameManager) => {
  const timeIn = moment().subtract(1, "days");
  timeIn.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const timeOut = moment().subtract(1, "days");
  timeOut.set({ hour: 23, minute: 59, second: 59, millisecond: 0 });
  return await orderRepositories.repoSumOrdered(
    usernameManager,
    timeIn,
    timeOut
  );
};

exports.servSumOrderedYesterday = async (usernameManager) => {
  const timeIn = moment().subtract(1, "days");
  timeIn.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const timeOut = moment().subtract(1, "days");
  timeOut.set({ hour: 23, minute: 59, second: 59, millisecond: 0 });
  const result = await orderRepositories.repoSumOrdered(
    usernameManager,
    timeIn,
    timeOut
  );
  if (result != "") {
    const SumAll = await sumPrice(result);
    return SumAll;
  }
  return "ไม่พบข้อมูล";
};
exports.servSumOrderedWeek = async (usernameManager) => {
  const timeIn = moment().subtract(7, "days");
  timeIn.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const timeOut = moment();
  timeOut.set({ hour: 23, minute: 59, second: 59, millisecond: 0 });
  const result = await orderRepositories.repoSumOrdered(
    usernameManager,
    timeIn,
    timeOut
  );
  if (result != "") {
    const SumAll = await sumPrice(result);
    return SumAll;
  }
  return "ไม่พบข้อมูล";
};

exports.servSumOrderedMonth = async (usernameManager) => {
  const timeIn = moment().subtract(30, "days");
  timeIn.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const timeOut = moment();
  timeOut.set({ hour: 23, minute: 59, second: 59, millisecond: 0 });
  const result = await orderRepositories.repoSumOrdered(
    usernameManager,
    timeIn,
    timeOut
  );
  if (result != "") {
    const SumAll = await sumPrice(result);
    return SumAll;
  }
  return "ไม่พบข้อมูล";
};

exports.servGetOrderedBySelect = async (usernameManager, date) => {
  const time1 = moment(date);
  const time2 = moment(date);
  const timeIn = time1.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const timeOut = time2.set({
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 0,
  });
  return await orderRepositories.repoSumOrdered(
    usernameManager,
    timeIn,
    timeOut
  );
};

exports.servSumOrderedBySelect = async (usernameManager, date) => {
  const time1 = moment(date);
  const time2 = moment(date);
  const timeIn = time1.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const timeOut = time2.set({
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 0,
  });
  const result = await orderRepositories.repoSumOrdered(
    usernameManager,
    timeIn,
    timeOut
  );
  if (result != "") {
    const SumAll = await sumPrice(result);
    return SumAll;
  }
  return "ไม่พบข้อมูล โปรดตรวจสอบความถูกต้องของวันที่ที่กรอก!!";
};

exports.servGetOrderedBySelectBetweenDay = async (
  usernameManager,
  datestart,
  datestop
) => {
  const timeIn = moment(datestart);
  const date = moment(datestop);
  const timeOut = date.set({
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 0,
  });
  return await orderRepositories.repoSumOrdered(
    usernameManager,
    timeIn,
    timeOut
  );
};

exports.servSumOrderedBySelectBetweenDay = async (
  usernameManager,
  datestart,
  datestop
) => {
  const timeIn = moment(datestart);
  const date = moment(datestop);
  const timeOut = date.set({
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 0,
  });
  const result = await orderRepositories.repoSumOrdered(
    usernameManager,
    timeIn,
    timeOut
  );
  if (result != "") {
    const SumAll = await sumPrice(result);
    return SumAll;
  }
  return "ไม่พบข้อมูล โปรดตรวจสอบความถูกต้องของวันที่ที่กรอก!!";
};

exports.servAddOrdered = async (
  bill,
  usernameManager,
  usernameAdmin,
  order
) => {
  const date = new Date();
  const createat = date.setHours(date.getHours() + 7);
  return (resuit = await orderRepositories.repoAddOrdered({
    billnumber: bill,
    manager: usernameManager,
    usernameadmin: usernameAdmin,
    ...order,
    createat: createat,
  }));
};

exports.servDeleteOrdered = async (usernameManager, billedit) =>{
  return await orderRepositories.repoRemoveOrdered(
    usernameManager,
    billedit
  );
}

function sumPrice(result) {
  if (result != "") {
    const count = result.length;
    var k = 0; // นับว่ามีทั้งหมดกี่เมนูที่ไม่ซ้ำกัน
    var b = 1;
    var nametemp = [];
    var pricetemp = [];
    var counttemp = [];
    var sumtemp = [];
    const nameordered = [];
    const priceordered = [];
    const countordered = [];
    let resultAll = [];
    const price = []; // ราคาของแต่ละเมนู
    const name = []; // ชื่อของแต่ละเมนู
    const countorder = []; // นับจำนวนรายการแต่ละเมนู
    const sumpriceAll = []; //ยอดขายแต่ละเมนู
    var sumAll = 0; // ยอดขายทั้งหมด
    for (i = 0; i < count; i++) {
      nameordered[i] = result[i]["nameordered"];
      priceordered[i] = result[i]["priceordered"];
      if (nameordered[i - 1] == nameordered[i]) {
        continue;
      } else {
        for (a = 0; a <= k; a++) {
          b = 1;
          if (nameordered[i] == name[a]) {
            b = 0;
            break;
          }
        }
        if (b == 1) {
          name[k] = nameordered[i];
          price[k] = priceordered[i];
          countorder[k] = 0;
          sumpriceAll[k] = 0;
          for (j = i; j < count; j++) {
            nameordered[j] = result[j]["nameordered"];
            countordered[j] = result[j]["countordered"];
            if (nameordered[j] == name[k]) {
              countorder[k] += countordered[j];
              sumpriceAll[k] += price[k] * countordered[j];
            }
          }
          sumAll += sumpriceAll[k];
          k++;
        } else {
          continue;
        }
      }
    }

    for (i = 0; i < k; i++) {
      for (j = i + 1; j < k; j++) {
        if (countorder[j] > countorder[i]) {
          counttemp[i] = countorder[j];
          countorder[j] = countorder[i];
          countorder[i] = counttemp[i];
          nametemp[i] = name[j];
          name[j] = name[i];
          name[i] = nametemp[i];
          nametemp[i] = price[j];
          price[j] = price[i];
          price[i] = nametemp[i];
          sumtemp[i] = sumpriceAll[j];
          sumpriceAll[j] = sumpriceAll[i];
          sumpriceAll[i] = sumtemp[i];
        }
      }
    }

    for (i = 0; i <= k; i++) {
      if (i >= 0) {
        resultAll[i] = `（°ο°）~ อันดับที่ ${i + 1} คือ ${name[i]}ㅤขายได้ㅤ${
          countorder[i]
        }ㅤครั้ง ราคาㅤ${price[i]}ㅤบาทㅤㅤรวมเป็นเงินㅤ${sumpriceAll[i]}ㅤบาท`;
      }
      if (i == k) {
        resultAll[i] = `ㅤㅤㅤ● ยอดขายทั้งหมดคือ ${sumAll.toLocaleString()} บาท ●`;

      }
    }
    return resultAll;
  }
}
