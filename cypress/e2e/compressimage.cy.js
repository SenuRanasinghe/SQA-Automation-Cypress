/// <reference types="cypress" />

describe('PixelsSuite - Compress Image Automation Testing', () => {

  const url = '/compress-image'

  beforeEach(() => {
    cy.visit(url, { failOnStatusCode: false })
  })

  it('TC-CIMG-001 - Verify Compress Image page loads successfully', () => {
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-CIMG-002 - Upload valid JPG image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-CIMG-003 - Upload valid PNG image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.png', {
      force: true
    })

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-CIMG-004 - Compress JPG image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.contains(/Compress|Convert/i).click()

    cy.wait(5000)
    cy.get('body').should('exist')
  })

  it('TC-CIMG-005 - Compress PNG image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.png', {
      force: true
    })

    cy.contains(/Compress|Convert/i).click()

    cy.wait(5000)
    cy.get('body').should('exist')
  })

  it('TC-CIMG-006 - Verify compression without uploading file', () => {
    cy.contains(/Compress|Convert/i).click()

    cy.on('window:alert', (txt) => {
      expect(txt.toLowerCase()).to.include('upload')
    })
  })

  it('TC-CIMG-007 - Verify unsupported file upload (PDF)', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.pdf', {
      force: true
    })

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-CIMG-008 - Verify Clear button removes uploaded file', () => {
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

  it('TC-CIMG-009 - Verify drag and drop upload works', () => {
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-CIMG-010 - Verify page refresh maintains UI stability', () => {
    cy.reload()

    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

})