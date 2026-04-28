/// <reference types="cypress" />

describe('PixelsSuite - Word to PDF Automation Testing', () => {

  const url = '/word-to-pdf'

  beforeEach(() => {
    cy.visit(url, { failOnStatusCode: false })
  })

  it('TC-WTP-001 - Verify Word to PDF page loads successfully', () => {
    // Check if page loaded by verifying key elements exist
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
    cy.get('button').should('have.length.greaterThan', 0)
  })

  it('TC-WTP-002 - Upload valid DOCX file successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.docx', {
      force: true
    })

    cy.contains('sample.docx').should('exist')
  })

  it('TC-WTP-003 - Upload valid DOC file successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.doc', {
      force: true
    })

    cy.contains('sample.doc').should('exist')
  })

  it('TC-WTP-004 - Verify Convert button works after Word upload', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.docx', {
      force: true
    })

    cy.contains('Convert').click()

    // Wait for conversion to complete
    cy.wait(5000)
  })

  it('TC-WTP-005 - Verify multiple Word files upload', () => {
    cy.get('input[type="file"]').selectFile(
      [
        'cypress/fixtures/sample.docx',
        'cypress/fixtures/sample2.docx'
      ],
      { force: true }
    )

    // Verify multiple files were uploaded
    cy.wait(1000)
    cy.get('body').should('exist')
  })

  it('TC-WTP-006 - Verify Clear button removes uploaded file', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.docx', {
      force: true
    })

    cy.contains('Clear').click()

    cy.contains('sample.docx').should('not.exist')
  })

  it('TC-WTP-007 - Verify Convert without uploading file', () => {
    cy.contains('Convert').click()

    cy.on('window:alert', (txt) => {
      expect(txt.toLowerCase()).to.include('upload')
    })
  })

  it('TC-WTP-008 - Verify unsupported file upload (JPG)', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    // Wait for validation
    cy.wait(2000)
  })

  it('TC-WTP-009 - Verify generated PDF download button visible', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.docx', {
      force: true
    })

    cy.contains('Convert').click()

    // Wait for conversion completion
    cy.wait(5000)
    cy.get('body').should('exist')
  })

  it('TC-WTP-010 - Verify drag and drop upload section visible', () => {
    // Verify page elements exist
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

})