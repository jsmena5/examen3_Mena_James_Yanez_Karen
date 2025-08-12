import React, { useState, useEffect } from 'react';
import type { Investigador } from '../../interfaces/Investigador';

interface Props {
  investigador?: Investigador | null;
  onSubmit: (data: Omit<Investigador, 'id'>) => void;
  onCancel: () => void;
}

const InvestigadorForm = ({ investigador, onSubmit, onCancel }: Props) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    departamento: '',
    experiencia: 0,
  });

  useEffect(() => {
    if (investigador) {
      setFormData({
        nombre: investigador.nombre,
        apellido: investigador.apellido,
        departamento: investigador.departamento,
        experiencia: investigador.experiencia,
      });
    }
  }, [investigador]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'experiencia' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.apellido || !formData.departamento) {
      alert('Por favor complete todos los campos');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Apellido:</label>
        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Departamento:</label>
        <input
          type="text"
          name="departamento"
          value={formData.departamento}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Experiencia (años):</label>
        <input
          type="number"
          name="experiencia"
          value={formData.experiencia}
          onChange={handleChange}
          min={0}
          required
        />
      </div>

      <div style={{ marginTop: 10 }}>
        <button type="submit">{investigador ? 'Actualizar' : 'Crear'}</button>
        <button type="button" onClick={onCancel} style={{ marginLeft: 10 }}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default InvestigadorForm;