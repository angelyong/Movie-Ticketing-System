<!DOCTYPE html>
<html>
    <head>
        <title>Absolute Cinema</title>
        <link rel="stylesheet" href="../styles.css"/>
    </head>
    <body onload="displayTickets()">
        <!--Header-->
        <?php
            include("../include/header.php");
        ?>

        <!--Body-->
        <main>
            <div class="container">
                <div class="containerHeader">
                    <h1>Ticket Details</h1>
                </div>
                <div id="ticketContainer"></div>
            </div>
        </main>

        <!--Footer-->
        <?php
            include("../include/footer.php");
        ?>
        <script src="script.js"></script>
    </body>
</html>