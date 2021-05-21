import chai, { expect } from 'chai'
import spies from 'chai-spies'
import sinon from 'sinon'
import CodeTimer from '../lib/CodeTimer.js'

chai.use(spies)

describe('CodeTimer', () => {
  describe('#time()', () => {
    const testFunction = () => {}

    beforeEach(() => sinon.stub(console, ['log']))
    afterEach(() => sinon.restore())

    describe('timing the algorithm', () => {
      it('records the start time', () => {
        const codeTimer = new CodeTimer()
        const startTime = sinon.useFakeTimers(new Date().getTime())

        codeTimer.time({ method: testFunction })

        expect(codeTimer.startTime).to.equal(startTime.now)
      })

      it('records the finish time', () => {
        const codeTimer = new CodeTimer()
        const startTime = sinon.useFakeTimers(new Date().getTime())

        codeTimer.time({ method: testFunction })

        expect(codeTimer.finishTime).to.equal(startTime.now)
      })
    })

    describe('calling the method under test', () => {
      it('Calls the method under test', () => {
        const codeTimer = new CodeTimer()
        codeTimer.methodUnderTest = testFunction

        chai.spy.on(codeTimer, ['methodUnderTest'])

        codeTimer.time({ method: codeTimer.methodUnderTest, arraySize: 5000 })

        expect(codeTimer.methodUnderTest).to.have.been.called()
      })

      it('calls a custom method when specified in options', () => {
        const codeTimer = new CodeTimer()

        const customMethod = () => { return 'This is a custom method' }
        codeTimer.methodUnderTest = customMethod
        chai.spy.on(codeTimer, ['methodUnderTest', '_runCustomAlgorithm'])

        const options = {
          method: codeTimer.methodUnderTest,
          arraySize: 5000,
          custom: true
        }

        codeTimer.time(options)

        expect(codeTimer.methodUnderTest).to.have.been.called()
        expect(codeTimer._runCustomAlgorithm).to.have.been.called()
      })
    })

    describe('setup and output', () => {
      it('generates input array', () => {
        const codeTimer = new CodeTimer()

        const inputGenerator = { generate: () => {} }
        codeTimer.inputGenerator = inputGenerator
        chai.spy.on(inputGenerator, ['generate'])

        codeTimer.time({ method: testFunction, arraySize: 5000 })

        expect(inputGenerator.generate).to.have.been.called.with(5000)
      })
    })
  })

  describe('#runTime()', () => {
    it('returns the difference between start and finish time', () => {
      const codeTimer = new CodeTimer()

      codeTimer.startTime = 1000
      codeTimer.finishTime = 1500

      expect(codeTimer.runTime()).to.equal(500)
    })
  })

  describe('#printResults()', () => {
    it('calls print on printer', () => {
      const codeTimer = new CodeTimer()
      codeTimer.printer = { print: () => {} }
      chai.spy.on(codeTimer.printer, ['printResults'])

      codeTimer.printResults()

      expect(codeTimer.printer.printResults).to.have.been.called.with(codeTimer)
    })
  })

  describe('#start()', () => {
    it('records the start time', () => {
      const codeTimer = new CodeTimer()
      const startTime = sinon.useFakeTimers(new Date().getTime())

      codeTimer.start()

      expect(codeTimer.startTime).to.equal(startTime.now)
    })
  })
})
