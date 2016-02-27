// Utilisé dans la view calendar des indisponibilités de l'enseignant
// Sert de template pour les checkbox Matin/Après-midi/Journée
webApp.directive('eventChoices', function() {
  return {
    scope: {
      date: '@',
      start: '@',
      end: '@',
      addIndispo: '&'
    },
    templateUrl: 'templates/eventChoice.html',
    link: function(scope,elem,attr){
        if(scope.start === "08:00" && scope.end === "12:15"){
            scope.time = 1;
        }
        else if (scope.start === "13:15" && scope.end === "17:30"){
            scope.time = 2;
        }
        else if (scope.start === "08:00" && scope.end === "17:30"){
            scope.time = 3;
        }
        else{
            scope.time = 0;
        }
        
        scope.change = function(){
            switch (scope.time) {
                case 0:
                    scope.start = null;
                    scope.end = null;
                    break;
                case 1:
                    scope.start = "08:00";
                    scope.end = "12:15";
                    break;
                case 2:
                    scope.start = "13:15";
                    scope.end = "17:30";
                    break;
                case 3:
                    scope.start = "08:00";
                    scope.end = "17:30";
                    break;              
            }
            scope.addIndispo(scope.date,scope.start,scope.end);
        }
    }
  };
});