import { Asignatura } from "./asignatura";
 
// ── Discriminated Union interfaces ───────────────────────────
 
export interface MatriculaActiva {
  tipo: "ACTIVA";
  asignaturas: Asignatura[];
}
 
export interface MatriculaSuspendida {
  tipo: "SUSPENDIDA";
  motivoSuspension: string;
}
 
export interface MatriculaFinalizada {
  tipo: "FINALIZADA";
  notaMedia: number;
}
 
// ── Discriminated Union type ─────────────────────────────────
 
export type EstadoMatricula =
  | MatriculaActiva
  | MatriculaSuspendida
  | MatriculaFinalizada;
 
// ── generarReporte ───────────────────────────────────────────
 
export function generarReporte(estado: EstadoMatricula): string {
  switch (estado.tipo) {
    case "ACTIVA":
      return `Matrícula activa con ${estado.asignaturas.length} asignatura(s): ${estado.asignaturas
        .map((a) => a.nombre)
        .join(", ")}.`;
 
    case "SUSPENDIDA":
      return `Matrícula suspendida. Motivo: ${estado.motivoSuspension}.`;
 
    case "FINALIZADA":
      return `Matrícula finalizada. Nota media: ${estado.notaMedia.toFixed(2)}.`;
  }
}