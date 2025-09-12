<!DOCTYPE html>
<html>
    <head>
        <title>Absolute Cinema</title>
        <link rel="stylesheet" href="../styles.css"/>
    </head>
    <body>
        <main>
            <div class="gatewayContainer">
                <div id="gatewayInfo">
                    <h1>Payment</h1>
                    <img src="" id="QR" width="400px" height="500px"><br>
                    <a href="..\myTicket\"><button id="paymentButton">CONFIRM PAYMENT</button></a>
                </div>
            </div>
        </main>
        <script>
            const images = [
                "../images/QR/Angel.png",
                "../images/QR/Jeck.png",
                "../images/QR/Leon.png",
                "../images/QR/Quak.png",
            ];
            let randomIndex = Math.floor(Math.random() * images.length);
            console.log(randomIndex);
            document.getElementById("QR").src = images[randomIndex];

            document.getElementById("paymentButton").addEventListener("click", () => {
                window.alert("Your Ticket Purchase Was Successful!!!\nSee You At Absolute Cinema!!!")
            })
        </script>
    </body>
</html>