import React, { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import Swal from 'sweetalert2';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function HotelForm({ onSuccess }) {
  const [form, setForm] = useState({
    nombre: '', direccion: '', ciudad: '', nit: '', lim_habit: ''
  });
  const [errors, setErrors] = useState({});
  const [nameValid, setNameValid] = useState(null);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (form.nombre.trim().length > 3) {
        api.get('/hoteles')
          .then(res => {
            const exists = res.data.some(h => h.nombre.toLowerCase() === form.nombre.trim().toLowerCase());
            setNameValid(!exists);
          })
          .catch(() => setNameValid(null));
      } else {
        setNameValid(null);
      }
    }, 500);
    return () => clearTimeout(delay);
  }, [form.nombre]);

  const isFormValid = () => {
    return (
      form.nombre && form.direccion && form.ciudad &&
      /^\d{9}-\d$/.test(form.nit) &&
      parseInt(form.lim_habit) > 0 &&
      nameValid === true
    );
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/hoteles', { ...form, lim_habit: parseInt(form.lim_habit) });
      Swal.fire('Éxito', 'Hotel registrado correctamente', 'success');
      onSuccess?.();
      setForm({ nombre: '', direccion: '', ciudad: '', nit: '', lim_habit: '' });
      setErrors({});
      setNameValid(null);
    } catch (err) {
      Swal.fire('Error', err.response?.data?.error || 'Fallo al registrar el hotel', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3 position-relative">
        <input name="nombre" placeholder="Nombre del hotel" value={form.nombre} onChange={handleChange} required className="form-control" />
        {nameValid === true && <FaCheckCircle className="text-success position-absolute end-0 me-3 top-50 translate-middle-y" />}
        {nameValid === false && <FaTimesCircle className="text-danger position-absolute end-0 me-3 top-50 translate-middle-y" />}
      </div>

      <div className="mb-3">
        <input name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} required className="form-control" />
      </div>

      <div className="mb-3">
        <input name="ciudad" placeholder="Ciudad" value={form.ciudad} onChange={handleChange} required className="form-control" />
      </div>

      <div className="mb-3">
        <input name="nit" placeholder="NIT (123456789-0)" value={form.nit} onChange={handleChange} required pattern="\d{9}-\d" className="form-control" />
      </div>

      <div className="mb-3">
        <input name="lim_habit" type="number" placeholder="Número de habitaciones" value={form.lim_habit} onChange={handleChange} required className="form-control" />
      </div>

      <button type="submit" className="btn btn-primary" disabled={!isFormValid()}>
        Registrar Hotel
      </button>
    </form>
  );
}

export default HotelForm;