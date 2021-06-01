export default class Printer {
  printResults (codeTimer) {
    const { method, inputSize } = codeTimer
    console.log(this._createOutputString(
      method.name, inputSize, codeTimer.runTime()
    ))
  }

  _createOutputString (method, inputSize, runTime) {
    return `#${method}() => Input size: ${inputSize}, Run time: ${runTime}`
  }
}
