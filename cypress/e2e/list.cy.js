import { SHORT_DELAY_IN_MS, DELAY_IN_MS } from '../../src/constants/delays';
import { baseTestUrl } from './utils.js'

const tIndex = 2

describe('list tests', () => {
  beforeEach(() => {
    cy.visit(`${baseTestUrl}/list`)
  })

  it('buttons is inactive if the input is empty', () => {
    cy.get('input').eq(0).clear()
    cy.get('input').eq(1).clear()
    cy.contains('Добавить в head').should('be.disabled')
    cy.contains('Добавить в tail').should('be.disabled')
    cy.contains('Добавить по индексу').should('be.disabled')
    cy.contains('Удалить по индексу').should('be.disabled')
  })

  it('render default list', () => {
    cy.get('[class*=circle_content]').as('circle')

    cy.get('@circle').each((el, i) => {
      if (i === 0) {
        expect(el).to.contain('0')
        expect(el).to.contain('head')
      }
      if (i === 1) {
        expect(el).to.contain('34')
        expect(el).to.contain('1')
      }
      if (i === 2) {
        expect(el).to.contain('8')
        expect(el).to.contain('2')
      }
      if (i === 3) {
        expect(el).to.contain('1')
        expect(el).to.contain('tail')
        expect(el).to.contain('3')
      }
    })
  })

  it('add item to head and add to tail', () => {
    cy.get('input').eq(0).type('a')
    cy.contains('Добавить в head').click()
    cy.get('input').eq(0).type('b')
    cy.contains('Добавить в tail').click()

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('[class*=circle_content]').each((el, i) => {
      if (i === 0) {
        expect(el).to.contain('0')
        expect(el).to.contain('a')
        expect(el).to.contain('head')
      }

      if (i === 5) {
        expect(el).to.contain('5')
        expect(el).to.contain('b')
        expect(el).to.contain('tail')
      }
    })
  })

  it('delete item from head and from tail', () => {
    cy.contains('Удалить из head').click()
    cy.contains('Удалить из tail').click()

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('[class*=circle_content]').each((el, i) => {
      if (i === 0) {
        expect(el).to.contain('34')
        expect(el).to.contain('0')
        expect(el).to.contain('head')
      }
      if (i === 2) {
        expect(el).not.to.contain('1')
        expect(el).not.to.contain('tail')
      }
    })
  })

  it('add item by index', () => {
    cy.get('input').eq(0).type('a')
    cy.get('input').eq(1).type(tIndex)
    cy.contains('Добавить по индексу').click()

    cy.wait(DELAY_IN_MS * (tIndex + 1))

    cy.get('[class*=circle_content]').each((el, i) => {
      if (i === 1) {
        expect(el).to.contain('34')
        expect(el).to.contain('1')
      }
      if (i === 2) {
        expect(el).to.contain('a')
        expect(el).to.contain('2')
      }
      if (i === 3) {
        expect(el).to.contain('8')
        expect(el).to.contain('3')
      }
    })
  })

  it('delete item by index', () => {
    cy.get('input').eq(1).type(tIndex)
    cy.contains('Удалить по индексу').click()

    cy.wait(DELAY_IN_MS * (tIndex + 1))

    cy.get('[class*=circle_content]').each((el, i) => {
      if (i === 0) {
        expect(el).to.contain('0')
        expect(el).to.contain('head')
      }
      if (i === 1) {
        expect(el).to.contain('34')
        expect(el).to.contain('1')
      }
      if (i === 2) {
        expect(el).to.contain('1')
        expect(el).to.contain('2')
        expect(el).to.contain('tail')
      }
    })
  })
})