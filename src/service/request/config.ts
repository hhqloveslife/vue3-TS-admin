//开发环境：development
//生产环境：production
//测试环境：test

let BASE_URL = "";
let BASE_NAME = "";
const TIME_OUT = 10000;

if (process.env.NODE_ENV === "development") {
  BASE_URL = "http://123.207.32.32:8000/";
  BASE_NAME = "";
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "production";
  BASE_NAME = "";
} else {
  BASE_URL = "test";
  BASE_NAME = "";
}

export { BASE_URL, BASE_NAME, TIME_OUT };
