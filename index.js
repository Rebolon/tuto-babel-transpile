// Don't use dynamic import to get Promise available immediatly
require ('core-js/modules/es6.promise')

// dynamic import from babel
import ('babel-polyfill')

// dynamic import for all required shim and polyfills from core-js
import ('core-js/modules/es6.array.for-each.js')

console.log('start')

const list = [1, 2, 3, 4]
list.forEach(val => console.log(val))

console.log('end')
