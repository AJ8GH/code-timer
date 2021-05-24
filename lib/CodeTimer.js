import CodeRunner from './CodeRunner.js'
import InputGenerator from './InputGenerator.js'
import Printer from './Printer.js'

export default class CodeTimer {
  constructor () {
    this.method = null
    this.arraySize = null
    this.startTime = null
    this.stopTime = null
    this.inputGenerator = new InputGenerator()
    this.printer = new Printer()
    this.codeRunner = new CodeRunner()
  }

  time (options) {
    const inputArray = this._createInputArray(options.size)
    this.method = options.method

    options.custom
      ? this._runCustomAlgorithm(inputArray)
      : this._runAlgorithm(inputArray, options.args)

    return this.runTime()
  }

  run (options) {
    options.codeTimer = this
    this.codeRunner.run(options)
  }

  start () {
    this.startTime = new Date().getTime()
  }

  stop () {
    this.stopTime = new Date().getTime()
  }

  runTime () {
    return this.stopTime - this.startTime
  }

  printResults () {
    this.printer.printResults(this)
  }

  _runAlgorithm (inputArray, args) {
    args ||= []

    this.start()
    this.method.call(inputArray, ...args)
    this.stop()
  }

  _runCustomAlgorithm (inputArray) {
    this.start()
    this.method(inputArray)
    this.stop()
  }

  _createInputArray (arraySize) {
    this.arraySize = arraySize
    return this.inputGenerator.generate(arraySize)
  }
}
