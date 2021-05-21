import AlgoTimer from './AlgoTimer.js'

const DEFAULT_RUNS = 20

export default class AlgoRunner {
  constructor () {
    this.algoTimer = new AlgoTimer()
  }

  run (options) {
    options.runs ||= DEFAULT_RUNS
    const inputSample = this._createIntputSample(options)
    inputSample.forEach((arraySize) => {
      this.algoTimer.time(
        { method: options.method, size: arraySize, custom: options.custom }
      )
      this.algoTimer.printResults()
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
