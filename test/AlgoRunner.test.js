import chai, { expect } from 'chai'
import spies from 'chai-spies'
import AlgoRunner from '../lib/AlgoRunner.js'

chai.use(spies)

describe('AlgoRunner', () => {
  describe('#run()', () => {
    it('runs the algoTimer 20 times + 4 control samples by default', () => {
      const algoRunner = new AlgoRunner()
      const testMethod = () => {}
      const algoTimer = { printResults: () => {}, time: () => {} }

      chai.spy.on(algoTimer, ['time'])
      algoRunner.algoTimer = algoTimer

      const options = { method: testMethod, size: 1000 }
      algoRunner.run(options)

      expect(algoTimer.time).to.have.been.called(24)
    })

    it('runs a different number of times when specified + 4 control samples', () => {
      const algoRunner = new AlgoRunner()
      const testMethod = () => {}
      const algoTimer = { printResults: () => {}, time: () => {} }

      chai.spy.on(algoTimer, ['time'])
      algoRunner.algoTimer = algoTimer

      const options = { method: testMethod, size: 1000, runs: 30 }
      algoRunner.run(options)

      expect(algoTimer.time).to.have.been.called(34)
    })

    it('prints the results', () => {
      const algoRunner = new AlgoRunner()
      const testMethod = () => {}
      const algoTimer = { printResults: () => {}, time: () => {} }
      algoRunner.algoTimer = algoTimer

      chai.spy.on(algoTimer, ['printResults'])

      const options = { method: testMethod, size: 1000 }
      algoRunner.run(options)

      expect(algoTimer.printResults).to.have.been.called(24)
    })
  })
})
