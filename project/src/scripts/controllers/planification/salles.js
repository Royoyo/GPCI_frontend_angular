webApp.controller('PlanSallesController',
	function($scope, $modal, planSalles, Restangular){
		
		$scope.salles = [];        
		updateTable();
		
		$scope.openDetails = function (salle) {
			//Il faut mettre l'idList dans $scope pour qu'il soit accessible dans resolve:
			$scope.salle = salle;

			var modalDetails = $modal.open({
				animation: true,
				templateUrl: "modals/sallesDetails.html",
				controller: "SalleDetails",
				size: "md",
				resolve: {
					salle: function () {
						return $scope.salle;
					}
				}
			});

			modalDetails.result.then(function () {
				updateTable();
			});
		};
		
        $scope.delete = function(salle){
            salle.remove();
            updateTable();
        }
        
		function updateTable() {
			planSalles.getClasses().then(function(salles){
			$scope.salles = salles;
			$scope.sallesView = [].concat($scope.salles);
			})
		}
	});