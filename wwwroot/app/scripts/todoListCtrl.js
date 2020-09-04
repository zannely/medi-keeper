'use strict';
angular.module('todoApp')
.controller('todoListCtrl', ['$scope', '$location', 'todoListSvc', function ($scope, $location, todoListSvc) {
    $scope.error = "";
    $scope.loadingMessage = "Loading...";
    $scope.todoList = null;
    $scope.editingInProgress = false;
    $scope.newToDoName = "";
    $scope.newToDoCost = 0;

    console.log("here");
    $scope.editInProgressTodo = {
        name: "",
        cost: 0,
        isComplete: false,
        id: 0
    };

    
    $scope.showMax = function () {
        console.log("getting max stuffs");
        todoListSvc.getMaxPrices().success(function (results) {
            $scope.todoList = results;
            $scope.loadingMessage = "";
        }).error(function (err) {
            $scope.error = err;
            $scope.loadingMessage = "";
        })
    };

    $scope.showMaxByName = function () {
        console.log($scope.searchName);
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
        console.log('i am editswitch');

        todo.edit = !todo.edit;
        if (todo.edit) {
            $scope.editInProgressTodo.name = todo.name;
            $scope.editInProgressTodo.id = todo.id;
            $scope.editInProgressTodo.cost = todo.cost;
            $scope.editInProgressTodo.isComplete = todo.isComplete;
            $scope.editingInProgress = true;
        } else {
            $scope.editingInProgress = false;
        }
    };

    $scope.populate = function () {
        console.log('i am populate');
        todoListSvc.getItems().success(function (results) {
            console.log('Hi', results);
            $scope.todoList = results;
            $scope.loadingMessage = "";
        }).error(function (err) {
            $scope.error = err;
            $scope.loadingMessage = "";
        })
    };
    $scope.delete = function (id) {
        console.log('i am delete');

        todoListSvc.deleteItem(id).success(function (results) {
            $scope.loadingMessage = "";
            $scope.populate();
        }).error(function (err) {
            $scope.error = err;
            $scope.loadingMessage = "";
        })
    };
    $scope.update = function (todo) {
        console.log('i am update');

        $scope.editInProgressTodo.isComplete = todo.isComplete;
        todoListSvc.putItem({
            'id': todo.id,
            'name': $scope.editInProgressTodo.name,
            'cost': parseInt($scope.editInProgressTodo.cost),
            'isComplete': false
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
        console.log('i am add');

        if ($scope.editingInProgress) {
            $scope.editingInProgress = false;
        }
        todoListSvc.postItem({
            'name': $scope.newToDoName,
            'cost': parseInt($scope.newToDoCost),
            'isComplete': false
        }).success(function (results) {
            $scope.loadingMsg = "";
            $scope.newToDoName = "";
            $scope.newToDoCost = 0;
            $scope.populate();
        }).error(function (err) {
            $scope.error = err;
            $scope.loadingMsg = "";
        })
    };
    // $scope.populate = function () {
    //     console.log('i am populate 2');

    //     todoListSvc.getMaxPrices().success(function (results) {
    //         $scope.todoList = results;
    //         $scope.loadingMessage = "";
    //     }).error(function (err) {
    //         $scope.error = err;
    //         $scope.loadingMessage = "";
    //     })
    // };
}]);
