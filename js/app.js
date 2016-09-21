
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
		var allMalePeoples, allFemalePeoples, data, peoples;
		
		if (response && response.data && response.data !== '') {
			allMalePeoples = [];
			allFemalePeoples = [];
			data = response.data;
			peoples = _.groupBy(data, function (people){
				return people.gender;
			});
			
			if (peoples && peoples !== undefined) {
				_.each(peoples, function (value, key) {
					var gender, persons;
					gender = key;
					persons = value;
					if (persons && persons.length > 0) {
						_.each(persons, function (person) {
							var pets;
							pets = person.pets;
							if (pets && pets.length > 0) {
								_.each(pets, function (pet) {
									var petName;
									if (pet.type.toUpperCase() === AGL.PETS.CAT) {
										petName = pet.name;
										if (gender.toUpperCase() === AGL.GENDER.MALE) {
											allMalePeoples.push(petName);
										} else {
											allFemalePeoples.push(petName);
										}
									}
								});
							}
						});
					}
				});
			}
			
			if (allMalePeoples.length > 0) {
				$scope.maleHeading = AGL.LABELS.HEADING_MALE;
				$scope.allMalePeoples = _.sortBy(allMalePeoples);
			}
			
			if (allFemalePeoples.length > 0) {
				$scope.femaleHeading = AGL.LABELS.HEADING_FEMALE;
				$scope.allFemalePeoples = _.sortBy(allFemalePeoples);
			}
		}
	}, function (response) {
		$scope.systemError = AGL.ERROR_MESSAGES.SYSTEM_ERROR;
	});
});

