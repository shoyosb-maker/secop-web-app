interface ErrorAlertProps {
  message: string;
}

export const ErrorAlert = ({ message }: ErrorAlertProps) => {
  return (
    <div className="error-alert">
      <span>❌</span>
      <p>{message}</p>
    </div>
  );
};