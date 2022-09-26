import underlineSrc from "../assets/underline.svg";

export const updateProfileInformation = (data) => {
  const { firstName, lastName, avatarSrc } = data;
  const headerNode = document.querySelector("#profile-header .profile-header");
  const profileAvatarNode = headerNode.querySelector("img");
  const avatarNode = headerNode.querySelector(".profile-avatar")
  const nameNode = headerNode.querySelector(".profile-info .profile-info-name");
  const underlineNode = headerNode.querySelector(".profile-underline");

  underlineNode.setAttribute("src", underlineSrc);

  nameNode.classList.remove(
    "loading",
    "skeleton-block",
    "skeleton-block--half"
  );

  nameNode.innerHTML = `${firstName} ${lastName}`;
  nameNode.appendChild(underlineNode);
  profileAvatarNode.src = avatarSrc;
  profileAvatarNode.setAttribute("aria-label", `${firstName} ${lastName}`);

  if (!avatarSrc) {
    profileAvatarNode.remove();
    let initials = firstName.charAt(0) + lastName.charAt(0);
    const avatarImg = document.createElement("h1");
    avatarImg.innerHTML = initials;
    avatarNode.appendChild(avatarImg);
  }
};
