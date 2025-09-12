<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "movie_ticketing";
    $userID = $_GET['userID'];

    $conn = mysqli_connect($servername, $username, $password, $dbname);

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $sql = "SELECT * FROM currentWishlist WHERE userID = $userID";
    $result = mysqli_query($conn, $sql);

    $tickets = [];
    while($row = mysqli_fetch_assoc($result)) {
        $tickets[] = $row;
    }
    echo json_encode($tickets);

    mysqli_close($conn);
?>