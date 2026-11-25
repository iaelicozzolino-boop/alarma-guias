import { initializeTestEnvironment, assertSucceeds, assertFails } from '@firebase/rules-unit-testing';
import fs from 'fs';
const env = await initializeTestEnvironment({ projectId: 'alarma-de-guias', firestore: { rules: fs.readFileSync('firestore.rules','utf8'), host:'127.0.0.1', port:8085 } });
const fs1 = env.unauthenticatedContext().firestore();
const { doc, getDoc, setDoc, updateDoc, deleteDoc, addDoc, collection, query, where, getDocs, deleteField } = await import('firebase/firestore');
const T=[]; const t=(n,p)=>T.push([n,p]);
const now=new Date().toISOString();
// Comportamiento real de la app
t('app: get test-connection', assertSucceeds(getDoc(doc(fs1,'days','test-connection'))));
t('app: set día nuevo', assertSucceeds(setDoc(doc(fs1,'days','2026-11-25'),{A20:{babor:true,estribor:false},_meta:{updatedAt:now}})));
t('app: update día', assertSucceeds(updateDoc(doc(fs1,'days','2026-11-25'),{E17:{babor:false,estribor:true},_meta:{updatedAt:now}})));
t('app: leer día', assertSucceeds(getDoc(doc(fs1,'days','2026-11-25'))));
t('app: crear notificación', assertSucceeds(addDoc(collection(fs1,'notifications'),{date:'2026-11-25',text:'hola',createdAt:now})));
t('app: query notificaciones', assertSucceeds(getDocs(query(collection(fs1,'notifications'),where('date','==','2026-11-25')))));
t('app: set día completo 46 puestos', assertSucceeds(setDoc(doc(fs1,'days','2026-11-26'),{A20:{babor:true,estribor:true},A21:{babor:true,estribor:true},A22:{babor:true,estribor:true},A23:{babor:true,estribor:true},A24:{babor:true,estribor:true},A25:{babor:true,estribor:true},A26:{babor:true,estribor:true},A27:{babor:true,estribor:true},A28:{babor:true,estribor:true},A29:{babor:true,estribor:true},A30:{babor:true,estribor:true},A31:{babor:true,estribor:true},A32:{babor:true,estribor:true},D01:{babor:true,estribor:true},D02:{babor:true,estribor:true},D03:{babor:true,estribor:true},D04:{babor:true,estribor:true},D05:{babor:true,estribor:true},D06:{babor:true,estribor:true},D07:{babor:true,estribor:true},D08:{babor:true,estribor:true},D09:{babor:true,estribor:true},D10:{babor:true,estribor:true},D11:{babor:true,estribor:true},D12:{babor:true,estribor:true},D13:{babor:true,estribor:true},D14:{babor:true,estribor:true},D15:{babor:true,estribor:true},D16:{babor:true,estribor:true},E01:{babor:true,estribor:true},E02:{babor:true,estribor:true},E03:{babor:true,estribor:true},E04:{babor:true,estribor:true},E05:{babor:true,estribor:true},E06:{babor:true,estribor:true},E07:{babor:true,estribor:true},E08:{babor:true,estribor:true},E09:{babor:true,estribor:true},E10:{babor:true,estribor:true},E11:{babor:true,estribor:true},E12:{babor:true,estribor:true},E13:{babor:true,estribor:true},E14:{babor:true,estribor:true},E15:{babor:true,estribor:true},E16:{babor:true,estribor:true},E17:{babor:true,estribor:true},_meta:{updatedAt:now}})));
t('app: update sobre día completo', assertSucceeds(updateDoc(doc(fs1,'days','2026-11-26'),{D16:{babor:false,estribor:false},_meta:{updatedAt:now}})));
t('[sin validar] valor no bool', assertSucceeds(updateDoc(doc(fs1,'days','2026-11-26'),{D16:{babor:1}})));
t('[sin validar] puesto string', assertSucceeds(updateDoc(doc(fs1,'days','2026-11-26'),{D01:'x'})));
// Ataques
t('borrar día', assertFails(deleteDoc(doc(fs1,'days','2026-11-25'))));
t('campo desconocido', assertFails(updateDoc(doc(fs1,'days','2026-11-25'),{basura:'x'})));
t('puesto inexistente A33', assertFails(updateDoc(doc(fs1,'days','2026-11-25'),{A33:{babor:true}})));
t('[sin validar] valor largo', assertSucceeds(updateDoc(doc(fs1,'days','2026-11-25'),{A20:{babor:'x'.repeat(5000)}})));
t('id de día no fecha', assertFails(setDoc(doc(fs1,'days','hackeo'),{A20:{babor:true}})));
t('_meta gigante', assertFails(updateDoc(doc(fs1,'days','2026-11-25'),{_meta:{updatedAt:'x'.repeat(100)}})));
t('notif texto 501', assertFails(addDoc(collection(fs1,'notifications'),{date:'2026-11-25',text:'x'.repeat(501),createdAt:now})));
t('notif campo extra', assertFails(addDoc(collection(fs1,'notifications'),{date:'2026-11-25',text:'a',createdAt:now,x:1})));
t('notif sin fecha', assertFails(addDoc(collection(fs1,'notifications'),{text:'a',createdAt:now})));
t('otra colección', assertFails(setDoc(doc(fs1,'otra','x'),{a:1})));
t('leer otra colección', assertFails(getDoc(doc(fs1,'otra','x'))));
let ok=0; for (const [n,p] of T){ try{await p; console.log('OK  ',n); ok++;}catch(e){console.log('FAIL',n,e.message.slice(0,150));} }
console.log(ok+'/'+T.length); await env.cleanup(); process.exit(ok===T.length?0:1);
