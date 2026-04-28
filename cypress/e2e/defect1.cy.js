/// <reference types="cypress" />

describe('PixelsSuite - Defect Reporting Automation Tests', () => {

  // ==========================================================
  // DEFECT 01 - Convert to JPG accepts JPG instead of validation
  // ==========================================================
  it('DF001 - Convert to JPG incorrectly accepts JPG file', () => {

    cy.visit('https://www.pixelssuite.com/convert-to-jpg')

    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.contains(/Convert/i).click()

    // Expected:
    // Should show error -> Already JPG file

    // Actual defect:
    cy.contains('Download', { timeout: 15000 }).should('be.visible')

  })
})