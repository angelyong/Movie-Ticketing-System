<!DOCTYPE html>
<html>
    <head>
        <title>Absolute Cinema</title>
        <link rel="stylesheet" href="../styles.css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    </head>
    <body onload="displayCurrentWishlist()">
        <!--Header-->
        <?php
            include("../include/header.php");
        ?>

        <!--Body-->
        <main>
            <div class="container">
                <div class="containerHeader">
                    <h1>My Wishlist</h1>
                    <div style="padding-top: 4%; padding-bottom: 2%;">
                        <button id="currentBtn" class="selectButton movie-filter-button active" onclick="handleButtonClick(displayCurrentWishlist)">Current</button>
                        <button id="upcomingBtn" class="selectButton movie-filter-button" onclick="handleButtonClick(displayUpcomingWishlist)">Upcoming</button>
                    </div>
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