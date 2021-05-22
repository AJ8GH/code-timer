const DEFAULT_RUNS = 20
const DEFAULT_SIZE = 1000

export default class CodeRunner {
  run (options) {
    options.runs ||= DEFAULT_RUNS
    options.size ||= DEFAULT_SIZE

    const inputSample = this._createIntputSample(options)
    const { codeTimer } = options

    inputSample.forEach((arraySize) => {
      options.size = arraySize
      codeTimer.time(options)
      codeTimer.printResults()
    })
  }

  _createIntputSample (options) {
    const { size, runs } = options
    const inputSample = []
    for (let i = size; i <= size * runs; i += size) {
      inputSample.push(i)
    }
    inputSample.unshift(size * 0.25, size * 0.5, size * 0.75, size)
    return inputSample
  }
}
