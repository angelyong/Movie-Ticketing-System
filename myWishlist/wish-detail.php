<!DOCTYPE html>
<html>
    <head>
        <title>Absolute Cinema</title>
        <link rel="stylesheet" href="../styles.css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
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
                    <h1>Movie Details (To Be Released)</h1>
                    <div id="title"></div>
                </div>
                <div class="movieInfoContainer">
                    <div id="movieInfo"></div>
                    <div id="moviePlot" style="flex: 3;">
                        <h3><i class="fa-solid fa-video"></i> Preview</h3>
                        <div id="vid" class="foreground"></div>
                        <h3><i class="fa-solid fa-circle-info"></i> Synopsis</h3>
                        <div id="syn" class="foreground"></div>
                        <h3><i class="fa-solid fa-star"></i> Cast</h3>
                        <div id="cas" class="foreground"></div>
                        <h3><i class="fa-solid fa-film"></i> Directors</h3>
                        <div id="dir" class="foreground"></div>
                        <h3><i class="fa-solid fa-pen-fancy"></i> Writers</h3>
                        <div id="wri" class="foreground"></div>
                    </div>
                </div>
            </div>
        </main>

        <?php
            include("../include/footer.php");
        ?>
        
        <script src="script.js"></script>
        <script>
            window.onload = async () => {
                const params = new URLSearchParams(window.location.search);
                const imdbId = params.get("movieID");
                displayPreview(imdbId);
                displayDetails(imdbId);
            }
        </script>
    </body>
</html>