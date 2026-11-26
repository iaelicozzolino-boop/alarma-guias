# Alarma Guías

App de un solo `index.html`, sin build. Se publica con GitHub Pages desde `main`: https://iaelicozzolino-boop.github.io/alarma-guias/

- Datos sincronizados en Firestore (proyecto `alarma-de-guias`, colecciones `days` y `notifications`) con el SDK compat 11.0.2.
- No hay inicio de sesión. Quien abra la página lee y escribe según las reglas de Firestore, que se gestionan en la consola de Firebase y no están en este repo. Revisarlas antes de abrir la app a más gente.
- La `apiKey` en el código es pública por diseño en Firebase web. No es un secreto.
- `alarma-guias-firebase.html` solo redirige a `index.html`, por si quedan enlaces antiguos.
- Enlazada desde el repo MarinaIbizaApps.
