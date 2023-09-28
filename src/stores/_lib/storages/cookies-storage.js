import cookies from "js-cookie";
import qs from "qs";

export const cookiesStorage = ({ queryString = false } = {}) => ({
  setItem(key, state) {
    const stateObj = JSON.parse(state);
    const value = stateObj[key];
    const convert = queryString ? qs.stringify(value) : value;
    return cookies.set(key, convert, { expires: 1 });
  },

  getItem(key) {
    const value = cookies.get(key);
    const convert = queryString ? qs.parse(value) : value;
    return JSON.stringify({
      [key]: convert,
    });
  },
});
