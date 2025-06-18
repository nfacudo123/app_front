import React, { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import HotelForm from './HotelForm';
import ModalHabitacionAsign from './ModalHabitacionAsign';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [roomModal, setRoomModal] = useState(false);

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    try {
      const res = await api.get('/hoteles');
      setHotels(res.data);
    } catch (err) {
      Swal.fire('Error', 'No se pudo cargar la lista de hoteles', 'error');
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={() => setShowFormModal(true)} className="mb-3">Registrar Hotel</Button>

      <div className="list-group mb-4">
        {hotels.map(hotel => (
          <div key={hotel.id} className="list-group-item d-flex justify-content-between align-items-center">
            <strong>{hotel.nombre}</strong>
            <div>
              <Button variant="secondary" className="me-2" onClick={() => { setSelectedHotel(hotel); setRoomModal(true); }}>Acomodar habitaciones</Button>
              <Button variant="info" onClick={() => { setSelectedHotel(hotel); setModalShow(true); }}>Ver datos de Hotel</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para ver datos del hotel */}
      {selectedHotel && (
        <Modal show={modalShow} onHide={() => setModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedHotel.nombre}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Dirección:</strong> {selectedHotel.direccion}</p>
            <p><strong>Ciudad:</strong> {selectedHotel.ciudad}</p>
            <p><strong>NIT:</strong> {selectedHotel.nit}</p>
            <p><strong>Número de habitaciones:</strong> {selectedHotel.lim_habit}</p>
          </Modal.Body>
        </Modal>
      )}

      {/* Modal para registrar hotel */}
      <Modal show={showFormModal} onHide={() => setShowFormModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar Hotel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <HotelForm onSuccess={() => { setShowFormModal(false); loadHotels(); }} />
        </Modal.Body>
      </Modal>

      {/* Modal para asignar habitaciones */}
      {roomModal && selectedHotel && (
        <ModalHabitacionAsign hotel={selectedHotel} onClose={() => { setRoomModal(false); loadHotels(); }} />
      )} 
    </div>
  );
}

export default HotelList;