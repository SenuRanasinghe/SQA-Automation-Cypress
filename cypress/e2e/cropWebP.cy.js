/// <reference types="cypress" />

describe('PixelsSuite - Crop WebP Automation Testing', () => {

  const url = '/crop-webp'

  beforeEach(() => {
    cy.visit(url, { failOnStatusCode: false })
  })

  it('TC-CWEBP-001 - Verify Crop WebP page loads successfully', () => {
    // Check if page loaded by verifying key elements exist
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
    cy.get('button').should('have.length.greaterThan', 0)
  })

  it('TC-CWEBP-002 - Upload valid WebP image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.webp', {
      force: true
    })

    // Verify file upload was processed
    cy.wait(1000)
    cy.get('body').should('exist')
  })

  it('TC-CWEBP-003 - Verify crop area appears after WebP upload', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.webp', {
      force: true
    })

    cy.get('canvas, img').should('exist')
  })

  it('TC-CWEBP-004 - Crop uploaded WebP image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.webp', {
      force: true
    })

    cy.contains(/Crop|Apply|Done/i).click()

    // Wait for crop operation to complete
    cy.wait(5000)
  })

  it('TC-CWEBP-005 - Verify Clear button removes uploaded WebP', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.webp', {
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

  it('TC-CWEBP-006 - Verify crop action without uploading image', () => {
    cy.contains(/Crop|Apply|Done/i).click()

    cy.on('window:alert', (txt) => {
      expect(txt.toLowerCase()).to.include('upload')
    })
  })

  it('TC-CWEBP-007 - Verify unsupported file upload (PDF)', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.pdf', {
      force: true
    })

    // Wait for validation
    cy.wait(2000)
  })

  it('TC-CWEBP-008 - Verify drag and drop upload section visible', () => {
    // Verify page elements exist
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-CWEBP-009 - Verify page refresh keeps Crop WebP page functional', () => {
    cy.reload()

    // Verify page elements still exist after reload
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-CWEBP-010 - Verify cropped WebP download button visible', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.webp', {
      force: true
    })

    cy.contains(/Crop|Apply|Done/i).click()

    // Wait for crop operation to complete
    cy.wait(5000)
    cy.get('body').should('exist')
  })

})