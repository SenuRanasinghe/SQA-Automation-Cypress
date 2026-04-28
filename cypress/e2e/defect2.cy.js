/// <reference types="cypress" />

describe('PixelsSuite - Defect Reporting Automation Tests', () => {
// ==========================================================
  // DEFECT 02 - Format change does not reset uploaded file
  // ==========================================================
  it('DF002 - Uploaded image remains after changing converter format', () => {

    cy.visit('https://www.pixelssuite.com/convert-to-png')

    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.png', {
      force: true
    })

    cy.contains('sample.png').should('exist')

    // Change page manually to another converter
    cy.visit('https://www.pixelssuite.com/convert-to-webp')

    // Expected:
    // Previous file should reset / clear

    // Actual defect:
    cy.contains('sample.png').should('exist')

  })

})