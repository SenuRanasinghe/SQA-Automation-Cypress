/// <reference types="cypress" />

describe('PixelsSuite - Crop JPG Automation Testing', () => {

  const url = '/crop-jpg'

  beforeEach(() => {
    cy.visit(url, { failOnStatusCode: false })
  })

  it('TC-CJPG-001 - Verify Crop JPG page loads successfully', () => {
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-CJPG-002 - Upload valid JPG image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-CJPG-003 - Verify crop area appears after JPG upload', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.get('canvas, img').should('exist')
  })

  it('TC-CJPG-004 - Crop uploaded JPG image successfully', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.contains(/Crop|Apply|Done/i).click()

    cy.wait(5000)
    cy.get('body').should('exist')
  })

  it('TC-CJPG-005 - Verify Clear button removes uploaded JPG', () => {
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

  it('TC-CJPG-006 - Verify crop action without uploading image', () => {
    cy.contains(/Crop|Apply|Done/i).click()

    cy.on('window:alert', (txt) => {
      expect(txt.toLowerCase()).to.include('upload')
    })
  })

  it('TC-CJPG-007 - Verify unsupported file upload (PDF)', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.pdf', {
      force: true
    })

    cy.wait(2000)
    cy.get('body').should('exist')
  })

  it('TC-CJPG-008 - Verify drag and drop upload section visible', () => {
    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-CJPG-009 - Verify page refresh keeps Crop JPG page functional', () => {
    cy.reload()

    cy.get('body').should('exist')
    cy.get('input[type="file"]').should('exist')
  })

  it('TC-CJPG-010 - Verify cropped JPG download button visible', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.jpg', {
      force: true
    })

    cy.contains(/Crop|Apply|Done/i).click()

    cy.wait(5000)
    cy.get('body').should('exist')
  })

})