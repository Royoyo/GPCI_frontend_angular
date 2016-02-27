webApp.controller('SalleDetails',
	function($scope, $timeout, $modalInstance,  planSalles, Restangular, salle){
		
		$scope.salle = {};
        
		if (salle === -1) 
		{
			$scope.creation = true;
		}
		else
		{
			$scope.creation = false;
		}
        
        if(!$scope.creation){
            planSalles.getClasse(salle.id).then(function (salle){
                $scope.salle = salle;
			});
        }
        else {
            $scope.salle = planSalles.getNewClasse();
        }
		
		$scope.save = function (salle) {
            salle.save().then(function(){
                $modalInstance.close();
            })  
            
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('Annuler');
		};
	});