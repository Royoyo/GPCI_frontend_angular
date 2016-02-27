webApp.controller('MatiereDetails',
	function($scope, $timeout, $modalInstance,  planMatieres, Restangular, matiere){
		
		$scope.matiere = {};
        
		if (matiere === -1) 
		{
			$scope.creation = true;
		}
		else
		{
			$scope.creation = false;
		}
        
        if(!$scope.creation){
            planMatieres.getMatiere(matiere.id).then(function (matiere){
				Restangular.copy(matiere,$scope.matiere);
			});
        }
        else {
            $scope.matiere = planMatieres.getNewMatiere();
        }
        
		$scope.save = function (matiere) {
            matiere.save();
            $modalInstance.close();
		};
        
        $scope.delete = function (matiere) {
            matiere.remove();
            $modalInstance.close();
		};
        
		$scope.cancel = function () {
			$modalInstance.dismiss('Annuler');
		};        
	});