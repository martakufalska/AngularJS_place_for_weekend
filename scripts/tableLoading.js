    var app = angular.module('placeForWeekend', []);
    var citiesParamList = [];
    app.controller('table', function($scope, $http) {
        $scope.cities = ["Lviv"];
        $scope.citiesParam = [];
        angular.forEach($scope.cities,function(value){
            let oneRow = {name: value};
            $http.get("http://api.apixu.com/v1/current.json?key=984e067367df4bacb68120750181402&q="+value)
            .then(function(response) {
            oneRow.temperature=response.data.current.temp_c;
            oneRow.condition=response.data.current.condition.text;
            });  
            $scope.citiesParam.push(oneRow);   
            citiesParamList.push(oneRow); 
         });

         $scope.display = {}; 
         $scope.newCity = "";
         $scope.modalBox = function () {
             if ($scope.newCity == "") console.log(1);
             else {
                var row = "<tr>";
                var myEl = angular.element( document.querySelector('#cityTable').appendChild(row));
             }
         }
      

    });
