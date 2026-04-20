// Modulo 2 — Entry point
console.log("Modulo 2 — TypeScript ready 🚀");

import { Estudiante } from "./domain/types/estudiante";
import { Asignatura } from "./domain/types/asignatura";
import { EstadoMatricula, generarReporte } from "./domain/types/matricula";
 
// ── Sample Estudiante ────────────────────────────────────────
const estudiante: Estudiante = {
  id: "EST-001",
  nombre: "Carlos",
  apellido: "García",
  email: "carlos.garcia@universidad.es",
  fechaIngreso: new Date("2023-09-01"),
};
 
// ── Sample Asignaturas ───────────────────────────────────────
const asignaturas: Asignatura[] = [
  { id: "ASG-001", nombre: "Matemáticas", creditos: 6, curso: 1 },
  { id: "ASG-002", nombre: "Programación", creditos: 6, curso: 1 },
];
 
// ── Sample EstadoMatricula states ────────────────────────────
const matriculaActiva: EstadoMatricula = {
  tipo: "ACTIVA",
  asignaturas,
};
 
const matriculaSuspendida: EstadoMatricula = {
  tipo: "SUSPENDIDA",
  motivoSuspension: "Falta de pago de tasas universitarias",
};
 
const matriculaFinalizada: EstadoMatricula = {
  tipo: "FINALIZADA",
  notaMedia: 8.75,
};
 
// ── Output ───────────────────────────────────────────────────
console.log("=== Sistema de Gestión Universitaria ===\n");
console.log(`Estudiante: ${estudiante.nombre} ${estudiante.apellido}`);
console.log(`Email: ${estudiante.email}\n`);
 
console.log("=== Reportes de Matrícula ===");
console.log(generarReporte(matriculaActiva));
console.log(generarReporte(matriculaSuspendida));
console.log(generarReporte(matriculaFinalizada));