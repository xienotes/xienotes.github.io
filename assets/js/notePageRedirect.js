var input = document.getElementById("pageinput");
input.addEventListener("focus", function() {
  input.value = "";
});
input.addEventListener("focusout", function() {
  input.value = input.placeholder;
});
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   var page_number = input.value;
   if (page_number == "1") {
     window.location.href="/notes/index.html";
   } else {
     window.location.href="/notes/page-" + page_number + "/index.html";
   }
  }
});