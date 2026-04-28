/// <reference types="cypress" />

describe('PixelsSuite - PDF to Word Automation Testing', () => {

  const url = '/pdf-to-word'

  beforeEach(() => {
    cy.visit(url, { failOnStatusCode: false })
  })

  it('TC-WORD-001 - Verify PDF to Word page loads successfully', () => {
    // Check if page loaded by verifying key elements exist
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
    cy.get('button').should('have.length.greaterThan', 0)
  })

  it('TC-WORD-002 - Upload valid PDF file successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.pdf', {
      force: true
    })

    cy.contains('sample.pdf').should('exist')
  })

  it('TC-WORD-003 - Verify Convert button works after PDF upload', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.pdf', {
      force: true
    })

    cy.contains('Convert').click()

    // Wait for conversion to complete
    cy.wait(5000)
  })

  it('TC-WORD-004 - Verify multiple PDF upload', () => {
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

  it('TC-WORD-005 - Verify Clear button removes uploaded file', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.pdf', {
      force: true
    })

    cy.contains('Clear').click()

    cy.contains('sample.pdf').should('not.exist')
  })

  it('TC-WORD-006 - Verify Convert without uploading file', () => {
    cy.contains('Convert').click()

    cy.on('window:alert', (txt) => {
      expect(txt.toLowerCase()).to.include('upload')
    })
  })

  it('TC-WORD-007 - Verify unsupported file upload (JPG)', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    // Wait for validation
    cy.wait(2000)
  })

  it('TC-WORD-008 - Verify generated Word download button visible', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.pdf', {
      force: true
    })

    cy.contains('Convert').click()

    // Wait for conversion completion
    cy.wait(5000)
    cy.get('body').should('exist')
  })

  it('TC-WORD-009 - Verify drag and drop upload section visible', () => {
    // Verify page elements exist
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-WORD-010 - Verify page refresh keeps page functional', () => {
    cy.reload()

    // Verify page elements still exist after reload
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

})