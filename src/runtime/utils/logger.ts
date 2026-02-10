import { createConsola, type ConsolaInstance } from 'consola'

let consola

if (!consola) consola = createConsola({ fancy: true })

export default consola as ConsolaInstance
