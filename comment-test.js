var signInEl = document.querySelector('#signIn');
var signOutEl = document.querySelector('#signOut');

function onSignIn(googleUser) 
{
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); 
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());

  var myUserEntity = {};
  myUserEntity.Id = profile.getId();
  myUserEntity.Name = profile.getName();
  myUserEntity.ImgUrl = profile.getImageUrl();
  myUserEntity.Email = profile.getEmail();

  sessionStorage.setItem('myUserEntity',JSON.stringify(myUserEntity));

	signOutBtn();
}

var signInBtn = function () {
	gapi.signin2.render('signIn', {
            'onsuccess': 'onSignIn'  
    });
};

var signOutBtn = function () {
	var btn = '<button id=\"signOut\">Sign out</button>';
	signOutEl.innerHTML = btn;
}


function checkIfLoggedIn() {
	if (sessionStorage.getItem('myUserEntity') !== null ) {
//	var userIn = gapi.auth2.init().isSignedIn.get();
//	if (userIn === true) {
		console.log('User already logged in');
		var userEntity = {};
		userEntity = JSON.parse(sessionStorage.getItem('myUserEntity'));
		signOutBtn();
	} else {
		console.log('not logged in yet');
//		signInBtn();
	}
};


  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
	sessionStorage.clear();
	signOutEl.innerHTML = '';
//	signInBtn();
  };
  

document.body.addEventListener('click', function(e) {
	if (e.target.id === 'signOut') {
		signOut();
	} else if (e.target.id === 'signIn') {
		console.log('click \| ' + e.target.id);
	}
});

document.addEventListener('DOMContentLoaded', function(){
	checkIfLoggedIn();
});
