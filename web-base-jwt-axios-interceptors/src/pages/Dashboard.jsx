import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import authorizedAxiosInstance from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'
import { useNavigate } from 'react-router-dom'
import { handleLogoutAPI } from '~/apis'
function Dashboard() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await handleLogoutAPI()
    // Nếu trường hợp dùng Cookie thì nhớ xóa thông tin userInfo trong local storage
    // localStorage.removeItem('userInfo')

    // Reset the user state to null, which will trigger the loading state
    setUser(null)

    // Redirect user to login page after remove token
    navigate('/login')
  }
  useEffect(() => {
    const fetchData = async () => {
      const res = await authorizedAxiosInstance.get(
        `${API_ROOT}/v1/dashboards/access`
      )
      // console.log('Data from API', res.data)
      // console.log(
      //   'Data from Local Storage',
      //   JSON.parse(localStorage.getItem('userInfo'))
      // )
      setUser(res.data)
    }
    fetchData()
  }, [])

  if (!user) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          width: '100vw',
          height: '100vh'
        }}
      >
        <CircularProgress />
        <Typography>Loading dashboard user...</Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        maxWidth: '1120px',
        marginTop: '1em',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '0 1em'
      }}
    >
      <Alert
        severity='info'
        sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}
      >
        Đây là trang Dashboard sau khi user:&nbsp;
        <Typography
          variant='span'
          sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}
        >
          {user?.email}
        </Typography>
        &nbsp; đăng nhập thành công thì mới cho truy cập vào.
      </Alert>
      <Button
        onClick={handleLogout}
        type='button'
        variant='contained'
        color='info'
        size='large'
        sx={{
          mt: 2,
          maxWidth: 'min-content',
          alignSelf: 'flex-end'
        }}
      >
        LOGOUT
      </Button>
      <Divider sx={{ my: 2 }} />
    </Box>
  )
}

export default Dashboard
