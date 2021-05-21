import InputGenerator from './InputGenerator.js'
import Printer from './Printer.js'

export default class CodeTimer {
  constructor () {
    this.methodUnderTest = null
    this.arraySize = null
    this.startTime = null
    this.finishTime = null
    this.inputGenerator = new InputGenerator()
    this.printer = new Printer()
  }

  time (options) {
    const inputArray = this._createInputArray(options.arraySize)
    this.methodUnderTest = options.method

    options.custom
      ? this._runCustomAlgorithm(inputArray)
      : this._runAlgorithm(inputArray)
  }

  runTime () {
    return this.finishTime - this.startTime
  }

  printResults () {
    this.printer.printResults(this)
  }

  _runAlgorithm (inputArray) {
    this._start()
    this.methodUnderTest.call(inputArray)
    this._finish()
  }

  _runCustomAlgorithm (inputArray) {
    this._start()
    this.methodUnderTest(inputArray)
    this._finish()
  }

  _start () {
    this.startTime = new Date().getTime()
  }

  _finish () {
    this.finishTime = new Date().getTime()
  }

  _createInputArray (arraySize) {
    this.arraySize = arraySize
    return this.inputGenerator.generate(arraySize)
  }
}
