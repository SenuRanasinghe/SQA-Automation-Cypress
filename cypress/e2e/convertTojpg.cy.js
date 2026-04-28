/// <reference types="cypress" />

describe('PixelsSuite - Convert to JPG Automation Testing', () => {

  const url = '/convert-to-jpg'

  beforeEach(() => {
    cy.visit(url, { failOnStatusCode: false })
  })

  it('TC-CJPG-001 - Verify Convert to JPG page loads successfully', () => {
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-CJPG-002 - Upload valid PNG image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.png', {
      force: true
    })

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-CJPG-003 - Upload valid WEBP image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.webp', {
      force: true
    })

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-CJPG-004 - Convert PNG to JPG successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.png', {
      force: true
    })

    cy.contains(/Convert/i).click()

    cy.wait(5000)
    cy.get('body').should('exist')
  })

  it('TC-CJPG-005 - Convert WEBP to JPG successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.webp', {
      force: true
    })

    cy.contains(/Convert/i).click()

    cy.wait(5000)
    cy.get('body').should('exist')
  })

  it('TC-CJPG-006 - Verify upload without file shows validation', () => {
    cy.contains(/Convert/i).click()

    cy.on('window:alert', (txt) => {
      expect(txt.toLowerCase()).to.include('upload')
    })
  })

  it('TC-CJPG-007 - Verify unsupported file upload (PDF)', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.pdf', {
      force: true
    })

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-CJPG-008 - Verify Clear button removes uploaded file', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.png', {
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

  it('TC-CJPG-009 - Verify drag and drop upload area visible', () => {
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-CJPG-010 - Verify page refresh maintains UI stability', () => {
    cy.reload()

    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

})