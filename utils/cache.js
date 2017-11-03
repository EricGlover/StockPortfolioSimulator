const fs = require("fs");
const util = require("util");

const isQuandlCached = () => {
  let quandlData = retrieveCache();
  if (Object.keys(quandlData).length === 0) return false;
  return true;
};
const cacheQuandl = quandl => {
  console.log("caching quandl ", quandl);
  fs.writeFileSync("./quandl.json", JSON.stringify(quandl));
};

const retrieveCache = () => {
  // let json = fs.readFileSync("./quandl.json", { encoding: "utf-8" });
  // json = JSON.parse(json);
  return require("./quandl.json");
};

module.exports = {
  isQuandlCached,
  cacheQuandl,
  retrieveCache
};
