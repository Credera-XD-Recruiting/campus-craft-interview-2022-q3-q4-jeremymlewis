import { removeChildNodes } from "../utils";

/**
 * Function which generates a single Card node based on a dataset
 *
 * @param {object} data data containing attributes of a card
 * @return {Node} generated markup for a card
 */
const generateCardNode = (data) => {
  const {
    authorFirstName,
    authorLastName,
    authorAvatarSrc,
    jobTitle,
    companyName,
    post,
    publishDate,
    state,
    city,
  } = data;
  const templateId = "profile-post-item-template";
  const resultCardTemplate = document.getElementById(templateId);
  const clone = document.importNode(resultCardTemplate.content, true);
  const authorName = clone.querySelector(".post-author-info .page-paragraph");
  const jobDesc = clone.querySelector(".post-author-info .page-micro");
  const postNode = clone.querySelector(".post-content");
  const avatarNode = clone.querySelector(".post-author-avatar");
  const dateNode = clone.querySelector(".post-date-published");
  const locationNode = clone.querySelector(".post-location");
  const expandButton = clone.querySelector(".expand-button");

  authorName.innerHTML = `${authorFirstName} ${authorLastName}`;
  jobDesc.innerHTML = `${jobTitle} @ ${companyName}`;
  postNode.innerHTML = post;
  dateNode.innerHTML = `Published on: ${publishDate}`;
  locationNode.innerHTML = `From: ${city}, ${state}`;
  
  expandButton.addEventListener("click", expandOrCondense);
  let postIsExpanded = false;
  function expandOrCondense() {
    if (!postIsExpanded) {
      document.getElementById("expanded").style.display = "block";
      postIsExpanded = true;
      expandButton.innerHTML = "See Less"
    } else {
      document.getElementById("expanded").style.display = "none";
      postIsExpanded = false;
      expandButton.innerHTML = "See More"
    }
  }

  if (authorAvatarSrc) {
    const avatarImg = document.createElement("img");
    avatarImg.src = authorAvatarSrc;
    avatarImg.setAttribute(
      "aria-label",
      `${authorFirstName} ${authorLastName}`
    );
    avatarNode.appendChild(avatarImg);
  } else {
    let initials = authorFirstName.charAt(0) + authorLastName.charAt(0);
    const avatarImg = document.createElement("h1");
    avatarImg.innerHTML = initials;
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
export const generatePinnedPostsFromTemplate = (resultsData) => {
  const pinnedPostsList = document.querySelector(
    "#profile-posts .profile-post-results"
  );

  removeChildNodes(pinnedPostsList);

  if (resultsData.pinnedPost) {
    const postNode = generateCardNode(resultsData.pinnedPost);
    pinnedPostsList.appendChild(postNode);
  }
};
