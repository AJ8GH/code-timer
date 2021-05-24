import CodeTimer, { InputGenerator } from './index.js'

const ct = new CodeTimer()
const ig = new InputGenerator()

// ct.run({ method: [].sort, size: 1000000, warmUp: 15 })

ct.start()
ig.generate(40000000)
ct.stop()
console.log(ct.runTime())
