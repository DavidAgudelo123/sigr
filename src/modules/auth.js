const crypto = require('node:crypto');

const ROLES = ['cliente', 'mesero', 'administrador'];
const usuarios = [];

function hash(clave, sal) {
  return crypto.scryptSync(clave, sal, 32).toString('hex');
}

function registrar({ nombre, clave, rol }) {
  if (!nombre || !clave) throw new Error('Nombre y clave son obligatorios');
  if (!ROLES.includes(rol)) throw new Error('Rol no válido');
  if (usuarios.some((u) => u.nombre === nombre)) throw new Error('Usuario ya existe');
  const sal = crypto.randomBytes(8).toString('hex');
  const usuario = { id: usuarios.length + 1, nombre, rol, sal, clave: hash(clave, sal) };
  usuarios.push(usuario);
  return { id: usuario.id, nombre, rol };
}

function iniciarSesion(nombre, clave) {
  const u = usuarios.find((x) => x.nombre === nombre);
  if (!u || u.clave !== hash(clave, u.sal)) return null;
  return { id: u.id, nombre: u.nombre, rol: u.rol };
}

module.exports = { ROLES, registrar, iniciarSesion };
