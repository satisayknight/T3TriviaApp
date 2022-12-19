function nav() {
  let nav = document.getElementById("nav");
  nav.innerHTML = "Home";
  nav.style.textAlign = "left";
  nav.style.color = "white";
  nav.style.backgroundColor = "#6564DB";
  nav.style.width = "100%";
  nav.style.padding = "10px 10px 10px";
  nav.style.top = "0";
  nav.style.position = "fixed";

  return nav;
}

function footer() {
  let footer = document.getElementById("footer");
  footer.innerHTML = "Created by: Joe G., Sarthak S., Kiaya A.";
  footer.style.background = "#6564DB";
  footer.style.width = "100%";
  footer.style.padding = "10px 10px 10px";
  footer.style.bottom = "0";
  footer.style.position = "fixed";
  footer.style.color = "white";
  footer.style.textAlign = "center";

  return footer;
}
body.appendChild(nav(), footer());
