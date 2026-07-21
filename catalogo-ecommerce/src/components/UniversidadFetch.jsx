import { useState, useEffect } from "react";

function UniversidadFetch() {
  const [universidades, setUniversidades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controlador = new AbortController();

    fetch("http://universities.hipolabs.com/search?country=Peru", {
      signal: controlador.signal,
    })
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("Error HTTP: " + respuesta.status);
        }
        return respuesta.json();
      })
      .then((datos) => {
        setUniversidades(datos);
        setCargando(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message);
        setCargando(false);
      });

    return () => controlador.abort();
  }, []);

  if (cargando) return <p>Cargando universidades...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h2>Universidades del Perú</h2>

      <div className="grid">
        {universidades.slice(0,20).map((u) => (
          <div className="card" key={u.name}>
            <h3>{u.name}</h3>
            <p><b>País:</b> {u.country}</p>
            <p><b>Dominio:</b> {u.domains?.[0]}</p>
            <p><b>Región:</b> {u["state-province"] || "No especificado"}</p>
            <p>
              <a href={u.web_pages?.[0]} target="_blank">
                {u.web_pages?.[0]}
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UniversidadFetch;