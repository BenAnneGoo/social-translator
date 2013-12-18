var hubControllers = angular.module('hubControllers', []);



hubControllers.factory('auth', ['$cookies', '$cookieStore', function($cookies, $cookieStore) {
	var currentUser = null;

	return {

		login: function() {
			currentUser = {
				_id:			$cookies.userID,
				name:			$cookies.name,
				accessToken:	$cookies.accessToken,
				facebook:		{
					id : $cookies.facebookID
				}
			};
			return currentUser;
		},

		logout: function() {
			//clear the user object
			currentUser = null;

			//delete the authentication cookies.
			$cookieStore.remove("userID");
			$cookieStore.remove("name");
			$cookieStore.remove("accessToken");
			$cookieStore.remove("facebookID");

			// $cookies.userID = "";
			// $cookies.name = "";
			// $cookies.accessToken = "";
			// $cookies.facebookID = "";
		},

		isLoggedIn: function() {
			return (currentUser != null);
		},

		currentUser: function() { return currentUser; }
	};
}]);


/** Login */
hubControllers.controller('LoginCtrl', ['$scope', '$http', 

	function ($scope, $http) {
		//TODO: write the api and conect it
		$http.get('')
			.success(function(data) {

			});
			// .error(function(data) {
				
			// });
	}]
);

hubControllers.controller('LogoutCtrl', ['$scope', '$http', 'auth',

	function ($scope, $http, auth) {

		console.log("Logging out.");
		auth.logout();
		console.log(auth.currentUser());

		$http.get('')
			.success(function(data) {

			});
			// .error(function(data) {
				
			// });
	}]
);

/** Search */
hubControllers.controller('SearchCtrl', ['$scope', '$http', '$routeParams',

	function ($scope, $http, $routeParams) {
		var phrase = $routeParams.phrase;

		$http.get('/api/search/52ab55bfde63fb1250282e75/' + phrase)
			.success(function(data) {
				$scope.stories = data;
				$scope.page = {title : "Results"};
			});
			// .error(function(data) {
				
			// });

		//TODO use this effectively or get rid of it
		$scope.orderProp = 'text';
	}]
);


/**	News Feed */
hubControllers.controller('NewsFeedCtrl', ['$scope', '$http', '$routeParams',

	function ($scope, $http, $routeParams) {
		var userid = $routeParams.userid;

		//TODO: write the api and conect it
		$http.get('/api/feed/news/' + userid)
			.success(function(data) {
				$scope.user = data;
				$scope.page = {title : "News Feed"};
			});
			// .error(function(data) {
				
			// });

		//TODO use this effectively or get rid of it
		$scope.orderProp = 'text';
	}]
);


/**	Profile Page */
hubControllers.controller('ProfileCtrl', ['$scope', '$http', '$routeParams', 'auth',

	function ($scope, $http, $routeParams, auth) {
		var userid = $routeParams.userid;

		$scope.currentUser = auth.login();

		console.log($scope);

		// console.log(auth.login());
		
		$http.get('api/profile/' + userid)
			.success(function(data) {

				//TODO: remove debugging
				console.log("Received data!");
				console.log(data);

				$scope.user = data.user;
				$scope.questionStories = data.questionStories;
				$scope.answerStories = data.answerStories;
				//$scope.followers = data.user.followers;
			});
			// .error(function(data) {
				
			// });
	}]
);


/** Translation Page */
hubControllers.controller('TranslationCtrl', ['$scope', '$http', '$routeParams', 'auth',

	function ($scope, $http, $routeParams, auth) {
		var questionid = $routeParams.questionid;

		$scope.currentUser = auth.login();

		$http.get('/api/question/' + questionid)
			.success(function(data) {
				$scope.question = data.question;
			});
			// .error(function(data) {
				
			// });

		$scope.postComment = function() {
			console.log("You posted a comment!");
		};

		$scope.postAnswer = function() {

			//Prepare form data.
			$scope.formData.question	= $scope.question._id;
			$scope.formData.author		= auth.currentUser()._id;
			//TODO: remove debugging
			console.log("Form data:", $scope.formData);

			//Submit the form.
			$http.post('api/answer/create', $scope.formData)
			.success(function(data) {

				//TODO: Make this better!

				//Redirect them back to the translation page
				console.log("Received this data from the server: ", data);
				// window.location.href = '#/translation/' + $scope.question._id;

				var newAnswer = data;
				newAnswer.author = auth.currentUser();
				$scope.question.answers.push(newAnswer);
			});

		};
	}]
);


/**	Create question Page */
hubControllers.controller('CreateQuestionCtrl', ['$scope', '$http', 'auth',

	function ($scope, $http, auth) {

		$scope.currentUser = auth.login();

		//TODO: write the api and conect it
		$http.get('/api/languages/')
			.success(function(data) {
				$scope.languages = data;
			});
			// .error(function(data) {
				
			// });
		
		$scope.createQuestion = function() {
			console.log($scope.formData);
			//TODO remove this

			var author = auth.currentUser()._id;
			$scope.formData.author = author;

			$http.post('api/question/create', $scope.formData)
			.success(function(data){
				//Redirect them to the translation page
				console.log(data);
				questionId = data._id;
				window.location.href = '#/translation/' + questionId;
			});
			// .error(function(data) {
			// 	// TODO tell the user
			// });
	    }
	}]
);
