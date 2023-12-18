import { ReactNode, memo } from 'react';
import { PropsWithChildren } from 'react';

type Props = {
  title?: string;
  color: string;
  children: ReactNode;
};

export const Title = ({
  title = 'React Tutorial',
  color,
  children,
}: PropsWithChildren<Props>) => {
  console.log(title);
  return (
    <>
      <h1 style={{ color: `${color}` }}>{title}</h1>
      <br></br>
      <h2>{children}</h2>
    </>
  );
};

export const TitleMemo = memo(Title, ({ children: a }, { children: b }) => {
  return a?.toString() === b?.toString();
});
