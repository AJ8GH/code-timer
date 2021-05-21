export default class Printer {
  printResults (algoTimer) {
    const { method, arraySize } = algoTimer
    console.log(this._createOutputString(
      method.name, arraySize, algoTimer.runTime()
    ))
  }

  _createOutputString (method, arraySize, runTime) {
    return `#${method}() => Array Size: ${arraySize}, Run Time: ${runTime}`
  }
}
