<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "movie_ticketing";
    
    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
    // Operation Types
    if ($_SERVER['REQUEST_METHOD'] === "POST") {
        $operationType = $_POST["operationType"];

        switch ($operationType) {
            // Sign in to Account
            case ('signin'):
                $userName = htmlspecialchars($_POST["userName"] ?? '');
                $userPassword = md5(htmlspecialchars($_POST['userPassword'] ?? ''));
                validateUser($conn, $userName, $userPassword);
                break;

            // Sign up new Account
            case ('signup'):
                $userName = htmlspecialchars($_POST['userName'] ??'');
                $userPassword = md5(htmlspecialchars($_POST['userPassword'] ??''));
                $userEmail = htmlspecialchars($_POST['userEmail'] ??'');
                $userPhoneNo = htmlspecialchars($_POST['userPhoneNo'] ??'');
                registerUser($conn, $userName, $userPassword, $userEmail, $userPhoneNo);
                break;
        }
    }

    // Validate User Details : Return userID if Valid, else return null
    function validateUser($conn, $userName , $userPassword) {
        // Retrieve All Accounts
        $sql = 'SELECT userID, userName, userPassword FROM user';
        $result = mysqli_query($conn, $sql);
        
        // Validate User Name & Pasword (Case Sensitive)
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                if ($row['userName'] == $userName && $userPassword == $row['userPassword']) {
                    echo json_encode(['success' => true, 'userID' => $row['userID']]);
                    exit();
                }
            }
        } 
        echo json_encode(['success' => false, 'error' => "INVALID USERNAME/PASSWORD!"]);
    }

    // Register New Account : Return new userID, else throw error
    function registerUser($conn, $userName , $userPassword, $userEmail, $userPhoneNo) {
        // Prepare & Execute Query
        $stmt = mysqli_prepare($conn, "INSERT INTO user (userName, userPassword, userEmail, userPhoneNo) VALUES (?, ?, ?, ?)");
        mysqli_stmt_bind_param($stmt, "ssss", $userName, $userPassword, $userEmail, $userPhoneNo);
        
        try {
            mysqli_stmt_execute($stmt);

            // Retrieve User ID
            $last_id = mysqli_insert_id($conn);
            echo json_encode(['success' => true, 'userID' => $last_id]);
        }
        catch (Exception $e) {
            echo json_encode(['success' => false, 'error' => "USERNAME ALREADY EXISTS!"]);
        }

        // Close stmt
        mysqli_stmt_close($stmt);
    }
?>