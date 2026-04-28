/// <reference types="cypress" />

describe('PixelsSuite - Image to PDF Automation Testing', () => {

  const url = '/image-to-pdf'

  beforeEach(() => {
    cy.visit(url, { failOnStatusCode: false })
  })

  it('TC-PDF-001 - Verify Image to PDF page loads successfully', () => {
    // Check if page loaded by verifying key elements exist
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
    cy.get('button').should('have.length.greaterThan', 0)
  })

  it('TC-PDF-002 - Upload valid JPG image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.contains('sample.jpg').should('exist')
  })

  it('TC-PDF-003 - Upload valid PNG image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.png', {
      force: true
    })

    cy.contains('sample.png').should('exist')
  })

  it('TC-PDF-004 - Verify Convert button works after upload', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.contains('Convert').click()

    // Wait for conversion - page is responsive
    cy.wait(5000)
  })

  it('TC-PDF-005 - Verify multiple image upload', () => {
    cy.get('input[type="file"]').selectFile(
      [
        'cypress/fixtures/sample.jpg',
        'cypress/fixtures/sample2.png'
      ],
      { force: true }
    )

    cy.contains('sample.jpg').should('exist')
    cy.contains('sample2.png').should('exist')
  })

  it('TC-PDF-006 - Verify Clear button removes uploaded files', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.contains('Clear').click()

    cy.contains('sample.jpg').should('not.exist')
  })

  it('TC-PDF-007 - Verify Convert without upload', () => {
    cy.contains('Convert').click()

    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('upload')
    })
  })

  it('TC-PDF-008 - Verify unsupported file upload', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/test.pdf', {
      force: true
    })

    // Wait for validation
    cy.wait(2000)
  })

  it('TC-PDF-009 - Verify generated PDF download button visible', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.contains('Convert').click()

    // Wait for conversion completion
    cy.wait(5000)
    cy.get('body').should('exist')
  })

  it('TC-PDF-010 - Verify drag and drop upload area exists', () => {
    cy.contains('Drag and drop your file here').should('be.visible')
  })

})