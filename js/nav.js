"use strict";

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();    
  putStoriesOnPage();   
}

$body.on("click", "#nav-all", navAllStories);  

function navLoginClick(evt) {    
  console.debug("navLoginClick", evt);
  hidePageComponents();   
  $loginForm.show();   
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);    

function navNewStoryClick(e){
  console.log(e, 'event')
  hidePageComponents();
  $allStoriesList.show();
  $submitForm.show();
}

$submitLink.on("click", navNewStoryClick);


function navFavoritesClick(evt) {
  console.debug("navFavoritesClick", evt);
  hidePageComponents();
  putFavoritesListInContainer();
}

$body.on("click", "#nav-favorites", navFavoritesClick);

function navOwnStories(evt) {
  console.debug("navMyStories", evt);
  hidePageComponents();
  putUserStoriesOnPage();
  $myStoryList.show();
}

$body.on("click", "#my-stories", navOwnStories);

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();   
  $navLogOut.show(); 
  $navUserProfile.text(`${currentUser.username}`).show();     
}

