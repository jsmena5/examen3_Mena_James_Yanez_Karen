import React, { useEffect, useState } from "react";

interface GrupoData {
  investigador: string;
  linea_investigacion: string;
  disponibilidad: string;
}

const AsignacionList = () => {
  const [grupos, setGrupos] = useState<GrupoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cargarGrupos();
  }, []);

  const cargarGrupos = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/grupos");
      if (!res.ok) throw new Error("Error al cargar grupos");
      const data = await res.json();
      setGrupos(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ textAlign: "center" }}>Cargando grupos...</div>;
  if (error) return <div style={{ textAlign: "center", color: "red" }}>{error}</div>;

  return (
    <div style={{ maxWidth: 900, margin: "20px auto", backgroundColor: "#fff", padding: 20, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center", color: "#2c3e50" }}>Asignaciones Registradas</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 20 }}>
        <thead>
          <tr style={{ backgroundColor: "#3498db", color: "#fff", textAlign: "left" }}>
            <th style={{ padding: 12 }}>Investigador</th>
            <th style={{ padding: 12 }}>Línea</th>
            <th style={{ padding: 12 }}>Disponibilidad</th>
          </tr>
        </thead>
        <tbody>
          {grupos.map((g, idx) => (
            <tr key={idx} style={{ borderBottom: "1px solid #ddd", transition: "background 0.3s" }}>
              <td style={{ padding: 12 }}>{g.investigador}</td>
              <td style={{ padding: 12 }}>{g.linea_investigacion}</td>
              <td style={{ padding: 12 }}>{g.disponibilidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AsignacionList;