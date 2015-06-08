var signupApp = angular.module('signupApp', []);


signupApp.controller('leftCtrl', ['$scope', '$sce', function($scope, $sce) {
	$scope.htmlGreen = '<i class="fa fa-calendar fa-3x"></i> <span><strong>Free</strong> 60 days trial</span>';
	$scope.trustedHtmlGreen = $sce.trustAsHtml($scope.htmlGreen);
	
	$scope.htmlBlue = '<i class="fa fa-headphones fa-3x"></i> <span><strong>Free</strong> expert help</span>';
	$scope.trustedHtmlBlue = $sce.trustAsHtml($scope.htmlBlue);
	
	$scope.htmlorangeText = '<i class="fa fa-credit-card fa-3x"></i> <span><strong>No</strong> credit card required</span>';
	$scope.trustedHtmlOrange = $sce.trustAsHtml($scope.htmlorangeText);
}])


signupApp.controller('signupCtrl',
    function signupCtrl($scope,$http) {
		
        $scope.images = {
           callIcon: 'images/callicon.png',
        }
		
		

    }
);


var cn=0;

signupApp.controller('createuserCtrl', function ($scope, $http, $attrs, $location) {

    var self = this;
    self.submit = function () {
     
    var txtFirstName = $('#txtFirstName').val();
    var txtLastName = $('#txtLastName').val();
    var txtEmail = $('#txtEmail').val();
    
    
     
     
    var txtdomain = $('#txtdomain').val();
    var txtCompanyName = $('#txtCompanyName').val();
    var txtUserName = $('#txtUserName').val();
    var txtcode = $('#txtcode').val();
    var txtExtn = $('#txtExtn').val();
    console.log(txtExtn)
    
    var txtPhoneNumber = $('#txtPhoneNumber').val();
    txtPhoneNumber = txtcode+txtPhoneNumber;
    txtPhoneNumber = txtPhoneNumber +"X"+txtExtn
    console.log(txtPhoneNumber)
    //var txtExtn = $('#txtExtn').val();
    var txtCaptcha = $('#txtCaptcha').val();
    var txtpromocode = $('#txtpromocode').val();
    var jsonObj = {
       'firstName':txtFirstName,'lastName':txtLastName,'emailId':txtEmail,'subDomain':txtdomain,'companyName':txtCompanyName,'userName':txtUserName,'phoneNumber':txtPhoneNumber,'PromoCode':"aaa"
    };
    
    var jsonObjEmail = {
       'emailId':txtEmail
    };
    var jsonObjDomain = {
       'subDomain':txtdomain
    };
    var a = $('form').validate().errorMap
	var count = 0;
	var emailCount = 0;
	var domainCount = 0;
	var i;
	for (i in a) {
		if (a.hasOwnProperty(i)) {
			count++;
		}
	}
	$http({
		method: 'POST',
		url: EMAIL_API,
		data: JSON.stringify(jsonObjEmail),
		//data: $.param({fkey: "key"}),
		headers: {'Content-Type': 'application/json'}
	}).success(function(data,$event) {
			
			var exists = data.data.isExists;
			if(exists==true){
					//$('#txt_error_email').html('');
					var txtMailval = $('#txtEmail').val();
					if(txtMailval !=''){
					$('#txt_error_email').html('Email already exists in our record');
					}
					$('#txtEmail').addClass('errorborder');
					$('#txt_error_email').show();
					$('#txt_error_email').attr('aria-invalid','true')
					//count++;
					
				}
				else{
					console.log('in elseeeeeeeee')
					$('#txt_error_email').hide();
					$('#txtEmail').removeClass('errorborder');
					count--;
					
				}
			})
	$http({
		method: 'POST',
		url: DOMAIN_API,
		data: JSON.stringify(jsonObjDomain),
		//data: $.param({fkey: "key"}),
		headers: {'Content-Type': 'application/json'}
	})
	
	var capEnter = $('#txtCaptcha').val();
	var capActual = $('#txtCaptchahidden').val();
	if(capEnter == ''){
		$('#alert').text('Please enter captcha');
		count++;
	}
	else if(capActual == capEnter.toLowerCase()){
		//console.log('hjagdsdjf')
		$('#alert').hide();
		
	}
	else{
		$('#alert').text('Please enter correct captcha');
		count++;
	}
		
	console.log(count); //check for error
	var emailtextval = $('#emailTxt').val();
	if((count == 0)&&(emailtextval == 0)){
	$http({
		method: 'POST',
		url: SIGNUP_API,
		data: JSON.stringify(jsonObj),
		//data: $.param({fkey: "key"}),
		headers: {'Content-Type': 'application/json'}
	})
	
	/*var pop = function(){
		$('#screen').css({	"display": "block", opacity: 0.7, "width":$(document).width(),"height":$(document).height()});
		$('body').css({"overflow":"hidden"});
		$('#box').css({"display": "block"}).click(function(){$(this).css("display", "none");$('#screen').css("display", "none")});
	}()*/
	$('#myModal').modal('show'); 
     var htmlTextforMail = '';
     if(txtEmail.indexOf('gmail')>0)
     {
	htmlTextforMail = '<a href="http://www.gmail.com" target="_blank">check your inbox and spam</a>';
	
     }
     else if(txtEmail.indexOf('yahoo')>0){
	htmlTextforMail = '<a href="http://www.mail.yahoo.com" target="_blank">check your inbox and spam</a>';
     }
     else if(txtEmail.indexOf('hotmail')>0){
	htmlTextforMail = '<a href="http://www.hotmail.com" target="_blank">check your inbox and spam</a>';
     }
     else {
	htmlTextforMail = 'check your inbox and spam';
     }
     
     $('#mailcondition').html(htmlTextforMail);
     
     
     $('#mailcondition').on( "click", function() {
		window.location.href = 'http://qa1-sprint620151reports.eureqatest.xyz/faces/authentication/login.jsp';
	});
     $( "#okbtnurl" ).on( "click", function() {
		window.location.href ='http://qa1-sprint620151reports.eureqatest.xyz/faces/authentication/login.jsp';
	});
	
	
	}
	
	

		


    
    }
});




signupApp.controller('verifyEmail',function verifyEmail($scope,$http) {
	
	$scope.emailExistCtrl = function (email) {
		
		var jsonObjEmail = {
			'emailId':email
		};
		$http({
			method: 'POST',
			url: EMAIL_API,
			data: JSON.stringify(jsonObjEmail),
			//data: $.param({fkey: "key"}),
			headers: {'Content-Type': 'application/json'}
		}).success(function(data) {
			
			var exists = data.data.isExists;
			console.log('sdjasd'+email)
			if(email !=''){
			if(exists==true){
			
					//$('#txt_error_email').html('')
					$('#txt_error_email').html('Email already exists in our record');
					$('#emailTxt').val('1')
					$('#txtEmail').addClass('errorborder');
					if(document.getElementById('txtEmail-error')){
						if(document.getElementById('txtEmail-error').style.display == 'none'){
							$('#txt_error_email').show();	
							
						}
						else{
							$('#txt_error_email').hide();	
						}
					}
					
					
					
				}
				else{
					$('#emailTxt').val('0')
					$('#txt_error_email').hide();
					$('#txtEmail').removeClass('errorborder');
				}
			}
			else{
				$('#txt_error_email').hide();
			}
			})
			
			
	   
	}
	
});


signupApp.controller('verifyDomain',function verifyDomain($scope,$http) {
	
	$scope.domainExistCtrl = function (domain) {
		var jsonDomainEmail = {
			'subDomain':domain
		};
		$http({
			method: 'POST',
			url: DOMAIN_API,
			data: JSON.stringify(jsonDomainEmail),
			//data: $.param({fkey: "key"}),
			headers: {'Content-Type': 'application/json'}
		}).success(function(data) {
			var exists = data.data.isExists;
			console.log(domain+'qweewqq')
			
			if(domain !=''){
			if(exists==true){
					//$('#txt_error_email').html('')
					$('#txt_error_domain').html('Domain already exists in our record');
					$('#txtdomain').addClass('errorborder');
					$('#txt_error_domain').show();	
					$('#txtdomain-error').hide();	
					
					
				}
				else{
					$('#txt_error_domain').hide();
					$('#txtdomain').removeClass('errorborder');
				}
			}
			else{
			$('#txt_error_domain').hide();	
			}
			})
	   
	}
	
});

function codeCtrl($scope,$http) {
	$.get("http://ipinfo.io", function(data) {
		var userLoc = data.country;
		$http.get("json/countrycode.json")
    		.success(function(response) {
				$scope.name = response;
				var cntCode;
				for(var i=0;i<$scope.name.length;i++){
					cntCode = $scope.name[i].code;
					if(cntCode==userLoc){
							console.log($scope.name[i].dial_code)
							$scope.ccode = $scope.name[i].dial_code
						}
					}
			});
		
	}, "jsonp");
	
    
}





