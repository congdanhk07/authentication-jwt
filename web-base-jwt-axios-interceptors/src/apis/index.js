import authorizedAxiosInstance from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

export const handleLogoutAPI = async () => {
  // Case 1: Dùng Local storage -> Xóa thông tin user trong local storage phía frontend
  // Clear all authentication data from localStorage
  localStorage.removeItem('userInfo')
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')

  // Case 2: Dùng Http Only Cookis -> Gọi API để remove Cookies -> Chọn 1 trong 2 cách
  return await authorizedAxiosInstance.delete(`${API_ROOT}/v1/users/logout`)
}

export const refreshTokenAPI = async (refreshToken) => {
  return await authorizedAxiosInstance.put(
    `${API_ROOT}/v1/users/refresh_token`,
    {
      refreshToken
    }
  )
}
