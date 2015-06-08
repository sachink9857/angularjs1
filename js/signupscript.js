$(document).ready(function(){
	$('#txtPhoneNumber').mask('(000)-000-0000');
	$('#txtExtn').mask('00000');
	$('#txtcode').mask('+000');
	$('#txtFirstName').focus()
	var captcha = ["zjdns", "12s12", "cdc33","ndf21","osd43","sdede","22cdr","55sdg","53asd","mkn76","yyd87","nmf57","vjds1","jkl47","ojurs","cbsa4","bch73","d87sd","fdq32"];
	var catchaLen = captcha.length;
	var rndSel = Math.floor((Math.random() * catchaLen) );
	var tCtx = document.getElementById('textCanvas').getContext('2d'),
	imageElem = document.getElementById('image');
	tCtx.canvas.width = tCtx.measureText(this.value).width;
	tCtx.fillText(captcha[rndSel].toUpperCase(), 0, 10);
	imageElem.src = tCtx.canvas.toDataURL();
	$('#txtCaptchahidden').val(captcha[rndSel])
    

});

function refreshCaptcha(){
	var captcha = ["zjdns", "12s12", "cdc33","ndf21","osd43","sdede","22cdr","55sdg","53asd","mkn76","yyd87","nmf57","vjds1","jkl47","ojurs","cbsa4","bch73","d87sd","fdq32"];
	var catchaLen = captcha.length;
	var rndSel = Math.floor((Math.random() * catchaLen));
	var tCtx = document.getElementById('textCanvas').getContext('2d'),
	imageElem = document.getElementById('image');
	tCtx.canvas.width = tCtx.measureText(this.value).width;
	tCtx.fillText(captcha[rndSel].toUpperCase(), 0, 10);
	imageElem.src = tCtx.canvas.toDataURL();
	$('#txtCaptchahidden').val(captcha[rndSel])
}


$('form').validate({
    onfocusout: function (element) {
    
        $(element).valid();
		var checkvalid = $(element).attr('aria-invalid');
			if(checkvalid == 'true'){
				$( element ).addClass( "errorborder" );
			}
			else{
				$( element ).removeClass( "errorborder" );		
			}
			//$('#txt_error_email').show();
		var capEnter = $('#txtCaptcha').val();
		var capActual = $('#txtCaptchahidden').val();
		if(capEnter == ''){
			$('#alert').text('Please enter captcha');
		}
		else if(capActual == capEnter.toLowerCase()){
			//console.log('hjagdsdjf')
			$('#alert').hide();
		}
		else{
			$('#alert').text('Please enter correct captcha');
		}
		
		},
    rules: {
		txtFirstName:{
					required: true,
					//accept: "[a-zA-Z]+",
					accept:"[^0-9)(*&^%$#@!={}:;><?/]+",
					//accept:"[a-zA-Z ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝאבגדהוחטיךכלםמןנעףפץצשתûü‎ÿ]",
					minlength:2,
					maxlength:32
				},
				
		
		txtLastName:{
					required: true,
					accept:"[^0-9)(*&^%$#@!={}:;><?/]+",
					minlength:2,
					maxlength:32
				},
		txtEmail:{
					required: true,
					email: true,
					//accept:'[\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4}'
					
					
				},
		
		txtUserName:{
					required: true,
					//accept: "[^\x00-\x7F]+",
					accept:"[a-zA-Z0-9 ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝאבגדהוחטיךכלםמןנעףפץצשתûü‎ÿ]",
					//accept: "/^[a-zÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝאבגדהוחטיךכלםמןנעףפץצשתûü‎ÿ\\s]$/",
					minlength:8,
					maxlength:13
				},
		txtdomain:{	
				required:true,
				accept:"[a-zA-Z0-9 ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝאבגדהוחטיךכלםמןנעףפץצשתûü‎ÿ]",
				minlength:2,
				maxlength:64
				},
		txtCompanyName:{	
				required:true,
				accept:"[a-zA-Z0-9 ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝאבגדהוחטיךכלםמןנעףפץצשתûü‎ÿ]",
				maxlength:64
				},
		recaptcha_response_field:'required',
		txtPhoneNumber:'required',
		txtcode:'required'
        

    },
    messages: {
        txtFirstName:{
					required: "Please enter your first name",
					accept: "First name should be alphabet or international characters ",
					minlength:"First name should be  2-32 character",
					maxlength:"First name should be  2-32 character"
				},
		txtLastName:{
					required:"Please enter your last name",
					accept:"Last name should be alphabet or international characters",
					minlength:"Last name should be  2-32 character",
					maxlength:"Last name should be  2-32 character"
			},
		txtEmail:{
					required: "Please enter your email",
					email: 'Please enter a valid email'
					
				
				},
		txtUserName:{
					required: "Please enter your username",
					accept:"Please enter valid username, must be 8-13 characters.",
					minlength:"Username must be  8-13 character",
					maxlength:"Username must be  8-13 character"
				},
		txtdomain:{
					required: "Please enter a domain name",
					accept:"Please enter valid domain name, Domain name should be alphabets, numbers or international characters",
					minlength:"Domain name must be  2-64 character",
					maxlength:"Domain name must be  2-64 character"
					
				},
		txtCompanyName:{
					required: "Please enter your company name",
					accept:"Please enter valid company name, Company name should be alphabets, numbers or international characters",
					maxlength:"Company name must be  1-64 character"
				},
						
		
		
		txtPhoneNumber:'Please enter phone number',
		txtcode:'Please enter country code',
		txtCaptcha:'Please enter captcha'
       
    }
});

jQuery.validator.addMethod("accept", function(value, element, param) {
  return value.match(new RegExp("." + param + "$"));
});



