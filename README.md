# SIGR - Sistema Integral de Gestión de Restaurante

Aplicación web (API REST) para gestionar pedidos, reservas, administración de menús,
control de caja y generación de reportes. Este repositorio contiene la **línea base v1.0.0**.

## Requisitos

* Node.js 20 o superior (sin dependencias externas)
* Git

## Clonar y ejecutar

```bash
git clone https://github.com/david123/sigr.git
cd sigr
npm start          # servidor en http://localhost:3000
npm test           # pruebas básicas de integración
```

## Endpoints de la línea base

|Método|Ruta|Descripción|
|-|-|-|
|GET|/health|Estado del servicio|
|GET|/api/menu?categoria=|Lista platos|
|POST|/api/menu|Crea un plato|
|POST|/api/pedidos|Registra un pedido|
|POST|/api/reservas|Crea una reserva por fecha/hora|
|GET|/api/reportes/ventas?fecha=|Cierre de caja y ventas del día|

## Estructura

```
src/app.js            servidor HTTP y rutas
src/modules/          auth, menu, pedidos, reservas, caja
test/                 pruebas (node:test)
docs/                 documentación técnica (base de datos, despliegue)
```

## Convenciones

* Rama estable: `main`. El trabajo nuevo va en ramas `feature/\*`, `fix/\*`.
* Commits en formato `tipo: descripción` (feat, fix, docs, test, chore).
* La línea base está marcada con el tag `v1.0.0-baseline`.

## Licencia

MIT (ver LICENSE.txt)

