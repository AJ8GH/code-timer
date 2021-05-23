import CodeTimer from './index.js'

const ct = new CodeTimer()

ct.run({ method: [].sort, size: 1000000, warmUp: 15 })
