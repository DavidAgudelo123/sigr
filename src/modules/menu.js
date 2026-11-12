const categorias = ['entradas', 'platos fuertes', 'postres', 'bebidas'];
const platos = [];

function crearPlato({ nombre, precio, categoria }) {
  if (!nombre || !(precio > 0)) throw new Error('Nombre y precio válido son obligatorios');
  if (!categorias.includes(categoria)) throw new Error('Categoría no válida');
  const plato = { id: platos.length + 1, nombre, precio, categoria };
  platos.push(plato);
  return plato;
}

const listarPlatos = (categoria) =>
  categoria ? platos.filter((p) => p.categoria === categoria) : [...platos];

const obtenerPlato = (id) => platos.find((p) => p.id === id) || null;

function actualizarPlato(id, cambios) {
  const plato = obtenerPlato(id);
  if (!plato) throw new Error('Plato no encontrado');
  Object.assign(plato, cambios, { id });
  return plato;
}

function eliminarPlato(id) {
  const i = platos.findIndex((p) => p.id === id);
  if (i === -1) throw new Error('Plato no encontrado');
  return platos.splice(i, 1)[0];
}

module.exports = { categorias, crearPlato, listarPlatos, obtenerPlato, actualizarPlato, eliminarPlato };
