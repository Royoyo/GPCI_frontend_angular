webApp.factory('ensIndisponibilite',
	function(Restangular){
		return {			
            getNewIndispo: function(){
				return Restangular.one('ens/indispo');
			},
            getIndispo: function(id){
				return Restangular.all('ens/indispo', id).get();
			},
            getIndispos: function(){
				return Restangular.all('ens/indispo').getList();
			},
            postIndispo: function(indispo){
				Restangular.all('ens/indispo').post(indispo);
			},
            deleteIndispo: function(indispo){
				indispo.remove;
			},
		}
	})