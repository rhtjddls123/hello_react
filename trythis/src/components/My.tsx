// src/components/My.tsx
import Profile from './Profile';
import { useSession } from '../hooks/session-context';
import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const My = () => {
  // console.log('@@My');
  const {
    session: { loginUser },
  } = useSession();

  const navigate = useNavigate();
  useEffect(() => {
    if (!loginUser) navigate('/login');
  }, [navigate, loginUser]);

  return (
    <>
      <Profile />
    </>
  );
};
export const MyMemo = memo(My, () => true);
