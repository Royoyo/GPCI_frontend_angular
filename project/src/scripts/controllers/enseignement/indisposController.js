webApp.controller('EnsIndisponibilitesController',
	function ($scope, $modal, ensIndisponibilite, Restangular) {
        
        $scope.indispos = [];

		updateTable();
        
        $scope.openDetails = function (indispo) {
			//Il faut mettre l'idList dans $scope pour qu'il soit accessible dans resolve:
			$scope.indispo = indispo;

			var modalDetails = $modal.open({
				animation: true,
				templateUrl: "modals/indisposDetails.html",
                controller: "IndisposDetails",
				size: "md",
				resolve: {
					indispo: function () {
						return $scope.indispo;
					}
				}
			});

			modalDetails.result.then(function () {
				updateTable();
			});
		};
        
        $scope.remove  = function(indispo){
            indispo.remove();
            updateTable();
        }
        
		function updateTable() {
			ensIndisponibilite.getIndispos().then(function (indispos) {
                angular.forEach(indispos, function (element) {
                    element.start = moment(element.start).format("DD-MM-YYYY");
                    element.end = moment(element.end).format("DD-MM-YYYY");
				})
				Restangular.copy(indispos, $scope.indispos);
				$scope.indisposView = [].concat($scope.indispos);
			});
		}   
        
	});