// describe('angularjs homepage todo list', function() {
//     it('should add a todo', function() {
//       browser.get('http://localhost:5000/#/Home');

const { element } = require("protractor");

describe('MediTask Fields', function() {
it('should have a title', function() {
    browser.get('http://localhost:5000/#/Home');
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
    addName.sendKeys("item1");
    addCost.sendKeys(100);
    buttonAdd.click();
    var addedName = element(by.binding('item.name'));
    var addedCost = element(by.binding('item.cost'));
    expect(addedName.getText()).toBe('item1');
    expect(addedCost.getText()).toBe('100');
});

it('should add new item name and cost', function() {
    var addName = element(by.model('newToDoName'));
    var addCost = element(by.model('newToDoCost'));
    var buttonAdd = element(by.id('validateAdd'));
    addName.sendKeys("item1");
    addCost.sendKeys(100);
    buttonAdd.click();
    var addedName = element(by.binding('item.name'));
    var addedCost = element(by.binding('item.cost'));
    expect(addedName.getText()).toBe('item1');
    expect(addedCost.getText()).toBe('100');
});

});