import { ReactNode } from 'react';
import { PropsWithChildren } from 'react';

type Props = {
  title?: string;
  color: string;
  children: ReactNode;
};

const Title = ({ title = 're', color, children }: PropsWithChildren<Props>) => {
  // tsx에서 defaultProps는 더이상 사용하지 않음 -> default parameter사용(type에 optional을 적용하지 않으면 정상작동은되지만  app.tsx에서 빨간줄 오류발생)
  // ts에서는 같은방식으로 optional을 주지않으면 실행 자체가 안되는데 왜 tsx에서는 가능할까? -> 빌드되면서 js로 한번 바뀌기때문
  console.log(title);
  return (
    <>
      <h1 style={{ color: `${color}` }}>{title}</h1>
      <br></br>
      <h2>{children}</h2>
    </>
  );
};

// Title.defalutProps = { title: 'reactttt' };

export default Title;
