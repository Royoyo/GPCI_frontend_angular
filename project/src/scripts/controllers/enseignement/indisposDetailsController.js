webApp.controller('IndisposDetails',
	function ($scope, $timeout, $modalInstance, Restangular,ensIndisponibilite, indispo) {
        
        $scope.indispo = {};
        $scope.today = new Date();
        $scope.pickerDateDebut = false;
		$scope.pickerDateFin = false;
        
        if(indispo == -1) {
            $scope.creation = true;
        }
        else {
            $scope.creation = false;
        }

        if (!$scope.creation){
            ensIndisponibilite.getIndispo(event.id).then(
                function(indispo){
                    Restangular.copy(indispo,$scope.indispo);
                }
           );
        }
        else {
            $scope.indispo = ensIndisponibilite.getNewIndispo();
        }
        
        $scope.openDatePicker = function(i){
            $timeout(function () {
                if (i==1)
                {
                    $scope.pickerDateDebut = true;
                }
                else
                {
                    $scope.pickerDateFin = true;
                }
            });			
		}
        
        $scope.save = function(){
            $scope.indispo.save().then(function(){
			    $modalInstance.close();
            });
		};
		
		$scope.cancel = function(){
			$modalInstance.dismiss('Annuler');
		};
        
        $scope.delete = function(){
            $scope.indispo.remove();
			$modalInstance.close();
		};
	});