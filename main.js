var ngfm = angular.module("ngfm", []);
var views = [
	"league",
	"team",
	"match",
	"player"
];

ngfm.controller("mainController", function($scope, leagueService, teamService, playerService, matchService) {
	
	// set the default match events 
	$scope.events = "Match is about to kick-off...";
	$scope.matchMinute = matchService.getMinute();
	
	// setup current team
	teamService.setPlayers(playerService);	
	$scope.players = teamService.getPlayers();
	teamService.setTeam($scope);
	$scope.team = teamService.getTeam();
	$scope.formations = [
		{name: "4-4-2"},
		{name: "4-3-3"},
		{name: "3-5-2"}
	];
	$scope.formation = $scope.formations[1];
	
	// setup current team's league
	leagueService.setLeague(teamService);
	leagueService.setSeason();
	$scope.league = leagueService.getLeague();
	$scope.season = leagueService.getSeason();
	
	// setup match functionality
	$scope.startGame = function() {
		$scope.gamePlaying = true;
		$scope.halfTime = false;
		$scope.incrementMin();
		$scope.events = matchService.getEvent();
		return false;
	};
	$scope.incrementMin = function() {
		var timerId = setTimeout(function(){
			$scope.updateEvents();
		}, matchService.getMatchSpeed());
	};
	$scope.updateEvents = function() {
		matchService.incrementMinute();
		$scope.matchMinute = matchService.getMinute();
		if(matchService.getMinute() == 45) {
			$scope.halfTime = true;
			$scope.events = matchService.halfTime();
		}
		else if(matchService.getMinute() == 90) {
			$scope.events = matchService.endGame();
			$scope.gameOver = true;
		}
		else {
			$scope.events = matchService.getEvent();
			$scope.incrementMin();
		}	
		$scope.$apply();
	};
});

ngfm.service('leagueService', function () {
	var league, team, season;
	this.setLeague = function(teamService) {
		team = teamService.getTeam();
		league = [
			team.name,
			"Nottingham Forest",
			"Queens Park Rangers",
			"Wigan",
			"Burnley",
			"Leeds",
			"Brighton"];
	};
	this.setSeason = function() {
		season = {
			name : "Championship 2013 / 2014",
			fixture : 1,
			teams : league
		};
	};
	this.getLeague = function() {
		return league;
	};
	this.getSeason = function() {
		return season;
	};
});

ngfm.service('matchService', function() {
	var minute = 0, speed = 100;
	this.incrementMinute = function() {
		minute++;
	},
	this.getMinute = function() {
		return minute;
	},
	this.getMatchSpeed = function() {
		return speed;
	},
	this.getEvent = function() {
		var i = Math.floor(Math.random()*10)
		if( i == 2 )
			return "Winger runs down the left side of the pitch";
		else if( i == 3 )
			return "Winger runs down the right side of the pitch";
		else if( i == 4 )
			return "Center back puts his foot on the ball and looks up";
		else if( i == 5 )
			return "Striker shoots the ball! And misses";
		else
			return "Midfield is controlling the ball";
	},
	this.endGame = function() {
		return "Game over";
	},
	this.halfTime = function() {
		return "Half time";
	}
});

ngfm.factory('teamService', function () {
	var players = [];
	var team;
	return {
		setTeam: function($scope) {
			if(typeof team == 'undefined') {
				team = {
					name: "Leicester City",
					points: 0,
					players: $scope.players
				};
			}
		},
		setPlayers: function (playerService) {
			if(!players.length) {
				for(var i = 0; i <= 10; i++) {
					var player = { 
						name: "", 
						skills: { 
							attack: 0, 
							defence: 0 
						}
					};
					player.name = playerService.getName();
					player.skills = playerService.getSkills();
					players.push(player);
				} 		
			}
		},
		getPlayers: function () {
			return players;
		},
		getTeam: function() {
			return team;
		},
	};
});

ngfm.service('playerService', function() {
	this.getSkills = function() {
		return {
			attack: Math.floor(Math.random()*101),
			defence: Math.floor(Math.random()*101),
		};
	},
	this.getName = function() {
		var a = ["Roger", "Russell", "Clyde", "Egbert", 
			"Clare", "Bobbie", "Simon", "John", 
			"Ted", "Jack", "Wayne", "Sean"];
		return a[Math.floor(Math.random()*11)];
  }
});

ngfm.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'views/main.html',
		controller: 'mainController'
	})
	for (var i = 0; i < views.length; i++) {
		$routeProvider.when('/'+views[i], {
			templateUrl: 'views/'+views[i]+'.html',
			controller: 'mainController'
		});
	}
	/* $routeProvider.when('/match', {
		templateUrl: 'views/match.html',
		controller: 'matchController'
	}); */
}]);