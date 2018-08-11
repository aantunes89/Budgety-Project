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
    };

    return {
        addItem: function(type, des, val) {
            var newItem, ID;

            //!!!!!!!!!!!THIS IF-ELSE STATEMENT USES THE "TYPE" ARGUMENT TO GENERATE AN "ID" ARGUMENT THAT WILL BE USED IN THE CREATION OF A NEW ITEM (EITHER INCOME OR EXPENSE)!!!!!! SEE THE EXPLANATION IN THE END!!!
            if(data.allItems[type].length > 0 ) {
                // this ".id" is the argment in the function constructor!!! since every element in the array will have it, it's accessing it and adding 1 to build the next ID argument.
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0
            }

            if(type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if(type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            data.allItems[type].push(newItem);
            return newItem;
        },

        testing : function() {
            console.log(data);
        }
    };

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
                type: document.querySelector(DOMstrings.inputType).value, //the .value will be either inc or exp 
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };   
        },
       
        //RETURNED THE OBJECT TO THE GLOBAL SCOPE USING A CLOSURE SO THE CONTROLLER HAVE ACESS TO THE STRINGS, AND CAN ALSO USE IT IN THE SELECTORS
        getDOMstrings : function() {
            //
            return DOMstrings;
        },
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
        var input, newItem;
        // 1. get the field input data
        input = UICtrl.getInput();
        console.log(input); // ERASE IT LATTER!! 

        // 2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        
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




// UNDERSTANDING HOW THE ADDITEM WORKS
// 1 -step: We changed the name from the  "add_type" OPTIONS CLASSES to "inc and exp" then when we created the data structure in the "budgetControler" we gave the empty arrays the same name, so when we create the function "addItem" whit 3 arguments (type, des, val) the element that is selected from the event handler uses the type (same name in obect and in HTML selection) to access the proper Array (exp or inc)

// 2 -step: After we manage to "reach" the proper array we use this info in a if-else statement to produce(build) a ID.

// 3 -step: Once we "produced" the ID we now have the 3 arguments (id, description and value) needed to produce a new item with the function constructors (Expense or Income), so we used another if-else statement based on the "type" we had before to produce our new item.

// 4 -step: Now we just push this new item into the proper array and returned the new item to the global scope

// STEP-0 IMPORTANT!! In order to all this happens we had to return the 'addItem' function (closure) into the global scope and add it to the event handeler, passing the arguments we produce on the input object(with the ev handler) as the arguments that will "run" the "addItem" method so the hole logic can work! So the type we produce in the ev.handler is the same we'll pass in the addItem (also the other 2 arguments) in the ctrlAddItem method.















