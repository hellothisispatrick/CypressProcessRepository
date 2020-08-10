beforeEach(function () {
    Cypress.env();
      
    const user = Cypress.env('qa_username')
    const pwd = Cypress.env('qa_pwd')
     console.log("Base url is: ", Cypress.env('baseUrl'))
     cy.visit(Cypress.env('baseUrl'))
     cy.wait(1500)

     cy.get('.input-email')
     .type(user)

     cy.get('[type="password"]')
     .type(pwd)

     cy.get('.login')
     .click()
     cy
     .wait(1500);

    cy.log('**** LOGIN IS SUCCESSFUL *****')

     //LOAD THE FIXTURE FILE BEFORE THE TESTS ARE RUN
     // FIXTURE FILE IS INTENDED TO LOAD IN THE BEFOREEACH HOOK

     cy.fixture("process.json")
     .as("info");

     // Import the benefit json file

    cy
    .fixture("benefits.json")
    .as("bd");

    // Import the costs json file

    cy
    .fixture("costs.json")
    .as("cost");


})

/*
====================================================================================================================
================================   TEST CASE 01 -->  CREATION OF L1 PROCESS GROUP    ========================================
====================================================================================================================

*/

describe('UseCase 01 - Organization Structure and Transformation feature regression', function() {
    
        it('TC01 - User should be able to create LEVEL - 1 process group successfully', function() {
            
        // Should be on a new URL which includes '/automation'
        cy.url().should('include', '/home')
        cy.wait(1500);

        cy.get('.process-repository').click();
        cy.log('Process Repository page has been clicked');
        cy.wait(300);

        cy.get('.org-structure-icon > .MuiSvgIcon-root').click({force:true});
        cy.log('***** ORGANISATION STRUCTURE HAS BEEN CLICKED *****');  
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
        })
        cy.get('.org-structure-title-text').contains(this.info.org_title).invoke('text')
        .then((text)=>{
        const headingTitle = text;
        expect(headingTitle).to.equal(this.info.org_title);

        cy.log('***** ORG STRUCTURE PAGE IS OPENED SUCCESSFULLY *****')
        cy.wait(800);
        
      cy
      .get('.head-map-leve1-container > .heat-map-item-list > :nth-child(n)')
      .children()
      .last()
      .scrollIntoView();

      cy.get('#process-repository-ds > div.processes-content.row > div > div > div > div > div.heat-map > div > div.group-container.head-map-leve1-container > div.heat-map-item-list.group-list-section.bottom-border-line > div:nth-child(n) > div > div > div:nth-child(2)')
      .click({force:true});
    

      cy.log('**** Add new button in the first row has been clicked ****')
      cy.wait(300);        
      cy.get('input.new-item-input').type(this.info.subdomain);
      cy.get('.save-item-btn').click();

      cy.log('***** SUB DOMAIN HAS BEEN ADDED SUCCESSFULLY');


      cy.wait(300);
      cy.get('[role="alert"]').should('be.visible') ;

      cy.get('[role="alert"]').contains(this.info.group_msg).invoke('text')
        .then((text)=>{
        const domainText = text;
        expect(domainText).to.equal(this.info.group_msg);
        
                })

        })  


        })
        
/*

=======================================================================================================================
================================   END OF TEST CASE 1    ========================================
=======================================================================================================================
*/

/*

=============================================================================================================================================
================================    TEST CASE 02 --> CREATION OF L2 PROCESS GROUP    =============================================================
=============================================================================================================================================

*/
  
    it('TC02 - User should be able to create LEVEL - 2 process group successfully', function() {
               
        cy.get('.process-repository').click();
        cy.log('Process Repository page has been clicked');
        cy.wait(300);
        cy.get('.org-structure-icon > .MuiSvgIcon-root').click({force:true});
        cy.log('***** ORGANISATION STRUCTURE HAS BEEN CLICKED *****');  
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
             })
   
        cy.wait(900);
        cy
        .get('.heat-map-item-container.heat-map-leve1.item-scale-empty')
        .should('contain.text', this.info.subdomain);
        cy.log('Identified the L1')

          
      cy.get('#process-repository-ds > div.processes-content.row > div > div > div > div > div.heat-map > div > div.group-container.head-map-leve2-container > div.group-list-section.head-map-leve2-container > div:nth-child(n) > div:nth-child(1) > div')
      .children('div.add-new-item')
      .click({force:true});
          
     cy.wait(800);     
      
     cy.get('input.new-item-input').type(this.info.group);
     cy.get('.save-item-btn').click();

     cy.log('***** PROCESS GROUP HAS BEEN ADDED SUCCESSFULLY');


    cy.wait(800);
    cy.get('[role="alert"]').should('be.visible') ;

    cy.get('[role="alert"]').contains(this.info.group_msg).invoke('text')
    .then((text)=>{
    const processText = text;
  expect(processText).to.equal(this.info.group_msg);
        
    })

})    


/*

=================================================================================================================================
==================================================  END OF TEST CASE 2    =======================================================
================================================================================================================================

*/

/*


=================================================================================================================================
================================   TEST CASE 03 -->  CREATION OF AN OPPORTUNNITY IN TRANSFORMATION    ===============================================
=================================================================================================================================

*/
it('TC03 - User should be able to create a transformation opportunity successfully', function() {
       
        cy.get('.process-repository').click();
        cy.log('Process Repository page has been clicked');

        cy.wait(2000);

        if(cy.get('.MuiTabs-flexContainer').children().should('have.length',2)) {
            cy.get('.MuiTabs-flexContainer').children().last().click({ force: true })
        }
        else {
            cy.get('.MuiTab-wrapper')
            .should('have.text', 'Transformation')
            .click();
        }        
        cy.get('.MuiButton-label > .MuiSvgIcon-root > path').click({ force: true });
        console.log('Add Process has been clicked');

        // Enter the Process Name

        cy.get('#outlined-basic')
        .type(this.info.process_name);
        
        // Click on the Level 1 Workspace drop down

         cy.get(':nth-child(7) > :nth-child(1) > :nth-child(1) > .MuiInputBase-root > .MuiSelect-root').click();

        // Select 'Parent Domain from the Sub Domain list
        
        cy.get('li')
        .contains(this.info.subdomain)
        .trigger('mouseover')
        .click({force: true});

         cy.log('***** SUB DOMAIN HAS BEEN SELECTED SUCCESSFULLY *****');
         cy.wait(500);  
         
        // Click on Process Group Drop Down

         cy.get(':nth-child(2) > .MuiInputBase-root > .MuiSelect-root').click();
         cy.wait(500);

         // Select 'RCA Group' from the Process Group list

        cy.get('li')
         .contains(this.info.group)
         .trigger('mouseover')
         .click({force: true});

         cy.log('***** PROCESS GROUP HAS BEEN SELECTED SUCCESSFULLY *****');
       
         cy.wait(500);

         // Select the stage

         cy.get('.MuiSelect-root.MuiSelect-select.MuiSelect-selectMenu.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input').eq(2).click();

         cy.get('li')
         .contains(this.info.stage)
         .trigger('mouseover')
         .click({force: true});

         cy.log('***** STAGE HAS BEEN SELECTED SUCCESSFULLY *****');

         // Select the Process Start Date

         cy.get('.MuiInputBase-input.MuiOutlinedInput-input')
         .eq(5)
         .click();

        const startDate = Cypress.moment()
        .subtract(1,'year')
        .subtract(1, 'month')
        .add(1, 'day')
        .format('YYYY-MM-DD')

        console.log("Start date calculated is : ", startDate);

        cy.get('.MuiInputBase-input.MuiOutlinedInput-input').eq(5)
        .type(startDate)
        console.log("Start Date has beeen selected successfully")

        // Select the Process End Date

        cy.get('.MuiInputBase-input.MuiOutlinedInput-input')
         .eq(6)
         .click();

        const endDate = Cypress.moment()
        .add(5,'year')
        .subtract(1, 'month')
        .add(1, 'day')
        .format('YYYY-MM-DD')

        console.log("End date calculated is : ", endDate);

        cy.get('.MuiInputBase-input.MuiOutlinedInput-input').eq(6)
        .type(endDate)
        console.log("End Date has beeen selected successfully")

        cy.log('***** PROCESS START AND END DATES ARE SELECTED *****')

        cy.wait(500);

        cy.get('.MuiButton-label').eq(2).should('have.text', 'Create')
        .click();

         cy.log('################ NEW PROCESS IS CREATED SUCCESSFULLY ##############');
    
        cy.wait(1000);
        cy.get('[role="alert"]').should('be.visible') ;

        cy.get('[role="alert"]').contains(this.info.process_msg).invoke('text')
        .then((text)=>{
        const toastText = text;
        expect(toastText).to.equal(this.info.process_msg);
        })
        
        cy.log('################ NEW PROCESS IS CREATED SUCCESSFULLY ##############');

        cy.get('.Toastify__close-button.Toastify__close-button--success')
        .click({force: true});

        cy.get('.profile-icon > .toggle-menu')
        .click({force: true});
    
        cy.get('.logout').click();
        cy.wait(500);
    
        cy.get('.confirm').click();
        cy.wait(3000);
    
       cy.url().should('include', 'login');

    })

/*


=====================================================================================================================================================
===================================================  END OF TEST CASE 3    ==========================================================================
=====================================================================================================================================================

*/

/*

=================================================================================================================================
================================   TEST CASE 04 -->  SEARCH FOR A PROCESS    ===============================================
=================================================================================================================================

*/

it('TC04 - User should be able to search for an opportunity successfully', function() {
    
    cy.get('.process-repository').click();
    cy.log('Process Repository page has been clicked');
    cy.wait(2000);

    if(cy.get('.MuiTabs-flexContainer').children().should('have.length',2)) {
        cy.get('.MuiTabs-flexContainer').children().last().click({ force: true })
    }
    else {
        cy.get('.MuiTab-wrapper')
        .should('have.text', 'Transformation')
        .click();
    }        
    
    cy
    .get('.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedStart.MuiInputBase-inputAdornedEnd')
    .click({force: true})
    .type(this.info.process_name);

    cy.wait(500);

    cy
    .get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignLeft').eq(0)
    .contains(this.info.process_name)
    .invoke('text')
    .then((text)=>{
        const proName = text;
        expect(proName)
        .to
        .equal(this.info.process_name);

        cy.log('***** PROCESS YOU ARE LOOKING FOR IS FOUND IN THE EVE APP *****')


    })
    
})

/*

=====================================================================================================================================================
===================================================  END OF TEST CASE 4   ==========================================================================
=====================================================================================================================================================

*/

/*

=================================================================================================================================
================================   TEST CASE 05 -->  ADD OWNER TO PROCESS    ===============================================
=================================================================================================================================

*/
it('TC05 - User should be able to assign an owner to his opportunity successfully', function() {
    
    cy.get('.process-repository').click();
    cy.log('Process Repository page has been clicked');
    cy.wait(2000);

    if(cy.get('.MuiTabs-flexContainer').children().should('have.length',2)) {
        cy.get('.MuiTabs-flexContainer').children().last().click({ force: true })
    }
    else {
        cy.get('.MuiTab-wrapper')
        .should('have.text', 'Transformation')
        .click();
    }        

    cy
    .get('.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedStart.MuiInputBase-inputAdornedEnd')
    .click({force: true})
    .type(this.info.process_name);

    cy
    .get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignLeft').eq(5)
    .children()
    .children()
    .first()
    .find('a')
    .click();
    console.log("Edit icon is clicked successfully")

    
   // Click on DETAILS TAB

    cy.get('#control-tabs-tab-details')
    .click({force:true});

    cy
    .wait(1000);

    cy.get('.switch > label')
    .click({force: true});

    cy
    .wait(500);

    cy.log('***** EDIT MODE IS ENABLED *****');

    cy.get(':nth-child(1) > .form-group > .process-edit-ctrl-label > .process-edit-label > .no-padding > .edit-button > svg > path')
    .click({force: true});


    cy
    .get('.modal-header')
    .should('be.visible') ;

    cy
    .get('.add-user-title')
    .contains(this.info.owner_title).invoke('text')
    .then((text)=>{
    expect(text).to.equal(this.info.owner_title);

    cy
    .get('#search-user-profile')
    .focus()
    .type(this.info.owner);

    cy.wait(500);

    cy
    .get('div.fade.add-user.in.modal > div > div > div.add-user-modal-body.modal-body > div:nth-child(1) > div > div > div > div.user-op-col.col-sm-2 > div > button')
    .click();

    cy.wait(500);

    cy
    .get(':nth-child(3) > .no-padding > .form-group > .btn-primary')
    .click();

    

    cy.wait(200);

    cy.get('.btn.btn-primary').click();
    cy.wait(200);

    cy.get('.profile-icon > .toggle-menu')
    .click();

    cy.get('.logout').click();
    cy.wait(500);

    cy.get('.confirm').click();
    cy.wait(3000);

   cy.url().should('include', 'login');

    cy
    .log('*****  OWNER HAS BEEN ADDED TO PROCESS SUCCESSFULLY *****');
    })

    
})

/*

=====================================================================================================================================================
===================================================  END OF TEST CASE 5   ==========================================================================
=====================================================================================================================================================

*/

/*

=================================================================================================================================
================================   TEST CASE 06 -->  ADD SME TO PROCESS    ===============================================
=================================================================================================================================

*/

it('TC06 - User should be able to assign a SME to his opportunity successfully', function() {
    
    cy.get('.process-repository').click();
    cy.log('Process Repository page has been clicked');
    cy.wait(2000);

    if(cy.get('.MuiTabs-flexContainer').children().should('have.length',2)) {
        cy.get('.MuiTabs-flexContainer').children().last().click({ force: true })
    }
    else {
        cy.get('.MuiTab-wrapper')
        .should('have.text', 'Transformation')
        .click();
    }        
    cy
    .get('.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedStart.MuiInputBase-inputAdornedEnd')
    .click({force: true})
    .type(this.info.process_name);

    cy
    .get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignLeft').eq(5)
    .children()
    .children()
    .first()
    .find('a')
    .click();
    console.log("Edit icon is clicked successfully")

    // Click on DETAILS TAB

    cy.get('#control-tabs-tab-details')
    .click({force:true});

    cy
    .wait(1000);

    cy.get('.switch > label')
    .click({force: true});

    cy
    .wait(500);

    cy.log('***** EDIT MODE IS ENABLED *****');

    cy.get(':nth-child(2) > .form-group > .process-edit-ctrl-label > .process-edit-label > .no-padding > .edit-button > svg > path')
    .click({force: true});


    cy
    .get('.modal-header')
    .should('be.visible') ;

    cy
    .get('.add-user-title')
    .contains(this.info.sme_title).invoke('text')
    .then((text)=>{
    expect(text).to.equal(this.info.sme_title);

    cy
    .get('#search-user-profile')
    .focus()
    .type(this.info.sme);

    cy.wait(500);

    cy
    .get('div.fade.add-user.in.modal > div > div > div.add-user-modal-body.modal-body > div:nth-child(1) > div > div > div > div.user-op-col.col-sm-2 > div > button')
    .click();

    cy.wait(500);

    cy
    .get(':nth-child(3) > .no-padding > .form-group > .btn-primary')
    .click();

    cy
    .log('*****  SME AND OWNER HAS BEEN ADDED TO PROCESS SUCCESSFULLY *****');
    
    cy.wait(200);

    cy.get('.btn.btn-primary').click();
    cy.wait(200);

    cy.get('.profile-icon > .toggle-menu')
    .click();

    cy.get('.logout').click();
    cy.wait(500);

    cy.get('.confirm').click();
    cy.wait(3000);

   cy.url().should('include', 'login');

    cy
    .log('*****  SME HAS BEEN ADDED TO PROCESS SUCCESSFULLY *****');
    

    })
    
 })


    
/*

=====================================================================================================================================================
===================================================  END OF TEST CASE 6   ==========================================================================
=====================================================================================================================================================

*/

/*

=================================================================================================================================
================================   TEST CASE 07 -->  ADD BENEFIT DRIVER TO PROCESS    ===============================================
=================================================================================================================================

*/
it('TC07 - User should be able to add a benefit driver successfully', function() {
      
    cy.get('.process-repository').click();
    cy.log('Process Repository page has been clicked');
    cy.wait(2000);

    if(cy.get('.MuiTabs-flexContainer').children().should('have.length',2)) {
        cy.get('.MuiTabs-flexContainer').children().last().click({ force: true })
    }
    else {
        cy.get('.MuiTab-wrapper')
        .should('have.text', 'Transformation')
        .click();
    }        

    cy
    .get('.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedStart.MuiInputBase-inputAdornedEnd')
    .click({force: true})
    .type(this.info.process_name);

    cy
    .get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignLeft').eq(5)
    .children()
    .children()
    .first()
    .find('a')
    .click();
    console.log("Edit icon is clicked successfully")

    // Click on BENEFITS TAB

    cy.get('#control-tabs-tab-benefits')
    .click({force:true});

    cy
    .wait(1000);

    cy
    .get(':nth-child(1) > .driver-panel > .panel-body > .pull-right')
    .click();

    cy
    .log('***** TYPE A BENEFIT DRIVER HAS BEEN CLICKED UPON *****');

     cy
     .wait(1000);

     // Team FTEs
    cy
    .get('.input-group > #ftes')
    .click({force:true})
    .type(this.bd.ftes);

    // Working Weeks

    cy
    .get('input#working-weeks.form-control')
    .click({force:true})
    .type(this.bd.weeks_pa);


    // Working Days
    cy
    .get('input#working-days.form-control')
    .click({force: true})
    .type(this.bd.days_pw);

    cy
    .wait(500);

    // Average Working Hours
    cy
    .get('input#working-hours.form-control')
    .click({force:true})
    .type(this.bd.hours_pw);

    // Average Annual Salary

    cy
    .get('input#avg-annual-salary.form-control')
    .click({force:true})
    .type(this.bd.avg_salary);
  
    // Additional Cost

    cy
    .get('input#additional-cost.form-control')
    .click({force:true})
    .type(this.bd.add_cost);

    // FTE Efficiency

    cy
    .get('input#avg-efficiency.form-control')
    .click({force:true})
    .type(this.bd.fte_efficiency);

    // Transaction Metrics - Transaction Volume

    cy
    .get('input#avg-transaction-volume.form-control')
    .click({force:true})
    .type(this.bd.trns_volume);

    // Select the frequency

    cy.get('.caret')
    .last()
    .click({force:true})

    cy
    .get('a')
    .contains('Per day')
    .click({force: true})

    cy
    .log('Frequency drop-down is clicked');

    // Standard Path

    cy
    .get('input#standard-path.form-control')
    .click({force:true})
    .type(this.bd.std_path);

    // PRe Auto processing time

    cy
    .get('input#pre_auto_processing_time.form-control')
    .click({force:true})
    .type(this.bd.pre_proc_time);
    
   // Standard Path Automatable

   cy
    .get('input#standard-path-automatable.form-control')
    .click({force:true})
    .type(this.bd.std_path_auto);


    // Post Automation Processing Time

    cy
    .get('input#post-automation-processing-time.form-control')
    .click({force:true})
    .type(this.bd.post_proc_time);

    // Expected Benefit Start Date
    cy
    .get('input#expected-benefit-start-date.form-control')
    .click({force:true})
    
    for(let n = 0; n < 2; n ++){
        cy.get('i.fas.fa-angle-right.eclair-cal-nav').click({multiple: true});
        
    }

    // Select a date upon navigating to 12 months 
    cy.get('#date-picker-popover-0 > div.popover-content > table > tbody > tr:nth-child(3) > td:nth-child(1)')
    .click();
    

    // Click on SAVE

    cy.get('button.btn.btn-primary')
    .contains('Save')
    .click({force: true})


    cy.wait(1000);
    cy.get('[role="alert"]').should('be.visible') ;

    cy.get('[role="alert"]').contains("Benefit driver added successfully").invoke('text')
    .then((text)=>{
    const bd_success = text;
    expect(bd_success).to.equal(this.bd.bd_msg);
    })
    
    cy.log('################ NEW PROCESS IS CREATED SUCCESSFULLY ##############');
    cy
    .log("***** BENEFIT DRIVER IS ADDED SUCCESSFULLY *****");
    
})



/*

=====================================================================================================================================================
===================================================  END OF TEST CASE 7   ==========================================================================
=====================================================================================================================================================

*/

/*

=================================================================================================================================
================================   TEST CASE 08 -->  ADD COMPLEXITY DATA TO PROCESS    ===============================================
=================================================================================================================================

*/

it('TC08 - User should be able to update complexity successfully', function() {
    
    cy
    .wait(500);

    cy
    .get('.process-repository')
    .should('be.visible');

    cy
    .get('.process-repository')
    .click();

    cy
    .log('Process Repository page has been clicked');

    if(cy.get('.MuiTabs-flexContainer').children().should('have.length',2)) {
        cy.get('.MuiTabs-flexContainer').children().last().click({ force: true })
    }
    else {
        cy.get('.MuiTab-wrapper')
        .should('have.text', 'Transformation')
        .click();
    }        

    cy
    .get('.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedStart.MuiInputBase-inputAdornedEnd')
    .click({force: true})
    .type(this.info.process_name);

    cy
    .get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignLeft').eq(5)
    .children()
    .children()
    .first()
    .find('a')
    .click();
    console.log("Edit icon is clicked successfully")

    // Click on COMPLEXITY TAB

    cy.get('#control-tabs-tab-complexity')
    .click({force:true});
  

    // AVERAGE HANDLING TIME
    
    for(let n = 0; n < 3; n ++){
        cy
        .get('#process-repository-ds > div.processes-content.row > div > div > div > div.process-edit.col-md-12.col-sm-12 > div.process-edit-form.col-md-12.col-sm-12 > div > div.col-right > section:nth-child(1) > ul > div > li:nth-child(6) > div > button.add')
        .click({force: true});
        
    }

    // Complexity - Average Handling Time should reflect the  updated data
       cy
       .get('.ave-time-input')
       .should('have.value', this.bd.avg_time);

    // NUMBER OF VARIATIONS
    cy
    .get(':nth-child(1) > ul > :nth-child(1) > :nth-child(1) > .button-toggle > .add')
    .click({force: true});

    
    cy
    .log("***** COMPLEXITY VALUES ARE UPDATED *****");
})


/*

=====================================================================================================================================================
===================================================  END OF TEST CASE 8  ==========================================================================
=====================================================================================================================================================

*/

/*

=================================================================================================================================
================================   TEST CASE 09 -->  ADD COSTS TO PROCESS    ===============================================
=================================================================================================================================

*/

 it('TC09 - Should update costs to process successfully', function() {
   
    cy
    .wait(500);

    cy
    .get('.process-repository')
    .should('be.visible');

    cy
    .get('.process-repository')
    .click();

    cy
    .log('Process Repository page has been clicked');

     if(cy.get('.MuiTabs-flexContainer').children().should('have.length',2)) {
            cy.get('.MuiTabs-flexContainer').children().last().click({ force: true })
        }
        else {
            cy.get('.MuiTab-wrapper')
            .should('have.text', 'Transformation')
            .click();
        }        

    cy
    .get('.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedStart.MuiInputBase-inputAdornedEnd')
    .click({force: true})
    .type(this.info.process_name);

    cy
    .get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignLeft').eq(5)
    .children()
    .children()
    .first()
    .find('a')
    .click();
    console.log("Edit icon is clicked successfully")

  
    // Click on COSTS TAB

    cy
    .get('#control-tabs-tab-costs')
    .click({force: true});

    cy.wait(500);

    cy.get(':nth-child(1) > :nth-child(1) > .col-md-11 > .form-group > .dropdown').click();
    cy.get("#cost-type-dropdown0").click()

        
    // Select 'Resource' from the Cost Type dropdown list

    cy.get('li')
    .contains(this.cost.cost_type)
    .trigger('mouseover')
    .click({force: true});

    // Type in the cost description
    cy
    .get("#cost-description-0").click()
    .type(this.cost.cost_description);

    cy.wait(200);

    // Type in Total Cost
    cy
    .get(".input-group > #total-cost-0")
    .click({force:true})
    .type(this.cost.total_cost);

    // click on the drop down 
    cy
    .get("#total-cost-dropdown-0")
    .click();

    // Select 'per day' from the Total Cost dropdown

    cy.get('li')
    .contains(this.cost.frequency)
    .trigger('mouseover')
    .click({force: true});

    cy
    .get(".btn.btn-default").eq(4)
    .click({force: true});

    cy.get(".dropdown-toggle.btn.btn-success").eq(1)
    .click();

    // Select a Payment Profile

    cy.get('li')
    .contains(this.cost.payment_profile)
    .trigger('mouseover')
    .click({force: true});

    // Select the Cost Category
    cy.get(".far.fa-circle").eq(1).click();

    cy
    .get(".btn.btn-primary")
    .contains('Save')
    .click({force: true});

    cy.wait(1000);
    cy.get('[role="alert"]').should('be.visible') ;

    cy.get('[role="alert"]').contains(this.cost.cost_msg).invoke('text')
    .then((text)=>{
    const cost_success = text;
    expect(cost_success).to.equal(this.cost.cost_msg);
    })
    
    cy.log('################ COSTS HAVE BEEN ADDED SUCCESSFULLY ##############');
      

    })

/*

=====================================================================================================================================================
===================================================  END OF TEST CASE 9   ==========================================================================
=====================================================================================================================================================

*/

/*

=================================================================================================================================
================================   TEST CASE 10 -->  DELETE AN OPPORTUNITY    ===============================================
=================================================================================================================================

*/

it('TC10 - Opportunity should be allowed to delete successfully', function() {
    
    cy
    .wait(500);

    cy
    .get('.process-repository')
    .should('be.visible');

    cy
    .get('.process-repository')
    .click();

    cy
    .log('Process Repository page has been clicked');

     if(cy.get('.MuiTabs-flexContainer').children().should('have.length',2)) {
            cy.get('.MuiTabs-flexContainer').children().last().click({ force: true })
        }
        else {
            cy.get('.MuiTab-wrapper')
            .should('have.text', 'Transformation')
            .click();
        }        

    cy
    .get('.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedStart.MuiInputBase-inputAdornedEnd')
    .click({force: true})
    .type(this.info.process_name);

    cy
    .get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignLeft').eq(5)
    .children()
    .children()
    .last()
    .find('a')
    .click();
    console.log("Delete icon is clicked successfully")

    cy
    .get('.MuiButton-label').eq(6).click();

    cy.wait(1000);
    cy.get('[role="alert"]').should('be.visible') ;

    cy.get('[role="alert"]').contains(this.info.delete_msg).invoke('text')
    .then((text)=>{
    const cost_success = text;
    expect(cost_success).to.equal(this.info.delete_msg);
    })
    
    cy.log('############### OPPORTUNITY HAVE BEEN DELETED SUCCESSFULLY ##############');

    cy.get('.Toastify__close-button.Toastify__close-button--success')
    .click({ force: true })
     
    cy.get('.profile-icon > .toggle-menu')
    .click();

    cy.get('.logout').click();
    cy.wait(500);

    cy.get('.confirm').click();
    cy.wait(3000);

   cy.url().should('include', 'login');

})

/*

=====================================================================================================================================================
===================================================  END OF TEST CASE 10  ==========================================================================
=====================================================================================================================================================

*/

/*

=================================================================================================================================
================================   TEST CASE 11 -->  EDIT  LEVEL - 2 PROCESS GROUP    ===============================================
=================================================================================================================================

*/
it('TC11 - Verify if Level - 2 process group can be edited successfully', function() {

            
    cy.get('.process-repository').click();
    cy.log('Process Repository page has been clicked');
    cy.wait(300);
    cy.get('.org-structure-icon > .MuiSvgIcon-root').click({force:true});
    cy.log('***** ORGANISATION STRUCTURE HAS BEEN CLICKED *****');  
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
         })

    cy.wait(900)
    const GroupBox = cy.get('.heat-map-item-container.heat-map-leve2.item-scale-empty')
    GroupBox.children('.heat-map-item-text.clickable-area').find('div').contains(this.info.group).parents('div.heat-map-item-container.heat-map-leve2.item-scale-empty')
    .children().first().children().first().find('svg').click( {force: true });

    cy
    .get('input.new-item-input').click()
    .clear().type(this.info.group_change);
    
    cy.get('.save-item-btn')
    .click();                 

    
    cy.wait(800);
    cy.get('[role="alert"]').should('be.visible') ;

    cy.get('[role="alert"]').contains(this.info.group_edit_msg).invoke('text')
    .then((text)=>{
    const processText = text;
    expect(processText).to.equal(this.info.group_edit_msg);
    
        })  

    })
/*

=====================================================================================================================================================
===================================================  END OF TEST CASE 11  ==========================================================================
=====================================================================================================================================================

*/

/*

=================================================================================================================================
================================   TEST CASE 12 --> EDIT LEVEL - 1 PROCESS GROUP    ===============================================
=================================================================================================================================

*/
it('TC12 - Verify if Level - 1 process group can be edited successfully', function() {

            
    cy.get('.process-repository').click();
    cy.log('Process Repository page has been clicked');
    cy.wait(300);
    cy.get('.org-structure-icon > .MuiSvgIcon-root').click({force:true});
    cy.log('***** ORGANISATION STRUCTURE HAS BEEN CLICKED *****');  
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
         })

         cy.wait(900)
         const SubDomainBox = cy.get('.heat-map-item-container.heat-map-leve1.item-scale-empty')
         SubDomainBox.children('.heat-map-item-text').find('div').contains(this.info.subdomain).parents('div.heat-map-item-container.heat-map-leve1.item-scale-empty')
         .children().first().children().first().find('svg').click( {force: true });

    cy
    .get('input.new-item-input').click()
    .clear().type(this.info.subdomain_change);
    
    cy.get('.save-item-btn')
    .click();                 

    
    cy.wait(800);
    cy.get('[role="alert"]').should('be.visible') ;

    cy.get('[role="alert"]').contains(this.info.group_edit_msg).invoke('text')
    .then((text)=>{
    const processText = text;
    expect(processText).to.equal(this.info.group_edit_msg);
    
        })  
    console.log("SUB DOMAIN NAME HAS BEEN EDITED SUCCESSFULLY")

    })

/*

=====================================================================================================================================================
===================================================  END OF TEST CASE 12  ==========================================================================
=====================================================================================================================================================

*/

/*

=================================================================================================================================
================================   TEST CASE 13 -->  DELETE LEVEL - 2 PROCESS GROUP    ===============================================
=================================================================================================================================

*/
it('TC13 - Verify if Level -2 process group can be deleted successfully', function() {

            
        cy.get('.process-repository').click();
        cy.log('Process Repository page has been clicked');
        cy.wait(300);
        cy.get('.org-structure-icon > .MuiSvgIcon-root').click({force:true});
        cy.log('***** ORGANISATION STRUCTURE HAS BEEN CLICKED *****');  
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
             })
   
        cy.wait(900)
        const GroupBox = cy.get('.heat-map-item-container.heat-map-leve2.item-scale-empty')
        GroupBox.children('.heat-map-item-text.clickable-area').find('div').contains(this.info.group_change).parents('div.heat-map-item-container.heat-map-leve2.item-scale-empty')
        .children().first().children().last().find('svg').click( {force: true });
        
        cy.get('.save-item-btn')
        .click();                 
    
        
        cy.wait(800);
        cy.get('[role="alert"]').should('be.visible') ;

        cy.get('[role="alert"]').contains(this.info.group_delete_msg).invoke('text')
        .then((text)=>{
        const processText = text;
        expect(processText).to.equal(this.info.group_delete_msg);
        
            })  

        })

/*

=====================================================================================================================================================
===================================================  END OF TEST CASE 13  ==========================================================================
=====================================================================================================================================================

*/

/*

=================================================================================================================================
================================   TEST CASE 14 -->  DELETE LEVEL - 1 PROCESS GROUP    ===============================================
=================================================================================================================================

*/
it('TC14 - Verify if Level - 1  process group can be deleted successfully', function() {

           
        cy.get('.process-repository').click();
        cy.log('Process Repository page has been clicked');
        cy.wait(300);
        cy.get('.org-structure-icon > .MuiSvgIcon-root').click({force:true});
        cy.log('***** ORGANISATION STRUCTURE HAS BEEN CLICKED *****');  
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
             })
   
        cy.wait(900)
        const SubDomainBox = cy.get('.heat-map-item-container.heat-map-leve1.item-scale-empty')
        SubDomainBox.children('.heat-map-item-text').find('div').contains(this.info.subdomain_change).parents('div.heat-map-item-container.heat-map-leve1.item-scale-empty')
        .children().first().children().last().find('svg').click( {force: true });
        
        cy.get('.save-item-btn')
        .click();                 
    
        
        cy.wait(800);
        cy.get('[role="alert"]').should('be.visible') ;

        cy.get('[role="alert"]').contains(this.info.group_delete_msg).invoke('text')
        .then((text)=>{
        const processText = text;
        expect(processText).to.equal(this.info.group_delete_msg);
        console.log("SUB-DOMAIN DELETED SUCCESSFULLY");

              
            })  

        })
    });

/*

=====================================================================================================================================================
===================================================  END OF TEST CASE 14  ==========================================================================
=====================================================================================================================================================

*/

