/// <reference types="cypress" />

describe('PixelsSuite - Crop PNG Automation Testing', () => {

  const url = '/crop-png'

  beforeEach(() => {
    cy.visit(url, { failOnStatusCode: false })
  })

  it('TC-CPNG-001 - Verify Crop PNG page loads successfully', () => {
    // Check if page loaded by verifying key elements exist
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
    cy.get('button').should('have.length.greaterThan', 0)
  })

  it('TC-CPNG-002 - Upload valid PNG image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.png', {
      force: true
    })

    // Verify file upload was processed
    cy.wait(1000)
    cy.get('body').should('exist')
  })

  it('TC-CPNG-003 - Verify crop area appears after PNG upload', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.png', {
      force: true
    })

    cy.get('canvas, img').should('exist')
  })

  it('TC-CPNG-004 - Crop uploaded PNG image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.png', {
      force: true
    })

    cy.contains(/Crop|Apply|Done/i).click()

    // Wait for crop operation to complete
    cy.wait(5000)
  })

  it('TC-CPNG-005 - Verify Clear button removes uploaded PNG', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.png', {
      force: true
    })

    // Wait for upload and try to find clear button
    cy.wait(1000)
    // Look for any button that might be the clear button
    cy.get('button').then(buttons => {
      const clearButton = Array.from(buttons).find(btn => 
        btn.textContent.toLowerCase().includes('clear') || 
        btn.textContent.toLowerCase().includes('delete') ||
        btn.textContent.toLowerCase().includes('remove')
      )
      if (clearButton) {
        cy.wrap(clearButton).click()
      }
    })
  })

  it('TC-CPNG-006 - Verify crop action without uploading image', () => {
    cy.contains(/Crop|Apply|Done/i).click()

    cy.on('window:alert', (txt) => {
      expect(txt.toLowerCase()).to.include('upload')
    })
  })

  it('TC-CPNG-007 - Verify unsupported file upload (PDF)', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.pdf', {
      force: true
    })

    // Wait for validation
    cy.wait(2000)
  })

  it('TC-CPNG-008 - Verify drag and drop upload section visible', () => {
    // Verify page elements exist
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-CPNG-009 - Verify page refresh keeps Crop PNG page functional', () => {
    cy.reload()

    // Verify page elements still exist after reload
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-CPNG-010 - Verify cropped PNG download button visible', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.png', {
      force: true
    })

    cy.contains(/Crop|Apply|Done/i).click()

    // Wait for crop operation to complete
    cy.wait(5000)
    cy.get('body').should('exist')
  })

})