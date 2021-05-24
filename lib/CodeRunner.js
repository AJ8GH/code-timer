const DEFAULT_RUNS = 20
const DEFAULT_SIZE = 1000
const DEFAULT_WARM_UP = 5

export default class CodeRunner {
  run (args) {
    const options = this._createDefaults(args)
    const inputSample = this._createIntputSample(options)

    inputSample.forEach((size) => {
      options.size = size
      options.codeTimer.time(options)
      options.codeTimer.printResults()
    })
  }

  _createDefaults (options) {
    options.runs ||= DEFAULT_RUNS
    options.size ||= DEFAULT_SIZE
    options.warmUp ||= DEFAULT_WARM_UP
    return options
  }

  _createIntputSample (options) {
    const { size, runs, warmUp } = options
    const inputSample = new Array(warmUp).fill(size)
    for (let i = size; i <= size * runs; i += size) { inputSample.push(i) }
    return inputSample
  }
}
