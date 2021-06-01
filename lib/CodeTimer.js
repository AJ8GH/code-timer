import CodeRunner from './CodeRunner.js'
import InputGenerator from './InputGenerator.js'
import Printer from './Printer.js'

export default class CodeTimer {
  constructor () {
    this.method = null
    this.inputSize = null
    this.startTime = null
    this.stopTime = null
    this.inputGenerator = new InputGenerator()
    this.printer = new Printer()
    this.codeRunner = new CodeRunner()
  }

  time (options) {
    const { method, custom, args } = options
    const input = this._createInput(options)
    this.method = method
    custom ? this._runCustomAlgorithm(input) : this._runAlgorithm(input, args)
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

  _runAlgorithm (input, args = []) {
    this.start()
    this.method.call(input, ...args)
    this.stop()
  }

  _runCustomAlgorithm (input) {
    this.start()
    this.method(input)
    this.stop()
  }

  _createInput (options) {
    const { size, integer } = options
    this.inputSize = size
    return integer ? size : this.inputGenerator.generate(size)
  }
}
