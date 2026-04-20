
export interface RespuestaAPI<T> {
  ok: boolean;
  estado: number;
  mensaje: string;
  datos: T | null;
}
 
// ── Simulated database ────────────────────────────────────────
 
const baseDeDatos: Record<string, unknown> = {
  "/estudiantes/1": {
    id: "EST-001",
    nombre: "Carlos",
    apellido: "García",
    email: "carlos.garcia@universidad.es",
    fechaIngreso: new Date("2023-09-01"),
  },
  "/asignaturas/1": {
    id: "ASG-001",
    nombre: "Matemáticas",
    creditos: 6,
    curso: 1,
  },
};
 
// ── ApiClient class ───────────────────────────────────────────
 
export class ApiClient {
  private readonly baseUrl: string;
  private readonly latencia: number;
 
  constructor(baseUrl: string = "http://localhost:3000", latencia: number = 500) {
    this.baseUrl = baseUrl;
    this.latencia = latencia;
  }
 
  /**
   * Simulates a strongly typed API call using setTimeout.
   * Returns a Promise wrapping a RespuestaAPI<T> object.
   */
  obtenerRecurso<T>(endpoint: string): Promise<RespuestaAPI<T>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const datos = baseDeDatos[endpoint];
 
        if (datos !== undefined) {
          resolve({
            ok: true,
            estado: 200,
            mensaje: `Recurso '${endpoint}' obtenido correctamente.`,
            datos: datos as T,
          });
        } else {
          resolve({
            ok: false,
            estado: 404,
            mensaje: `Recurso '${endpoint}' no encontrado.`,
            datos: null,
          });
        }
      }, this.latencia);
    });
  }
}