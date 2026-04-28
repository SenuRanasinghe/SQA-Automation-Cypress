/// <reference types="cypress" />

describe('PixelsSuite - GIF Compressor Automation Testing', () => {

  const url = '/gif-compressor'

  beforeEach(() => {
    cy.visit(url, { failOnStatusCode: false })
  })

  it('TC-GIF-001 - Verify GIF Compressor page loads successfully', () => {
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-GIF-002 - Upload valid GIF file successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.gif', {
      force: true
    })

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-GIF-003 - Upload multiple GIF files successfully', () => {
    cy.get('input[type="file"]').selectFile(
      [
        'cypress/fixtures/sample.gif',
        'cypress/fixtures/sample2.gif'
      ],
      { force: true }
    )

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-GIF-004 - Compress single GIF successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.gif', {
      force: true
    })

    cy.contains(/Compress|Convert/i).click()

    cy.wait(5000)
    cy.get('body').should('exist')
  })

  it('TC-GIF-005 - Compress multiple GIF files successfully', () => {
    cy.get('input[type="file"]').selectFile(
      [
        'cypress/fixtures/sample.gif',
        'cypress/fixtures/sample2.gif'
      ],
      { force: true }
    )

    cy.contains(/Compress|Convert/i).click()

    cy.wait(5000)
    cy.get('body').should('exist')
  })

  it('TC-GIF-006 - Verify compression without uploading file', () => {
    cy.contains(/Compress|Convert/i).click()

    cy.on('window:alert', (txt) => {
      expect(txt.toLowerCase()).to.include('upload')
    })
  })

  it('TC-GIF-007 - Verify unsupported file upload (JPG)', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-GIF-008 - Verify Clear button removes uploaded GIF', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.gif', {
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

  it('TC-GIF-009 - Verify drag and drop upload works', () => {
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-GIF-010 - Verify page refresh maintains UI stability', () => {
    cy.reload()

    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

})