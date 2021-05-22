const DEFAULT_RUNS = 20

export default class CodeRunner {
  run (options) {
    options.runs ||= DEFAULT_RUNS

    const { codeTimer, method, custom } = options
    const inputSample = this._createIntputSample(options)

    inputSample.forEach((arraySize) => {
      codeTimer.time({ method: method, size: arraySize, custom: custom })
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
