import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="container">
      <Link
        to="/"
        className="navbar-brand fw-bold"
        style={{ textAlign: "center", padding: "500px" }}
      >
        HEADER DE PRUEBA
      </Link>
      <div className="ms-auto d-flex gap-3" style={{ fontSize: "1.3rem" }}>
        <Link className="nav-link" to="/auth/registro">
          Registro
        </Link>
        <Link className="nav-link" to="/auth/login">
          Login
        </Link>
      </div>
    </div>
  );
}
