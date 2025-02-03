import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Login from '~/pages/Login'
import Dashboard from '~/pages/Dashboard'

// Xác định các route nào cần đăng nhập thì mới cho truy cập -> nếu không có user thì redirect về login
// Sử dụng <Outlet /> để render các route con được chứa trong ProtectedRoute
const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'))
  if (!user) return <Navigate to='/login' replace={true} />
  return <Outlet />
}
// Nếu như đã đăng nhập thì đẩy về dashboard
const UnauthorizedRoute = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'))
  if (user) return <Navigate to='/dashboard' replace={true} />
  return <Outlet />
}
function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' replace={true} />} />
      <Route element={<UnauthorizedRoute />}>
        <Route path='/login' element={<Login />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        {/* <Outlet /> chính là các child route này */}
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default App
