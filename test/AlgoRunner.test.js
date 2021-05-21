import chai, { expect } from 'chai'
import spies from 'chai-spies'
import AlgoRunner from '../lib/AlgoRunner.js'

chai.use(spies)

describe('AlgoRunner', () => {
  describe('#run()', () => {
    it('runs the codeTimer 20 times + 4 control samples by default', () => {
      const algoRunner = new AlgoRunner()
      const testMethod = () => {}
      const codeTimer = { printResults: () => {}, time: () => {} }

      chai.spy.on(codeTimer, ['time'])
      algoRunner.codeTimer = codeTimer

      const options = { method: testMethod, size: 1000 }
      algoRunner.run(options)

      expect(codeTimer.time).to.have.been.called(24)
    })

    it('runs a different number of times when specified + 4 control samples', () => {
      const algoRunner = new AlgoRunner()
      const testMethod = () => {}
      const codeTimer = { printResults: () => {}, time: () => {} }

      chai.spy.on(codeTimer, ['time'])
      algoRunner.codeTimer = codeTimer

      const options = { method: testMethod, size: 1000, runs: 30 }
      algoRunner.run(options)

      expect(codeTimer.time).to.have.been.called(34)
    })

    it('prints the results', () => {
      const algoRunner = new AlgoRunner()
      const testMethod = () => {}
      const codeTimer = { printResults: () => {}, time: () => {} }
      algoRunner.codeTimer = codeTimer

      chai.spy.on(codeTimer, ['printResults'])

      const options = { method: testMethod, size: 1000 }
      algoRunner.run(options)

      expect(codeTimer.printResults).to.have.been.called(24)
    })
  })
})
