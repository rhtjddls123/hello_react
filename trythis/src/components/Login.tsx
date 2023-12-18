// src/components/Login.tsx
import {
  FormEvent,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  memo,
} from 'react';
import { useCounter } from '../hooks/counter-context';
import { useSession } from '../hooks/session-context';
import { useNavigate } from 'react-router-dom';

export type LoginHandle = {
  focusName: () => void;
};

export const Login = forwardRef((_, ref) => {
  // console.log('login@@@@@');
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const { plusCount, minusCount } = useCounter();
  const {
    login,
    session: { loginUser },
  } = useSession();

  const navigate = useNavigate();
  useEffect(() => {
    if (loginUser) navigate('/my');
  }, [loginUser, navigate]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = Number(idRef.current?.value);
    const name = nameRef.current?.value || '';
    login({ id, name });
    focusName();
  };

  const focusName = () => {
    if (nameRef.current) nameRef.current.focus();
  };

  useImperativeHandle(ref, () => ({
    focusName,
  }));

  useEffect(() => {
    plusCount();
    console.log('Login Please...');
    if (idRef.current) idRef.current.value = '100';
    focusName();
    return () => {
      console.log('Login clean-up code');
      minusCount();
    };
  }, []);

  return (
    <>
      <form onSubmit={submit}>
        <div>
          Login ID(숫자): <input type='number' ref={idRef} />
        </div>
        <div>
          Login Name: <input type='text' ref={nameRef} />
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  );
});
export const LoginMemo = memo(Login, () => true);
