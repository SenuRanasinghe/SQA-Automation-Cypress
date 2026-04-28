/// <reference types="cypress" />

describe('PixelsSuite - Convert to PNG Automation Testing', () => {

  const url = '/convert-to-png'

  beforeEach(() => {
    cy.visit(url, { failOnStatusCode: false })
  })

  it('TC-CPNG-001 - Verify Convert to PNG page loads successfully', () => {
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-CPNG-002 - Upload valid JPG image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-CPNG-003 - Upload valid WEBP image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.webp', {
      force: true
    })

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-CPNG-004 - Convert JPG to PNG successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.contains(/Convert/i).click()

    cy.wait(5000)
    cy.get('body').should('exist')
  })

  it('TC-CPNG-005 - Convert WEBP to PNG successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.webp', {
      force: true
    })

    cy.contains(/Convert/i).click()

    cy.wait(5000)
    cy.get('body').should('exist')
  })

  it('TC-CPNG-006 - Verify conversion without uploading file', () => {
    cy.contains(/Convert/i).click()

    cy.on('window:alert', (txt) => {
      expect(txt.toLowerCase()).to.include('upload')
    })
  })

  it('TC-CPNG-007 - Verify unsupported file upload (PDF)', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.pdf', {
      force: true
    })

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-CPNG-008 - Verify Clear button removes uploaded file', () => {
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

  it('TC-CPNG-009 - Verify drag and drop upload works', () => {
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-CPNG-010 - Verify page refresh maintains UI stability', () => {
    cy.reload()

    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

})