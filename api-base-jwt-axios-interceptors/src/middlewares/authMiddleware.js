import { StatusCodes } from 'http-status-codes'
import {
  ACCESS_TOKEN_SECRET_SIGNATURE,
  JwtProvider
} from '~/providers/JwtProvider'

// Middleware này đảm nhận việc: lấy và xác thực JWT accessToken nhận từ FE có hợp lệ hay không
const isAuthorized = async (req, res, next) => {
  //Cách 1: lấy accessToken trong req cookies từ client gửi - withCredentials trong file authorizeAxios và credentials trong CORS
  const accessTokenFromCookie = req.cookies?.accessToken
  console.log('accessTokenFromCookie', accessTokenFromCookie)
  if (!accessTokenFromCookie) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Unauthorized! Token not found' })
  }
  //Cách 2:lấy accessToken từ phía FE lưu trong localStorage và gửi lên header authorization
  const accessTokenFromHeader = req.headers.authorization
  console.log('accessTokenFromHeader', accessTokenFromHeader)
  if (!accessTokenFromHeader) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Unauthorized! Token not found' })
  }

  try {
    // Bước 1: Thực thi xác thực token (verify)
    const accessTokenDecoded = await JwtProvider.verifyToken(
      accessTokenFromCookie,
      ACCESS_TOKEN_SECRET_SIGNATURE
    )
    // Bước 2: Nếu token hợp lệ thì sẽ lưu thông tin đã decode vào req.jwtDecoded để sử dụng cho các tầng xử lý sau -> Lấy đc các giá trị đã decode (email, id user)
    req.jwtDecoded = accessTokenDecoded
    // Bước 3: Cho req đi tiếp
  } catch (error) {
    console.log('Error from authMiddleware:', error)
    //Case 1: Nếu accessToken hết hạn (expired) -> trả về 410 -> Client sử dụng refreshToken
    if (error.message?.include('jwt expired')) {
      res.status(StatusCodes.GONE).json({ message: 'Please refresh token' })
    }
    //Case 2: Nếu accessToken không hợp lệ -> trả lỗi 401 -> FE xử lý Logout/gọi API logout
  }
}
export const authMiddleware = {
  isAuthorized
}
