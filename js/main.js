"use strict";



const $body = $("body");

const $storiesLists = $('.stories-list');
const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");

const $favoritedStories = $("#favorited-stories");
const $ownStories = $("#my-stories");
const $myStoryList = $('#my-stories-list')

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");
const $submitForm = $("#subStoryForm");

const $submitLink = $("#submit-story");

const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");

function hidePageComponents() {
  const components = [
    $allStoriesList,
    $loginForm,
    $signupForm,
    $submitForm,
    $favoritedStories,
    $myStoryList
  ];
  components.forEach(c => c.hide());
}

async function start() {

  await checkForRememberedUser();
  await getAndShowStoriesOnStart();

  if (currentUser) updateUIOnUserLogin();
}

$(start);

