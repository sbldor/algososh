import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { baseTestUrl, checkDefaultCircleStyles, checkChangingCircleStyles } from './utils';

describe('Queue tests', () => {

  beforeEach(() => {
    cy.visit(`${baseTestUrl}/queue`)
  })

  it('submit button is inactive if the input is empty', () => {
    cy.get('input').clear()
    cy.contains('Добавить').should('be.disabled')
  })

  it('add item in queue', () => {
    cy.get('input').as('input')
    cy.contains('Добавить').as('submit')

    cy.get('@input').type('a')
    cy.get('@submit').click()
    cy.get('[class*=circle_content]').as('circle')

    cy.get('@circle').each((el, i) => {
      if (i === 0) {
        expect(el).to.contain('a')
        expect(el).to.contain('head')
        expect(el).to.contain('tail')
        expect(el).to.contain('0')
        checkChangingCircleStyles(el)
      }
    })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circle').each((el, i) => {
      if (i === 0) {
        checkDefaultCircleStyles(el)
      }
    })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@input').type('b')
    cy.get('@submit').click()

    cy.get('@circle').each((el, i) => {
      if (i === 0) {
        expect(el).to.contain('a')
        expect(el).to.contain('head')
        checkDefaultCircleStyles(el)
      }
      if (i === 1) {
        expect(el).to.contain('b')
        expect(el).to.contain('tail')
        checkChangingCircleStyles(el)
      }
    })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circle').each((el, i) => {
      if (i === 0) {
        expect(el).to.contain('a')
        expect(el).to.contain('head')
        checkDefaultCircleStyles(el)
      }
      if (i === 1) {
        expect(el).to.contain('b')
        expect(el).to.contain('tail')
        checkDefaultCircleStyles(el)
      }
    })

    cy.get('@submit').should('be.disabled')
    cy.contains('Удалить').should('not.be.disabled')
    cy.contains('Очистить').should('not.be.disabled')
  })

  it('delet item from queue', () => {
    cy.get('input').as('input')
    cy.contains('Добавить').as('submit')
    cy.contains('Удалить').as('delete')
    cy.contains('Очистить').as('clear')

    cy.get('@input').type('a')
    cy.get('@submit').click()
    cy.get('@input').type('b')
    cy.get('@submit').click()
    cy.get('[class*=circle_content]').as('circle')

    cy.get('@delete').click()
    

    cy.get('@circle').each((el, i) => {
      if (i === 0) {
        expect(el).to.contain('')
      }

      if (i === 1) {
        expect(el).to.contain('b')
        expect(el).to.contain('tail')
      }
    })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@delete').click()

    cy.get('@circle').each(el => expect(el).to.contain(''))
    cy.get('@submit').should('be.disabled')
    cy.get('@delete').should('be.disabled')
    cy.get('@clear').should('be.disabled')
  })

  it('clear items from queue', () => {
    cy.get('input').as('input')
    cy.contains('Добавить').as('submit')
    cy.contains('Удалить').as('delete')
    cy.contains('Очистить').as('clear')

    cy.get('@input').type('a')
    cy.get('@submit').click()
    cy.get('@input').type('b')
    cy.get('@submit').click()

    cy.get('@clear').click()

    cy.get('[class*=circle_content]').each(el => expect(el).to.contain(''))
    cy.get('@submit').should('be.disabled')
    cy.get('@delete').should('be.disabled')
    cy.get('@clear').should('be.disabled')
  })
})


