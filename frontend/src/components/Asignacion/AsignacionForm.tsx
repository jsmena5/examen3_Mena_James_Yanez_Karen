import React, { useState } from "react";

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

const AsignacionForm = ({ onSuccess, onCancel }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [investigador, setInvestigador] = useState({
    nombre: "",
    apellido: "",
    departamento: "",
    experiencia: 0,
  });

  const [linea, setLinea] = useState({
    nombre: "",
    area: "",
  });

  const [disponibilidad, setDisponibilidad] = useState({
    franja_horaria: "",
    modalidad: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Tu lógica existente
    } catch (err: any) {
      setError(err.message || "Error en el registro de asignación");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px",
    marginBottom: 15,
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 16,
  };

  const sectionStyle: React.CSSProperties = {
    backgroundColor: "#f0f4f8",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "12px 25px",
    borderRadius: 10,
    border: "none",
    fontWeight: "bold",
    fontSize: 16,
    cursor: "pointer",
    marginRight: 10,
  };

  const submitButtonStyle: React.CSSProperties = { ...buttonStyle, backgroundColor: "#2ecc71", color: "#fff" };
  const cancelButtonStyle: React.CSSProperties = { ...buttonStyle, backgroundColor: "#e74c3c", color: "#fff" };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#2c3e50" }}>Registrar Nueva Asignación</h2>

      <div style={sectionStyle}>
        <h3 style={{ color: "#34495e" }}>Datos del Investigador</h3>
        <input type="text" placeholder="Nombre" value={investigador.nombre} onChange={(e) => setInvestigador({ ...investigador, nombre: e.target.value })} style={inputStyle} required />
        <input type="text" placeholder="Apellido" value={investigador.apellido} onChange={(e) => setInvestigador({ ...investigador, apellido: e.target.value })} style={inputStyle} required />
        <input type="text" placeholder="Departamento" value={investigador.departamento} onChange={(e) => setInvestigador({ ...investigador, departamento: e.target.value })} style={inputStyle} required />
        <input type="number" placeholder="Experiencia" value={investigador.experiencia} onChange={(e) => setInvestigador({ ...investigador, experiencia: Number(e.target.value) })} style={inputStyle} required />
      </div>

      <div style={sectionStyle}>
        <h3 style={{ color: "#34495e" }}>Datos de Línea</h3>
        <input type="text" placeholder="Nombre línea" value={linea.nombre} onChange={(e) => setLinea({ ...linea, nombre: e.target.value })} style={inputStyle} required />
        <input type="text" placeholder="Área" value={linea.area} onChange={(e) => setLinea({ ...linea, area: e.target.value })} style={inputStyle} required />
      </div>

      <div style={sectionStyle}>
        <h3 style={{ color: "#34495e" }}>Disponibilidad</h3>
        <input type="text" placeholder="Franja horaria" value={disponibilidad.franja_horaria} onChange={(e) => setDisponibilidad({ ...disponibilidad, franja_horaria: e.target.value })} style={inputStyle} required />
        <input type="text" placeholder="Modalidad" value={disponibilidad.modalidad} onChange={(e) => setDisponibilidad({ ...disponibilidad, modalidad: e.target.value })} style={inputStyle} required />
      </div>

      {error && <p style={{ color: "red", textAlign: "center", fontWeight: "bold" }}>{error}</p>}

      <div style={{ textAlign: "center" }}>
        <button type="submit" disabled={loading} style={submitButtonStyle}>{loading ? "Guardando..." : "Registrar Asignación"}</button>
        <button type="button" onClick={onCancel} style={cancelButtonStyle}>Cancelar</button>
      </div>
    </form>
  );
};

export default AsignacionForm;