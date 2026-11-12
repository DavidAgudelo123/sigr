# Estructura de datos (línea base v1.0.0)

En la línea base los datos se mantienen en memoria. El modelo previsto para la persistencia
(PostgreSQL) en la siguiente versión es:

| Tabla        | Campos principales                         |
|--------------|--------------------------------------------|
| usuarios     | id, nombre, rol, sal, clave_hash           |
| platos       | id, nombre, precio, categoria              |
| pedidos      | id, mesa, estado, total, fecha             |
| pedido_items | id, pedido_id, plato_id, cantidad, subtotal|
| reservas     | id, nombre, fecha, hora, personas, mesa    |

Relaciones: pedido 1..N pedido_items; plato 1..N pedido_items.
