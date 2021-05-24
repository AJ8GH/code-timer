const DEFAULT_SIZE = 1000

export default class InputGenerator {
  generate (size = DEFAULT_SIZE) {
    const inputArray = new Array(size).fill()
    return this._fillArray(inputArray)
  }

  _fillArray (inputArray) {
    return inputArray.map(() => this._generateRandomNumber())
  }

  _generateRandomNumber () {
    return parseInt(Math.random() * 100)
  }
}
