const { obtenerPlato } = require('./menu');

const ESTADOS = ['recibido', 'en_preparacion', 'listo', 'entregado'];
const pedidos = [];

function crearPedido({ mesa, items }) {
  if (!mesa || !Array.isArray(items) || items.length === 0) throw new Error('Mesa e ítems son obligatorios');
  let total = 0;
  const detalle = items.map(({ platoId, cantidad }) => {
    const plato = obtenerPlato(platoId);
    if (!plato) throw new Error(`Plato ${platoId} no existe`);
    if (!(cantidad > 0)) throw new Error('Cantidad no válida');
    total += plato.precio * cantidad;
    return { platoId, nombre: plato.nombre, cantidad, subtotal: plato.precio * cantidad };
  });
  const pedido = { id: pedidos.length + 1, mesa, detalle, total, estado: 'recibido', fecha: new Date().toISOString() };
  pedidos.push(pedido);
  return pedido;
}

function cambiarEstado(id, estado) {
  const pedido = pedidos.find((p) => p.id === id);
  if (!pedido) throw new Error('Pedido no encontrado');
  if (!ESTADOS.includes(estado)) throw new Error('Estado no válido');
  pedido.estado = estado;
  return pedido;
}

const listarPedidos = () => [...pedidos];

module.exports = { ESTADOS, crearPedido, cambiarEstado, listarPedidos };
