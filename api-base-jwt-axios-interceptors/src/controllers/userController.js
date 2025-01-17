import { StatusCodes } from 'http-status-codes'
import ms from 'ms'
import { JwtProvider } from '~/providers/JwtProvider'
// Mock nhanh thông tin user thay vì phải tạo Database rồi query.
const MOCK_DATABASE = {
  USER: {
    ID: 'congdanh-sample-id-12345678',
    EMAIL: 'congdanh.official@gmail.com',
    PASSWORD: 'congdanh@123'
  }
}

// 2 cái chữ ký bí mật quan trọng trong dự án. Dành cho JWT - Jsonwebtokens
// Lưu ý phải lưu vào biến môi trường ENV trong thực tế cho bảo mật.
const ACCESS_TOKEN_SECRET_SIGNATURE = 'KBgJwUETt4HeVD05WaXXI9V3JnwCVP'
const REFRESH_TOKEN_SECRET_SIGNATURE = 'fcCjhnpeopVn2Hg1jG75MUi62051yL'

const login = async (req, res) => {
  try {
    if (
      req.body.email !== MOCK_DATABASE.USER.EMAIL ||
      req.body.password !== MOCK_DATABASE.USER.PASSWORD
    ) {
      res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: 'Your email or password is incorrect!' })
      return
    }

    // Trường hợp nhập đúng thông tin tài khoản, tạo token và trả về cho phía Client
    //1. Tạo payload (userInfo) để đính kèm trong JWT gửi về Client
    const payload = {
      id: MOCK_DATABASE.USER.ID,
      email: MOCK_DATABASE.USER.EMAIL
    }
    // 2. Tạo ra 2 token: access token và refresh token
    const accessToken = await JwtProvider.generateToken(
      payload,
      ACCESS_TOKEN_SECRET_SIGNATURE,
      '1h'
    )
    const refreshToken = await JwtProvider.generateToken(
      payload,
      REFRESH_TOKEN_SECRET_SIGNATURE,
      '14 days'
    )
    //3 Xử lý trường hợp trả về http only cookie cho Client (Cách 1: Lưu vào cookie)
    // Thời gian sống tối đa của cookie là 14 ngày, chúng ta có thể set là tối đa nhưng thời gian sống của accessToken lưu bên trong là 1h
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('14 days')
    })
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('14 days')
    })

    //4. Trả thông tin user + token về cho Client khi muốn lưu vào local Storage (Cách 2)
    // Chỉ cần chọn 1 trong 2 chứ không cần làm cả 2
    res.status(StatusCodes.OK).json({
      ...payload,
      accessToken,
      refreshToken
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const logout = async (req, res) => {
  try {
    // Do something
    res.status(StatusCodes.OK).json({ message: 'Logout API success!' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const refreshToken = async (req, res) => {
  try {
    // Do something
    res.status(StatusCodes.OK).json({ message: ' Refresh Token API success.' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

export const userController = {
  login,
  logout,
  refreshToken
}
