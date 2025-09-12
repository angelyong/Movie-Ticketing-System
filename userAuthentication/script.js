const container = document.getElementById('loginContainer');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// Switch Toggle Panel
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Fetch Sign in
document.getElementById('signinForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;
    const formData = new FormData(form);

    fetch('dbFunction.php', {
            method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            sessionStorage.setItem('loggedUserID', data.userID);
            window.location.href = '../';
        }
        else {
            document.getElementById("signinErrorText").textContent = data.error;
        }
    })
    .catch(error => {
        console.error(error);
    });
});

// Fetch Sign up
document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;
    const formData = new FormData(form);

    fetch('dbFunction.php', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            sessionStorage.setItem('loggedUserID', data.userID);
            window.location.href = '../';
            window.alert("Account Registered Successfully");
        }
        else {
            document.getElementById("signupErrorText").textContent = data.error;
        }
    })
    .catch(error => {
        console.log(error);
    });
});