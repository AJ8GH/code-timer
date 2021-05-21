import chai, { expect } from 'chai'
import spies from 'chai-spies'
import sinon from 'sinon'
import AlgoTimer from '../lib/AlgoTimer.js'

chai.use(spies)

describe('AlgoTimer', () => {
  describe('#time()', () => {
    const testFunction = () => {}

    beforeEach(() => sinon.stub(console, ['log']))
    afterEach(() => sinon.restore())

    describe('timing the algorithm', () => {
      it('records the start time', () => {
        const algoTimer = new AlgoTimer()
        const startTime = sinon.useFakeTimers(new Date().getTime())

        algoTimer.time({ method: testFunction })

        expect(algoTimer.startTime).to.equal(startTime.now)
      })

      it('records the finish time', () => {
        const algoTimer = new AlgoTimer()
        const startTime = sinon.useFakeTimers(new Date().getTime())

        algoTimer.time({ method: testFunction })

        expect(algoTimer.finishTime).to.equal(startTime.now)
      })
    })

    describe('calling the method under test', () => {
      it('Calls the method under test', () => {
        const algoTimer = new AlgoTimer()
        algoTimer.method = testFunction

        chai.spy.on(algoTimer, ['method'])

        algoTimer.time({ method: algoTimer.method, size: 5000 })

        expect(algoTimer.method).to.have.been.called()
      })

      it('calls a custom method when specified in options', () => {
        const algoTimer = new AlgoTimer()

        const customMethod = () => { return 'This is a custom method' }
        algoTimer.method = customMethod
        chai.spy.on(algoTimer, ['method', '_runCustomAlgorithm'])

        const options = {
          method: algoTimer.method,
          size: 5000,
          custom: true
        }

        algoTimer.time(options)

        expect(algoTimer.method).to.have.been.called()
        expect(algoTimer._runCustomAlgorithm).to.have.been.called()
      })
    })

    describe('setup and output', () => {
      it('generates input array', () => {
        const algoTimer = new AlgoTimer()

        const inputGenerator = { generate: () => {} }
        algoTimer.inputGenerator = inputGenerator
        chai.spy.on(inputGenerator, ['generate'])

        algoTimer.time({ method: testFunction, size: 5000 })

        expect(inputGenerator.generate).to.have.been.called.with(5000)
      })
    })
  })

  describe('#runTime()', () => {
    it('returns the difference between start and finish time', () => {
      const algoTimer = new AlgoTimer()

      algoTimer.startTime = 1000
      algoTimer.finishTime = 1500

      expect(algoTimer.runTime()).to.equal(500)
    })
  })

  describe('#printResults()', () => {
    it('calls print on printer', () => {
      const algoTimer = new AlgoTimer()
      algoTimer.printer = { print: () => {} }
      chai.spy.on(algoTimer.printer, ['printResults'])

      algoTimer.printResults()

      expect(algoTimer.printer.printResults).to.have.been.called.with(algoTimer)
    })
  })

  describe('#start()', () => {
    it('records the start time', () => {
      const algoTimer = new AlgoTimer()
      const startTime = sinon.useFakeTimers(new Date().getTime())

      algoTimer.start()

      expect(algoTimer.startTime).to.equal(startTime.now)
    })
  })

  describe('#finish()', () => {
    it('records the start time', () => {
      const algoTimer = new AlgoTimer()
      const finishTime = sinon.useFakeTimers(new Date().getTime())

      algoTimer.finish()

      expect(algoTimer.finishTime).to.equal(finishTime.now)
    })
  })
})
