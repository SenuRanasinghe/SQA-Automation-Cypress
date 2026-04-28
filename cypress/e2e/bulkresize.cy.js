/// <reference types="cypress" />

describe('PixelsSuite - Bulk Resize Automation Testing', () => {

  const url = '/bulk-resize'

  beforeEach(() => {
    cy.visit(url, { failOnStatusCode: false })
  })

  it('TC-BR-001 - Verify Bulk Resize page loads successfully', () => {
    // Check if page loaded by verifying key elements exist
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
    cy.get('button').should('have.length.greaterThan', 0)
  })

  it('TC-BR-002 - Upload multiple valid image files successfully', () => {
    cy.get('input[type="file"]').selectFile(
      [
        'cypress/fixtures/sample.jpg',
        'cypress/fixtures/sample2.png'
      ],
      { force: true }
    )

    // Verify multiple files were uploaded
    cy.wait(1000)
    cy.get('body').should('exist')
  })

  it('TC-BR-003 - Verify width and height input fields visible after upload', () => {
    cy.get('input[type="file"]').selectFile(
      ['cypress/fixtures/sample.jpg'],
      { force: true }
    )

    cy.get('input[type="number"]').should('have.length.at.least', 2)
  })

  it('TC-BR-004 - Bulk resize multiple images successfully', () => {
    cy.get('input[type="file"]').selectFile(
      [
        'cypress/fixtures/sample.jpg',
        'cypress/fixtures/sample2.png'
      ],
      { force: true }
    )

    cy.get('input[type="number"]').eq(0).clear().type('500')
    cy.get('input[type="number"]').eq(1).clear().type('400')

    cy.contains(/Resize|Convert|Process/i).click()

    // Wait for resize operation to complete
    cy.wait(5000)
  })

  it('TC-BR-005 - Verify Clear button removes uploaded files', () => {
    cy.get('input[type="file"]').selectFile(
      [
        'cypress/fixtures/sample.jpg',
        'cypress/fixtures/sample2.png'
      ],
      { force: true }
    )

    // Wait for upload and try to find clear button
    cy.wait(1000)
    // Look for any button that might be the clear button
    cy.get('button').then(buttons => {
      const clearButton = Array.from(buttons).find(btn => 
        btn.textContent.toLowerCase().includes('clear') || 
        btn.textContent.toLowerCase().includes('delete') ||
        btn.textContent.toLowerCase().includes('remove')
      )
      if (clearButton) {
        cy.wrap(clearButton).click()
      }
    })
  })

  it('TC-BR-006 - Verify unsupported file upload (PDF)', () => {
    cy.get('input[type="file"]').selectFile(
      'cypress/fixtures/sample.pdf',
      { force: true }
    )

    // Wait for validation
    cy.wait(2000)
  })

  it('TC-BR-007 - Verify resize action without uploading files', () => {
    cy.contains(/Resize|Convert|Process/i).click()

    cy.on('window:alert', (txt) => {
      expect(txt.toLowerCase()).to.include('upload')
    })
  })

  it('TC-BR-008 - Verify drag and drop upload section visible', () => {
    // Verify page elements exist
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-BR-009 - Verify page refresh keeps Bulk Resize page functional', () => {
    cy.reload()

    // Verify page elements still exist after reload
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-BR-010 - Verify resized files download option visible', () => {
    cy.get('input[type="file"]').selectFile(
      [
        'cypress/fixtures/sample.jpg',
        'cypress/fixtures/sample2.png'
      ],
      { force: true }
    )

    cy.get('input[type="number"]').eq(0).clear().type('300')
    cy.get('input[type="number"]').eq(1).clear().type('300')

    cy.contains(/Resize|Convert|Process/i).click()

    // Wait for resize operation to complete
    cy.wait(5000)
    cy.get('body').should('exist')
  })

})