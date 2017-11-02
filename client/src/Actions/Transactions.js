export const PURCHASE_TRANSACTION = "ADDING A PURCHASE TO TRANSACTIONS";
export const SELL_TRANSACTION = "ADDING A SALE TO TRANSACTIONS";

export const purchaseTransaction = (date, price, quantity, ticker) => {
  return {
    type: PURCHASE_TRANSACTION,
    data: {
      ticker,
      date,
      type: "BUY",
      price,
      quantity,
      cost: price * quantity
    }
  };
};

export const sellTransaction = (date, price, quantity, ticker) => {
  return {
    type: SELL_TRANSACTION,
    data: {
      ticker,
      date,
      type: "SELL",
      price,
      quantity,
      cost: price * quantity
    }
  };
};
