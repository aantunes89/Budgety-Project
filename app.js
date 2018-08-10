// BUDGET CONTROLLER
var budgetController = (function(){

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }


})();



//UI CONTROLLER
var UIController = (function() { 

    var DOMstrings = {
        // This objects was created to hold strings and selectors in order to make our life easyer in the future if we need to change a ev.handler or else. Since we've created this data we'll only need to make changes in one place.
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
    };

    return {
        getInput :function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //the .value wfill be either inc or exp 
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


    var setupEventListeners = function() {
        // CALL THE OBJECT FROM THE UICONTROLLER (USING THE CLOSURE PROVIDED), AND NOW WE CAN ADD THE STRINGS INSIDE THE DOMstrings OBJECT, PUT IT ALL TOGETHER AND CALL IT INSIDE THIS AND OTHER FUNCTIONS
        var DOM = UICtrl.getDOMstrings();
        // Now the "DOMstrings" from the UIcontroller is called just "DOM", so it's called in the ev.handler bellow as it.
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        // In the event handler below, we did not look for a selector, because since it's a keypress event it will happend when the WHOLE WINDOW is activated, so no selector needed.
        document.addEventListener('keypress', function(event) {
            
            // The property ".which" wass used here because, some older browsers, doesn't have support for the  "keyCode" porperty.
            if(event.keyCode == 13 || event.which === 13) {
                event.preventDefault();
                ctrlAddItem();
            }
        })        
    }


    var ctrlAddItem =  function() {
        // 1. get the field input data
        var input = UICtrl.getInput();
        console.log(input); // ERASE IT LATTER!! 

        // 2. Add the item to the budget controller
        // 3. add the item to the UI
        // 4. Calculate the budget
        // 5. Display the budget on the UI     
    };

    return {
        init: function() {
            console.log('App has started');
            setupEventListeners();
        }
    }

})(budgetController, UIController)


controller.init();





















