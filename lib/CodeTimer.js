import CodeRunner from './CodeRunner.js'
import InputGenerator from './InputGenerator.js'
import Printer from './Printer.js'

export default class CodeTimer {
  constructor () {
    this.method = null
    this.arraySize = null
    this.startTime = null
    this.finishTime = null
    this.inputGenerator = new InputGenerator()
    this.printer = new Printer()
    this.codeRunner = new CodeRunner()
  }

  time (options) {
    const inputArray = this._createInputArray(options.size)
    this.method = options.method

    options.custom
      ? this._runCustomAlgorithm(inputArray)
      : this._runAlgorithm(inputArray, options.arg)

    return this.runTime()
  }

  run (options) {
    options.codeTimer = this
    this.codeRunner.run(options)
  }

  start () {
    this.startTime = new Date().getTime()
  }

  finish () {
    this.finishTime = new Date().getTime()
  }

  runTime () {
    return this.finishTime - this.startTime
  }

  printResults () {
    this.printer.printResults(this)
  }

  _runAlgorithm (inputArray, arg) {
    this.start()
    this.method.call(inputArray, arg)
    this.finish()
  }

  _runCustomAlgorithm (inputArray) {
    this.start()
    this.method(inputArray)
    this.finish()
  }

  _createInputArray (arraySize) {
    this.arraySize = arraySize
    return this.inputGenerator.generate(arraySize)
  }
}
