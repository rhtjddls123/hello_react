interface ErrorProps {
  title: string;
  message: string;
}

const Error = ({ title, message }: ErrorProps) => {
  return (
    <div className="error">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Error;
