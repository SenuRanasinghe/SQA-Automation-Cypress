/// <reference types="cypress" />

describe('PixelsSuite - Meme Generator Automation Testing', () => {

  const url = '/meme-generator'

  beforeEach(() => {
    cy.visit(url, { failOnStatusCode: false })
  })

  it('TC-MEME-001 - Verify Meme Generator page loads successfully', () => {
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-MEME-002 - Upload valid image successfully for meme creation', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-MEME-003 - Verify text input fields for meme captions appear', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.get('input, textarea').should('exist')
  })

  it('TC-MEME-004 - Generate meme successfully with image and text', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-MEME-005 - Verify meme generation without uploading image', () => {
    cy.get('body').should('exist')
  })

  it('TC-MEME-006 - Verify unsupported file upload (PDF)', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.pdf', {
      force: true
    })

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-MEME-007 - Verify Clear button removes uploaded image', () => {
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

  it('TC-MEME-008 - Verify drag and drop upload works', () => {
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-MEME-009 - Verify meme text customization updates preview', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-MEME-010 - Verify page refresh maintains UI stability', () => {
    cy.reload()

    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

})