import chai, { expect } from 'chai'
import spies from 'chai-spies'
import sinon from 'sinon'
import CodeTimer from '../lib/CodeTimer.js'

chai.use(spies)

describe('CodeTimer', () => {
  const testFunction = () => {}

  describe('#time()', () => {
    beforeEach(() => sinon.stub(console, ['log']))
    afterEach(() => sinon.restore())

    describe('timing the algorithm', () => {
      it('records the start time', () => {
        const codeTimer = new CodeTimer()
        const startTime = sinon.useFakeTimers(new Date().getTime())

        codeTimer.time({ method: [].sort })

        expect(codeTimer.startTime).to.equal(startTime.now)
      })

      it('records the stop time', () => {
        const codeTimer = new CodeTimer()
        const startTime = sinon.useFakeTimers(new Date().getTime())

        codeTimer.time({ method: [].sort })

        expect(codeTimer.stopTime).to.equal(startTime.now)
      })
    })

    describe('calling the method under test', () => {
      it('calls the method under test', () => {
        const codeTimer = new CodeTimer()
        codeTimer.method = testFunction

        chai.spy.on(codeTimer, ['method'])

        codeTimer.time({ method: codeTimer.method, size: 5000 })

        expect(codeTimer.method).to.have.been.called()
      })

      it('can be called with a arguments', () => {
        const codeTimer = new CodeTimer()
        codeTimer.method = [].push

        chai.spy.on(codeTimer, ['method'])

        codeTimer.time({ method: codeTimer.method, size: 5000, args: [1, 2] })

        expect(codeTimer.method).to.have.been.called.with(1, 2)
      })

      it('calls a custom method when specified in options', () => {
        const codeTimer = new CodeTimer()

        const customMethod = () => { return 'This is a custom method' }
        codeTimer.method = customMethod
        chai.spy.on(codeTimer, ['method', '_runCustomAlgorithm'])

        const options = {
          method: codeTimer.method,
          size: 5000,
          custom: true
        }

        codeTimer.time(options)

        expect(codeTimer.method).to.have.been.called()
        expect(codeTimer._runCustomAlgorithm).to.have.been.called()
      })
    })

    describe('setting up the input arguments', () => {
      it('generates input array by default', () => {
        const codeTimer = new CodeTimer()

        const inputGenerator = { generate: () => {} }
        codeTimer.inputGenerator = inputGenerator
        chai.spy.on(inputGenerator, ['generate'])

        codeTimer.time({ method: testFunction, size: 5000 })

        expect(inputGenerator.generate).to.have.been.called.with(5000)
      })

      it('passes the size as the argument if integer is set to true', () => {
        const codeTimer = new CodeTimer()
        const customMethod = (arg) => { return `called with ${arg}` }

        codeTimer.method = customMethod
        chai.spy.on(codeTimer, ['method'])

        const options = {
          method: codeTimer.method, size: 5000, integer: true, custom: true
        }

        codeTimer.time(options)

        expect(codeTimer.method).to.have.been.called.with(5000)
      })
    })
  })

  describe('#runTime()', () => {
    it('returns the difference between start and stop time', () => {
      const codeTimer = new CodeTimer()

      codeTimer.startTime = 1000
      codeTimer.stopTime = 1500

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

  describe('#stop()', () => {
    it('records the stop time', () => {
      const codeTimer = new CodeTimer()
      const stopTime = sinon.useFakeTimers(new Date().getTime())

      codeTimer.stop()

      expect(codeTimer.stopTime).to.equal(stopTime.now)
    })
  })

  describe('#run()', () => {
    it('calls run on the codeRunner with the correct options', () => {
      const codeTimer = new CodeTimer()
      const codeRunner = { run: () => {} }
      codeTimer.codeRunner = codeRunner
      chai.spy.on(codeRunner, ['run'])

      const options = { method: testFunction, size: 1000, codeTimer: codeTimer }

      codeTimer.run({ method: testFunction, size: 1000 })
      expect(codeTimer.codeRunner.run).to.have.been.called.with(options)
    })
  })
})
