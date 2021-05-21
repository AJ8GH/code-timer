export default class Printer {
  printResults (codeTimer) {
    const { methodUnderTest, arraySize } = codeTimer
    console.log(this._createOutputString(
      methodUnderTest.name, arraySize, codeTimer.runTime()
    ))
  }

  _createOutputString (method, size, runTime) {
    return `#${method}() => Array Size: ${size}, Run Time: ${runTime}`
  }
}
