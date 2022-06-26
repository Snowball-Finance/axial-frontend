import { GaugeItem } from "app/containers/PoolsAndGauges/types";
import { add, divide } from "precise-math";
import { toast } from "react-toastify";

export const fitGaugeWeightsProportionally = (items: {
  [key: string]: GaugeItem;
}) => {
  const itemsArray = Object.values(items);
  let total = 0;

  itemsArray.forEach((item) => {
    total = add(
      item.enteredAllocation ? Number(item.enteredAllocation) : 0,
      total
    );
  });
  if (total === 0) {
    toast.warn("please fill at least one allocation field");
    return items;
  }
  const tmp = {};
  itemsArray.forEach((item) => {
    item.enteredAllocation = Number(
      divide(
        ((item.enteredAllocation ? Number(item.enteredAllocation) : 0) * 100) /
          total
      ).toFixed(3)
    );
    tmp[item.poolAddress] = item;
  });
  return tmp;
};

export const fitGaugeWeightsEqually = (items: { [key: string]: GaugeItem }) => {
  const itemsArray = Object.values(items);
  const divided = Number(divide(100 / itemsArray.length).toFixed(3));
  itemsArray.forEach((item) => {
    item.enteredAllocation = divided;
  });
  const tmp = {};
  itemsArray.forEach((item) => {
    tmp[item.poolAddress] = item;
  });
  return tmp;
};
