// Log Out From Current User
function logout() {
    sessionStorage.removeItem("loggedUserID");
    window.location.href = "../userAuthentication/";
}

// Return To Main Page
function back() {
    window.location.href = "../profile";
}

// Fetch User
function fetchUser() {
    let userID = sessionStorage.getItem("loggedUserID");
    fetch('dbFunction.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type: "fetchByID",
            userID: userID,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('userID').value = userID;
            document.getElementById('userName').value = data.userData.userName ?? "undefined";
            document.getElementById("userEmail").value = data.userData.userEmail ?? "undefined";
            document.getElementById("userPhoneNo").value = data.userData.userPhoneNo ?? "undefined";
        }
        else {
            window.alert("Error: " + data.error + "\nLogging Out of System");
            sessionStorage.removeItem("loggedUserID");
            window.location.href = "../userAuthentication/";
        }
    })
    .catch(error => {
        console.log(error);
    });
}

// Update User Info
function setUpdateForm() {
    document.getElementById('updateForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission

        // Send Data in Form
        const form = event.target;
        const formData = new FormData(form);

        fetch('dbFunction.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = "../profile/"
                window.alert("Account Updated Successfully");
            }
            else {
                document.getElementById("errorText").textContent = data.error;
            }
        })
        .catch(error => {
            console.log(error);
        });
    });
}

// Update User Password
function setPasswordForm() {
    document.getElementById('userID').value = sessionStorage.getItem("loggedUserID");
    document.getElementById('passwordForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission

        // Send Data in Form
        const form = event.target;
        const formData = new FormData(form);

        fetch('dbFunction.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = "../profile/"
                window.alert("Password Updated Successfully");
            }
            else {
                document.getElementById("errorText").textContent = data.error;
            }
        })
        .catch(error => {
            console.log(error);
        });
    });
}