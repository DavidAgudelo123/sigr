const TOTAL_MESAS = 10;
const reservas = [];

function crearReserva({ nombre, fecha, hora, personas }) {
  if (!nombre || !fecha || !hora || !(personas > 0)) throw new Error('Datos de reserva incompletos');
  const ocupadas = reservas.filter((r) => r.fecha === fecha && r.hora === hora).map((r) => r.mesa);
  const mesa = Array.from({ length: TOTAL_MESAS }, (_, i) => i + 1).find((m) => !ocupadas.includes(m));
  if (!mesa) throw new Error('No hay mesas disponibles en ese horario');
  const reserva = { id: reservas.length + 1, nombre, fecha, hora, personas, mesa };
  reservas.push(reserva);
  return reserva;
}

const listarReservas = (fecha) => (fecha ? reservas.filter((r) => r.fecha === fecha) : [...reservas]);

module.exports = { TOTAL_MESAS, crearReserva, listarReservas };
