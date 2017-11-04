const request = require("request");
const moment = require("moment");
const util = require("util");
const _ = require("lodash");

const companies = require("../companyNames");
// let startDate = moment(`01 01 2016`);
// let endDate = moment(`12 31 2016`);
let startDate = moment("2016-01-01")
  .startOf("year")
  .hour(0)
  .minute(0)
  .second(0)
  .millisecond(0);
let endDate = moment("2016-12-31")
  .endOf("year")
  .hour(0)
  .minute(0)
  .second(0)
  .millisecond(0);
let momentToQuandl = "YYYY-MM-DD";
const dataProto = {
  close: undefined,
  "1d": undefined,
  "7d": undefined,
  "30d": undefined
};

//take the Quandl data and transform into
// let data = {
//   momentDate: {
//     AAPL: {
//       close: Number,
//       "1d": Number,
//       "7d": Number,
//       "30d": Number
//     }
//   }
// };

/* DATE FINDER UTILITY FUNCTIONS */

//returns false if there is none
//returns a moment Date if there is one
const nearestPreviousDate = (data, missingDay, lastDate = startDate) => {
  let day = missingDay.clone();
  while (!data[day.valueOf()]) {
    day.subtract(1, "day");
    if (day.isBefore(lastDate)) return false;
  }
  return day;
};

//returns false if there is none
//returns a moment Date if there is one
const nearestPostDate = (data, missingDay, lastDate = endDate) => {
  let day = missingDay.clone();
  while (!data[day.valueOf()]) {
    day.add(1, "day");
    if (day.isAfter(lastDate)) return false;
  }
  return day;
};

//returns false if there is none
//returns a moment Date if there is one
const nearestPostDatePrice = (
  data,
  missingDay,
  lastDate = endDate,
  company
) => {
  let day = missingDay.clone();
  while (!data[day.valueOf()]) {
    if (data[day.valueOf()] && !data[day.valueOf()][company]) {
      throw new Error("missing Company data");
    }
    day.add(1, "day");
    if (day.isAfter(lastDate)) {
      return false;
    }
  }
  return day;
};
/*      end       DATE FINDER UTILITY FUNCTIONS */

//start at the endDate and go back to the startDate filling in dates as you go
const fillMissingDates = priceData => {
  let day = endDate.clone();
  while (day.isSameOrAfter(startDate)) {
    if (!priceData.hasOwnProperty(day.valueOf())) {
      //found a missing Date
      ////now find some data for it
      let fillDate = nearestPreviousDate(priceData, day);
      if (!fillDate) {
        fillDate = nearestPostDate(priceData, day);
        if (!fillDate) throw new Error("couldn't find an appropriate date");
      }
      //clone the data from fill date
      priceData[day.valueOf()] = _.cloneDeep(priceData[fillDate.valueOf()]);
    }
    //walk backwards
    day.subtract(1, "day");
  }
  return priceData;
};

//test function to make sure that all the missing dates are filled in
const checkDates = priceData => {
  let day = startDate.clone();
  while (day.isSameOrBefore(endDate)) {
    // console.log(`day: ${day}`);
    if (priceData[day.valueOf()]) {
      // console.log(util.inspect(priceData[day]));
    } else {
      console.error(`day: ${day}, not found`);
      throw new Error("missing Date");
      return false;
    }
    day.add(1, "day");
  }
  return true;
}; //expects data to be formatted like the above

//grab the close prices from the quandl data
/*
"data": [
  [
    "AAPL",
    "2016-01-04",
    102.61,
    105.368,
    102,
    105.35,
    67649387,
    0,
    1,
    99.13651599555,
    101.8011540534,
    98.547165301102,
    101.78376337717,
    67649387
  ],
  [
    "AAPL",
    "2016-01-05",
    105.75,
    105.85,
    102.41,
    102.71,
    55790992,
    0,
    1,
    102.17022284894,
    102.26683771688,
    98.943286259665,
    99.233130863492,
    55790992
  ],
  */

const extractCloseDates = data => {
  let dateIdx = 1;
  let tickerIdx = 0;
  let closeIdx = 5;
  //the new hash we'll return
  let formatedData = {};

  //for each data entry init it's date in formatedData
  ////and place ticker: { close.... } under that date
  data.forEach(row => {
    let date = moment(row[dateIdx]);
    //if you let moment convert date to String it'll mess up trying to
    //convert the key to a date later, so we'll use `UNIX EPOCH`
    formatedData[date.valueOf()] = formatedData[date.valueOf()] || {};
    let ticker = row[tickerIdx];
    formatedData[date.valueOf()][ticker] = {
      close: row[closeIdx],
      "1d": undefined,
      "7d": undefined,
      "30d": undefined
    };
  });
  return formatedData;
};

//helper functions

const getXDaysBack = (prices, ticker, date, x) => {
  if (!moment.isMoment(date)) throw new Error("date must be moment");
  let currentDate = date.clone();
  currentDate.subtract(x, "day");
  currentDate = nearestPostDatePrice(prices, currentDate, date, ticker);
  if (!currentDate) {
    currentDate = date.clone();
  }
  if (!prices[currentDate.valueOf()]) {
    //couldn't find that date
    //this shouldn't run
    // console.log("couldnt find date");
    // console.log(`currentDate = ${currentDate}`);
    // currentDate = nearestPostDate(prices, currentDate, date, ticker);
    throw new Error("formatting problems");
  }
  //find the difference between the prices
  let datePrice = prices[date.valueOf()][ticker].close;
  let currentDatePrice = prices[currentDate.valueOf()][ticker].close;
  let difference = datePrice - currentDatePrice;
  return Math.trunc(difference);
};

const formatData = data => {
  //TODO: CONSIDER CLONING DATA INSTEAD OF MUTATING
  //at this point all the close prices should be included for
  //every ticker and there's no missing dates so the order
  //in which we fill out the data doesn't matter
  Object.keys(data).forEach(date => {
    Object.keys(data[date]).forEach(ticker => {
      let close = data[date][ticker].close;
      let oneDay;
      let sevenDay;
      let thirtyDay;
      try {
        oneDay = getXDaysBack(data, ticker, moment(Number(date)), 1);
        sevenDay = getXDaysBack(data, ticker, moment(Number(date)), 7);
        thirtyDay = getXDaysBack(data, ticker, moment(Number(date)), 30);
      } catch (e) {
        console.error(e);
      }
      data[date][ticker] = {
        close: close,
        "1d": oneDay,
        "7d": sevenDay,
        "30d": thirtyDay
      };
    });
  });
  return data;
};

//transforms Quandl API call into usable data for the front-end
const formatPrices = data => {
  //grab the close prices from the api data
  let closePrices = extractCloseDates(data);
  // console.log(util.inspect(closePrices));
  //fill in the missing dates
  let allDates = fillMissingDates(closePrices);
  //format it in the way that the front-end expects
  let formatedData = formatData(allDates);
  return formatedData;
};

module.exports = {
  formatPrices,
  startDate,
  endDate
};
