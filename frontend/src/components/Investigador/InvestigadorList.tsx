import React, { useState, useEffect } from 'react';
import type { Investigador } from '../../interfaces/Investigador';
import { investigadorService } from '../../services/investigadorServices';
import InvestigadorForm from './InvestigadorForm';

const InvestigadoresList = () => {
  const [investigadores, setInvestigadores] = useState<Investigador[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingInvestigador, setEditingInvestigador] = useState<Investigador | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cargarInvestigadores();
  }, []);

  const cargarInvestigadores = async () => {
    try {
      setLoading(true);
      const data = await investigadorService.getAll();
      setInvestigadores(data);
    } catch (err) {
      setError('Error al cargar investigadores');
    } finally {
      setLoading(false);
    }
  };

  const handleCrearClick = () => {
    setEditingInvestigador(null);
    setShowForm(true);
  };

  const handleEdit = (investigador: Investigador) => {
    setEditingInvestigador(investigador);
    setShowForm(true);
  };

  const handleFormSubmit = async (data: Omit<Investigador, 'id'>) => {
    try {
      if (editingInvestigador) {
        // Si quieres, aquí llamas a update, si no, solo crea
        // await investigadorService.update(editingInvestigador.id, data);
      } else {
        await investigadorService.create(data);
      }
      setShowForm(false);
      setEditingInvestigador(null);
      cargarInvestigadores();
    } catch {
      setError('Error al guardar investigador');
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingInvestigador(null);
  };

  if (loading) return <div>Cargando investigadores...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Investigadores</h2>
      {!showForm && <button onClick={handleCrearClick}>Nuevo Investigador</button>}

      {showForm && (
        <InvestigadorForm 
          investigador={editingInvestigador}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}

      <table border={1} cellPadding={8} style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Departamento</th>
            <th>Experiencia (años)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {investigadores.map(i => (
            <tr key={i.id}>
              <td>{i.nombre}</td>
              <td>{i.apellido}</td>
              <td>{i.departamento}</td>
              <td>{i.experiencia}</td>
              <td>
                <button onClick={() => handleEdit(i)}>Editar</button>
                {/* Puedes agregar botón para eliminar si quieres */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvestigadoresList;
