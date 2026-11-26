# Alarma Guías

App de un solo `index.html`, sin build. Se publica con GitHub Pages desde `main`: https://iaelicozzolino-boop.github.io/alarma-guias/

- Datos sincronizados en Firestore (proyecto `alarma-de-guias`, colecciones `days` y `notifications`) con el SDK compat 11.0.2.
- No hay inicio de sesión. Las reglas de Firestore están versionadas en `firebase/firestore.rules` (ver `firebase/LEEME.md`): lectura abierta, escritura solo con la forma que usa la app, sin borrado. Se publican a mano en la consola de Firebase; mantener el archivo y la consola sincronizados. Quien tenga la apiKey puede seguir leyendo todo; solo login o App Check lo evitan.
- La `apiKey` en el código es pública por diseño en Firebase web. No es un secreto.
- `alarma-guias-firebase.html` solo redirige a `index.html`, por si quedan enlaces antiguos.
- Enlazada desde el repo MarinaIbizaApps.
