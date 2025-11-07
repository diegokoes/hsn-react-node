import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  const hideTimer = useRef(null);
  //#region ---- STATE -----
  const [categorias, setCategorias] = useState([]);
  const [subcats, setSubCats] = useState([]);
  const [activeParent, setActiveParent] = useState(null);
  const [showPanel, setShowPanel] = useState(false);
  //#endregion
  //#region ---- EFFECTS -----
  useEffect(() => {
    let cancelado = false;
    (async () => {
      try {
        const respuesta = await fetch("http://localhost:3000/api/Tienda/Categorias?pathCat=principales", {
          method: "GET",
        });
        const cuerpo = await respuesta.json();
        if (!cancelado) {
          if (cuerpo.codigo !== 0) throw new Error(cuerpo.mensaje || "Error categorías");
          setCategorias(Array.isArray(cuerpo.categorias) ? cuerpo.categorias : []);
        }
      } catch (e) {
        if (!cancelado) setCategorias([]);
        console.error("Error cargando categorías principales:", e);
      }
    })();
    return () => {
      cancelado = true;
    };
  }, []);

  useEffect(() => {
    let cancelado = false;
    async function obtenerSubcategorias() {
      if (!activeParent) {
        setSubCats([]);
        return;
      }
      try {
        const respuesta = await fetch(
          `http://localhost:3000/api/Tienda/Categorias?pathCat=${encodeURIComponent(activeParent)}`
        );
        if (!respuesta.ok) throw new Error(`error al obtener subcategorias ${respuesta.status}`);
        const cuerpoResp = await respuesta.json();
        if (cuerpoResp.codigo !== 0)
          throw new Error(`error en la respuesta al obtener subcategorias, ${cuerpoResp.mensaje}`);

        const ordenadas = (cuerpoResp.categorias || [])
          .slice()
          .sort((a, b) => (a.pathCategoria > b.pathCategoria ? 1 : -1));
        const procesadas = [];
        for (const categoria of ordenadas) {
          if (/^\d+-\d+$/.test(categoria.pathCategoria)) {
            procesadas.push({ ...categoria, subcategorias: [] });
          } else {
            const clave = categoria.pathCategoria.split("-").slice(0, 2).join("-");
            const padre = procesadas.find((c) => new RegExp(`${clave}$`).test(c.pathCategoria));
            if (padre) padre.subcategorias.push(categoria);
          }
        }

        if (!cancelado) setSubCats(procesadas);
      } catch (error) {
        console.error("Error cargando subcategorías:", error);
        if (!cancelado) setSubCats([]);
      }
    }
    obtenerSubcategorias();
    return () => {
      cancelado = true;
    };
  }, [activeParent]);
  //#endregion
  //#region ---- HANDLERS -----
  const handleEnterParent = (categoria) => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    setActiveParent(categoria.pathCategoria);
    setShowPanel(true);
  };

  const handleLeaveAll = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      setShowPanel(false);
      setActiveParent(null);
      hideTimer.current = null;
    }, 180);
  };

  const handleEnterPanel = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    setShowPanel(true);
  };

  const handleLeavePanel = () => {
    handleLeaveAll();
  };
  //#endregion
  return (
    <div
      className="navigation border-top border-bottom"
      style={{ background: "#ffffff", position: "relative", zIndex: 1040 }}
    >
      <div className="container">
        <nav className="navbar navbar-expand-lg py-0" aria-label="Primary">
          <div className="container-fluid px-0">
            <span className="navbar-brand d-none d-lg-block" aria-hidden="true">
              &nbsp;
            </span>

            <div className="collapse navbar-collapse show" id="mainMenu">
              <ul
                className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center overflow-auto"
                id="pronav"
                style={{ whiteSpace: "nowrap" }}
              >
                {categorias.length > 0 &&
                  categorias.map((categoria, idx) => (
                    <li
                      className="nav-item"
                      key={idx}
                      onMouseEnter={() => handleEnterParent(categoria)}
                      onMouseLeave={handleLeaveAll}
                    >
                      <Link
                        className={`nav-link px-3 ${activeParent === categoria.pathCategoria ? "active" : ""}`}
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          fontStyle: "italic",
                          paddingTop: "0.35rem",
                          paddingBottom: "0.35rem",
                        }}
                        to={`/Productos/${encodeURIComponent(categoria.pathCategoria)}`}
                      >
                        <span className="catsppales">
                          {categoria.nombreCategoria} <i className="bi bi-chevron-down" aria-hidden="true"></i>
                        </span>
                      </Link>
                    </li>
                  ))}
              </ul>

              <div className="d-none d-lg-flex align-items-center gap-3"></div>
            </div>
          </div>
        </nav>
      </div>

      {showPanel && subcats.length > 0 && (
        <div
          className="border-top"
          onMouseEnter={handleEnterPanel}
          onMouseLeave={handleLeavePanel}
          style={{
            background: "#fff",
            position: "absolute",
            left: 0,
            right: 0,
            top: "100%",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          <div className="container py-2">
            <div className="text-uppercase small text-muted mb-2">Selecciona categoría</div>
            {(() => {
              const withChildren = subcats.filter((s) => (s.subcategorias?.length || 0) > 0);
              const leaves = subcats.filter((s) => (s.subcategorias?.length || 0) === 0);

              return (
                <>
                  {withChildren.length > 0 && (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "0.5rem 1rem",
                        alignItems: "start",
                      }}
                    >
                      {withChildren.map((subcat, pos) => (
                        <div key={pos}>
                          <div className="fw-semibold mb-1">
                            <Link
                              to={`/Productos/${encodeURIComponent(subcat.pathCategoria)}`}
                              className="text-decoration-none text-dark"
                              style={{ fontSize: "0.9rem" }}
                            >
                              {subcat.nombreCategoria}
                            </Link>
                          </div>
                          <ul className="list-unstyled mb-0">
                            {subcat.subcategorias.map((tercat, tercpos) => (
                              <li key={tercpos} className="mb-1">
                                <Link
                                  to={`/Productos/${encodeURIComponent(tercat.pathCategoria)}`}
                                  className="text-decoration-none"
                                  style={{
                                    font: 'normal 10px "Roboto","Open Sans",sans-serif',
                                    color: "#666",
                                  }}
                                >
                                  {tercat.nombreCategoria}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {leaves.length > 0 && (
                    <div className="mt-3">
                      <div className="text-uppercase small text-muted mb-1">Otras categorías</div>
                      <div
                        style={{
                          columnWidth: 200,
                          columnGap: "1.25rem",
                          maxHeight: "320px",
                          overflowY: "auto",
                        }}
                      >
                        {leaves.map((leaf, i) => (
                          <div key={i} style={{ breakInside: "avoid-column" }}>
                            <Link
                              to={`/Productos/${encodeURIComponent(leaf.pathCategoria)}`}
                              className="text-decoration-none"
                              style={{
                                display: "inline-block",
                                marginBottom: "0.5rem",
                                font: 'normal 10px "Roboto","Open Sans",sans-serif',
                                color: "#333",
                              }}
                            >
                              {leaf.nombreCategoria}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
