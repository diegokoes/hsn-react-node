import { Link, useRouteError } from "react-router-dom";

export default function NotFound() {
  const err = useRouteError();
  const message = err?.statusText || err?.message;
  return (
    <section className="container py-5 text-center">
      <h1 className="display-5">404 - Página no encontrada</h1>
      {message && <p className="text-muted">{String(message)}</p>}
      <p className="mt-3">
        <Link to="/" className="btn btn-primary">
          Volver al inicio
        </Link>
      </p>
    </section>
  );
}
