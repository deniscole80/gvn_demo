<?php
    session_start();

    include 'DB/conn_db.php';
    include 'Query.php';
    include 'User.php';

    if(isset($_POST["fetchPatientsHome"])){
        $userObj = new User($conn, "", "", "", "", "");
        $userObj->fetchPatientsHome();
    }
    else if(isset($_POST["fetchPatients"])){
        $userObj = new User($conn, "", "", "", "", "");
        $userObj->fetchPatients();
    }
    else if(isset($_POST["fetchStories"])){
        $userObj = new User($conn, "", "", "", "", "");
        $userObj->fetchStories();
    }
    else if(isset($_POST["fetchStory"])){
        $storyId = mysqli_real_escape_string($conn, htmlentities($_POST["storyId"]));
        $userObj = new User($conn, "", "", "", "", "");
        $userObj->fetchStory($storyId);
    }
    else if(isset($_POST["fetchPatient"])){
        $patientId = mysqli_real_escape_string($conn, htmlentities($_POST["patientId"]));
        $userObj = new User($conn, "", "", "", "", "");
        $userObj->fetchPatient($patientId);
    }
    else if(isset($_POST["makePaymentHome"])){
        $status = $_POST["status"];
        $amount = $_POST["amount"];
        $currency = $_POST["currency"];
        $fRef = $_POST["fRef"];
        $tId = $_POST["tId"];
        $txRef = $_POST["txRef"];
        $name = $_POST["supporterName2"];
        $email = $_POST["email"];
        $pId = $_POST["paidPatient2"];

        $userObj = new User($conn, "", "", "", "", "");
        $userObj->storePaymentRef($status, $amount, $currency, $fRef, $tId, $txRef, $name, $email, $pId);
    }
    else if(isset($_POST["makePaymentInner"])){
        $status = $_POST["status"];
        $amount = $_POST["amount"];
        $currency = $_POST["currency"];
        $fRef = $_POST["fRef"];
        $tId = $_POST["tId"];
        $txRef = $_POST["txRef"];
        $name = $_POST["supporterName"];
        $email = $_POST["email"];
        $pId = $_POST["paidPatient"];

        $userObj = new User($conn, "", "", "", "", "");
        $userObj->storePaymentRef($status, $amount, $currency, $fRef, $tId, $txRef, $name, $email, $pId);
    }
    else if(isset($_POST["fetchStats"])){
        $userObj = new User($conn, "", "", "", "", "");
        $userObj->fetchStats();
    }
    else if(isset($_POST["fetchNewsHome"])){
        $userObj = new User($conn, "", "", "", "", "");
        $userObj->fetchNewsHome();
    }
    else if(isset($_POST["fetchVideosHome"])){
        $userObj = new User($conn, "", "", "", "", "");
        $userObj->fetchVideosHome();
    }
    else if(isset($_POST["fetchNews"])){
        $userObj = new User($conn, "", "", "", "", "");
        $userObj->fetchNews();
    }
    else if(isset($_POST["fetchVideos"])){
        $userObj = new User($conn, "", "", "", "", "");
        $userObj->fetchVideos();
    }
    else if(isset($_POST["adminLogin"])){
        $email = mysqli_real_escape_string($conn, htmlentities($_POST["email"]));
        $password = mysqli_real_escape_string($conn, htmlentities($_POST["password"]));
        $date_time = date("Y-m-d h:i:s A");

        $userObj = new User($conn, "", "", $email, $password, $date_time);
        $userObj->logAdminIn();
    }
    else if(isset($_POST["logout"])){
        $userObj = new User($conn, "", "", "", "", "");
        $userObj->logout();
    }
    else if(isset($_POST["fetchDashboard"])){
        $userObj = new User($conn, "", "", "", "", "");
        $userObj->fetchDashboardData();
    }
    else if(isset($_POST["registerAdmin"])){
        $firstname = mysqli_real_escape_string($conn, htmlentities($_POST["firstname"]));
        $lastname = mysqli_real_escape_string($conn, htmlentities($_POST["lastname"]));
        $email = mysqli_real_escape_string($conn, htmlentities($_POST["email"]));
        $password = mysqli_real_escape_string($conn, htmlentities($_POST["password"]));
        $rPassword = mysqli_real_escape_string($conn, htmlentities($_POST["rPassword"]));
        $date_time = date("Y-m-d h:i:s A");

        $userObj = new User($conn, $firstname, $lastname, $email, $password, $date_time);
        $userObj->registerAdmin();
    }
    else if(isset($_POST["fetchAdmins"])){
        $userObj = new User($conn, "", "", "", "", "");
        $userObj->fetchAdmins();
    }
    else if(!empty($_FILES['file'])){
        $upload = 'err'; 
        if(!empty($_FILES['file'])){ 
            
            // File upload configuration 
            $targetDir = "../assets/images/"; 
            $allowTypes = array('jpg', 'png', 'jpeg', 'JPEG', 'JPG', 'PNG'); 
            
            $fileName = basename($_FILES['file']['name']); 
            $targetFilePath = $targetDir.$fileName; 
            
            // Check whether file type is valid 
            $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION); 
            if(in_array($fileType, $allowTypes)){ 
                // Upload file to the server 
                if(move_uploaded_file($_FILES['file']['tmp_name'], $targetFilePath)){ 
                    $upload = 'ok'; 
                } 
            } 
        } 
        echo $upload;
    }
    else if(isset($_POST["createCamp"])){
        $patientName = mysqli_real_escape_string($conn, htmlentities($_POST["patientName"]));
        $subject = mysqli_real_escape_string($conn, htmlentities($_POST["subject"]));
        $amountRequired = mysqli_real_escape_string($conn, htmlentities($_POST["amountRequired"]));
        $smallImage = mysqli_real_escape_string($conn, htmlentities($_POST["smallImage"]));
        $largeImage = mysqli_real_escape_string($conn, htmlentities($_POST["largeImage"]));
        $storyFile = mysqli_real_escape_string($conn, htmlentities($_POST["storyFile"]));
        $status = 0;
        $raised = 0;
        $date_time = date("d-m-Y");

        $adminObj = new User($conn, "", "", "", "", "");
        $adminObj->createCamp($patientName, $subject, $amountRequired, $smallImage, $largeImage, $storyFile, $status, $raised, $date_time);
    }
    else if(isset($_POST["editCamp"])){
        $patientName = mysqli_real_escape_string($conn, htmlentities($_POST["patientName"]));
        $subject = mysqli_real_escape_string($conn, htmlentities($_POST["subject"]));
        $amountRequired = mysqli_real_escape_string($conn, htmlentities($_POST["amountRequired"]));
        $smallImage = mysqli_real_escape_string($conn, htmlentities($_POST["smallImage"]));
        $largeImage = mysqli_real_escape_string($conn, htmlentities($_POST["largeImage"]));
        $storyFile = mysqli_real_escape_string($conn, htmlentities($_POST["storyFile"]));
        $campId = mysqli_real_escape_string($conn, htmlentities($_POST["campId"]));
        $vLink = mysqli_real_escape_string($conn, htmlentities($_POST["vLink"]));
        
        $adminObj = new User($conn, "", "", "", "", "");
        $adminObj->editCamp($patientName, $subject, $vLink, $amountRequired, $smallImage, $largeImage, $storyFile, $campId);
    }
    else if(isset($_POST["editEdu"])){
        $subject = mysqli_real_escape_string($conn, htmlentities($_POST["subject"]));
        $amountRequired = mysqli_real_escape_string($conn, htmlentities($_POST["amountRequired"]));
        $smallImage = mysqli_real_escape_string($conn, htmlentities($_POST["smallImage"]));
        $largeImage = mysqli_real_escape_string($conn, htmlentities($_POST["largeImage"]));
        $storyFile = mysqli_real_escape_string($conn, htmlentities($_POST["storyFile"]));
        $campId = mysqli_real_escape_string($conn, htmlentities($_POST["campId"]));
        
        $adminObj = new User($conn, "", "", "", "", "");
        $adminObj->editEdu($subject, $amountRequired, $smallImage, $largeImage, $storyFile, $campId);
    }
    else if(isset($_POST["editNews"])){
        $topic = mysqli_real_escape_string($conn, htmlentities($_POST["topic"]));
        $link = mysqli_real_escape_string($conn, htmlentities($_POST["link"]));
        $smallImage = mysqli_real_escape_string($conn, htmlentities($_POST["smallImage"]));
        $newsId = mysqli_real_escape_string($conn, htmlentities($_POST["newsId"]));
        
        $adminObj = new User($conn, "", "", "", "", "");
        $adminObj->editNews($topic, $link, $smallImage, $newsId);
    }
    else if(isset($_POST["editVideo"])){
        $topic = mysqli_real_escape_string($conn, htmlentities($_POST["topic"]));
        $link = mysqli_real_escape_string($conn, htmlentities($_POST["link"]));
        $videoId = mysqli_real_escape_string($conn, htmlentities($_POST["videoId"]));
        
        $adminObj = new User($conn, "", "", "", "", "");
        $adminObj->editVideo($topic, $link, $videoId);
    }
    else if(isset($_POST["createStory"])){
        $patientName = mysqli_real_escape_string($conn, htmlentities($_POST["patientName"]));
        $subject = mysqli_real_escape_string($conn, htmlentities($_POST["subject"]));
        $amountRequired = mysqli_real_escape_string($conn, htmlentities($_POST["amountRequired"]));
        $v_link = mysqli_real_escape_string($conn, htmlentities($_POST["v_link"]));
        $smallImage = mysqli_real_escape_string($conn, htmlentities($_POST["smallImage"]));
        $largeImage = mysqli_real_escape_string($conn, htmlentities($_POST["largeImage"]));
        $storyFile = mysqli_real_escape_string($conn, htmlentities($_POST["storyFile"]));
        $status = 1;
        $raised = $amountRequired;
        $percentage = 100;
        $date_time = date("d-m-Y");
        $patientId = 0;

        $adminObj = new User($conn, "", "", "", "", "");
        $adminObj->createStory($patientName, $subject, $amountRequired, $v_link, $smallImage, $largeImage, $storyFile, $status, $raised, $percentage, $date_time, $patientId);
    }
    else if(isset($_POST["editStory"])){
        $patientName = mysqli_real_escape_string($conn, htmlentities($_POST["patientName"]));
        $subject = mysqli_real_escape_string($conn, htmlentities($_POST["subject"]));
        $amountRequired = mysqli_real_escape_string($conn, htmlentities($_POST["amountRequired"]));
        $smallImage = mysqli_real_escape_string($conn, htmlentities($_POST["smallImage"]));
        $largeImage = mysqli_real_escape_string($conn, htmlentities($_POST["largeImage"]));
        $storyFile = mysqli_real_escape_string($conn, htmlentities($_POST["storyFile"]));
        $campId = mysqli_real_escape_string($conn, htmlentities($_POST["campId"]));
        $vLink = mysqli_real_escape_string($conn, htmlentities($_POST["vLink"]));
        
        $adminObj = new User($conn, "", "", "", "", "");
        $adminObj->editStory($patientName, $subject, $vLink, $amountRequired, $smallImage, $largeImage, $storyFile, $campId);
    }
    else if(isset($_POST["createNews"])){
        $topic = mysqli_real_escape_string($conn, htmlentities($_POST["topic"]));
        $link = mysqli_real_escape_string($conn, htmlentities($_POST["link"]));
        $smallImage = mysqli_real_escape_string($conn, htmlentities($_POST["smallImage"]));
        $status = 1;
        $date_time = date("d-m-Y");
        
        $adminObj = new User($conn, "", "", "", "", "");
        $adminObj->createNews($topic, $link, $smallImage, $status, $date_time);
    }
    else if(isset($_POST["createVideo"])){
        $topic = mysqli_real_escape_string($conn, htmlentities($_POST["topic"]));
        $link = mysqli_real_escape_string($conn, htmlentities($_POST["link"]));
        $status = 1;
        $date_time = date("d-m-Y");
        
        $adminObj = new User($conn, "", "", "", "", "");
        $adminObj->createVideo($topic, $link, $status, $date_time);
    }
    else if(isset($_POST["fetchCamps"])){
        $userObj = new User($conn, "", "", "", "", "");
        $userObj->fetchAllPatients();
    }
    else if(isset($_POST["fetchAllStories"])){
        $userObj = new User($conn, "", "", "", "", "");
        $userObj->fetchAllStories();
    }
    else if(isset($_POST["fetchAllNews"])){
        $userObj = new User($conn, "", "", "", "", "");
        $userObj->fetchAllNews();
    }
    else if(isset($_POST["fetchAllVideos"])){
        $userObj = new User($conn, "", "", "", "", "");
        $userObj->fetchAllVideos();
    }
    else if(isset($_POST["createEduCamp"])){
        $subject = mysqli_real_escape_string($conn, htmlentities($_POST["subject"]));
        $amountRequired = mysqli_real_escape_string($conn, htmlentities($_POST["amountRequired"]));
        $smallImage = mysqli_real_escape_string($conn, htmlentities($_POST["smallImage"]));
        $largeImage = mysqli_real_escape_string($conn, htmlentities($_POST["largeImage"]));
        $storyFile = mysqli_real_escape_string($conn, htmlentities($_POST["storyFile"]));
        $status = 0;
        $raised = 0;
        $date_time = date("d-m-Y");

        $adminObj = new User($conn, "", "", "", "", "");
        $adminObj->createEduCamp($subject, $amountRequired, $smallImage, $largeImage, $storyFile, $status, $raised, $date_time);
    }
    else if(isset($_POST["fetchEduCamps"])){
        $userObj = new User($conn, "", "", "", "", "");
        $userObj->fetchAllEduCamps();
    }
    else if(isset($_POST["fetchEduCampsApp"])){
        $userObj = new User($conn, "", "", "", "", "");
        $userObj->fetchEduCampsApp();
    }
    else if(isset($_POST["fetchCampDetails"])){
        $campId = mysqli_real_escape_string($conn, htmlentities($_POST["campId"]));
        $userObj = new User($conn, "", "", "", "", "");
        $userObj->fetchCampDetails($campId);
    }
?>