// Modulo 1 — Entry point
console.log("Modulo 1 — TypeScript ready 🚀");


import { calcularMedia, calcularMediana, filtrarAtipicos } from "./math-utils";
 
// ── Test data ────────────────────────────────────────────────
const datos: number[] = [10, 20, 30, 40, 50, 200]; // 200 is an outlier
const datosVacios: number[] = [];
 
// ── calcularMedia ────────────────────────────────────────────
console.log("=== calcularMedia ===");
console.log("Normal array:", calcularMedia(datos));       // ~58.33
console.log("Empty array: ", calcularMedia(datosVacios)); // null
 
// ── calcularMediana ──────────────────────────────────────────
console.log("=== calcularMediana ===");
console.log("Normal array:", calcularMediana(datos));       // 35
console.log("Empty array: ", calcularMediana(datosVacios)); // null
 
// ── filtrarAtipicos ──────────────────────────────────────────
console.log("=== filtrarAtipicos ===");
console.log("Filtered (limit 1):", filtrarAtipicos(datos, 1));       // removes 200
console.log("Empty array:       ", filtrarAtipicos(datosVacios, 1)); // null
 