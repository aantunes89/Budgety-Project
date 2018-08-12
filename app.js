//-------------------------------------------------------------------------//
//----------------------------BUDGET CONTROLLER----------------------------//
//-------------------------------------------------------------------------//

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

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1, // the "-1" here we use to tell JS that it's NONEXISTENT (There is no percentage in the begining)

    };

    //--------------CLOSURES--------------//

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

        calculateBudget: function() {
            
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // calculate the percentage of income that we spent
            if(data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1; // the "-1" here we use to tell JS that it's NONEXISTENT (There is no percentage in the begining)
            }
            
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        testing : function() {
            console.log(data);
        }
    };

})();


//---------------------------------------------------------------------//
//----------------------------UI CONTROLLER----------------------------//
//---------------------------------------------------------------------//
var UIController = (function() { 

    var DOMstrings = {
        // This objects was created to hold strings and selectors in order to make our life easyer in the future if we need to change a ev.handler or else. Since we've created this data we'll only need to make changes in one place.
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        inputIncome: '.income__list',
        inputExpense:'.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel:'.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage'
    };

    return {
        getInput :function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //the .value will be either inc or exp 
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value) // "parseFloat" turns strings into numbers with decimals.
            };   
        },
       
        addListItem: function(obj, type) {
            // Create HTML string with placeholder text
            var html, newHtml, element;

            if(type === 'inc') {
                element = DOMstrings.inputIncome;

                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.inputExpense;

                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            };
            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the newHTML into te HTML

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        clearFields: function() {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue); // The qselectorAll returns a NODELIST instead a regular Array!!

            fieldsArr = Array.prototype.slice.call(fields); // slice is an native method that makes a copy of this array, if we use .slice in a Array [1, 2, 3, 4] it will return [1, 2, 3, 4,]. So since the "fields" is a list we used the slice "TO TRICK JavaScript" to treat it as an Array, so JS did the same as it would do if it was a REAL Array and returned an Array instead of a list (this is how you transform a list in a Array using INHERITANCE) Now "fieldsArr" is an Array.

            // Here we use the Array we produced with inheritance in a forEach loop. !!!!! those arguments in the callback functions are a JS standard, the current is the element itself(content and/or value), the index is the index 0based position and the array is the whole thing!            
            fieldsArr.forEach(function(current, index, array) {
                current.value = ""; // This .value here has nothing to do whit the value of the inputValue, it's just a JS method(like we used in the ev.handler)!!
            })
            // change the focus to the description using Array index.
            fieldsArr[0].focus();
        },

        displayBudget: function(obj) {
            document.querySelector(DOMstrings.budgetLabel).textContent = "$" + obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = "$" + obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = "$" + obj.totalExp;

            if(obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + "%";
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = "---";
            }
        },

        //RETURNED THE OBJECT TO THE GLOBAL SCOPE USING A CLOSURE SO THE CONTROLLER HAVE ACESS TO THE STRINGS, AND CAN ALSO USE IT IN THE SELECTORS
        getDOMstrings : function() {
            return DOMstrings;
        },
    };

})();




//-----------------------------------------------------------------------------//
//----------------------------GLOBAL APP CONTROLLER----------------------------//
//-----------------------------------------------------------------------------//

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

    var updateBudget = function() {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        var budget = budgetCtrl.getBudget();
        
        // 3. Dispaly the budget on the UI
        console.log(budget);
        UICtrl.displayBudget(budget);
    }

    var ctrlAddItem =  function() {
        var input, newItem;
        // 1. get the field input data
        input = UICtrl.getInput();

        if(input.description !== "" && !isNaN(input.value) && input.value > 0) { // The conditional prevent the user to send items without description, numbers (in the value), and no value (0) FYI "isNaN" is a JS function to check if its a number (return false) or not (true) so we use "double negative".
            
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            
            // 3. add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear fields
            UICtrl.clearFields();

            // 5. Calculate and update budget 
            updateBudget();       
        }
    };

    return {
        init: function() {
            console.log('App has started');
            setupEventListeners();
            updateBudget(); 
            // Jonas Resolution is call the "getBudget" content here instead of the updateBudget(), like that: budget: data.budget, totalInc: data.totals.inc,totalExp: data.totals.exp,percentage: data.percentage//
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















