// ^ HTML elements
var siteName= document.getElementById("siteName");
var siteUrl= document.getElementById("siteUrl");
var siteTable= document.getElementById("siteTable");

// & App variable
siteList = JSON.parse(localStorage.getItem("sites")) || [];
displayAllSites();

// ? Functions
function addSite() {
    if (validate(nameRegex,siteName) && validate(urlRegex,siteUrl)) {
        var site = {
            name: siteName.value,
            url: siteUrl.value,
        };
        siteList.push(site);
        localStorage.setItem("sites" , JSON.stringify(siteList) );
        displaySite(siteList.length - 1);
        clearInputs();
    }   else {
        alert("Site name must contain at least 3 characters \nSite URL must be a valid one")
    }

}

function displaySite(index) {
    var siteHtml = `
    <tr>
      <td>${index + 1}</td>
      <td>${siteList[index].name}</td>
      <td><a href="${siteList[index].url}" target="_blank"><button class="visit-btn border border-1 text-capitalize"><i class="fa-solid fa-eye me-2"></i>visit</button></a></td>
      <td><button class="delete-btn border border-1 text-capitalize" onclick="deleteSite(${index})"><i class="fa-solid fa-trash-can me-2"></i>delete</button></td>                           
    </tr>
    `;
    siteTable.innerHTML += siteHtml;
}

function displayAllSites() {
    for(var i = 0; i<siteList.length; i++) {
        displaySite(i);
    }
}

function deleteSite(index) {
    siteList.splice(index , 1);
    localStorage.setItem("sites" , JSON.stringify(siteList));
    siteTable.innerHTML="";
    displayAllSites();
}

var nameRegex = /^[a-zA-Z0-9_][a-zA-Z0-9_]{2,}$/;
var urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9\-_#]+)*\/?$/;
function validate(regex, element){
    if (regex.test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        return true;
    }   
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        return false;

    
}

function clearInputs() {
    siteName.value= "";
    siteUrl.value= "";
}
