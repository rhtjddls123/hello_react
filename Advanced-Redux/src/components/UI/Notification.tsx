import classes from "./Notification.module.css";

export interface NotificationType {
  status: "error" | "success" | "pendding";
  title: string;
  message: string;
}

const Notification = ({ status, title, message }: NotificationType) => {
  let specialClasses = "";

  if (status === "error") {
    specialClasses = classes.error;
  }
  if (status === "success") {
    specialClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
};

export default Notification;
