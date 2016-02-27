webApp.factory('planSalles',
	function(Restangular){
		return {
			getClasses: function(){
				return Restangular.all('plan/salles').getList();
			},
			
			getClasse: function(id){
				return Restangular.one('plan/salles',id).get();
			},
            getNewClasse: function(){
				return Restangular.one('plan/salles');
			},
			postClasse: function(classe){
				Restangular.all('plan/salles').post(classe);
			},
			deleteClasse: function(classe){
				classe.remove();
			}
		}
	})