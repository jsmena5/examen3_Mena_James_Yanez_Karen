import React, { useState } from "react";
import AsignacionList from "./AsignacionList";
import AsignacionForm from "./AsignacionForm";

const AsignacionesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [reload, setReload] = useState(false);

  return (
    <div style={{ padding: 30, fontFamily: "Arial, sans-serif", backgroundColor: "#ecf0f1", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "#2c3e50" }}>Gestión de Asignaciones</h1>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: "12px 25px",
              borderRadius: 10,
              border: "none",
              backgroundColor: "#3498db",
              color: "#fff",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Nueva Asignación
          </button>
        )}
      </div>

      {showForm ? (
        <AsignacionForm
          onSuccess={() => {
            setReload(!reload); // recarga la lista
            setShowForm(false); // oculta el form
          }}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <AsignacionList key={reload ? "reload-1" : "reload-0"} />
      )}
    </div>
  );
};

export default AsignacionesPage;