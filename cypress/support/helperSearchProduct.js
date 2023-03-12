export function searchProductByName(productName){
    cy.get('mat-search-bar').click();
    cy.get('input[type="text"]').type(productName);
    cy.get('input[type="text"]').type('{enter}');
    cy.get('button[aria-label="Add to Basket"]').click();
    }
    
    
    