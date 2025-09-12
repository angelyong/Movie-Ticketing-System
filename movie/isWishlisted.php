<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "movie_ticketing";
    $userID = $_GET['userID'];
    $movieID = $_GET['movieID'];

    $conn = mysqli_connect($servername, $username, $password, $dbname);

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $sql = "SELECT * FROM currentWishlist WHERE userID = $userID AND movieID = '$movieID'";
    $result = mysqli_query($conn, $sql);

    $wishlist = [];
    while($row = mysqli_fetch_assoc($result)) {
        $wishlist[] = $row;
    }
    echo json_encode($wishlist);

    mysqli_close($conn);
?>