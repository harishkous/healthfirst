(function(){
	
	var app = angular.module("HFSApp", ['ngRoute','ngAnimate', 'ngProgressLite','ngMaterial']);
	 var o = $.AdminLTE.options;
	app.config(function($routeProvider){
		$routeProvider
			.when( '/', { title:'Health First | Dashboard', controller: 'HomePageCtrl', templateUrl: 'dashboard.html',animation:'loadAnimate' } )
			.when( '/food-items', { title:'Health First | Manage Food Items', controller: 'ItemsPageCtrl', templateUrl: 'food-items.html',animation:'loadAnimate' } )
			.when( '/menu-planner', { title:'Health First | Menu Planner', controller: 'MenuPageCtrl', templateUrl: 'menu-planner.html',animation:'loadAnimate' } )
			.otherwise({ redirectTo: '/'});
	});
	
	// change Page Title based on the routers
	app.run(['$location', '$rootScope', '$window','ngProgressLite',function($location, $rootScope,$window, ngProgressLite) {
		$rootScope.$on('$routeChangeStart', function (event, current, previous) {
			$rootScope.animation = current.animation;
			ngProgressLite.start();
			ngProgressLite.set(0.4);
			ngProgressLite.inc();
		});
		
		$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
			 
			if(current.$$route.title)$rootScope.title = current.$$route.title;
			// headerPhone();
			 ngProgressLite.done();
			//$window.ga('send', 'pageview', { page: $location.url() });
		});
		
	}]);
	var scriptLoaded = false;
	app.controller('HomePageCtrl', function($scope, $window) { 	
		init_app();
	});
	 app.controller('ItemsPageCtrl', function($http,$scope, $window) { 	
		$scope.search = '';
		$scope.categories=["Continental","Starters","Snacks","Soups","Alcoholic beverages","Pickles"];
		$scope.types=["Veg","Non-veg","Ova"];
		$scope.healthiness=["Healthy","Average","Un-healthy"];
		$scope.cookingMethods=["Fried","Roasting","Deep fried","Broiling","Frying"];
		
			$http.get('/resources/json/items.json').
				success(function(data, status, headers, config) {
				  $scope.items = data;
				}).
				error(function(data, status, headers, config) {
				  // log error
				});
				$scope.filterItemsByCategory = function(category){
						 
						if(category)$scope.search = category;
						else
							$scope.search ='';
					};
					
				$scope.filterItemsByMethod = function(method){
						if(method)$scope.search = method;
						else
							$scope.search ='';
					};
				$scope.filterItemsByType = function(isChecked, type){
						 type = type.replace("-","");
						 type = type.toLowerCase();
						if(type && isChecked)$scope.search = type;
						else
							$scope.search ='';
					};
				$scope.filterItemsByHealthiness = function(isChecked, healthiness){
					console.log(isChecked+"/"+healthiness);
					if(healthiness && isChecked)$scope.search = healthiness;
					else
						$scope.search ='';
				};
			
		 $('input').iCheck({
			checkboxClass: 'icheckbox_flat-blue',
			radioClass: 'iradio_flat-blue'
		  });	 
		  $.AdminLTE.pushMenu.activate(o.sidebarToggleSelector);
		  $scope.myDate = new Date();
		  
	 });
	 
	  app.controller('MenuPageCtrl', function($http,$scope, $window) { 
			$scope.search = '';
		$scope.categories=["Continental","Starters","Snacks","Soups","Alcoholic beverages","Pickles"];
		$scope.types=["Veg","Non-veg","Ova"];
		$scope.healthiness=["Healthy","Avg","Un-healthy"];
		$scope.cookingMethods=["Fried","Roasting","Deep fried","Broiling","Frying"];
		$scope.allergens =["Cereals","Fish","Nuts","Peanuts","Sesame","Milk","Mustard","Soya","Eggs"];
		$scope.calorie=50;
		$http.get('/resources/json/items.json').
			success(function(data, status, headers, config) {
			  $scope.items = data;
			}).
			error(function(data, status, headers, config) {
			  // log error
			});
			 
			 $.AdminLTE.pushMenu.activate(o.sidebarToggleSelector);
	   });
	   
	     
	 init_app = function(){
		 
		 $.widget.bridge('uibutton', $.ui.button);
			 //bootstrap WYSIHTML5 - text editor
			//$(".textarea").wysihtml5(); 
			  
			  $('.daterange').daterangepicker({
					ranges: {
					  'Today': [moment(), moment()],
					  'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
					  'Last 7 Days': [moment().subtract(6, 'days'), moment()],
					  'Last 30 Days': [moment().subtract(29, 'days'), moment()],
					  'This Month': [moment().startOf('month'), moment().endOf('month')],
					  'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
					},
					startDate: moment().subtract(29, 'days'),
					endDate: moment()
				  }, function (start, end) {
					window.alert("You chose: " + start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
				  });
				  //The Calender
				  $("#calendar").datepicker();

				  //SLIMSCROLL FOR CHAT WIDGET
				  
				  /* The todo list plugin */
				  $(".todo-list").todolist({
					onCheck: function (ele) {
					  window.console.log("The element has been checked");
					  return ele;
					},
					onUncheck: function (ele) {
					  window.console.log("The element has been unchecked");
					  return ele;
					}
				  });
				  $.AdminLTE.pushMenu.activate(o.sidebarToggleSelector);
				  
				  //Add slimscroll to navbar dropdown
				  if (o.navbarMenuSlimscroll && typeof $.fn.slimscroll != 'undefined') {
					$(".navbar .menu").slimscroll({
					  height: o.navbarMenuHeight,
					  alwaysVisible: false,
					  size: o.navbarMenuSlimscrollWidth
					}).css("width", "100%");
				  }
				  $('body').tooltip({
					  selector: o.BSTooltipSelector
					});
			
	 }
	 
	 
  
app.directive('icheck', ['$timeout', function($timeout){
		return {
			require: 'ngModel',
			link: function($scope, element, $attrs, ngModel) {
				return $timeout(function() {
					var value = $attrs['value'];
					$scope.$watch($attrs['ngModel'], function(newValue){
						//$(element).iCheck('update');
										 $('input').iCheck({
							checkboxClass: 'icheckbox_flat-blue',
							radioClass: 'iradio_flat-blue'
						  });	

					})

					/*return $(element).iCheck({
						checkboxClass: 'icheckbox',
					}).on('ifChanged', function(event) {
						if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
							$scope.$apply(function() {
								return ngModel.$setViewValue(event.target.checked);
							});
						}
						if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
							return $scope.$apply(function() {
								return ngModel.$setViewValue(value);
							});
						}
					});*/
				});
			}
		};
	}]);	
	 
  
})();