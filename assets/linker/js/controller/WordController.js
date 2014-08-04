angular.module("myapp", [])
.controller("WordController", function($scope, $http) {

    $scope.words = [];
    $scope.word = '';
    $scope.newWord = '';

    var that = this;

    this.loadWords = function() {
        $http({method: 'GET', url: '/word'})
        .success(function(data, status, headers, config) {
            console.log(data[0]);
            $scope.words = data;
            $scope.nextWord();
        })
        .error(function(data, status, headers, config) {
            console.log('error');
        });
    }

    $scope.nextWord = function() {
        $scope.word = $scope.words[Math.floor(Math.random() * $scope.words.length)].text;
    }

    $scope.know = function() {
        $scope.nextWord();
    }

    $scope.dontKnow = function() {
        $scope.nextWord();
    }

    $scope.addWord = function() {
        $http({method: 'GET', url: '/word/create', params: {text: $scope.newWord}})
        .success(function(data, status, headers, config) {
            that.loadWords();
        })
        .error(function(data, status, headers, config) {
            console.log('error');
        });
    }

    this.loadWords();
});