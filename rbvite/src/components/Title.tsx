import { ReactNode } from 'react';

type Props = {
  title: string;
  color: string;
  children: ReactNode;
};

const Title = ({ title, color, children }: Props) => {
  return (
    <>
      <h1 style={{ color: `${color}` }}>{title}</h1>
      <br></br>
      <h2>{children}</h2>
    </>
  );
};

export default Title;
