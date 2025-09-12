<!DOCTYPE html>
<html>
    <head>
        <title>Absolute Cinema</title>
        <link rel="stylesheet" href="styles.css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
        <style>
            .promo {
                align-self: center;
                margin-bottom: 2%;
                width: 90%;
                height: auto;
                border-radius: 20px;
                box-shadow: 0 0 1em rgba(0, 0, 0, 0.35);
                transition: transform 0.4s ease;
            }

            .promo:hover {
                cursor: pointer;
                transform: scale(1.05);
            }

            .detailButton {
                font-size: small;
                width: 13em;
            }
        </style>
    </head>
    <body>
<<<<<<< HEAD
        <div class="headContainer">
            <?php
                include("include/header.php");
                include("include/navigation.php");
            ?>
        </div>
    
=======
        <!--Header-->
        <?php
            include("include/header.php");
        ?>

        <!--Body-->
>>>>>>> 6cc68afdc8e958eda11a343046783e0feab5c537
        <main>
            <div class="home-movie-row-wrapper">
                    <div class="home-movie-row-wrapper" id="banners"></div>
            </div>

            <div class="container">
                <h1 style="margin: 0;">Home</h1>
                <div class="homeInfo">
                    <h3>Current Movie Showcase</h3>
                    <button class="detailButton" onclick="window.location.href='movie/'">View All</button>
                </div>
                <div class="home-movie-row-wrapper" style="border-radius: 15px; background-color: #222222;">
                    <button class="arrow left" onclick=scrollCurrentMovies(-1)>&#10094;</button>
                    <div class="home-movie-row-wrapper" style="padding: 3%; width:94%" id="currentMovieContainer"></div>
                    <!-- JS will populate movie cards here -->
                    <button class="arrow right" onclick=scrollCurrentMovies(1)>&#10095;</button>
                </div>
                <br>
                <br>

                <div class="homeInfo">
                    <h3>Upcoming Movie Showcase</h3>
                    <button class="detailButton" onclick="window.location.href='movie/?state=upcoming'">View All</button>
                </div>
                <div class="home-movie-row-wrapper" style="border-radius: 15px; background-color: #222222">
                    <button class="arrow left" onclick=scrollUpcomingMovies(-1)>&#10094;</button>
                    <div class="home-movie-row-wrapper" style="padding: 3%; width:94%" id="upcomingMovieContainer"></div>
                    <!-- JS will populate movie cards here -->
                    <button class="arrow right" onclick=scrollUpcomingMovies(1)>&#10095;</button>
                </div>
                <br>
                <br>

                <h3>Promotions and News</h3>
                <img class="promo" onclick="window.location.href='info/promotion1'" src="images/promotions/promotion1" alt="ticket price">
                <img class="promo" onclick="window.location.href='info/promotion2'" src="images/promotions/promotion2" alt="payment method">
            </div>
        </main>

        <?php
            include("include/footer.php");
        ?>
        <script src="script.js"></script>
        <script>
            window.onload = async () => {
                displayBanner();
                await displayCurrentMovie();
                await displayUpcomingMovie();
            }
        </script>
    </body>
</html>