export const SPEND_CASH = "SPEND CASH";
export const GET_CASH = "GET CASH";

export const spendCash = amount => {
  return {
    type: SPEND_CASH,
    data: amount
  };
};

export const getCash = amount => {
  return {
    type: GET_CASH,
    data: amount
  };
};
