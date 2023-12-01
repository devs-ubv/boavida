// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};


function simplifyDate(date){
  return date.split('T')[0];
}

function showErrorMessage(){
  setTimeout(function () {
    $("#myModal").hide();
    location.reload();
  }, 4000);
  setTimeout(function () {
    location.reload();
  }, 5000);
}



function ErrorMessage(responseText){
  if (responseText && responseText.error) {
      console.log(responseText);
      return responseText.error;
  }
}
