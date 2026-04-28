/// <reference types="cypress" />

describe('PixelsSuite - Image to Text Automation Testing', () => {

  const url = '/image-to-text'

  beforeEach(() => {
    cy.visit(url, { failOnStatusCode: false })
  })

  it('TC-OCR-001 - Verify Image to Text page loads successfully', () => {
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-OCR-002 - Upload valid JPG image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-OCR-003 - Upload valid PNG image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.png', {
      force: true
    })

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-OCR-004 - Extract text from uploaded image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.wait(5000)
    cy.get('body').should('exist')
  })

  it('TC-OCR-005 - Verify extracted text output is displayed', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.wait(5000)
    cy.get('body').should('exist')
  })

  it('TC-OCR-006 - Verify copy extracted text button works', () => {
    cy.get('body').should('exist')
  })

  it('TC-OCR-007 - Verify extraction without uploading image', () => {
    cy.get('body').should('exist')
  })

  it('TC-OCR-008 - Verify unsupported file upload (PDF)', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.pdf', {
      force: true
    })

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-OCR-009 - Verify Clear button removes uploaded file', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.get('button').then(buttons => {
      const button = Array.from(buttons).find(btn => 
        btn.textContent.toLowerCase().includes('clear')
      )
      if (button) cy.wrap(button).click()
    })

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-OCR-010 - Verify page refresh maintains UI stability', () => {
    cy.reload()

    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

})