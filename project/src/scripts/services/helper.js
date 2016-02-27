webApp.factory('helper', function () {
    return {
        //Permet de récupérer l'objet d'un array par son id en indiquant le nom de la propriété par laquelle
        // il faut itérer.
        getObjectFromArray: function (arr, property , id) {
            var result = arr.filter(function (o) { return o[property] == id; });

            return result ? result[0] : null;
        }
    }
});