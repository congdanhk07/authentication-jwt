import JWT from 'jsonwebtoken'

/*
Function tạo mới một token cần 3 tham số đầu vào
userInfo: Những thông tin muốn đính kèm vào token
secrectSignature: Chữ kí bí mật (String ngẫu nhiên)
tokenLife: Thời gian sống của token
*/
const generateToken = async (userInfo, secrectSignature, tokenLife) => {
  try {
    return JWT.sign(userInfo, secrectSignature, {
      algorithm: 'HS256',
      expiresIn: tokenLife
    })
  } catch (error) {
    throw new Error(error)
  }
}

// Check token có hợp lệ hay không  -> Token đc tạo ra có đúng với secretSignature hay không
const verifyToken = (token, secrectSignature) => {
  try {
    return JWT.verify(token, secrectSignature)
  } catch (error) {
    throw new Error(error)
  }
}

export const JwtProvider = {
  generateToken,
  verifyToken
}
