// BUDGET CONTROLLER
var budgetController = (function(){

    //  Some code

})();


//UI CONTROLLER
var UIController = (function() {

    var DOMstrings = {
        // CREATE A OBJECT TO ORGANIZE THE STRINGS IN THE SELECTORS AND OTHER FUNCTIONS
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
    }

    return {
        getInput :function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp 
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };   
        },
        //RETURNED THE OBJECT TO THE GLOBAL SCOPE USING A CLOSURE SO THE CONTROLLER HAVE ACESS TO THE STRINGS, AND CAN ALSO USE IT IN THE SELECTORS
        getDOMstrings : function() {
            return DOMstrings;
        }
    };

})();





// GLOBAL APP CONTROLLER    
var controller = (function(budgetCtrl, UICtrl) {
    // CALL THE OBJECT FROM THE UICONTROLLER (USING THE CLOSURE PROVIDED), AND NOW WE CAN ADD THE STRINGS INSIDE THE DOMstrings OBJECT, PUT IT ALL TOGETHER AND CALL IT INSIDE THIS AND OTHER FUNCTIONS
    var DOM = UICtrl.getDOMstrings();


    var ctrlAddItem =  function() {
        // 1. get the field input data
        var input = UICtrl.getInput();
        console.log(input);
        // 2. Add the item to the budget controller
        // 3. add the item to the UI
        // 4. Calculate the budget
        // 5. Display the budget on the UI     
    }

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
        
        if(event.keyCode == 13 || event.which === 13) {
            event.preventDefault();
            ctrlAddItem();
        }



    })

})(budgetController, UIController)
























