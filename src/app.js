const http = require('node:http');
const menu = require('./modules/menu');
const pedidos = require('./modules/pedidos');
const reservas = require('./modules/reservas');
const caja = require('./modules/caja');

function leerJSON(req) {
  return new Promise((resolve, reject) => {
    let cuerpo = '';
    req.on('data', (c) => (cuerpo += c));
    req.on('end', () => {
      try { resolve(cuerpo ? JSON.parse(cuerpo) : {}); } catch (e) { reject(new Error('JSON inválido')); }
    });
  });
}

function crearServidor() {
  return http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    const responder = (codigo, datos) => {
      res.writeHead(codigo, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(datos));
    };
    try {
      if (req.method === 'GET' && url.pathname === '/health') return responder(200, { estado: 'ok' });
      if (req.method === 'GET' && url.pathname === '/api/menu') return responder(200, menu.listarPlatos(url.searchParams.get('categoria')));
      if (req.method === 'POST' && url.pathname === '/api/menu') return responder(201, menu.crearPlato(await leerJSON(req)));
      if (req.method === 'POST' && url.pathname === '/api/pedidos') return responder(201, pedidos.crearPedido(await leerJSON(req)));
      if (req.method === 'POST' && url.pathname === '/api/reservas') return responder(201, reservas.crearReserva(await leerJSON(req)));
      if (req.method === 'GET' && url.pathname === '/api/reportes/ventas') return responder(200, caja.cierreDelDia(url.searchParams.get('fecha') || new Date().toISOString().slice(0, 10)));
      return responder(404, { error: 'Ruta no encontrada' });
    } catch (e) {
      return responder(400, { error: e.message });
    }
  });
}

if (require.main === module) {
  const puerto = process.env.PORT || 3000;
  crearServidor().listen(puerto, () => console.log(`SIGR escuchando en http://localhost:${puerto}`));
}

module.exports = { crearServidor };
