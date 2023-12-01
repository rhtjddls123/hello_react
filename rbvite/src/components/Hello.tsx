import { ReactNode } from 'react';

type Props = {
  name: string;
  age: number;
  children: ReactNode;
};

const Hello = ({ name, age, children }: Props) => {
  // const Hello = (prop: Props) => {
  // const { name, age, children } = prop;
  // prop.age += 1;
  console.log('Hello.age>>', age);
  return (
    <>
      <h1>
        Hello, {name} ({age}세)
      </h1>
      <h2>children: {children}</h2>
    </>
  );
};
export default Hello;
