export default function Alert({ type, message }) {
  return (
    <div className={`container-xl alert alert-${type} fixed-bottom`} role="alert">
      {message}
    </div>
  );
}
