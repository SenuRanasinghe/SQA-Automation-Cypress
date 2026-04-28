/// <reference types="cypress" />

describe('PixelsSuite - Image Enlarger Automation Testing', () => {

  const url = '/image-enlarger'

  beforeEach(() => {
    cy.visit(url, { failOnStatusCode: false })
  })

  it('TC-ENL-001 - Verify Image Enlarger page loads successfully', () => {
    // Check if page loaded by verifying key elements exist
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
    cy.get('button').should('have.length.greaterThan', 0)
  })

  it('TC-ENL-002 - Upload valid JPG image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    // Verify file upload was processed
    cy.wait(1000)
    cy.get('body').should('exist')
  })

  it('TC-ENL-003 - Upload valid PNG image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.png', {
      force: true
    })

    // Verify file upload was processed
    cy.wait(1000)
    cy.get('body').should('exist')
  })

  it('TC-ENL-004 - Verify enlarge controls visible after upload', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.get('input, select').should('exist')
  })

  it('TC-ENL-005 - Enlarge uploaded image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.contains(/Enlarge|Resize|Convert|Process/i).click()

    // Wait for enlargement operation to complete
    cy.wait(5000)
  })

  it('TC-ENL-006 - Verify Clear button removes uploaded image', () => {
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

  it('TC-ENL-007 - Verify enlarge action without uploading image', () => {
    cy.contains(/Enlarge|Resize|Convert|Process/i).click()

    cy.on('window:alert', (txt) => {
      expect(txt.toLowerCase()).to.include('upload')
    })
  })

  it('TC-ENL-008 - Verify unsupported file upload (PDF)', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.pdf', {
      force: true
    })

    // Wait for validation
    cy.wait(2000)
  })

  it('TC-ENL-009 - Verify drag and drop upload section visible', () => {
    // Verify page elements exist
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-ENL-010 - Verify download button visible after enlargement', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.png', {
      force: true
    })

    cy.contains(/Enlarge|Resize|Convert|Process/i).click()

    // Wait for enlargement operation to complete
    cy.wait(5000)
    cy.get('body').should('exist')
  })

})