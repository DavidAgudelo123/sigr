const { listarPedidos } = require('./pedidos');

// Cierre de caja: suma los pedidos entregados de una fecha (AAAA-MM-DD).
function cierreDelDia(fecha) {
  const entregados = listarPedidos().filter((p) => p.estado === 'entregado' && p.fecha.startsWith(fecha));
  return {
    fecha,
    pedidos: entregados.length,
    totalVentas: entregados.reduce((suma, p) => suma + p.total, 0),
  };
}

module.exports = { cierreDelDia };
