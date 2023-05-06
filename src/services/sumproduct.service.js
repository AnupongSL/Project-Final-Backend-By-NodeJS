const sumProductRepositories = require("../repositories/sumproduct.repositories");
const moment = require("moment");

exports.servSumProductAll = async (usernameManager) =>
  await sumProductRepositories.repoSumProductAll(usernameManager);

exports.servSumProductToday1 = async (usernameManager) => {
  const timeIn = moment();
  timeIn.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const timeOut = moment();
  return await sumProductRepositories.repoSumProduct(
    usernameManager,
    timeIn,
    timeOut
  );
};

exports.servSumProductToday = async (usernameManager) => {
  const timeIn = moment();
  timeIn.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const timeOut = moment();
  const result = await sumProductRepositories.repoSumProduct(
    usernameManager,
    timeIn,
    timeOut
  );
  if (result != "") {
    const SumAll = await sumPrice(result);
    return SumAll;
  }
  return null;
};

exports.servSumProductYesterday1 = async (usernameManager) => {
  const timeIn = moment().subtract(1, "days");
  timeIn.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const timeOut = moment().subtract(1, "days");
  timeOut.set({ hour: 23, minute: 59, second: 59, millisecond: 0 });
  return await sumProductRepositories.repoSumProduct(
    usernameManager,
    timeIn,
    timeOut
  );
};

exports.servSumProductYesterday = async (usernameManager) => {
  const timeIn = moment().subtract(1, "days");
  timeIn.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const timeOut = moment().subtract(1, "days");
  timeOut.set({ hour: 23, minute: 59, second: 59, millisecond: 0 });
  const result = await sumProductRepositories.repoSumProduct(
    usernameManager,
    timeIn,
    timeOut
  );
  if (result != "") {
    const SumAll = await sumPrice(result);
    return SumAll;
  }
  return null;
};

exports.servSumProductSelect1 = async (usernameManager, date) => {
  const time1 = moment(date);
  const time2 = moment(date);
  const timeIn = time1.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const timeOut = time2.set({
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 0,
  });
  return await sumProductRepositories.repoSumProduct(
    usernameManager,
    timeIn,
    timeOut
  );
};

exports.servSumProductSelect = async (usernameManager, date) => {
  const time1 = moment(date);
  const time2 = moment(date);
  const timeIn = time1.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const timeOut = time2.set({
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 0,
  });
  const result = await sumProductRepositories.repoSumProduct(
    usernameManager,
    timeIn,
    timeOut
  );
  if (result != "") {
    const SumAll = await sumPrice(result);
    return SumAll;
  }
  return null;
};

exports.servSumProductSelectBetweenDay1 = async (
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
  return await sumProductRepositories.repoSumProduct(
    usernameManager,
    timeIn,
    timeOut
  );
};

exports.servSumProductSelectBetweenDay = async (
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
  const result = await sumProductRepositories.repoSumProduct(
    usernameManager,
    timeIn,
    timeOut
  );
  if (result != "") {
    const SumAll = await sumPrice(result);
    return SumAll;
  }
  return null;
};

exports.servAddSumproduct = async (
  usernameManager,
  sumproduct1,
  usernameadmin,
  nameadmin
) =>
  await sumProductRepositories.repoAddSumProduct({
    ...sumproduct1,
    manager: usernameManager,
    nameadmin: nameadmin,
    usernameadmin: usernameadmin,
  });

exports.servDeleteSumProduct = async (usernameManager, id) =>
  await sumProductRepositories.repoRemoveSumProduct(usernameManager, id);

function sumPrice(result) {
  if (result != "") {
    const count = result.length;
    var k = 0; // นับว่ามีทั้งหมดกี่เมนูที่ไม่ซ้ำกัน
    var b = 1;
    const nameproduct = [];
    const priceproduct = [];
    let resultAll = [];
    const pproduct = []; // ราคาของแต่ละเมนู
    const nproduct = []; // ชื่อของแต่ละเมนู
    const sum = []; // นับจำนวนรายการแต่ละเมนู
    const sumpriceAll = []; //ยอดขายแต่ละเมนู
    var sumAll = 0; // ยอดขายทั้งหมด
    for (i = 0; i < count; i++) {
      nameproduct[i] = result[i]["nameproduct"];
      priceproduct[i] = result[i]["priceproduct"];
      if (nameproduct[i - 1] == nameproduct[i]) {
        continue;
      } else {
        for (a = 0; a <= k; a++) {
          b = 1;
          if (nameproduct[i] == nproduct[a]) {
            b = 0;
            break;
          }
        }
        if (b == 1) {
          nproduct[k] = nameproduct[i];
          pproduct[k] = priceproduct[i];
          sum[k] = 0;
          sumpriceAll[k] = 0;
          for (j = i; j < count; j++) {
            nameproduct[j] = result[j]["nameproduct"];
            if (nameproduct[j] == nproduct[k]) {
              sum[k] += 1;
              sumpriceAll[k] += pproduct[k];
            }
          }
          sumAll += sumpriceAll[k];
          k++;
        } else {
          continue;
        }
      }
    }
    for (i = -1; i <= k; i++) {
      if (i < k) {
        resultAll[i] = `เมนูที่ ${i + 1} คือ ${nproduct[i]} ขายได้ ${
          sum[i]
        } ครั้ง ราคา ${pproduct[i]} Bath! รวมเป็นเงิน ${sumpriceAll[i]} Bath`;
      }
      if (i == k) {
        resultAll[i] = `ยอดขายทั้งหมดคือ ${sumAll} Bath`;
      }
    }
    return resultAll;
  }
}
