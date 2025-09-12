<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="../styles.css"/>
        <title>Login</title>
    </head>

    <body>
        <!--Header-->
        <?php
            include("../include/header.php");
        ?>

        <!--Body-->
        <main>
            <div class="container" style="align-items: center">
                <div class="loginContainer" id="loginContainer">
                    <div class="form-loginContainer sign-up">
                        <form id="signupForm">
                            <h1>Register</h1>
                            <span>Fill Out The Following Info For Registeration</span>
                            <input name="operationType" value="signup" hidden>
                            <input name="userName" type="text" placeholder="UserName" maxlength="50" required>
                            <input name="userPassword" type="password" placeholder="Password" maxlength="50" required>
                            <input name="userEmail" type="email" placeholder="E-mail" maxlength="50" required>
                            <input name="userPhoneNo" type="text" placeholder="Phone No. (e.g. 012-3456789)" maxlength="50" pattern="01[0-9]{1}-[0-9]{7,8}" required>
                            <errorText id="signupErrorText"></errorText>
                            <button>SIGN UP</button>
                        </form>
                    </div>
                    <div class="form-loginContainer sign-in">
                        <form id="signinForm">
                            <h1>Login</h1>
                            <span>Login With Your UserName & Password</span>
                            <input name="operationType" value="signin" hidden>
                            <input name="userName" type="text" placeholder="UserName" maxlength="50" required>
                            <input name="userPassword" type="password" placeholder="Password" maxlength="50" required>
                            <errorText id="signinErrorText"></errorText>
                            <button>SIGN IN</button>
                        </form>
                    </div>
                    <div class="toggle-loginContainer">
                        <div class="toggle">
                            <div class="toggle-panel toggle-left">
                                <h1>Welcome Back!</h1>
                                <p>Log in to use all features</p>
                                <button id="login">Sign In</button>
                            </div>
                            <div class="toggle-panel toggle-right">
                                <h1>Hello!</h1>
                                <p>New User? <br> Register to use all features</p>
                                <button id="register">Sign Up</button>
                            </div>
                        </div>
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