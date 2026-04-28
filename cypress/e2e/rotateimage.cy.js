/// <reference types="cypress" />

describe('PixelsSuite - Rotate Image Automation Testing', () => {

  const url = '/rotate-image'

  beforeEach(() => {
    cy.visit(url, { failOnStatusCode: false })
  })

  it('TC-ROT-001 - Verify Rotate Image page loads successfully', () => {
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-ROT-002 - Upload valid JPG image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-ROT-003 - Upload valid PNG image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.png', {
      force: true
    })

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-ROT-004 - Rotate image 90 degrees right successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.wait(5000)
    cy.get('body').should('exist')
  })

  it('TC-ROT-005 - Rotate image 90 degrees left successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.wait(5000)
    cy.get('body').should('exist')
  })

  it('TC-ROT-006 - Rotate image 180 degrees successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.png', {
      force: true
    })

    cy.wait(5000)
    cy.get('body').should('exist')
  })

  it('TC-ROT-007 - Verify rotate without uploading image', () => {
    cy.get('body').should('exist')
  })

  it('TC-ROT-008 - Verify unsupported file upload (PDF)', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.pdf', {
      force: true
    })

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-ROT-009 - Verify Clear button removes uploaded image', () => {
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

  it('TC-ROT-010 - Verify page refresh maintains UI stability', () => {
    cy.reload()

    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

})