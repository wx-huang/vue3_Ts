let BASE_URL = ''
const TIME_OUT = 10000
const NODE_ENV = process.env.NODE_ENV

if (NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (NODE_ENV === 'production') {
  BASE_URL = 'http://httpbin.org/get'
} else {
  BASE_URL = 'http://httpbin.org/post'
}

// if (NODE_ENV === 'development') {
//   BASE_URL = 'http://httpbin.org/get'
// } else if (NODE_ENV === 'production') {
//   BASE_URL = 'http://httpbin.org/get'
// } else {
//   BASE_URL = 'http://httpbin.org/post'
// }

export { BASE_URL, TIME_OUT }
