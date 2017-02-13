'use strict';

angular.module('app').directive('appHead',[function(){
    return {
        restrict:'AE',
        replace:true,
        templateUrl:'view/template/head.html'
    }
}]);