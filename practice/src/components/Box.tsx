import { ReactNode } from 'react';

type Props = {
  borderWidth: string;
  borderColor: string;
  borderStyle: string;
  padding: string;
  margin: string;
  children: ReactNode;
};

const Box = ({
  borderWidth,
  borderColor,
  borderStyle,
  padding,
  margin,
  children,
}: Props) => {
  const style = {
    borderWidth: `${borderWidth}`,
    borderColor: `${borderColor}`,
    borderStyle: `${borderStyle}`,
    padding: `${padding}`,
    margin: `${margin}`,
  };
  return (
    <>
      <div style={style}>{children}</div>
    </>
  );
};

export default Box;
