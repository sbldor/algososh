export const checkDefaultCircleStyles = (el) => {
  cy.get(el).find('[class*=circle_circle]')
    .should('have.css', 'border', '4px solid rgb(0, 50, 255)')
}

export const checkChangingCircleStyles = (el) => {
  cy.get(el).find('[class*=circle_circle]').
    should('have.css', 'border', '4px solid rgb(210, 82, 225)')
}