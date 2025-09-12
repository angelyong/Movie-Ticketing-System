<!DOCTYPE html>
<html>
    <head>
        <title>Update Password</title>
        <link rel="stylesheet" href="../styles.css"/>
    </head>
    <body onload="setPasswordForm()">
        <!--Header-->
        <?php
            include("../include/header.php");
        ?>
        
        <!--Body-->
        <main>
            <div class="container">
                <div class="profileContainer">
                    <h1> Update Password</h1>
                    <form id="passwordForm">
                        <input name="operationType" value="updatePassword" hidden>
                        <input id="userID" name="userID" hidden>
                        <div class="inputField">
                            <label for="userPassword1">New<br>Password:</label>
                            <input id="userPassword1" name="userPassword1" type="password" placeholder="New Password" maxlength="50" required>
                        </div>
                        <div class="inputField">
                            <label for="userPassword2">Re-enter<br>Password:</label>
                            <input id="userPassword2" name="userPassword2" type="password" placeholder="Re-enter Password" maxlength="50" required>
                        </div>
                        <div class="errorField">
                            <errorText id="errorText"></errorText>
                        </div>
                        <div id="buttonRow">
                            <a><button>Confirm</button></a>
                            <a><button type="button" id="logout" onclick="back()">CANCEL</button></a>
                        </div>
                    </form>
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