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

export type LoginHandle = {
  focusName: () => void;
};
type Props = {
  login: ({ id, name }: LoginUser) => void;
};

export const Login = forwardRef(({ login }: Props, ref) => {
  // console.log('login@@@@@');
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
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
