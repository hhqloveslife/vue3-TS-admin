//开发环境：development
//生产环境：production
//测试环境：test

let BASE_URL = ''
let BASE_NAME = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://152.136.185.210:5000'
} else {
  BASE_URL = 'test'
  BASE_NAME = ''
}

export { BASE_URL, BASE_NAME, TIME_OUT }
