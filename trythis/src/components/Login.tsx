// src/components/Login.tsx
import { FormEvent, useEffect, useRef } from 'react';
import { LoginUser } from '../App';

type Props = {
  login: ({ id, name }: LoginUser) => void;
};

const Login = ({ login }: Props) => {
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  // const [id, setId] = useState(0);
  // const [name, setName] = useState('');

  // const changeId = (e: ChangeEvent<HTMLInputElement>) =>
  //   setId(Number(e.currentTarget.value));

  // const changeName = (e: ChangeEvent<HTMLInputElement>) => {
  //   // console.log(e.currentTarget.value);
  //   return setName(e.currentTarget.value);
  // };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = Number(idRef.current?.value);
    const name = nameRef.current?.value || '';
    login({ id, name });
  };

  useEffect(() => {
    if (idRef.current) idRef.current.value = '100';
    if (nameRef.current) nameRef.current.focus();
  }, []);

  return (
    <>
      <form onSubmit={(e) => submit(e)}>
        <div>
          Login ID(숫자): <input type='number' ref={idRef} />
        </div>
        <div>
          Login Name: <input type='text' ref={nameRef} />
        </div>
        <button>login</button>
      </form>
    </>
  );
};
export default Login;
