# Reglas de Firestore (proyecto alarma-de-guias)

`firestore.rules` es la copia versionada de las reglas publicadas en la consola de Firebase.
Si se cambian en la consola, hay que actualizar este archivo (y al revés).

Qué protegen: no se puede borrar nada, no se pueden crear colecciones nuevas, los días solo
aceptan los puestos A20-A32, D01-D16, E01-E17 y `_meta`, y las notificaciones solo
`{date, text, createdAt}` con texto de 500 caracteres como máximo.

Qué NO protegen: la app no tiene autenticación, así que cualquiera que tenga la apiKey
(es pública en index.html) puede leer todo y sobrescribir el estado de cualquier día.

Probar en el emulador (necesita Java):

    cd firebase
    npm i firebase-tools@13.29.1 @firebase/rules-unit-testing@3.0.4 firebase@10.14.1
    npx firebase emulators:exec --only firestore --project alarma-de-guias "node firestore-rules.test.mjs"
