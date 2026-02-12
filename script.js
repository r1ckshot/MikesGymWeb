let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
    menu.classList.toggle("bx-x");
    navbar.classList.toggle("active");
}

window.onscroll = () => {
    menu.classList.remove("bx-x");
    navbar.classList.remove("active");
}

//Typing text code
const typed = new Typed('.multiple-text', {
    strings: ['What is love?', 'Oh baby, don\'t hurt me', 'Don\'t hurt me', 'No more\n', 'Baby, don\'t hurt me,', 'Don\'t hurt me', 'No more'],
    typeSpeed: 60,
    backSpeed: 60,
    backDelay: 1000,
    loop: true
});

//Fetch Api - quote generator
const quoteContainer = document.getElementById("quote");
const btn = document.getElementById("quote_btn");
const url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single"

let getQuote = () => {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(item => {
            quoteContainer.textContent = `${item.joke}`;
        })
        .catch(error => {
            console.log('Fetch error: ', error);
            quoteContainer.textContent = "Failed to load joke.";
        });
}

btn.addEventListener("click", getQuote);
getQuote();


//Form Validation
function checkText(text_id, objectRegex) {

    var objectText = document.getElementById(text_id);
    return objectRegex.test(objectText.value);

}

function checkRadio(radioName) {

    var object = document.getElementsByName(radioName);
    for (i = 0; i < object.length; i++) {
        choosen = object[i].checked;
        if (choosen) return true;
    }
    return false;
}


function checkDate() {
    var dateInput = document.getElementById("date").value;

    //If Date is not empty
    if (!dateInput) {
        document.getElementById("spnIsDataValid").innerHTML = "&#x2716;";
        return false;
    }

    const birthDate = new Date(dateInput);
    const today = new Date();
    const minAge = 18; // Minimalny wiek użytkownika
    const ageDate = new Date(today - birthDate.getTime());
    const age = ageDate.getUTCFullYear() - 1970;

    // If User has 18+
    if (age < minAge) {
        document.getElementById("spnIsDataValid").innerHTML = "&#x2716;";
        return false;
    } else {
        document.getElementById("spnIsDataValid").innerHTML = "&#x2714;";
        return true;
    }
}


function validate(){
    var ok = true;

    fullName = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/
    email = /^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+/;
    phoneNumber = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    address = /^(?![ -.&,_'":?!/])(?!.*[- &_'":]$)(?!.*[-.#@&,:?!/]{2})[a-zA-Z0-9- .#@&,_'":.?!/]+$/

    //Name
    if (!checkText("fullName", fullName)) {
        ok = false;
        document.getElementById("spnIsfullNameValid").innerHTML = "&#x2716;";
    } else{
        document.getElementById("spnIsfullNameValid").innerHTML = "&#x2714;";
    }

    //Email
    if (!checkText("email", email)) {
        ok = false;
        document.getElementById("spnIsEmailValid").innerHTML = "&#x2716;";
    } else{
        document.getElementById("spnIsEmailValid").innerHTML = "&#x2714;";
    }

    //City
    if(document.getElementById("city").value === "-1"){
        ok = false;
        document.getElementById("spnIsCityValid").innerHTML = "&#x2716;";
    }
    else{
        document.getElementById("spnIsCityValid").innerHTML = "&#x2714;";
    }

    //DOB
    if (!checkDate()) {
        ok = false;
    }

    //Phone
    if (!checkText("phoneNumber", phoneNumber)) {
        ok = false;
        document.getElementById("spnIsPhoneValid").innerHTML = "&#x2716;";
    } else{
        document.getElementById("spnIsPhoneValid").innerHTML = "&#x2714;";
    }

    //Address
    if (!checkText("address", address)) {
        ok = false;
        document.getElementById("spnIsAddressValid").innerHTML = "&#x2716;";
    } else{
        document.getElementById("spnIsAddressValid").innerHTML = "&#x2714;";
    }

    if (!checkRadio("gender")) {
        ok = false;
        document.getElementById("spnIsGenderValid").innerHTML = "&#x2716;";
    } else{
        document.getElementById("spnIsGenderValid").innerHTML = "&#x2714;";
    }

    // If all validations passed, store the data in localStorage
    if (ok) {
        const userData = {
            fullName: document.getElementById("fullName").value,
            email: document.getElementById("email").value,
            dateOfBirth: document.getElementById("date").value,
            phoneNumber: document.getElementById("phoneNumber").value,
            city: document.getElementById("city").value,
            address: document.getElementById("address").value,
            gender: document.querySelector('input[name="gender"]:checked').value
        };

        let users = JSON.parse(localStorage.getItem('users')) || [];
        let foundIndex = users.findIndex(user => user.fullName === userData.fullName);

        if (foundIndex !== -1) {
            // Aktualizacja istniejącego użytkownika
            users[foundIndex] = userData;
            alert("User data updated!");
        } else {
            // Dodawanie nowego użytkownika
            users.push(userData);
            alert("Registration Successful!");
        }

        localStorage.setItem('users', JSON.stringify(users));
    }

    return false;

}

function resetForm(){
    document.getElementById("spnIsfullNameValid").innerHTML = "";
    document.getElementById("spnIsEmailValid").innerHTML = "";
    document.getElementById("spnIsCityValid").innerHTML = "";
    document.getElementById("spnIsDataValid").innerHTML = "";
    document.getElementById("spnIsPhoneValid").innerHTML = "";
    document.getElementById("spnIsAddressValid").innerHTML = "";
    document.getElementById("spnIsGenderValid").innerHTML = "";
}

//Local Storage Manipulations
//See Last User (max 3)
function displayLastThreeUsers() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let reviews = document.querySelectorAll('.review-item');
    let numOfUsersToShow = Math.min(users.length, 3);  // Maksymalnie 3 ostatnich użytkowników

    for (let i = 0; i < numOfUsersToShow; i++) {
        let userIndex = users.length - 1 - i;  // Pobierz użytkowników zaczynając od ostatniego
        let userData = users[userIndex];

        // Ustawianie danych użytkownika w odpowiednich elementach
        reviews[i].querySelector('h2').textContent = userData.fullName;
        reviews[i].querySelector('p').textContent = `Email: ${userData.email}, Phone: ${userData.phoneNumber}, 
        City: ${userData.city}, Address: ${userData.address}, Gender: ${userData.gender}, DOB: ${userData.dateOfBirth}`;
    }
}

document.getElementById('see').addEventListener('click', displayLastThreeUsers);

//Clear all Users
function clearAllUsers() {
    // Pobieranie danych użytkownika z localStorage
    let users = JSON.parse(localStorage.getItem('users'));

    // Sprawdzenie, czy istnieją jakieś dane do usunięcia
    if (users && users.length > 0) {
        if (confirm("Are you sure you want to remove all users?")) {
            localStorage.removeItem('users');  // Usuwa wszystkich użytkowników z localStorage
            alert("All user data has been cleared!");
        }
    }
}

document.getElementById('clear_all').addEventListener('click', clearAllUsers);