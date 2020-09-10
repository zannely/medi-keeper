
const { element } = require("protractor");

describe('MediTask UnitTest', function() {

it('All items should get cleared', function() {
    browser.get('http://localhost:5000/#/Home');
    // clear all items in table
    var clearAll = element(by.id('clearAllItems'));
    clearAll.click();
    expect(element.all(by.repeater('item in todoList')).count()).toEqual(0);
});

it('should have a title', function() {
    // browser.get('http://localhost:5000/#/Home');
    expect(browser.getTitle()).toEqual('MediTask');
});

it('should have item name input for search max', function() {
    // browser.get('http://localhost:5000/#/Home');
    expect(element(by.id('inlineFormInputName')).isPresent()).toBe(true);
});

it('should have add input field', function() {
    // browser.get('http://localhost:5000/#/Home');
    expect(element(by.id('inlineFormAddItem')).isPresent()).toBe(true);
});

it('should have add cost input field', function() {
    // browser.get('http://localhost:5000/#/Home');
    expect(element(by.id('inlineFormCostItem')).isPresent()).toBe(true);
});

it('should have form for items', function() {
    // browser.get('http://localhost:5000/#/Home');
    expect(element(by.id('navigateTable')).isPresent()).toBe(true);
});


it('should add new item name and cost', function() {
    var addName = element(by.model('newToDoName'));
    var addCost = element(by.model('newToDoCost'));
    var buttonAdd = element(by.id('validateAdd'));
    addName.sendKeys("unitItem1");
    addCost.sendKeys(1000);
    buttonAdd.click();
    var addedName = element(by.binding('item.name'));
    var addedCost = element(by.binding('item.cost'));
    //verify the new added item and cost
    expect(addedName.getText()).toBe('unitItem1');
    expect(addedCost.getText()).toBe('1000');
});

it('should search for max price given item name', function() {
    // Add highest item name with cost
    var addMaxName = element(by.model('newToDoName'));
    var addMaxCost = element(by.model('newToDoCost'));
    var buttonAddMax = element(by.id('validateAdd'));
    addMaxName.sendKeys("unitItem2");
    addMaxCost.sendKeys(3000);
    buttonAddMax.click();

    //search for the max price given the item
    var searchName = element(by.model('searchName'));
    searchName.sendKeys('unitItem2');
    var buttonSearch = element(by.id('validateSearch'));
    buttonSearch.click();
    var maxName = element(by.binding('item.name'));
    var maxCost = element(by.binding('item.cost'));
    //verify max value
    expect(maxName.getText()).toBe('unitItem2');
    expect(maxCost.getText()).toBe('3000');
});

it('should search for all max prices', function() {
    // Add item with duplicate itemname and lower cost
    var addMaxName = element(by.model('newToDoName'));
    var addMaxCost = element(by.model('newToDoCost'));
    var buttonAddMax = element(by.id('validateAdd'));
    addMaxName.sendKeys("unitItem2");
    addMaxCost.sendKeys(1000);
    buttonAddMax.click();

    // search for all max prices
    var btnMaxPrices = element(by.id('btnMaxPrices'));
    btnMaxPrices.click();

    // Returns the SPAN for the first max cost and itemname.
    var firstCost = element(by.repeater('item in todoList').
        row(0).column('item.cost'));
    var firstItem = element(by.repeater('item in todoList').
    row(0).column('item.name'));

    // Returns the SPAN for the second max cost and itemname
    var secondCost = element(by.repeater('item in todoList').
        row(1).column('item.cost'));
    var secondItem = element(by.repeater('item in todoList').
    row(1).column('item.name'));

    // verify values
    expect(firstCost.getText()).toBe('3000');
    expect(firstItem.getText()).toBe('unitItem2');
    expect(secondCost.getText()).toBe('1000');
    expect(secondItem.getText()).toBe('unitItem1');

});

it('should delete the first max cost and item name', function() {
    //get the current count in the list
    var initialCount = element.all(by.repeater('item in todoList')).count();

    //Remove the first itemname
    element.all(by.repeater('item in todoList'))
    .get(0)
    .element(by.id('deleteItem'))
    .click();

    // verify count is less than initial count and equals 2
    expect(element.all(by.repeater('item in todoList')).count()) < initialCount;
    expect(element.all(by.repeater('item in todoList')).count()).toEqual(2);
});


it('should edit item and cost', function() {

    //select first row to edit
    element.all(by.repeater('item in todoList'))
    .get(0)
    .element(by.id('btnEditItems'))
    .click();

    var editedName = element(by.id('editItem'));
    var editedCost = element(by.id('editCost'));
    var btnSubmitEdit = element(by.id('saveEdition'));
    editedName.clear().sendKeys("unitEditedItem");
    editedCost.clear().sendKeys(5000);
    btnSubmitEdit.click();

    // Returns the SPAN for the first max cost and itemname after edit.
    var newEditedCost = element(by.repeater('item in todoList').
    row(0).column('item.cost'));
    var newEditedItem = element(by.repeater('item in todoList').
    row(0).column('item.name'));

    // verify edited values
    expect(newEditedCost.getText()).toBe('5000');
    expect(newEditedItem.getText()).toBe('unitEditedItem');

});


});