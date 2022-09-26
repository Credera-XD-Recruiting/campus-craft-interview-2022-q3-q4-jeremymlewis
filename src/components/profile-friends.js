import { removeChildNodes } from "../utils";

/**
 * Function which generates a single list-item node based on a dataset
 *
 * @param {object} data data containing attributes of a listItem
 * @return {Node} generated markup for a card
 */
const generateListItemNode = (data) => {
  const { avatarSrc, name, jobTitle, companyName, topFriend } = data;
  const templateId = "friend-list-item-template";
  const resultCardTemplate = document.getElementById(templateId);
  const clone = document.importNode(resultCardTemplate.content, true);
  const nameNode = clone.querySelector("p.page-paragraph");
  const titleNode = clone.querySelector("p.page-micro");
  const avatarNode = clone.querySelector(".profile-list-item-avatar");
  const friendFlagNode = clone.querySelector("p.top-friend-flag");

  nameNode.innerHTML = `${name}`;
  titleNode.innerHTML = `${jobTitle} @ ${companyName}`;
  avatarNode.src = avatarSrc;
  avatarNode.setAttribute("aria-label", `${name}`);
  
  if (topFriend) {
    friendFlagNode.innerHTML = "Top Friend";
  }

  if (avatarSrc) {
    const avatarImg = document.createElement("img");
    avatarImg.src = avatarSrc;
    avatarImg.setAttribute("aria-label", `${name}`);
    avatarNode.appendChild(avatarImg);
  }

  return clone;
};

/**
 * Function which accepts the JSON results from the API, and uses HTML templates
 * to generate the markup needed for the results list
 *
 * @param {object} resultsData JSON payload of results
 */
export const generateFriendsListFromTemplate = (resultsData) => {
  const friendsListSection = document.querySelector(
    "#profile-friends .profile-friends-list"
  );

  if (resultsData.friends && resultsData.friends.length > 0) {
    removeChildNodes(friendsListSection);

    
    //Results are split into two arrays to differentiate between precedence
    let topFriends = [];
    let regularFriends = [];

    //Sorting Functions sort first by Top Friend, and secondly by last name
    for (let i = 0; i < resultsData.friends.length; i++) {
      if (resultsData.friends[i].topFriend) {
        topFriends.push(resultsData.friends[i]);
      } else {
        regularFriends.push(resultsData.friends[i]);
      }
    }

    topFriends.sort(function(friend1, friend2){
      if(friend1.name.split(" ")[1] < friend2.name.split(" ")[1]) { return -1; }
      if(friend1.name.split(" ")[1] > friend2.name.split(" ")[1]) { return 1; }
      return 0;
    })

    regularFriends.sort(function(friend1, friend2){
      if(friend1.name.split(" ")[1] < friend2.name.split(" ")[1]) { return -1; }
      if(friend1.name.split(" ")[1] > friend2.name.split(" ")[1]) { return 1; }
      return 0;
    })

    for (let i = 0; i < topFriends.length; i++) {
      const friendsNode = generateListItemNode(topFriends[i]);
      friendsListSection.appendChild(friendsNode);
    }
    for (let i = 0; i < regularFriends.length; i++) {
      const friendsNode = generateListItemNode(regularFriends[i]);
      friendsListSection.appendChild(friendsNode);
    }

  }
};
