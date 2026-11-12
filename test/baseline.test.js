const test = require('node:test');
const assert = require('node:assert');
const auth = require('../src/modules/auth');
const menu = require('../src/modules/menu');
const pedidos = require('../src/modules/pedidos');
const reservas = require('../src/modules/reservas');
const caja = require('../src/modules/caja');
const { crearServidor } = require('../src/app');

test('autenticación: registra y valida credenciales por rol', () => {
  auth.registrar({ nombre: 'ana', clave: 'secreta', rol: 'mesero' });
  assert.strictEqual(auth.iniciarSesion('ana', 'secreta').rol, 'mesero');
  assert.strictEqual(auth.iniciarSesion('ana', 'incorrecta'), null);
  assert.throws(() => auth.registrar({ nombre: 'x', clave: 'y', rol: 'invitado' }));
});

test('menú: CRUD de platos y categorías', () => {
  const p = menu.crearPlato({ nombre: 'Bandeja paisa', precio: 32000, categoria: 'platos fuertes' });
  assert.strictEqual(menu.listarPlatos('platos fuertes').length, 1);
  assert.strictEqual(menu.actualizarPlato(p.id, { precio: 35000 }).precio, 35000);
  assert.throws(() => menu.crearPlato({ nombre: 'Sin precio', precio: 0, categoria: 'postres' }));
});

test('integración pedidos + menú + caja: el cierre suma pedidos entregados', () => {
  const jugo = menu.crearPlato({ nombre: 'Jugo de mora', precio: 6000, categoria: 'bebidas' });
  const pedido = pedidos.crearPedido({ mesa: 3, items: [{ platoId: jugo.id, cantidad: 2 }] });
  assert.strictEqual(pedido.total, 12000);
  pedidos.cambiarEstado(pedido.id, 'entregado');
  const cierre = caja.cierreDelDia(new Date().toISOString().slice(0, 10));
  assert.ok(cierre.totalVentas >= 12000);
});

test('reservas: asigna mesa y rechaza cuando se agotan', () => {
  for (let i = 0; i < reservas.TOTAL_MESAS; i++) {
    reservas.crearReserva({ nombre: `Cliente ${i}`, fecha: '2026-12-24', hora: '19:00', personas: 4 });
  }
  assert.throws(() => reservas.crearReserva({ nombre: 'Extra', fecha: '2026-12-24', hora: '19:00', personas: 2 }));
});

test('API: /health responde ok', async () => {
  const servidor = crearServidor();
  await new Promise((r) => servidor.listen(0, r));
  const { port } = servidor.address();
  const respuesta = await fetch(`http://localhost:${port}/health`);
  assert.strictEqual(respuesta.status, 200);
  assert.deepStrictEqual(await respuesta.json(), { estado: 'ok' });
  servidor.close();
});
