export default class Printer {
  printResults (codeTimer) {
    const { method, size } = codeTimer
    console.log(this._createOutputString(
      method.name, size, codeTimer.runTime()
    ))
  }

  _createOutputString (method, size, runTime) {
    return `#${method}() => Array Size: ${size}, Run Time: ${runTime}`
  }
}
