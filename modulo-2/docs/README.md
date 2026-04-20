# Modulo 2 — Documentacion del Modelo de Datos usado para el caso de practico de Sistema de Gestion Universitario

# Estructura del Ejercicio

```ts

modulo-2/
└── src/
    ├── domain/
    │   └── types/
    │       ├── estudiante.ts    — Entidad Estudiante
    │       ├── asignatura.ts    — Entidad Asignatura
    │       └── matricula.ts     — Unión discriminada + generarReporte
    |
    ├── services/
    │   └── api-client.ts        — RespuestaAPI<T> + ApiClient  en genérico
    |
    └── index.ts                 — Punto de entrada y pruebas

```


# Concepto

Este módulo modela el núcleo de un sistema de gestión universitaria. Las decisiones de diseño priorizan la seguridad de tipos en tiempo de compilación, la extensibilidad y la legibilidad del código

# Entidades

## Estudiantes

```ts
interface Estudiante {
  readonly id: string;
  nombre: string;
  apellido: string;
  email: string;
  fechaIngreso: Date;
}
```
El campo id se declara como readonly porque un identificador único no debe poder ser reasignado una vez creado el objeto. TypeScript lanzará un error en tiempo de compilación si se intenta modificar este campo, evitando así errores difíciles de detectar en tiempo de ejecución.

## Asignaturas

```ts
interface Asignatura {
  readonly id: string;
  nombre: string;
  creditos: number;
  curso: number;
}
```
Misma decisión respecto a readonly id. Los créditos y el curso se tipan como number para permitir operaciones aritméticas directas sobre ellos, como calcular la carga lectiva total de un estudiante.


# Comparacion entre Type  y Interfaces y el porque de su uso

En TypeScript tanto interface como type permiten personalizar de antemano  la forma de un objeto. Sin embargo, hemos elegido interface para las entidades del dominio (Estudiante, Asignatura) por las siguientes razones:

## Herencia que facilita la extensibilidad

A diferencia de las interfaces , "type" solo permite extensibilidad medainte el uso de "&", lo cual e smenos intuitivo que simplemente usando la keyword "interface"

```ts
interface EstudiantePostgrado extends Estudiante {
  tutorAsignado: string;
  lineaInvestigacion: string;
}
```
## Por convención

Usar interface comunica claramente que estamos definiendo un "contrato"(entendido en el contexto de la programacion) que describe una entidad del mundo real. Es la convención establecida en proyectos TypeScript para modelar datos.

## Use cases limitados para el uso de Type

En el contextod e este ejercicio type es el recurso correcto cuando se trata de combinar diversos tipos diferentes que en su conjunto no represetna la llama "entidad" como es entendida para un interfaz, al permitir la union es el recurso correcto a utilizar al no poder generilizarse como si hace una interfaz, que no puede represetnar una union de tipos/objetos.

```ts
type EstadoMatricula = MatriculaActiva | MatriculaSuspendida | MatriculaFinalizada;
```
# Uso de uniones discriminadas con un discriminante

Uso de tres interfaces exactas pero con un liteal diferente y unico por cada :
```ts
interface MatriculaActiva     { tipo: "ACTIVA";     asignaturas: Asignatura[]; }
interface MatriculaSuspendida { tipo: "SUSPENDIDA"; motivoSuspension: string; }
interface MatriculaFinalizada { tipo: "FINALIZADA"; notaMedia: number; }

type EstadoMatricula = MatriculaActiva | MatriculaSuspendida | MatriculaFinalizada;
```
El "tipo" le permite actuar como un discriminante en el caso de incoporar en el ejemplo(como es nuestro caso) un bloque "swtich2 o un bloque "if" y similares.

```ts
function generarReporte(estado: EstadoMatricula): string {
  switch (estado.tipo) {
    case "ACTIVA":
      // TypeScript sabe que `estado` es MatriculaActiva aquí
      return `Activa con ${estado.asignaturas.length} asignaturas.`;
    case "SUSPENDIDA":
      // TypeScript sabe que `estado` es MatriculaSuspendida aquí
      return `Suspendida. Motivo: ${estado.motivoSuspension}.`;
    case "FINALIZADA":
      // TypeScript sabe que `estado` es MatriculaFinalizada aquí
      return `Finalizada. Nota media: ${estado.notaMedia}.`;
  }
}
```
# El uso de Genericos

## Respuesta de RespuestaAPI<T>
 
 Como se puede ver en el siguiente extracto de codigo :

```ts
interface RespuestaAPI<T> {
  ok: boolean;
  estado: number;
  mensaje: string;
  datos: T | null;
}
```
El parámetro genérico T permite que una única interfaz describa cualquier tipo de respuesta de red, sin duplicar código. Sin genéricos, necesitaríamos una interfaz separada para cada entidad:

En cuanto a la inclusion del generico en los metodos que corresponda se evita escribir ams codigo del necesario como :
```ts
interface RespuestaEstudiante { ok: boolean; datos: Estudiante | null; ... }
interface RespuestaAsignatura { ok: boolean; datos: Asignatura | null; ... }
```
En lugar del mas simple y menos verborreico:

```ts
const respuesta = await cliente.obtenerRecurso<Estudiante>("/estudiantes/1");
```
El método obtenerRecurso<T> aplica el mismo principio: al pasar el tipo como parámetro genérico en la llamada, TypeScript propaga ese tipo a través de toda la cadena de la promesa, garantizando seguridad de tipos de extremo a extremo sin sacrificar reutilización.


