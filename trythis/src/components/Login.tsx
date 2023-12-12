// src/components/Login.tsx
import {
  FormEvent,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useSession } from '../hooks/session-context';
import { useCounter } from '../hooks/counter-context';

export type LoginHandle = {
  focusName: () => void;
};

const Login = forwardRef((_, handleRef) => {
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const { login } = useSession();
  const { plusCount, minusCount } = useCounter();

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

  useImperativeHandle(handleRef, () => ({
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
export default Login;
