var input = document.getElementById("pageinput");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("myBtn").click();
  }
});
function pageRedirect() {
  var page_number = document.getElementById("pageinput").value;
  if (page_number == "1") {
    window.location.href="/notes/index.html";
  } else {
    window.location.href="/notes/page-" + page_number + "/index.html";
  }
}
