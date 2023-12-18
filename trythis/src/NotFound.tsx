import { useNavigate } from 'react-router-dom';
import { useTimer } from './hooks/timer-hooks';

export const NotFound = () => {
  const { useTimeout } = useTimer();
  const navigate = useNavigate();
  useTimeout(() => navigate('/'), 2000);
  // const location = useLocation();
  return <h1>404:{location.pathname} Page Not Found!</h1>;
  // return <Navigate to='/' />;
};
