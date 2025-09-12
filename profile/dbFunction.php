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
    
    // Check Operation Type
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $data = json_decode(file_get_contents('php://input'), true);

        // Fetch User By ID
        if (isset($data['type'])) {
            $userID = $data["userID"] ?? 0;
            getUserByID($conn, $userID);
        }
        else {
            $operationType = $_POST['operationType'];

            switch ($operationType) {
                // Update Account Info
                case 'updateInfo':
                    $userID = htmlspecialchars($_POST['userID'] ??'');
                    $userName = htmlspecialchars($_POST['userName'] ??'');
                    $userEmail = htmlspecialchars($_POST['userEmail'] ??'');
                    $userPhoneNo = htmlspecialchars($_POST['userPhoneNo'] ??'');
                    updateInfo($conn, $userName, $userEmail, $userPhoneNo, $userID);
                    break;

                // Update Account Password
                case 'updatePassword':
                    $userID = htmlspecialchars($_POST['userID'] ??'');
                    $userPassword1 = md5(htmlspecialchars($_POST['userPassword1'] ??''));
                    $userPassword2 = md5(htmlspecialchars($_POST['userPassword2'] ??''));
                    updatePassword($conn, $userID, $userPassword1, $userPassword2);
                    break;
            }
        }
    }

    // Fetch User By ID
    function getUserByID($conn, $userID) {
        // Search User By ID Query
        $sql = "SELECT * FROM user WHERE userID = '". $userID ."'";
        $result = mysqli_query($conn, $sql);
        
        // Return Result
        if (mysqli_num_rows($result) > 0) {
            echo json_encode(['success' => true, 'userData' => mysqli_fetch_assoc($result)]);
        } 
        else {
            echo json_encode(['success' => false, 'error' => "USER DOES NOT EXISTS!"]);
        }
    }

    // Update Account Info
    function updateInfo($conn, $userName, $userEmail, $userPhoneNo, $userID) {
        // Prepare & Execute Querry
        $stmt = mysqli_prepare($conn, "UPDATE user SET userName = ?, userEmail = ?, userPhoneNo = ? WHERE userID = ?");
        mysqli_stmt_bind_param($stmt, "ssss", $userName, $userEmail, $userPhoneNo, $userID);
        
        // Successfully Updated Account
        if (mysqli_stmt_execute($stmt)) {
            echo json_encode(['success' => true]);
        }
        else {
            echo json_encode(['success' => false, 'error' => mysqli_stmt_error($stmt)]);
        }

        // Close stmt
        mysqli_stmt_close($stmt);
    }

    // Update Account Password
    function updatePassword($conn, $userID, $userPassword1, $userPassword2) {

        // Different Password
        if ($userPassword1 != $userPassword2) {
            echo json_encode(['success' => false, 'error' => "BOTH PASSWORDS ARE NOT EQUAL!"]);
        }
        else {
            // Search If Password is Same As Current
            $sql =  "SELECT userPassword FROM user WHERE userID = " . $userID;
            $result = mysqli_query($conn, $sql);
            if (mysqli_num_rows($result) > 0) {
                $data = mysqli_fetch_assoc($result);

                // Same Password As Current
                if ($userPassword1 == $data['userPassword']) {
                    echo json_encode(['success' => false, 'error' => 'NEW PASSWORD IS EQUAL TO CURRENT PASSWORD!']);
                }
                else {
                    // Prepare & Execute Querry
                    $stmt = mysqli_prepare($conn, "UPDATE user SET userPassword = ? WHERE userID = ?");
                    mysqli_stmt_bind_param($stmt, "ss", $userPassword1, $userID);
                    if (mysqli_stmt_execute($stmt)) {
                        echo json_encode(['success' => true]);
                    }
                    else {
                        echo json_encode(['success' => false, 'error' => mysqli_error_stmt($stmt)]);
                    }

                    // Close stmt
                    mysqli_stmt_close($stmt);
                }
            }
            else {
                echo json_encode(['success' => false, 'error' => "USER ACCOUNT DOES NOT EXISTS!"]);
            }
        }
    }
?>