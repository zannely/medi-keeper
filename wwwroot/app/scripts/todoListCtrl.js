'use strict';
angular.module('todoApp')
.controller('todoListCtrl', ['$scope', '$location', 'todoListSvc', function ($scope, $location, todoListSvc) {
    $scope.error = "";
    $scope.meditest = "I am a test.";
    $scope.loadingMessage = "Loading...";
    $scope.todoList = null;
    $scope.editingInProgress = false;
    $scope.newToDoName = "";
    $scope.newToDoCost = "";
    $scope.editInProgressTodo = {
        name: "",
        cost: 0,
        id: 0
    };

    var vm = this;
    vm.meditest = 'I am a test.';
    
    $scope.showMax = function () {
        todoListSvc.getMaxPrices().success(function (results) {
            $scope.todoList = results;
            $scope.loadingMessage = "";
        }).error(function (err) {
            $scope.error = err;
            $scope.loadingMessage = "";
        })
    };

    $scope.showMaxByName = function () {
        todoListSvc.getMaxPrice($scope.searchName).success(function (results) {
            $scope.todoList = [];
            $scope.todoList.push(results);
            $scope.loadingMessage = "";
        }).error(function (err) {
            $scope.error = err;
            $scope.loadingMessage = "";
        })
    }

    $scope.editSwitch = function (todo) {
        todo.edit = !todo.edit;
        if (todo.edit) {
            $scope.editInProgressTodo.name = todo.name;
            $scope.editInProgressTodo.id = todo.id;
            $scope.editInProgressTodo.cost = todo.cost;
            $scope.editingInProgress = true;
        } else {
            $scope.editingInProgress = false;
        }
    };

    $scope.populate = function () {
        todoListSvc.getItems().success(function (results) {
            $scope.todoList = results;
            $scope.loadingMessage = "";
        }).error(function (err) {
            $scope.error = err;
            $scope.loadingMessage = "";
        })
    };
    $scope.delete = function (id) {
        todoListSvc.deleteItem(id).success(function (results) {
            $scope.loadingMessage = "";
            $scope.populate();
        }).error(function (err) {
            $scope.error = err;
            $scope.loadingMessage = "";
        })
    };
    $scope.update = function (todo) {
        todoListSvc.putItem({
            'id': todo.id,
            'name': $scope.editInProgressTodo.name,
            'cost': parseInt($scope.editInProgressTodo.cost),
        }).success(function (results) {
            $scope.loadingMsg = "";
            $scope.populate();
            $scope.editSwitch(todo);
        }).error(function (err) {
            $scope.error = err;
            $scope.loadingMessage = "";
        })
    };
    $scope.add = function () {
        if ($scope.editingInProgress) {
            $scope.editingInProgress = false;
        }
        todoListSvc.postItem({
            'name': $scope.newToDoName,
            'cost': parseInt($scope.newToDoCost),
        }).success(function (results) {
            $scope.loadingMsg = "";
            $scope.newToDoName = "";
            $scope.newToDoCost = "";
            $scope.populate();
        }).error(function (err) {
            $scope.error = err;
            $scope.loadingMsg = "";
        })
    };
}]);
