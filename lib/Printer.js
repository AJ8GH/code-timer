export default class Printer {
  printResults (codeTimer) {
    const { method, arraySize } = codeTimer
    console.log(this._createOutputString(
      method.name, arraySize, codeTimer.runTime()
    ))
  }

  _createOutputString (method, arraySize, runTime) {
    return `#${method}() => Array Size: ${arraySize}, Run Time: ${runTime}`
  }
}
