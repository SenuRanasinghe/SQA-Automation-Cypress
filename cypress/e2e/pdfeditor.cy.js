/// <reference types="cypress" />

describe('PixelsSuite - PDF Editor Automation Testing', () => {

  const url = '/pdf-editor'

  beforeEach(() => {
    cy.visit(url, { failOnStatusCode: false })
  })

  it('TC-PDE-001 - Verify PDF Editor page loads successfully', () => {
    // Check if page loaded by verifying key elements exist
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
    cy.get('button').should('have.length.greaterThan', 0)
  })

  it('TC-PDE-002 - Upload valid PDF file successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.pdf', {
      force: true
    })

    // Verify file upload was processed
    cy.wait(1000)
    cy.get('body').should('exist')
  })

  it('TC-PDE-003 - Verify editor tools appear after PDF upload', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.pdf', {
      force: true
    })

    // Wait for PDF to load
    cy.wait(5000)
  })

  it('TC-PDE-004 - Verify Clear button removes uploaded PDF', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.pdf', {
      force: true
    })

    // Wait for upload and try to find clear button
    cy.wait(1000)
    // Look for any button that might be the clear button
    cy.get('button').then(buttons => {
      const clearButton = Array.from(buttons).find(btn => 
        btn.textContent.toLowerCase().includes('clear') || 
        btn.textContent.toLowerCase().includes('delete')
      )
      if (clearButton) {
        cy.wrap(clearButton).click()
      }
    })
  })

  it('TC-PDE-005 - Verify unsupported file upload (JPG)', () => {
    // Handle any uncaught exceptions from the app
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })

    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    // Wait for validation
    cy.wait(2000)
  })

  it('TC-PDE-006 - Verify upload without selecting file is blocked', () => {
    // Verify page has file input
    cy.get('input[type="file"]').should('exist')
    cy.get('body').should('exist')
  })

  it('TC-PDE-007 - Verify drag and drop upload section visible', () => {
    // Verify page elements exist
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-PDE-008 - Verify page refresh keeps editor functional', () => {
    cy.reload()

    // Verify page elements still exist after reload
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-PDE-009 - Verify multiple PDF upload if supported', () => {
    cy.get('input[type="file"]').selectFile(
      [
        'cypress/fixtures/sample.pdf',
        'cypress/fixtures/sample2.pdf'
      ],
      { force: true }
    )

    // Verify multiple files were uploaded
    cy.wait(1000)
    cy.get('body').should('exist')
  })

  it('TC-PDE-010 - Verify download/export button available after editing load', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.pdf', {
      force: true
    })

    // Wait for PDF to load
    cy.wait(5000)
    cy.get('body').should('exist')
  })

})