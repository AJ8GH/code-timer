import sinon from 'sinon'
import Printer from '../lib/Printer.js'

describe('Printer', () => {
  describe('#printResults()', () => {
    beforeEach(() => sinon.stub(console, ['log']))
    afterEach(() => sinon.restore())

    it('outputs all details of the test run to console', () => {
      const printer = new Printer()

      const codeTimer = {
        method: [].reverse,
        size: 5000,
        runTime: () => { return 2 }
      }

      printer.printResults(codeTimer)

      const expectedOutput = '#reverse() => Array Size: 5000, Run Time: 2'

      sinon.assert.calledWith(console.log, expectedOutput)
    })
  })
})
