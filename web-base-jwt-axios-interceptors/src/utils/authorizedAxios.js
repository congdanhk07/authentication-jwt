import axios from 'axios'
import { toast } from 'react-toastify'

// Khởi tạo một instance để custom interceptor và cấu hình chung cho dự án (reuse)
let authorizedAxiosInstance = axios.create()

// Thời gian tối đa của 1 request
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10 // 10 minutes
//withCredentials: Cho phép đính kèm và gửi cookie trong mỗi request lên BE khi chúng ta dùng JWT tokens (access and refresh) theo http Only (Cách 2)
authorizedAxiosInstance.defaults.withCredentials = true
//------------------------------------------------------------------------------------

// Cấu hình Interceptors để custom cho dự án (tầng trung gian)
// Add a request interceptor: Can thiệp vào giữa các request API
authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    // Cách lưu token vào local storage để gừi vào header (cách 1)
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      // Bearer theo tiêu chuẩn OAuth 2.0 -> Định dạng token -> đi theo tiêu chuẩn
      // Bearer : Token cho việc xác thực và ủy quyền, có nhiều loại khác như: Digest, Basic, ...
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor: Can thiệp vào các response API
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    // Mọi http status code nằm trong khoảng 2xx thì sẽ là error và xử lý ở đây
    // Do something with response data
    return response
  },
  (error) => {
    // Mọi http status code nằm ngoài khoảng 2xx thì sẽ là error và xử lý ở đây
    // Xử lý tập trung phần hiển thị thông báo lỗi từ API trả về -> Clean code - setup 1 lần cho tất cả response API
    // 410: GONE -> xử lý cho vấn đề refresh token
    if (error.response?.status !== 410) {
      toast.error(error.response?.data?.message || error?.message)
    }
    return Promise.reject(error)
  }
)
export default authorizedAxiosInstance
