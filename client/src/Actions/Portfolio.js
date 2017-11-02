export const ACQUIRE_STOCK = "ADDING PURCHASED STOCK TO PORTFOLIO";
export const RELEASE_STOCK = "REMOVING SOLD STOCK FROM PORTFOLIO";

export const acquireStock = (price, quantity, ticker) => {
  price = Number(price);
  quantity = Number(quantity);
  return {
    type: ACQUIRE_STOCK,
    data: {
      ticker,
      price,
      quantity,
      cost: price * quantity
    }
  };
};

export const releaseStock = (price, quantity, ticker) => {
  price = Number(price);
  quantity = Number(quantity);
  return {
    type: RELEASE_STOCK,
    data: {
      ticker,
      price,
      quantity,
      cost: price * quantity
    }
  };
};
