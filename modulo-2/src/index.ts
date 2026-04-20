// Modulo 2 — Entry point
console.log("Modulo 2 — TypeScript ready 🚀");

import { Estudiante } from "./domain/types/estudiante";
import { Asignatura } from "./domain/types/asignatura";
import { EstadoMatricula, generarReporte } from "./domain/types/matricula";
import { ApiClient } from "./services/api-client";
 
// ── Existing Modulo 2 tests ──────────────────────────────────
 
const estudiante: Estudiante = {
  id: "EST-001",
  nombre: "Carlos",
  apellido: "García",
  email: "carlos.garcia@universidad.es",
  fechaIngreso: new Date("2023-09-01"),
};
 
const asignaturas: Asignatura[] = [
  { id: "ASG-001", nombre: "Matemáticas", creditos: 6, curso: 1 },
  { id: "ASG-002", nombre: "Programación", creditos: 6, curso: 1 },
];
 
const matriculaActiva: EstadoMatricula = { tipo: "ACTIVA", asignaturas };
const matriculaSuspendida: EstadoMatricula = {
  tipo: "SUSPENDIDA",
  motivoSuspension: "Falta de pago de tasas universitarias",
};
const matriculaFinalizada: EstadoMatricula = { tipo: "FINALIZADA", notaMedia: 8.75 };
 
console.log("=== Sistema de Gestión Universitaria ===\n");
console.log(`Estudiante: ${estudiante.nombre} ${estudiante.apellido}`);
console.log(`Email: ${estudiante.email}\n`);
console.log("=== Reportes de Matrícula ===");
console.log(generarReporte(matriculaActiva));
console.log(generarReporte(matriculaSuspendida));
console.log(generarReporte(matriculaFinalizada));
 
// ── ApiClient tests ──────────────────────────────────────────
 
const cliente = new ApiClient();
 
async function main() {
  console.log("=== ApiClient ===");
 
  // Successful request — typed as Estudiante
  const respuestaEstudiante = await cliente.obtenerRecurso<Estudiante>("/estudiantes/1");
  console.log("GET /estudiantes/1");
  console.log(`ok: ${respuestaEstudiante.ok} | estado: ${respuestaEstudiante.estado}`);
  console.log(`mensaje: ${respuestaEstudiante.mensaje}`);
  console.log("datos:", respuestaEstudiante.datos);
 
  // Successful request — typed as Asignatura
  const respuestaAsignatura = await cliente.obtenerRecurso<Asignatura>("/asignaturas/1");
  console.log("GET /asignaturas/1");
  console.log(`ok: ${respuestaAsignatura.ok} | estado: ${respuestaAsignatura.estado}`);
  console.log(`mensaje: ${respuestaAsignatura.mensaje}`);
  console.log("datos:", respuestaAsignatura.datos);
 
  // Failed request — endpoint does not exist
  const respuestaNoEncontrada = await cliente.obtenerRecurso<Estudiante>("/estudiantes/99");
  console.log("GET /estudiantes/99");
  console.log(`ok: ${respuestaNoEncontrada.ok} | estado: ${respuestaNoEncontrada.estado}`);
  console.log(`mensaje: ${respuestaNoEncontrada.mensaje}`);
  console.log("datos:", respuestaNoEncontrada.datos);
}
 
main();