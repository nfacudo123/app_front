import React, { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const tipos = {
  ESTANDAR: ['SENCILLA', 'DOBLE'],
  JUNIOR: ['TRIPLE', 'CUADRUPLE'],
  SUITE: ['SENCILLA', 'DOBLE', 'TRIPLE']
};

const ModalHabitacionAsign = ({ hotel, onClose }) => {
  const [form, setForm] = useState({
    habitacion_tipo: '', acomodacion: '', cantidad: ''
  });
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    const res = await api.get(`/asignaciones/${hotel.id}`);
    setAssignments(res.data);
  };

  const assignedTotal = assignments.reduce((sum, a) => sum + a.cantidad, 0);
  const remaining = hotel.lim_habit - assignedTotal;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { habitacion_tipo, acomodacion, cantidad } = form;
    if (!tipos[habitacion_tipo]?.includes(acomodacion)) {
      Swal.fire('Error', 'Acomodación inválida para ese tipo', 'error');
      return;
    }
    if (assignments.some(a => a.habitacion_tipo === habitacion_tipo && a.acomodacion === acomodacion)) {
      Swal.fire('Error', 'Ya existe esta configuración', 'error');
      return;
    }
    if (cantidad <= 0 || cantidad > remaining) {
      Swal.fire('Error', 'Cantidad inválida', 'error');
      return;
    }
    try {
      await api.post('/asignaciones', {
        hotel_id: hotel.id,
        habitacion_tipo, acomodacion,
        cantidad: parseInt(cantidad)
      });
      Swal.fire('Éxito', 'Habitación asignada', 'success');
      fetchAssignments();
      setForm({ habitacion_tipo: '', acomodacion: '', cantidad: '' });
    } catch (err) {
      Swal.fire('Error', err.response?.data?.error || 'Error', 'error');
    }
  };

  return (
    <Modal show={true} onHide={() => {}} backdrop="static">
      <Modal.Header>
        <Modal.Title>Acomodar Habitaciones - {hotel.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Número de Habitaciones:</strong> {hotel.lim_habit}</p>
        <p><strong>Asignadas:</strong> {assignedTotal} / {hotel.lim_habit}</p>

        {assignments.length > 0 && (
  <div className="mb-3">
    <h5>Configuraciones existentes</h5>
    {assignments.map((a, i) => (
      <div key={i} className="d-flex justify-content-between align-items-center border p-2 mb-2">
        <div>
          <strong>{a.habitacion_tipo}</strong> - {a.acomodacion}: {a.cantidad} habs
        </div>
      </div>
    ))}
  </div>
)}

        {remaining > 0 ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <input name="cantidad" type="number" className="form-control" placeholder="Cantidad" value={form.cantidad} onChange={e => setForm({ ...form, cantidad: e.target.value })} required />
            </div>
            <div className="mb-2">
              <select className="form-select" value={form.habitacion_tipo} onChange={e => setForm({ ...form, habitacion_tipo: e.target.value, acomodacion: '' })} required>
                <option value="">Tipo de habitación</option>
                {Object.keys(tipos).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="mb-2">
              <select className="form-select" value={form.acomodacion} onChange={e => setForm({ ...form, acomodacion: e.target.value })} required>
                <option value="">Acomodación</option>
                {tipos[form.habitacion_tipo]?.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <Button type="submit" className="btn btn-success">Guardar configuración</Button>
          </form>
        ) : <div className="alert alert-info">Este hotel ya tiene todas las habitaciones asignadas.</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalHabitacionAsign;
