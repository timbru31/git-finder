'use strict';

let pathArray = window.location.href.split('/');
let protocol = pathArray[0];
let host = pathArray[2];
let url = `${protocol}//${host}`;
let gitURL = `${url}/.git/`;
let svnURL = `${url}/.svn/`;

performAjaxRequest(gitURL, 'git');
performAjaxRequest(svnURL, 'svn');


function performAjaxRequest(url, versionSystem) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        addBox(url, versionSystem);
      }
    }
  };
  xhr.open('HEAD', url, true);
  xhr.send(null);
}

function addBox(url, versionSystem) {
  let div = document.createElement('div');
  div.className = `${versionSystem}-finder`;
  div.innerText = `This site has an accessible .${versionSystem} URL: ${url}`;
  document.body.appendChild(div);
  div.classList.add(`${versionSystem}-finder-fade-in`);

  setTimeout(() => {
    div.classList.remove(`${versionSystem}-finder-fade-in`);
    div.classList.add(`${versionSystem}-finder-fade-out`);
  }, 7000);
}
