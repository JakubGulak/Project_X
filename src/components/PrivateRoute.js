import { Route, Navigate } from 'react-router-dom';

// Komponent, który sprawdza, czy użytkownik jest zalogowany
const PrivateRoute = ({ element, isAuth }) => {
  return isAuth ? element : <Navigate to="/home" />;
};

// W komponencie AppRouter użyj PrivateRoute z odpowiednimi warunkami
function AppRouter({ isAuth }) {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/main" element={<Main />} />
      <PrivateRoute path="/loggedhome" element={<LoggedHome />} isAuth={isAuth} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/home" />} />
    </Routes>
  );
}
