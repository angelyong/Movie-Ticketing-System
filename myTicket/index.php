<!DOCTYPE html>
<html>
    <head>
        <title>Absolute Cinema</title>
        <link rel="stylesheet" href="../styles.css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    </head>
    <body onload="displayTransactions()">
        <!--Header-->
        <?php
            include("../include/header.php");
        ?>

        <!--Body-->
        <main>
            <div class="container">
                <div class="containerHeader">
                    <h1>My Tickets</h1>
                </div>
                <div id="movieContainer"></div>
            </div>
        </main>
        
        <!--Footer-->
        <?php
            include("../include/footer.php");
        ?>
        <script src="script.js"></script>
    </body>
</html>