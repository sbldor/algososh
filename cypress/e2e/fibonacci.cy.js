import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { baseTestUrl } from './utils.js'

describe('Fibonacci tests', () => {

  beforeEach(() => {
    cy.visit(`${baseTestUrl}/fibonacci`)
  })

  it('button is inactive if the input is empty', () => {
    cy.get('input').clear()
    cy.contains('Рассчитать').should('be.disabled')
  })

  it('fibonacci algorithm works correctly', () => {
    cy.get('input').type('7')
    cy.contains('Рассчитать').click()
    cy.get('[class*=circle_circle]').as('circle')

    cy.get('@circle').should('have.length', 1)
      .each((el, i) => {
        if (i === 0) expect(el).to.contain('1')
      })

    cy.wait(SHORT_DELAY_IN_MS)
    
    cy.get('@circle').should('have.length', 2)
      .each((el, i) => {
        if (i === 1) expect(el).to.contain('1')
      })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circle').should('have.length', 3)
      .each((el, i) => {
        if (i === 2) expect(el).to.contain('2')
      })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circle').should('have.length', 4)
      .each((el, i) => {
        if (i === 3) expect(el).to.contain('3')
      })
    
    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circle').should('have.length', 5)
      .each((el, i) => {
        if (i === 4) expect(el).to.contain('5')
      })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circle').should('have.length', 6)
      .each((el, i) => {
        if (i === 5) expect(el).to.contain('8')
      })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circle').should('have.length', 7)
      .each((el, i) => {
        if (i === 6) expect(el).to.contain('13')
      })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circle').should('have.length', 8)
      .each((el, i) => {
        if (i === 7) expect(el).to.contain('21')
      })

    cy.get('input').clear()
    cy.contains('Рассчитать').should('be.disabled')

  })
})

