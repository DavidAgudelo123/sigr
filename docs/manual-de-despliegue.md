# Manual de despliegue (línea base v1.0.0)

1. Instalar Node.js 20 o superior.
2. `git clone https://github.com/david123/sigr.git \&\& cd sigr`
3. `npm test` debe terminar con todas las pruebas en verde.
4. `PORT=3000 npm start` y verificar `curl http://localhost:3000/health` -> `{"estado":"ok"}`.
5. Para producción: ejecutar detrás de un proxy inverso (Nginx) y gestionar el proceso con un servicio (systemd/PM2).

