import chai, { expect } from 'chai'
import InputGenerator from '../lib/InputGenerator.js'
import spies from 'chai-spies'

chai.use(spies)

describe('InputGenerator()', () => {
  describe('#generate()', () => {
    it('generates an array of its argument length', () => {
      const inputGenerator = new InputGenerator()
      const array = inputGenerator.generate(50000)

      expect(array).to.have.lengthOf(50000)
    })

    it('fills the array', () => {
      const inputGenerator = new InputGenerator()
      const array = inputGenerator.generate(100000)

      expect(array[0]).to.exist
      expect(array[25000]).to.exist
      expect(array[50000]).to.exist
      expect(array[75000]).to.exist
      expect(array[99999]).to.exist
    })

    it('fills the array with random numbers', () => {
      const inputGenerator = new InputGenerator()

      chai.spy.on(Math, ['random'])

      inputGenerator.generate(100000)

      expect(Math.random).to.have.been.called(100000)
    })
  })
})
