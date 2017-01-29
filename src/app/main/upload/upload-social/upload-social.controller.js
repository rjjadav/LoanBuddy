'use strict';

angular.module('app.upload')
.controller('UploadSocialController', UploadSocialController);

UploadSocialController.$inject = ['$rootScope','$state','$facebook'];

function UploadSocialController($rootScope, $state, $facebook){
	var social = this;
	
	social.connectWithFacebook = connectWithFacebook;


	function connectWithFacebook(){
		$facebook.login()
		.then(function(response){
			console.log(response);
			$facebook.api('/me',
			{
				fields: "about, age_range,birthday,context,cover,education,email,favorite_athletes,favorite_teams,first_name,gender,hometown,id,interested_in,currency,devices,inspirational_people,install_type,installed,is_shared_login,is_verified,languages,last_name,locale,location,link,middle_name,name,name_format,political,public_key,quotes,relationship_status,religion,significant_other,sports,third_party_id,timezone,updated_time,verified,viewer_can_send_gift,work,accounts,achievements,albums,books,admined_groups,events,friendlists"
				// "name,gender,birthday,picture,email,id,about,cover"
			}
			)
			.then(function(data){
				console.log(data);
			})
		})
	}
}