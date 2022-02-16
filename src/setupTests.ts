// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
import "@testing-library/jest-dom/extend-expect";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
var localStorageMock = (function () {
  var store = {};
  return {
    getItem: function (key: string) {
      return store[key];
    },
    setItem: function (key: string, value: any) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
    removeItem: function (key: string) {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });
