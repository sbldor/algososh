import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { checkDefaultCircleStyles, checkChangingCircleStyles } from './utils.js'; 

describe('stack tests', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/stack')
  })

  

  it('buttons is inactive if the input is empty', () => {
    cy.get('input').clear()
    cy.contains('Добавить').should('be.disabled')
    cy.contains('Очистить').should('be.disabled')
    cy.contains('Удалить').should('be.disabled')
  })

  it('add items to stack', () => {
    cy.get('input').as('input')
    cy.contains('Добавить').as('submit')

    cy.get('@input').type('123')
    cy.get('@submit').click()
    cy.get('[class*=circle_content]').as('circle')

    cy.get('@circle').should('have.length', 1)
      .each(el => {
        expect(el).to.contain('123')
        checkChangingCircleStyles(el)
      })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circle').should('have.length', 1)
      .each(el => {
        expect(el).to.contain('123')
        expect(el).to.contain('0')
        expect(el).to.contain('top')
        checkDefaultCircleStyles(el)
      })
    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@input').type('456')
    cy.get('@submit').click()

    cy.get('@circle').should('have.length', 2)
      .each((el, i) => {
        if (i === 0) {
          expect(el).to.contain('123')
          expect(el).to.contain('0')
          checkDefaultCircleStyles(el)
        }
        if (i === 1) {
          expect(el).to.contain('456')
          expect(el).to.contain('1')
          expect(el).to.contain('top')
          checkChangingCircleStyles(el)
        }
      })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circle').should('have.length', 2)
      .each((el, i) => {
        if (i === 0) {
          expect(el).to.contain('123')
          expect(el).to.contain('0')
          checkDefaultCircleStyles(el)
        }
        if (i === 1) {
          expect(el).to.contain('456')
          expect(el).to.contain('1')
          expect(el).to.contain('top')
          checkDefaultCircleStyles(el)
        }
      })

    cy.get('@submit').should('be.disabled')
    cy.contains('Удалить').should('not.be.disabled')
    cy.contains('Очистить').should('not.be.disabled')

  })

  it('deleting items from stack', () => {
    cy.get('input').as('input')
    cy.contains('Добавить').as('submit')
    cy.contains('Удалить').as('delete')
    
    cy.get('@input').type('123')
    cy.get('@submit').click()
    cy.get('@input').type('456')
    cy.get('@submit').click()

    cy.get('[class*=circle_content]').as('circle')
    
    cy.get('@circle')
      .should('have.length', 2)
      .each((el, i) => {
        if (i === 0) {
          expect(el).to.contain('123')
          expect(el).to.contain('0')
          checkDefaultCircleStyles(el)
        }

        if (i === 1) {
          expect(el).to.contain('456')
          expect(el).to.contain('top')
          expect(el).to.contain('1')
          checkChangingCircleStyles(el)
        }
      })

    cy.get('@delete').click()

    cy.get('@circle')
      .should('have.length', 2)
      .each((el, i) => {
        if (i === 0) {
          expect(el).to.contain('123')
          expect(el).to.contain('0')
          checkDefaultCircleStyles(el)
        }

        if (i === 1) {
          expect(el).to.contain('456')
          expect(el).to.contain('top')
          expect(el).to.contain('1')
          checkChangingCircleStyles(el)
        }
      })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circle')
      .should('have.length', 1)
      .each(el => {
        expect(el).to.contain('123')
        expect(el).to.contain('0')
        expect(el).to.contain('top')
        checkDefaultCircleStyles(el)
      })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@delete').click()
    cy.get('@circle').should('have.length', 0)

    cy.get('@submit').should('be.disabled')
    cy.get('@delete').should('be.disabled')
    cy.contains('Очистить').should('be.disabled')
  })

  it('clear items from stack', () => {
    cy.get('input').clear()
    cy.contains('Добавить').as('submit')
    cy.contains('Удалить').as('delete')
    cy.contains('Очистить').as('clear')

    cy.get('input').type('123')
    cy.get('@submit').click()
    cy.get('input').type('456')
    cy.get('@submit').click()

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@clear').click()
    cy.get('[class*=circle_content]').should('have.length', 0)

    cy.get('@submit').should('be.disabled')
    cy.get('@delete').should('be.disabled')
    cy.get('@clear').should('be.disabled')

  })

})