const router = require("express").Router();
const request = require("request");
const moment = require("moment");
const util = require("util");

const {
  isQuandlCached,
  cacheQuandl,
  retrieveCache
} = require("../utils/cache");
const { formatPrices, startDate, endDate } = require("../utils/format");
const companies = require("../companyNames");
const API_KEY = process.env.API_KEY;
const endpoint = "https://www.quandl.com/api/v3/datatables/WIKI/PRICES";

//one day for test porpoises
const queryParams = `?ticker=${Object.keys(companies).join(
  ","
)}&date.gte=2016-01-01&date.lte=2016-12-31&api_key=${API_KEY}`;

//TODO: clean this
router.get("/", (req, res) => {
  // res.end("hello world, I am api");
  res.json(companies);
});

//TODO: add support for query params
//default behavior for /prices is get the closing stock prices for today
//add a query param for autopopulating the format that the front-end wants
//TODO: ADD REDIS CACHEING
router.get("/prices", async (req, res) => {
  // console.log("sending query to ", endpoint + queryParams);
  let formated;
  //check if the data is cached
  if (isQuandlCached()) {
    let data = retrieveCache();
    formated = formatPrices(data.datatable.data);
    return res.json({
      startDate: startDate.valueOf(),
      endDate: endDate.valueOf(),
      stockData: formated
    });
  }
  let serverResponse;
  try {
    //promisify this later
    serverResponse = await request(endpoint + queryParams, function(
      error,
      response,
      body
    ) {
      if (error) throw error;
      let data = JSON.parse(body);

      try {
        formated = formatPrices(data.datatable.data);
      } catch (e) {
        console.error(e);
        throw e;
        return res.sendStatus(50);
      }
      //cache the data
      // if (!isQuandlCached()) {
      //   console.log("caching data ");
      //   console.log(`formated = ${formated}`);
      //   cacheQuandl(formated);
      // }
      res.json({
        startDate: startDate.valueOf(),
        endDate: endDate.valueOf(),
        stockData: formated
      });
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
});

module.exports = router;
