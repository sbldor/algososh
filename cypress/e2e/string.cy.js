import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('String e2e tests', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/recursion')
  })

  it('button is inactive if the input is empty', () => {
    cy.get('input').clear()
    cy.contains('Развернуть').should('be.disabled')  
  })

  it('reverse algorithm works correctly', () => {
    
    cy.get('input').type('abc')
    cy.contains('Развернуть').click()
    cy.get('[class*=circle_circle]').as('circle')

    cy.get('@circle').should('have.length', 3)
      .each((el, i) => {
        if (i === 0) expect(el).to.contain('a')
        if (i === 1) expect(el).to.contain('b')
        if (i === 2) expect(el).to.contain('c')

        if (i === 0 || i === 2) {
          cy.wrap(el).should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        }
      })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circle').each((el, i) => {
      if (i === 0 || i === 2) {
        cy.wrap(el).should('have.css', 'border', '4px solid rgb(127, 224, 81)')
      }
    })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circle').each((el, i) => {
      if (i === 1) {
        cy.wrap(el).should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        expect(el).to.contain('b')
      }
    })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circle').each((el, i) => {
      if (i === 1) {
        cy.wrap(el).should('have.css', 'border', '4px solid rgb(127, 224, 81)')
        expect(el).to.contain('b')
      }
    })

    cy.get('input').should('have.value', '')
    cy.contains('Развернуть').should('be.disabled')

  })

})