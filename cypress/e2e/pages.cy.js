import { baseTestUrl } from './utils.js'

describe('Pages availability tests', () => {

  it('open main page', () => {
    cy.visit(baseTestUrl)
  })

  beforeEach(() => {
    cy.visit(baseTestUrl)
  })

  it('recursion page', () => {
    cy.get('a[href*="recursion"]').click()
    cy.contains('Строка')
  })

  it('fibonacci page', () => {
    cy.get('a[href*="fibonacci"]').click()
    cy.contains('Последовательность Фибоначчи')
  })

  it('sorting page', () => {
    cy.get('a[href*="sorting"]').click()
    cy.contains('Сортировка массива')
  })

  it('stack page', () => {
    cy.get('a[href*="stack"]').click()
    cy.contains('Стек')
  })

  it('queue page', () => {
    cy.get('a[href*="queue"]').click()
    cy.contains('Очередь')
  })

  it('list page', () => {
    cy.get('a[href*="list"]').click()
    cy.contains('Связный список')
  })
})
