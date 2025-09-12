<!DOCTYPE html>
<html>
    <head>
        <title>Absolute Cinema</title>
        <link rel="stylesheet" href="../styles.css"/>
    </head>
    <body>
        <!--Header-->
        <?php
            include("../include/header.php");
        ?>

        <!--Body-->
        <main>
            <div class="container">
                <div class="titleHeader">
                    <h1>Ticket Purchase</h1>
                </div>
                <div class="purchaseContainer">
                    <div id="purchaseInfo">
                        <div id="paymentMethod" style="flex: 1">
                            <form method="POST" action="purchase.php" onsubmit="return validatePaymentOption()">
                                <input type="hidden" id="userID" name="userID">
                                <input type="hidden" id="movieID" name="movieID">
                                <div>
                                    <label for="ticketAmount" style="font-weight: bolder; padding-right: 3%;">Select Ticket Amount:</label>
                                    <button type="button" class="selectButton" onclick="changeAmount(-1)">−</button>
                                    <input type="number" id="ticketAmount" name="ticketAmount" value="1" min="1" readonly>
                                    <button type="button" class="selectButton" onclick="changeAmount(1)">+</button>
                                </div>
                                <div style="padding-top: 5%">
                                    <label for="gateway" style="font-weight: bolder; ">Select Payment Method:</label>
                                    <div class="payment-options">
                                        <label class="payment-option">
                                            <input type="radio" name="gateway" value="paypal">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/PayPal_Logo2014.png" alt="PayPal">
                                        </label>

                                        <label class="payment-option">
                                            <input type="radio" name="gateway" value="applepay">
                                            <img src="https://cdn-icons-png.freepik.com/512/5968/5968630.png" alt="Apple Pay">
                                        </label>

                                        <label class="payment-option">
                                            <input type="radio" name="gateway" value="googlepay">
                                            <img src="https://cdn-icons-png.flaticon.com/512/6124/6124998.png" alt="Google Pay">
                                        </label>

                                        <label class="payment-option">
                                            <input type="radio" name="gateway" value="tng">
                                            <img src="https://images.seeklogo.com/logo-png/53/3/touch-n-go-logo-png_seeklogo-534257.png" alt="TNG">
                                        </label>
                                    </div>
                                    <div style="color: red; padding-top: 2%" id="optionError"></div>
                                    <div style="padding-top: 10%">
                                        <input class="makePayment" type=submit value="Proceed To Secure Payment">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id="paymentSummary"></div>
                        <div class="foreground" style="flex-direction: column">
                            <h2 style="text-align: center;">Purchase Summary</h2>
                            <div id="paymentInfo" style="display: flex;"></div>
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
        <script>
            document.addEventListener("DOMContentLoaded", () => {
                const userID = sessionStorage.getItem("loggedUserID");
                if (userID) {
                    document.getElementById("userID").value = userID;
                }
            });

            window.onload = () => {
                const params = new URLSearchParams(window.location.search);
                const imdbId = params.get("movieID");

                displayInfo(imdbId);
                document.getElementById("movieID").value = imdbId;
            }
        </script>
    </body>
</html>