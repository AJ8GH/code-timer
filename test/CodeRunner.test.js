import chai, { expect } from 'chai'
import spies from 'chai-spies'
import CodeRunner from '../lib/CodeRunner.js'

chai.use(spies)

describe('CodeRunner', () => {
  describe('#run()', () => {
    it('runs the codeTimer 20 times by default, + 4 control samples', () => {
      const codeRunner = new CodeRunner()
      const testMethod = () => {}
      const codeTimer = { printResults: () => {}, time: () => {} }

      chai.spy.on(codeTimer, ['time'])

      const options = { method: testMethod, size: 1000, codeTimer: codeTimer }
      codeRunner.run(options)

      expect(codeTimer.time).to.have.been.called(24)
    })

    it('runs a different number of times when specified', () => {
      const codeRunner = new CodeRunner()
      const testMethod = () => {}
      const codeTimer = { printResults: () => {}, time: () => {} }

      chai.spy.on(codeTimer, ['time'])

      const options = {
        method: testMethod,
        size: 1000,
        runs: 30,
        codeTimer: codeTimer
      }

      codeRunner.run(options)

      expect(codeTimer.time).to.have.been.called(34)
    })

    it('uses 1000 as default starting size', () => {
      const codeRunner = new CodeRunner()
      const testMethod = () => {}
      const codeTimer = { printResults: () => {}, time: () => {} }

      chai.spy.on(codeTimer, ['time'])

      const options = {
        method: testMethod,
        codeTimer: codeTimer
      }

      codeRunner.run(options)
      options.runs = 20
      options.size = 1000

      expect(codeTimer.time).to.have.been.called.with(options)
    })

    it('prints the results after each run', () => {
      const codeRunner = new CodeRunner()
      const testMethod = () => {}
      const codeTimer = { printResults: () => {}, time: () => {} }

      chai.spy.on(codeTimer, ['printResults'])

      const options = { method: testMethod, size: 1000, codeTimer: codeTimer }
      codeRunner.run(options)

      expect(codeTimer.printResults).to.have.been.called(24)
    })

    it('prints the results', () => {
      const codeRunner = new CodeRunner()
      const testMethod = () => {}
      const codeTimer = { printResults: () => {}, time: () => {} }

      chai.spy.on(codeTimer, ['printResults'])

      const options = { method: testMethod, size: 1000, codeTimer: codeTimer }
      codeRunner.run(options)

      expect(codeTimer.printResults).to.have.been.called(24)
    })
  })
})
