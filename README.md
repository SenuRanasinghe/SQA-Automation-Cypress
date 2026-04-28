# SQA-Automation-Cypress
🚀 Cypress Automation Framework

A clean and scalable end-to-end automation framework built using Cypress, TypeScript, and the Page Object Model (POM) design pattern.

# 🛠️ Tech Stack
Cypress – End-to-End Testing Framework

TypeScript – Type-safe JavaScript

Page Object Model (POM) – Maintainable test structure

Custom Commands – Reusable test actions

# 📁 Project Structure
cypress/
  
  e2e/
    
	smoke/
     
	  homepage.cy.ts
      
	  navigation.cy.ts
  
  fixtures/
    
	testData.json
 
  pages/
   
	HomePage.ts
  
  support/
    
	commands.ts
    
	e2e.ts
    
	index.d.ts


cypress.config.ts

tsconfig.json
# ⚙️ Configuration
Base URL: https://www.pixelssuite.com

Retries: Enabled in run mode (2 retries)

Video Recording: Enabled

Screenshots on Failure: Enabled
# ▶️ Run Tests
Open Cypress Test Runner -
npm run cypress:open

Run all tests (headless) -
npm run cypress:run

Run tests in Chrome browser -
npm run cypress:run:chrome

Run smoke test suite only -
npm run cypress:smoke

Verify Cypress installation - 
npm run cypress:verify
# ✅ Best Practices Applied
Page Object Model (POM) for clean separation of UI logic

Reusable Custom Commands for common actions	

Type-safe Command Augmentation using TypeScript	

Smoke-first Test Strategy for quick validation	

Fixture-based Testing for deterministic and stable results	
# 📌 Highlights
Scalable and maintainable structure

Easy to extend for large projects

Clean separation of concerns

Developer-friendly and readable test code
