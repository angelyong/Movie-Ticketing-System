<!DOCTYPE html>
<html>
    <head>
        <title>User Profile</title>
        <link rel="stylesheet" href="../styles.css"/>
    </head>
    <body onload="fetchUser()">
        <!--Header-->
        <?php
            include("../include/header.php");
        ?>

        <!--Body-->
        <main>
            <div class="container">
                <div class="profileContainer">
                    <h1>User Profile</h1>
                    <input id="userID" hidden>
                    <div class="inputField">
                        <label for="userName">User Name:</label>
                        <input id="userName" disabled>
                    </div>
                    <div class="inputField">
                        <label for="userEmail">E-mail:</label>
                        <input id="userEmail" disabled>
                    </div>
                    <div class="inputField">
                        <label for="userPhoneNo">Phone No.:</label>
                        <input id="userPhoneNo" disabled>
                    </div>
                    <div class="errorField">
                        <errorText id="errorText"></errorText>
                    </div>
                    <div id="buttonRow">
                        <a href="updateInfo.php"><button>UPDATE INFO</button></a>
                        <a href="updatePassword.php"><button>UPDATE PASSWORD</button></a>
                        <a onclick="logout()"><button id="logout">LOG OUT</button></a>
                    </div>
                </div>
            </div>
        </main>

        <!--Footer-->
        <?php
            include("../include/footer.php");
        ?>
        <script src="script.js"></script>
    </body>
</html>