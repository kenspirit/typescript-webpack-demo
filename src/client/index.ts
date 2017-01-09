// <reference path="typings/angularjs/angular.d.ts" />
// <reference path="typings/angularjs/angular-route.d.ts" />

import 'angular';
import 'angular-route';
import 'angular-sanitize';
import 'angular-ui-bootstrap';
import * as _ from 'lodash';
import 'bootstrap.css';
import './sample.css';

import {Greeter} from './ts_greeter';
import {MarkSix, RedBlue} from './ts_lottery';
import RandomNumberProvider from './ts_random';

angular.module('home', ['ngRoute', 'ngSanitize', 'ui.bootstrap'])
  .config(function($routeProvider :angular.route.IRouteProvider, $locationProvider :angular.ILocationProvider) {
      $routeProvider
          .when('/markSix', {
              template: '<div>{{luckyNumbers}}</div>',
              controller: 'markSixController'
          })
          .when('/redBlue', {
              template: '<div ng-bind-html="trustHtml(luckyNumbers)"></div>',
              controller: 'redBlueController'
          })
          .when('/luckyDraw', {
              templateUrl: './src/client/luckyDraw.html',
              controller: 'luckyDrawController'
          });

      $locationProvider.html5Mode({
          enabled: true
      });
  })
  .controller('HomeController', function($scope) {
    $scope.greeting = new Greeter('Ken').greet();
    $scope.tabs = ['active', ''];

    $scope.setActive = function(idx) {
        for (var i = 0; i < $scope.tabs.length; i++) {
            if (i === idx) {
                $scope.tabs[i] = 'active';
            } else {
                $scope.tabs[i] = '';
            }
        }
    }
  })
  .controller('markSixController', function($scope) {
      let markSix = new MarkSix();
      $scope.luckyNumbers = markSix.draw();
  })
  .controller('redBlueController', function($scope, $sce) {
      let redBlue = new RedBlue();
      $scope.luckyNumbers = redBlue.draw();
      $scope.trustHtml = function(inputStr :string) {
          return $sce.trustAsHtml(inputStr.replace(/\n/g, '<br/>'));
      }
  })
  .controller('luckyDrawController', function($scope, $sce) {
    var picked = [];

    $scope.next = function() {
        var namesArray = $scope.names.split(',');
        var count = namesArray.length;
        var idx = RandomNumberProvider(count, 1)[0] - 1;

        $scope.lucky = namesArray.splice(idx, 1)[0];
        picked.push($scope.lucky);

        $scope.pickedNames = picked.join(',');
        $scope.names = namesArray.join(',');
    }

    $scope.reset = function() {
      $scope.names = 'Ken,Leo Liu,Jerome,Leo Li,Claire,Yellow,Charles,Winnie';
      $scope.pickedNames = '';
      $scope.lucky = '';

      picked.length = 0;
    }

    $scope.reset();
});


