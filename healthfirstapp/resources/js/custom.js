// JavaScript Document
 function validateLogin() {
         $('#loginform').bootstrapValidator({
			    message: 'This value is not valid',
    	        feedbackIcons: {
    	            valid: 'glyphicon glyphicon-ok',
    	            invalid: 'glyphicon glyphicon-remove',
    	            validating: 'glyphicon glyphicon-refresh'
    	        },
    	        live : 'enabled',
				  fields:{
					    
						   username:{
							   validators: {
								 notEmpty: {
									 message: 'Please enter your username or email'
								 }
							 }
						   },
						   password :{
							   validators: {
								 notEmpty: {
									 message: 'Please enter your password'
								 }
							 }
						   }
				  }
			  
			   
		   }); 
   } 
   
   function validateForgotPass(){
	   $('#forgotform').bootstrapValidator({
			    message: 'This value is not valid',
    	        feedbackIcons: {
    	            valid: 'glyphicon glyphicon-ok',
    	            invalid: 'glyphicon glyphicon-remove',
    	            validating: 'glyphicon glyphicon-refresh'
    	        },
    	        live : 'enabled',
				  fields:{
					    
						   username:{
							   validators: {
								 notEmpty: {
									 message: 'Please enter your registered email'
								 }
							 }
						   }
						   
				  }
			  
			   
		   }); 
   }