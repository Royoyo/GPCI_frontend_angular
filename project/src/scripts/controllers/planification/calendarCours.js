webApp.controller('CoursDetails',
	function($scope, $modalInstance, Restangular, event, matieres, enseignants, classes, planCours){
        
        $scope.cours = {};   
            
        $scope.matieres = matieres;
        $scope.enseignants = enseignants;
        $scope.classes = classes;
        
        $scope.selectedMatiere = "";
        $scope.selectedEnseignant = "";
        $scope.formClasses = {};
        
        if(event.title == undefined) {
            $scope.creation = true;
        }
        else {
            $scope.creation = false;
        }
        
        if (!$scope.creation){
            planCours.getCoursSeul(event.id).then(
                function(cours){
                    Restangular.copy(cours,$scope.cours);
                    if(cours.matiere != undefined){
                        $scope.cours.title = cours.matiere.nom;
                        $scope.selectedMatiere = cours.matiere.id.toString(); 
                    }                       
                    if(cours.user != undefined){
                        $scope.cours.title += " | " + cours.user.lastName;
                        $scope.selectedEnseignant = cours.user.id.toString();
                    }
                    angular.forEach(cours.classes, function (classe) {
					   $scope.formClasses[classe.id] = true;
				    }, this);
                    listeners();
                },
                function(){
                    alert("Erreur lors du chargement des détails du cours sélectionné.");
                }
           );
        }
        else {
            $scope.cours = planCours.getNewCours();
            $scope.cours.start = event.start.format();
            $scope.cours.end = event.end.format();
            listeners();
        }
        
        angular.forEach(enseignants,function(enseignant){
            angular.forEach(enseignant.indisponibilite,function(indispo){
                if(event.start>moment(indispo.start) && event.end< moment(indispo.end))
                    enseignant.indisponible = true;
                else
                    enseignant.indisponible = false;
            })
        });
                
        function listeners(){
            $scope.$watch(function(){
                return $scope.selectedMatiere;
            }, function(value){
                $scope.enseignants = [];
                angular.forEach(enseignants,function(enseignant){
                    if(filtreEnseignants(enseignant))
                        $scope.enseignants.push(enseignant);
                });
            }, true);
            
            $scope.$watch(function () {
			 return $scope.formClasses;
            }, function (value) {
                $scope.cours.classes = [];
                angular.forEach($scope.formClasses, function (v, k) {
                    v && $scope.cours.classes.push(getObjectById($scope.classes,k));
                });
            }, true);       
        };       
        
        function filtreEnseignants(enseignant)
        {
            if ($scope.selectedMatiere == "")
                return true;
            
            var match = false;
            
            angular.forEach(enseignant.matieres,function(matiere){
                if(matiere.id == $scope.selectedMatiere)
                    match = true;
            });
            
            return match;
        }
        
        
        
        function getObjectById(objects,id) {
			for (var i = 0; i < objects.length; i++) {
				if (objects[i].id == id) {
					return objects[i];
				}
			}
		};
        
        $scope.save = function(){
            $scope.cours.user = getObjectById($scope.enseignants,$scope.selectedEnseignant);
            $scope.cours.matiere = getObjectById($scope.matieres,$scope.selectedMatiere);             
            $scope.cours.save().then(function(data){
                angular.copy($scope.cours.matiere,event.matiere);
                angular.copy($scope.cours.user,event.user);
                angular.copy($scope.cours.classes,event.classes);
                if($scope.cours.id == undefined){
                    $modalInstance.close(false, true);
                }
                else {
			        $modalInstance.close(false, false);
                }
            },function(data){
                alert("Erreur: " + data)
            });
            
		};
		
		$scope.cancel = function(){
			$modalInstance.dismiss('Annuler');
		};
        
        $scope.delete = function(){
            $scope.cours.remove();
			$modalInstance.close(true);
		};
	});