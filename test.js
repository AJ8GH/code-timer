import CodeTimer from './index.js'

const ct = new CodeTimer()

ct.time({ method: [].sort, size: 10000 })
