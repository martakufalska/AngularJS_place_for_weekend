    var app = angular.module('placeForWeekend', []);
    app.controller('table', function($scope, $http) {
        $scope.cities = ["Lviv", "Paris"];
        $scope.citiesParam = [];
    
        $scope.buildTable = function () {
            angular.forEach($scope.cities,function(value){
                $http.get("http://api.apixu.com/v1/current.json?key=984e067367df4bacb68120750181402&q="+value)
                .then(function(response) {
                 $scope.cityParam(value, response); 
                 });
             });
        }

        $scope.cityParam = function (value, response){
            let oneRow = {name: value};
            $http.get("http://api.apixu.com/v1/current.json?key=984e067367df4bacb68120750181402&q="+value)
            .then(function(response) {
                oneRow.temperature=response.data.current.temp_c;
                oneRow.condition=response.data.current.condition.text;
                oneRow.goingToVisite=false;
                oneRow.visited=false;
                $scope.citiesParam.push(oneRow); 
                return oneRow;  
            });
        }

        $scope.buildTable();

        $scope.display = {}; 
        $scope.newCity = "";

         $scope.modalBox = function () {
             if ($scope.newCity == "") console.log(1);
             else {
                $http.get("http://api.apixu.com/v1/current.json?key=984e067367df4bacb68120750181402&q="+$scope.newCity)
                .then(function(response) {
                    var row = "<tr>\
                        <td>"+$scope.newCity+"</td>\
                        <td>"+response.data.current.temp_c+"</td>\
                        <td>"+response.data.current.condition.text+"</td>\
                        <td> <input type=\"checkbox\" name=\"going-to-visit\"> </td>\
                        <td> <input type=\"checkbox\" name=\"visited\"> </td>\
                        </tr>";
                    $('#cityTable').append(row);
                    $scope.saveInLocalStor();
                })
                .catch(function(e) {
                   $scope.message = "City name is invalide. Please try again.";
                });
             }
         }

         $scope.saveInLocalStor = function () {
            let jsonCities = JSON.stringify($scope.citiesParam);
            localStorage.setItem('citiesObj', jsonCities);
         }

         $scope.goToVisitChange = function (nameVal, checkbVal) {
            console.log ("Funk");
             let len = citiesParamList.length;
            for (let i = 0; i < len; i++){
                if (citiesParamList[i].name == nameVal){
                    citiesParamList[i].goingToVisite = checkbVal;
                    $scope.saveInLocalStor();
                    break;
                }
            }
         }

        $scope.visitedChange = function (nameVal, checkbVal) {
            let len = citiesParamList.length;
           for (let i = 0; i < len; i++){
               if (citiesParamList[i].name == nameVal){
                   console.log (i, nameVal, checkbVal);
                   citiesParamList[i].visited = checkbVal;
                   $scope.saveInLocalStor();
                   break;
               }
           }
        }

        $scope.refreshTable = function () {

        }

    });

 