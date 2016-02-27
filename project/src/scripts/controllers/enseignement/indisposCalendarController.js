webApp.controller('EnsCalendarIndisponibilitesController',
	function ($scope, uiCalendarConfig, helper, ensIndisponibilite){ 
		
        $scope.today = new moment();
        $scope.indispos = [];
        
        update();     
		       
		$scope.changeView = function(view,calendar) {
			uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
		};
        
        $scope.dayRender = function(date, cell) {
            if(date > $scope.today)
            {
                var start = 0;
                var end = 0;
                var dateF = date.format("YYYY-MM-DD");
                var indispo = helper.getObjectFromArray($scope.indispos,'date', dateF);
                if (indispo != null || indispo != undefined){
                    start = moment(indispo.start).format('HH:mm');
                    end = moment(indispo.end).format('HH:mm');
                }
                cell.append("<event-choices start=\"" + start + "\" end=\"" + end + "\" date=\"" + dateF + "\"></event-choices>");
                cell.append("<p>Test</p>");
            }           
        };
        
        
        //TO DO : gérer la liste indispos
        $scope.addIndispo = function(date,start,end){
            
            var indispo = helper.getObjectFromArray($scope.indispos,'date', date.format("YYYY-MM-DD"));
            
            //Si existe dans liste indispos, on le supprime
            if(indispo != null){
                $scope.indispos = $scope.indispos.filter(function(ele){ele.date != date.ele});
            }
            
            //Si indispo rajoutée, on push une nouvelle indispos dans la liste
            if(start != null && end != null){
                $scope.indispos.push({ start: moment(date + start, 'YYYY-MM-DDHH:mm'), end: moment(date + end, 'YYYY-MM-DDHH:mm')});
            }
        };
        
        /* Configuration du calendrier */
		$scope.uiConfig = {
			calendar:{
				height: 540,
				editable: false,
				header:{
					left: 'title',
					right: 'today prev,next'
				},
				weekends : false,
				weekNumbers : true,
				eventRender: $scope.eventRender,
                dayRender: $scope.dayRender,
				minTime: "08:00:00",
				maxTime: "17:30:00",
				dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
				dayNamesShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
				monthNames: ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]
			}
		};
        
        /* Données du calendrier */
        
		$scope.eventsGoogle = {
			googleCalendarId: 'fr.french#holiday@group.v.calendar.google.com',
			googleCalendarApiKey: 'AIzaSyAbOYkIfOWcqCnHEs_Mlf0JuT0HJ8TVq1M',
			className: 'gcal-event',
			currentTimezone: 'Europe/Paris'
		};

		/* Arrays avec données de base du calendrier (au chargement de la page) */
		$scope.eventSources = [$scope.eventsGoogle];
        
        //TO DO Rajouter lazy loading (avec start & end du mois)
        function update(){
            ensIndisponibilite.getIndispos().then(function(indispos){
                 indispos.forEach(function(indispo) {
                     indispo.date = moment(indispo.start).format("YYYY-MM-DD");
                 }, this);
                $scope.indispos = indispos;
        });
        }
	});