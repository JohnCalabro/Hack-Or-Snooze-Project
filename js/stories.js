"use strict";


let storyList;

async function getAndShowStoriesOnStart() {
  
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();   

  putStoriesOnPage();
}

 function getTrashHTML() {
  return `
      <span class="trash-can">
        <i class="fas fa-trash-alt"></i>
      </span>`;
}

 function grabStar(story, user){
  
  const isFav = user.isFav(story);
  
  const starType = isFav ? "fas" : "far";
 
  return `
    <span class="star">
      <i class="${starType} fa-star"></i>
    </span>`;
}


function generateStoryMarkup(story, showDeleteBtn = false) {
  
  const hostName = 'www.code.com';
  const showStar = Boolean(currentUser);
  
  return $(`
      <li id="${story.storyId}">
      ${showDeleteBtn ? getTrashHTML() : ""}
      ${showStar ? grabStar(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

function putFavoritesListInContainer() {
  console.debug("putFavoritesListOnPage");

  $favoritedStories.empty();

  if (currentUser.favorites.length === 0) {
    $favoritedStories.append("<h5>No favorites added!</h5>");
  } else {
    
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $favoritedStories.append($story);
    }
    
  }
  $favoritedStories.show();
}

function putStoriesOnPage() {
 
  
  $allStoriesList.empty();

  for (let story of storyList.stories) {   
    const $story = generateStoryMarkup(story);   
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

async function deleteStory(evt) {
  
  const $closestLi = $(evt.target).closest("li");
  const storyId = $closestLi.attr("id");

  await storyList.removeStory(currentUser, storyId);

  await putUserStoriesOnPage();
}

$myStoryList.on("click", ".trash-can", deleteStory);

async function submitNewStory(evt) {
  evt.preventDefault();
  storyList = await StoryList.getStories();
  const title = $("#add-title").val();
  const url = $("#add-url").val();
  const author = $("#add-author").val();
  const username = currentUser.username;
  const storyData = {title, url, author, username };
  const story = await storyList.addStory(currentUser, storyData);
}

$submitForm.on("submit", submitNewStory);

function putUserStoriesOnPage() {
  console.debug("putUserStoriesOnPage");
  $myStoryList.empty();

  if (currentUser.ownStories.length === 0) {
    $myStoryList.append("<h5>No stories added by user yet!</h5>");
  } else {
    
    for (let story of currentUser.ownStories) {
      let $story = generateStoryMarkup(story, true);
      $myStoryList.append($story);
    }
  }

  $myStoryList.show();
}







async function toggleFavoriteStory(evt) {
  console.debug("toggleStoryFavorite");

  const $target = $(evt.target);   // do this must be wrapped in jQuery's $? 
  const $closestLi = $target.closest("li");

  
  const storyId = $closestLi.attr("id");
  console.log(storyId);
  const story = storyList.stories.find(s => s.storyId === storyId);

  // see if the item is already favorited (checking by presence of star)
  if ($target.hasClass("fas")) {
    // currently a favorite: remove from user's fav list and change star
    await currentUser.removeFavorite(story);
    $target.closest("i").toggleClass("fas far");
  } else {
    // currently not a favorite: do the opposite
    await currentUser.addFavorite(story);
    $target.closest("i").toggleClass("fas far");
  }
}

$storiesLists.on("click", ".star", toggleFavoriteStory);