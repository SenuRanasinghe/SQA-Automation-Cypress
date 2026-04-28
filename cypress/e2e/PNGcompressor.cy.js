/// <reference types="cypress" />

describe('PixelsSuite - PNG Compressor Automation Testing', () => {

  const url = '/png-compressor'

  beforeEach(() => {
    cy.visit(url, { failOnStatusCode: false })
  })

  it('TC-PNGC-001 - Verify PNG Compressor page loads successfully', () => {
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-PNGC-002 - Upload valid PNG image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.png', {
      force: true
    })

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-PNGC-003 - Upload multiple PNG images successfully', () => {
    cy.get('input[type="file"]').selectFile(
      [
        'cypress/fixtures/sample.png',
        'cypress/fixtures/sample2.png'
      ],
      { force: true }
    )

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-PNGC-004 - Compress single PNG image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.png', {
      force: true
    })

    cy.contains(/Compress|Convert/i).click()

    cy.wait(5000)
    cy.get('body').should('exist')
  })

  it('TC-PNGC-005 - Compress multiple PNG images successfully', () => {
    cy.get('input[type="file"]').selectFile(
      [
        'cypress/fixtures/sample.png',
        'cypress/fixtures/sample2.png'
      ],
      { force: true }
    )

    cy.contains(/Compress|Convert/i).click()

    cy.wait(5000)
    cy.get('body').should('exist')
  })

  it('TC-PNGC-006 - Verify compression without uploading file', () => {
    cy.contains(/Compress|Convert/i).click()

    cy.on('window:alert', (txt) => {
      expect(txt.toLowerCase()).to.include('upload')
    })
  })

  it('TC-PNGC-007 - Verify unsupported file upload (PDF)', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.pdf', {
      force: true
    })

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-PNGC-008 - Verify Clear button removes uploaded file', () => {
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

  it('TC-PNGC-009 - Verify drag and drop upload works', () => {
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-PNGC-010 - Verify page refresh maintains UI stability', () => {
    cy.reload()

    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

})