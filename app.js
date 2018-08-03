// BUDGET CONTROLLER
var budgetController = (function(){

    //  Some code

})();


//UI CONTROLLER
var UIController = (function() {

    // Some code

})();

// GLOBAL APP CONTROLLER    
var controller = (function(budgetCtrl, UIctrl) {

    var ctrlAddItem =  function() {
        // 1. get the field input data
        // 2. Add the item to the budget controller
        // 3. add the item to the UI
        // 4. Calculate the budget
        // 5. Display the budget on the UI    
        console.log('Test 1');     
    }

    document.querySelector(".add__btn").addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
        
        if(event.keyCode == 13 || event.which === 13) {
            event.preventDefault();
            ctrlAddItem();
        }

    })

})(budgetController, UIController)
























