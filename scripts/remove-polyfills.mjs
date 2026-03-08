import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const polyfillPath = resolve(__dirname, '../node_modules/next/dist/build/polyfills/polyfill-module.js')

writeFileSync(polyfillPath, '// polyfills removed — modern browsers only\n')
