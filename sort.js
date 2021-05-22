import CodeTimer from './lib/CodeTimer.js'

const codeTimer = new CodeTimer()

codeTimer.run({ method: [].sort, size: 1000000 })
