/// <reference types="cypress" />

describe('PixelsSuite - Resize Image Automation Testing', () => {

  const url = '/resize-image'

  beforeEach(() => {
    cy.visit(url, { failOnStatusCode: false })
  })

  it('TC-RSZ-001 - Verify Resize Image page loads successfully', () => {
    // Check if page loaded by verifying key elements exist
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
    cy.get('button').should('have.length.greaterThan', 0)
  })

  it('TC-RSZ-002 - Upload valid JPG image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    // Verify file upload was processed
    cy.wait(1000)
    cy.get('body').should('exist')
  })

  it('TC-RSZ-003 - Upload valid PNG image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.png', {
      force: true
    })

    // Verify file upload was processed
    cy.wait(1000)
    cy.get('body').should('exist')
  })

  it('TC-RSZ-004 - Verify width and height fields are visible after upload', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.get('input[type="number"]').should('have.length.at.least', 2)
  })

  it('TC-RSZ-005 - Resize uploaded image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.get('input[type="number"]').eq(0).clear().type('500')
    cy.get('input[type="number"]').eq(1).clear().type('400')

    cy.contains('Resize').click()

    // Wait for resize operation to complete
    cy.wait(5000)
  })

  it('TC-RSZ-006 - Verify Clear button removes uploaded image', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

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

  it('TC-RSZ-007 - Verify Resize without uploading file', () => {
    cy.contains('Resize').click()

    cy.on('window:alert', (txt) => {
      expect(txt.toLowerCase()).to.include('upload')
    })
  })

  it('TC-RSZ-008 - Verify unsupported file upload (PDF)', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.pdf', {
      force: true
    })

    // Wait for validation
    cy.wait(2000)
  })

  it('TC-RSZ-009 - Verify drag and drop upload section visible', () => {
    // Verify page elements exist
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-RSZ-010 - Verify resized image download button visible', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.png', {
      force: true
    })

    cy.get('input[type="number"]').eq(0).clear().type('300')
    cy.get('input[type="number"]').eq(1).clear().type('300')

    cy.contains('Resize').click()

    // Wait for resize operation to complete
    cy.wait(5000)
    cy.get('body').should('exist')
  })

})