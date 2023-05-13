import currency from "currency.js";
import { Linking } from "react-native";

export const convertCurrency = (value) => {
  if (value == null) {
    return 0;
  }
  if (typeof value !== "string") {
    value = value.toString();
  }
  if (value === "0") {
    return "0";
  }
  let result = "";
  if (value.length >= 3) {
    result = value;
  }
  if (value.length >= 4) {
    result = `${value.substr(0, value.length - 3)}.${value.substr(
      value.length - 3,
      value.length
    )}`;
  }
  if (value.length >= 7) {
    result = `${value.substr(0, value.length - 6)}.${value.substr(
      value.length - 6,
      3
    )}.${value.substr(value.length - 3, value.length)}`;
  }
  if (value.length >= 10) {
    result = `${value.substr(0, value.length - 9)}.${value.substr(
      value.length - 9,
      3
    )}.${value.substr(value.length - 6, 3)}.${value.substr(
      value.length - 3,
      value.length
    )}`;
  }

  return result;
};

export const convertHTML = (str) => {
  return str.replace(/font-family:[^;]+;?|font-weight:[^;]+;?/g, "");
};

export const convertHTMLtoText = (str) => {
  return str
    .replace(/<style([\s\S]*?)<\/style>/gi, " ")
    .replace(/<script([\s\S]*?)<\/script>/gi, " ")
    .replace(/(<(?:.|\n)*?>)/gm, " ")
    .replace(/\s+/gm, " ");
};

export const convertCart = (cart = []) => {
  return JSON.stringify(
    cart?.map((value) => {
      const {
        item_id,
        option_id,
        quantity,
        price,
        price_buy,
        combo_id,
        combo_info,
      } = value;
      return {
        item_id,
        option_id,
        quantity,
        price,
        price_buy,
        combo_id: combo_id || "0",
        combo_info: combo_info || "",
      };
    })
  );
};

export const convertOption = (arr_option_tmp, option1, option2, option3) => {
  return arr_option_tmp?.find((value) => {
    const checkOption1 = value.Option1 === option1;
    const checkOption2 = value.Option2 === option2;
    const checkOption3 = value.Option3 === option3;
    return checkOption1 && checkOption2 && checkOption3;
  });
};

export const formatCurrency = ({
  value,
  currencySymbol = "",
  precision = 0,
  separator = ".",
  // pattern = `# !`,
}) => {
  return currency(value, {
    precision,
    separator,
    symbol: currencySymbol,
    // pattern: pattern,
  }).format();
};
export const formatCurrencyValueNumber = ({
  value,
  currencySymbol = "",
  precision = 0,
  separator = ".",
  // pattern = `# !`,
}) => {
  return currency(value, {
    precision,
    symbol: currencySymbol,
    // pattern: pattern,
  }).value;
};

export const openLinkPdf = (url) => {
  return Linking.openURL(url);
};

export function formatDateYYYYMMDD(value) {
  const date = value.slice(0, 10);
  const time = value.slice(10, value.length);
  let d = date.split("-");

  return [d[2], d[1], d[0]].join("-") + time;
}

export function objectToFormData(obj) {
  let formData = new FormData();
  for (let key in obj) {
    formData.append(key, obj[key]);
  }
  return formData;
}

export function formatPrice(number) {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
