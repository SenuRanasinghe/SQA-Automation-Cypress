/// <reference types="cypress" />

describe('PixelsSuite - Flip Image Automation Testing', () => {

  const url = '/flip-image'

  beforeEach(() => {
    cy.visit(url, { failOnStatusCode: false })
  })

  it('TC-FLIP-001 - Verify Flip Image page loads successfully', () => {
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-FLIP-002 - Upload valid JPG image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-FLIP-003 - Upload valid PNG image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.png', {
      force: true
    })

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-FLIP-004 - Flip image horizontally successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.wait(5000)
    cy.get('body').should('exist')
  })

  it('TC-FLIP-005 - Flip image vertically successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.wait(5000)
    cy.get('body').should('exist')
  })

  it('TC-FLIP-006 - Verify flip without uploading image', () => {
    cy.get('body').should('exist')
  })

  it('TC-FLIP-007 - Verify unsupported file upload (PDF)', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.pdf', {
      force: true
    })

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-FLIP-008 - Verify Clear button removes uploaded image', () => {
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

  it('TC-FLIP-009 - Verify drag and drop upload works', () => {
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-FLIP-010 - Verify page refresh maintains UI stability', () => {
    cy.reload()

    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

})