
var AGL = {
	GENDER: {
		MALE: 'MALE',
		FEMALE: 'FEMALE'
	},
	
	PETS: {
		CAT: 'CAT',
		DOG: 'DOG'
	},
	
	LABELS: {
		HEADING_MALE: 'Male',
		HEADING_FEMALE: 'Female'
	},
	
	URL: {
		JSON_FILES_PEOPLE: 'js/data/people.json'
	},
	
	ERROR_MESSAGES: {
		SYSTEM_ERROR: 'There is some issues at the moment. You could wait or call on AGL Helpdesk'
	}
};


var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
	if ($scope.systemError !== '') {
		$scope.systemError = '';
	}
	$http.get(AGL.URL.JSON_FILES_PEOPLE).then(function (response) {
		var data, petType, peoplesByGender, catNamesByGender;
		
		if (response && response.data && response.data !== '') {
			data = response.data;
			petType = AGL.PETS.CAT;
			peoplesByGender = _.groupBy(data, function (person) {
				return person.gender;
			});
			catNamesByGender = getCatNamesByGender(peoplesByGender, petType);
			$scope.catNamesByGender = catNamesByGender;
		}
	}, function (response) {
		$scope.systemError = AGL.ERROR_MESSAGES.SYSTEM_ERROR;
	});
});

function getCatNamesByGender(peoples, petType) {
	var catNames = {};
	if (peoples) {
		_.each(peoples, function (value, gender) {
			var gender, petNames;
			gender = gender;
			petNames = [];
			_.each(value, function (person) {
				var pets = person.pets;
				if (pets && pets.length > 0) {
					_.each(pets, function (pet) {
						if (pet.type.toUpperCase() === petType) {
							petNames.push(pet.name);
						}
					});
				}
			});
			catNames[gender] = _.sortBy(petNames);
		});
	}
	return catNames;
}