function search() {
	var searchPhrase = $("#searchbar-question").val();
	window.location.href = '#/search/' + searchPhrase;
}

var translationApp = angular.module('translationApp', [
	'ngRoute',
	'ngAnimate',
	'ngCookies',
	'components',
	'hubControllers'
]);



translationApp.config(['$routeProvider', function ($routeProvider, $routeParams, auth) {
	$routeProvider.
	//	login
	when('/login', {
		templateUrl: '/template/login.ejs',
		controller: 'LoginCtrl'
	}).
	//	logout
	when('/logout', {
		templateUrl: '/template/login.ejs',
		controller: 'LogoutCtrl'
	}).
	//	search
	when('/search/:phrase', {
		templateUrl: '/template/story-container.ejs',
		controller: 'SearchCtrl'
	}).
	//	newsfeed
	when('/newsfeed/:userid', {
		templateUrl: '/template/story-container.ejs',
		controller: 'NewsFeedCtrl'
	}).
	//	profile
	when('/profile/:userid', {
		templateUrl: '/template/profile.ejs',
		controller: 'ProfileCtrl'
	}).
	//	translation
	when(
		'/translation/:questionid', {
		templateUrl: '/template/translation.ejs',
		controller: 'TranslationCtrl'
	}).
	//	create question
	when(
		'/create', {
		templateUrl: '/template/create.ejs',
		controller: 'CreateQuestionCtrl'
	}).
	//	homepage
	otherwise ({
		redirectTo: '/'
	});

}]);