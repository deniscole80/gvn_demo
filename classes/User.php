<?php
    include 'Authenticate.php';

    class User{
        public $firstname;
        public $lastname;
        public $email;
        public $password;
        public $joinedOn;
        public $conn;

        function __construct($conn, $firstname, $lastname, $email, $password, $joinedOn){
            $this->firstname = $firstname;
            $this->lastname = $lastname;
            $this->email = $email;
            $this->password = $password;
            $this->joinedOn = $joinedOn;
            $this->conn = $conn;
        }

        function fetchPatientsHome(){
            $returnArray = array();
            $sel = mysqli_query($this->conn, "SELECT * FROM patients ORDER BY id DESC LIMIT 3");
            while($row = mysqli_fetch_array($sel)){
                $holdingArray = array();
                $holdingArray["id"] = $row["id"];
                $holdingArray["img_sm"] = $row["img_sm"];
                $holdingArray["img_bg"] = $row["img_bg"];
                $holdingArray["subject"] = $row["subject"];
                $holdingArray["detail"] = $row["detail"];
                $holdingArray["required"] = $row["required"];
                $holdingArray["raised"] = $row["raised"];
                $holdingArray["date_created"] = $row["date_created"];
                $holdingArray["status"] = $row["status"];

                array_push($returnArray, $holdingArray);
            }

            echo json_encode($returnArray);
        }

        function fetchPatients(){
            $returnArray = array();
            $sel = mysqli_query($this->conn, "SELECT * FROM patients ORDER BY id DESC LIMIT 20");
            while($row = mysqli_fetch_array($sel)){
                $holdingArray = array();
                $holdingArray["id"] = $row["id"];
                $holdingArray["img_sm"] = $row["img_sm"];
                $holdingArray["img_bg"] = $row["img_bg"];
                $holdingArray["subject"] = $row["subject"];
                $holdingArray["detail"] = $row["detail"];
                $holdingArray["required"] = $row["required"];
                $holdingArray["raised"] = $row["raised"];
                $holdingArray["date_created"] = $row["date_created"];
                $holdingArray["status"] = $row["status"];

                array_push($returnArray, $holdingArray);
            }

            echo json_encode($returnArray);
        }

        function fetchAllPatients(){
            $returnArray = array();
            $sel = mysqli_query($this->conn, "SELECT * FROM patients ORDER BY id DESC");
            while($row = mysqli_fetch_array($sel)){
                $holdingArray = array();
                $holdingArray["id"] = $row["id"];
                $holdingArray["name"] = $row["name"];
                $holdingArray["img_sm"] = $row["img_sm"];
                $holdingArray["img_bg"] = $row["img_bg"];
                $holdingArray["subject"] = $row["subject"];
                $holdingArray["detail"] = $row["detail"];
                $holdingArray["required"] = $row["required"];
                $holdingArray["raised"] = $row["raised"];
                $holdingArray["date_created"] = $row["date_created"];
                $holdingArray["status"] = $row["status"];
                $holdingArray["v_link"] = $row["v_link"];

                array_push($returnArray, $holdingArray);
            }

            echo json_encode($returnArray);
        }

        function fetchPatient($patientId){
            $returnArrayPatient = array();
            $returnArraySupporter = array();
            $returnArray = array();
            $sel = mysqli_query($this->conn, "SELECT * FROM patients WHERE id = '$patientId'");
            while($row = mysqli_fetch_array($sel)){
                $holdingArray = array();
                $holdingArray["id"] = $row["id"];
                $holdingArray["name"] = $row["name"];
                $holdingArray["img_sm"] = $row["img_sm"];
                $holdingArray["img_bg"] = $row["img_bg"];
                $holdingArray["subject"] = $row["subject"];
                $holdingArray["detail"] = $row["detail"];
                $holdingArray["required"] = $row["required"];
                $holdingArray["raised"] = $row["raised"];
                $holdingArray["date_created"] = $row["date_created"];
                $holdingArray["status"] = $row["status"];
                $holdingArray["v_link"] = $row["v_link"];

                array_push($returnArrayPatient, $holdingArray);
            }

            $sel = mysqli_query($this->conn, "SELECT * FROM supporters WHERE patient_id = '$patientId'");
            while($row = mysqli_fetch_array($sel)){
                $holdingArray = array();
                $holdingArray["id"] = $row["id"];
                $holdingArray["name"] = $row["name"];
                $holdingArray["amount"] = $row["amount"];

                array_push($returnArraySupporter, $holdingArray);
            }

            array_push($returnArray, $returnArrayPatient);
            array_push($returnArray, $returnArraySupporter);

            echo json_encode($returnArray);
        }

        function fetchStories(){
            $returnArray = array();
            $sel = mysqli_query($this->conn, "SELECT * FROM story ORDER BY id DESC LIMIT 20");
            while($row = mysqli_fetch_array($sel)){
                $holdingArray = array();
                $holdingArray["id"] = $row["id"];
                $holdingArray["name"] = $row["name"];
                $holdingArray["img_sm"] = $row["img_sm"];
                $holdingArray["img_bg"] = $row["img_bg"];
                $holdingArray["subject"] = $row["subject"];
                $holdingArray["detail"] = $row["detail"];
                $holdingArray["percentage"] = $row["percentage"];
                $holdingArray["required"] = $row["required"];
                $holdingArray["raised"] = $row["raised"];
                $holdingArray["date_created"] = $row["date_created"];
                $holdingArray["status"] = $row["status"];
                $holdingArray["v_link"] = $row["v_link"];

                array_push($returnArray, $holdingArray);
            }

            echo json_encode($returnArray);
        }

        function fetchAllStories(){
            $returnArray = array();
            $sel = mysqli_query($this->conn, "SELECT * FROM story ORDER BY id DESC");
            while($row = mysqli_fetch_array($sel)){
                $holdingArray = array();
                $holdingArray["id"] = $row["id"];
                $holdingArray["name"] = $row["name"];
                $holdingArray["img_sm"] = $row["img_sm"];
                $holdingArray["img_bg"] = $row["img_bg"];
                $holdingArray["subject"] = $row["subject"];
                $holdingArray["detail"] = $row["detail"];
                $holdingArray["percentage"] = $row["percentage"];
                $holdingArray["required"] = $row["required"];
                $holdingArray["raised"] = $row["raised"];
                $holdingArray["date_created"] = $row["date_created"];
                $holdingArray["status"] = $row["status"];
                $holdingArray["v_link"] = $row["v_link"];

                array_push($returnArray, $holdingArray);
            }

            echo json_encode($returnArray);
        }

        function fetchStory($storyId){
            $returnArray = array();
            $sel = mysqli_query($this->conn, "SELECT * FROM story WHERE id = '$storyId'");
            while($row = mysqli_fetch_array($sel)){
                $holdingArray = array();
                $holdingArray["id"] = $row["id"];
                $holdingArray["name"] = $row["name"];
                $holdingArray["img_sm"] = $row["img_sm"];
                $holdingArray["img_bg"] = $row["img_bg"];
                $holdingArray["subject"] = $row["subject"];
                $holdingArray["detail"] = $row["detail"];
                $holdingArray["percentage"] = $row["percentage"];
                $holdingArray["required"] = $row["required"];
                $holdingArray["raised"] = $row["raised"];
                $holdingArray["date_created"] = $row["date_created"];
                $holdingArray["status"] = $row["status"];
                $holdingArray["v_link"] = $row["v_link"];

                array_push($returnArray, $holdingArray);
            }

            echo json_encode($returnArray);
        }

        function storePaymentRef($status, $amount, $currency, $fRef, $tId, $txRef, $name, $email, $pId){
            $date = date("Y-m-d");
            $tableFields = "name, email, amount, currency, tx_ref, t_id, f_ref, status, date_created, patient_id";
            $variables = "'$name', '$email', '$amount', '$currency', '$txRef', '$tId', '$fRef', '$status', '$date', '$pId'";
            $table = "supporters";
            $success = "Successful";
            $failure = "Oops! Something went wrong, please try again";
            Query::dbInsert($this->conn, $table, $tableFields, $variables, $success, $failure);

            if($pId != 0)
            $up = mysqli_query($this->conn, "UPDATE patients SET raised = raised + $amount WHERE id = '$pId'");
        }

        function fetchStats(){
            $returnArray = array();
            $holdingArray = array();

            $selStory = mysqli_query($this->conn, "SELECT * FROM story");
            $numStory = mysqli_num_rows($selStory);

            $selSupporters = mysqli_query($this->conn, "SELECT * FROM supporters");
            $numSupporters = mysqli_num_rows($selSupporters);

            $selAmount = mysqli_query($this->conn, "SELECT SUM(raised) AS 'total_funds' FROM story");
            $row = mysqli_fetch_array($selAmount);
            
            $holdingArray["patientsTreated"] = $numStory;
            $holdingArray["fundsSpent"] = $row["total_funds"];
            $holdingArray["supporters"] = $numSupporters;

            array_push($returnArray, $holdingArray);

            echo json_encode($returnArray);
        }

        function fetchNewsHome(){
            $returnArray = array();
            $sel = mysqli_query($this->conn, "SELECT * FROM news ORDER BY id DESC LIMIT 5");
            while($row = mysqli_fetch_array($sel)){
                $holdingArray = array();
                $holdingArray["id"] = $row["id"];
                $holdingArray["topic"] = $row["topic"];
                $holdingArray["image"] = $row["image"];
                $holdingArray["link"] = $row["link"];
                $holdingArray["date"] = $row["date"];
                $holdingArray["status"] = $row["status"];

                array_push($returnArray, $holdingArray);
            }

            echo json_encode($returnArray);
        }

        function fetchAllNews(){
            $returnArray = array();
            $sel = mysqli_query($this->conn, "SELECT * FROM news ORDER BY id DESC");
            while($row = mysqli_fetch_array($sel)){
                $holdingArray = array();
                $holdingArray["id"] = $row["id"];
                $holdingArray["topic"] = $row["topic"];
                $holdingArray["image"] = $row["image"];
                $holdingArray["link"] = $row["link"];
                $holdingArray["date"] = $row["date"];
                $holdingArray["status"] = $row["status"];

                array_push($returnArray, $holdingArray);
            }

            echo json_encode($returnArray);
        }

        function fetchVideosHome(){
            $returnArray = array();
            $sel = mysqli_query($this->conn, "SELECT * FROM videos ORDER BY id DESC LIMIT 5");
            while($row = mysqli_fetch_array($sel)){
                $holdingArray = array();
                $holdingArray["id"] = $row["id"];
                $holdingArray["topic"] = $row["topic"];
                $holdingArray["v_link"] = $row["v_link"];
                $holdingArray["date"] = $row["date"];
                $holdingArray["status"] = $row["status"];

                array_push($returnArray, $holdingArray);
            }

            echo json_encode($returnArray);
        }

        function fetchAllVideos(){
            $returnArray = array();
            $sel = mysqli_query($this->conn, "SELECT * FROM videos ORDER BY id DESC");
            while($row = mysqli_fetch_array($sel)){
                $holdingArray = array();
                $holdingArray["id"] = $row["id"];
                $holdingArray["topic"] = $row["topic"];
                $holdingArray["v_link"] = $row["v_link"];
                $holdingArray["date"] = $row["date"];
                $holdingArray["status"] = $row["status"];

                array_push($returnArray, $holdingArray);
            }

            echo json_encode($returnArray);
        }

        function fetchNews(){
            $returnArray = array();
            $sel = mysqli_query($this->conn, "SELECT * FROM news ORDER BY id DESC LIMIT 20");
            while($row = mysqli_fetch_array($sel)){
                $holdingArray = array();
                $holdingArray["id"] = $row["id"];
                $holdingArray["topic"] = $row["topic"];
                $holdingArray["image"] = $row["image"];
                $holdingArray["link"] = $row["link"];
                $holdingArray["date"] = $row["date"];
                $holdingArray["status"] = $row["status"];

                array_push($returnArray, $holdingArray);
            }

            echo json_encode($returnArray);
        }

        function fetchVideos(){
            $returnArray = array();
            $sel = mysqli_query($this->conn, "SELECT * FROM videos ORDER BY id DESC LIMIT 20");
            while($row = mysqli_fetch_array($sel)){
                $holdingArray = array();
                $holdingArray["id"] = $row["id"];
                $holdingArray["topic"] = $row["topic"];
                $holdingArray["v_link"] = $row["v_link"];
                $holdingArray["date"] = $row["date"];
                $holdingArray["status"] = $row["status"];

                array_push($returnArray, $holdingArray);
            }

            echo json_encode($returnArray);
        }

        function logAdminIn(){
            $auth = new Authenticate();
            @$auth->login($this->conn, $this->email, $this->password, "admins");
        }

        function logout(){
            session_destroy();
            echo "Logout Successfully";
        }

        function fetchDashboardData(){
            $returnArray = array();
            $selPatients = mysqli_query($this->conn, "SELECT * FROM patients");
            $numPatients = mysqli_num_rows($selPatients);

            $selStories = mysqli_query($this->conn, "SELECT * FROM story");
            $numStories = mysqli_num_rows($selStories);

            $selSupporters = mysqli_query($this->conn, "SELECT * FROM supporters");
            $numSupporters = mysqli_num_rows($selSupporters);

            $selRaised = mysqli_query($this->conn, "SELECT SUM(raised) AS 'total_funds' FROM patients");
            $rowRaised = mysqli_fetch_array($selRaised);
            
            $returnArray["tfr"] = $rowRaised['total_funds'];
            $returnArray["hc"] = $numPatients;
            $returnArray["ss"] = $numStories;
            $returnArray["s"] = $numSupporters;

            echo json_encode($returnArray);
        }

        function registerAdmin(){
            $tableFields = "firstname, lastname, email, password, date_created";
            $variables = "'$this->firstname','$this->lastname','$this->email', '$this->password', '$this->joinedOn'";
            $table = "admins";
            $success = "Registration Successful";
            $failure = "Oops! Something went wrong, please try again";
            Query::dbInsert($this->conn, $table, $tableFields, $variables, $success, $failure);
        }

        function fetchAdmins(){
            $returnArray = array();
            $sel = mysqli_query($this->conn, "SELECT * FROM admins ORDER BY id DESC");
            
            while($row = mysqli_fetch_array($sel)){
                $holdingArray = array();
                $holdingArray["id"] = $row["id"];
                $holdingArray["firstname"] = $row["firstname"];
                $holdingArray["lastname"] = $row["lastname"];
                $holdingArray["email"] = $row["email"];
                $holdingArray["dc"] = $row["date_created"];

                array_push($returnArray, $holdingArray);
            }

            echo json_encode($returnArray);
        }

        function createCamp($patientName, $subject, $amountRequired, $smallImage, $largeImage, $storyFile, $status, $raised, $date_time){
            
            $tableFields = "name, img_sm, img_bg, subject, detail, required, raised, date_created, status";
            $variables = "'$patientName','$smallImage','$largeImage', '$subject', '$storyFile', '$amountRequired', '$raised', '$date_time', '$status'";
            $table = "patients";
            $success = "Successfully Created";
            $failure = "Oops! Something went wrong, please try again";
            Query::dbInsert($this->conn, $table, $tableFields, $variables, $success, $failure);
        }

        function editCamp($patientName, $subject, $v_link, $amountRequired, $smallImage, $largeImage, $storyFile, $campId){
            
            if($smallImage == "" && $largeImage == "" && $storyFile ==""){
                $up = mysqli_query($this->conn, "UPDATE patients SET name = '$patientName', subject = '$subject', v_link = '$v_link', required = '$amountRequired' WHERE id = '$campId'");
                if($up){
                    echo 'Successfully Created';
                }else{
                    echo 'Failed';
                }
            }else if($smallImage == "" && $largeImage != "" && $storyFile !=""){
                $up = mysqli_query($this->conn, "UPDATE patients SET name = '$patientName', subject = '$subject', v_link = '$v_link', required = '$amountRequired', img_bg = '$largeImage', detail = '$storyFile' WHERE id = '$campId'");
                if($up){
                    echo 'Successfully Created';
                }else{
                    echo 'Failed';
                }
            }else if($smallImage != "" && $largeImage == "" && $storyFile !=""){
                $up = mysqli_query($this->conn, "UPDATE patients SET name = '$patientName', subject = '$subject', v_link = '$v_link', required = '$amountRequired', img_sm = '$smallImage', detail = '$storyFile' WHERE id = '$campId'");
                if($up){
                    echo 'Successfully Created';
                }else{
                    echo 'Failed';
                }                
            }else if($smallImage != "" && $largeImage != "" && $storyFile ==""){
                $up = mysqli_query($this->conn, "UPDATE patients SET name = '$patientName', subject = '$subject', v_link = '$v_link', required = '$amountRequired', img_bg = '$largeImage', img_sm = '$smallImage' WHERE id = '$campId'");
                if($up){
                    echo 'Successfully Created';
                }else{
                    echo 'Failed';
                }   
            }else if($smallImage == "" && $largeImage == "" && $storyFile !=""){
                $up = mysqli_query($this->conn, "UPDATE patients SET name = '$patientName', subject = '$subject', v_link = '$v_link', required = '$amountRequired', detail = '$storyFile' WHERE id = '$campId'");
                if($up){
                    echo 'Successfully Created';
                }else{
                    echo 'Failed';
                }
            }else if($smallImage == "" && $largeImage != "" && $storyFile ==""){
                $up = mysqli_query($this->conn, "UPDATE patients SET name = '$patientName', subject = '$subject', v_link = '$v_link', required = '$amountRequired', img_bg = '$largeImage' WHERE id = '$campId'");
                if($up){
                    echo 'Successfully Created';
                }else{
                    echo 'Failed';
                }
            }else if($smallImage != "" && $largeImage == "" && $storyFile ==""){
                $up = mysqli_query($this->conn, "UPDATE patients SET name = '$patientName', subject = '$subject', v_link = '$v_link', required = '$amountRequired', img_sm = '$smallImage' WHERE id = '$campId'");
                if($up){
                    echo 'Successfully Created';
                }else{
                    echo 'Failed';
                }
            }else if($smallImage != "" && $largeImage != "" && $storyFile !=""){
                $up = mysqli_query($this->conn, "UPDATE patients SET name = '$patientName', subject = '$subject', v_link = '$v_link', required = '$amountRequired', img_bg = '$largeImage', img_sm = '$smallImage', detail = '$storyFile' WHERE id = '$campId'");
                if($up){
                    echo 'Successfully Created';
                }else{
                    echo 'Failed';
                }
            }
        }

        function editEdu($subject, $amountRequired, $smallImage, $largeImage, $storyFile, $campId){
            
            if($smallImage == "" && $largeImage == "" && $storyFile ==""){
                $up = mysqli_query($this->conn, "UPDATE education SET subject = '$subject', required = '$amountRequired' WHERE id = '$campId'");
                if($up){
                    echo 'Successfully Created';
                }else{
                    echo 'Failed';
                }
            }else if($smallImage == "" && $largeImage != "" && $storyFile !=""){
                $up = mysqli_query($this->conn, "UPDATE education SET subject = '$subject', required = '$amountRequired', img_bg = '$largeImage', detail = '$storyFile' WHERE id = '$campId'");
                if($up){
                    echo 'Successfully Created';
                }else{
                    echo 'Failed';
                }
            }else if($smallImage != "" && $largeImage == "" && $storyFile !=""){
                $up = mysqli_query($this->conn, "UPDATE education SET subject = '$subject', required = '$amountRequired', img_sm = '$smallImage', detail = '$storyFile' WHERE id = '$campId'");
                if($up){
                    echo 'Successfully Created';
                }else{
                    echo 'Failed';
                }                
            }else if($smallImage != "" && $largeImage != "" && $storyFile ==""){
                $up = mysqli_query($this->conn, "UPDATE education SET subject = '$subject', required = '$amountRequired', img_bg = '$largeImage', img_sm = '$smallImage' WHERE id = '$campId'");
                if($up){
                    echo 'Successfully Created';
                }else{
                    echo 'Failed';
                }   
            }else if($smallImage == "" && $largeImage == "" && $storyFile !=""){
                $up = mysqli_query($this->conn, "UPDATE education subject = '$subject', required = '$amountRequired', detail = '$storyFile' WHERE id = '$campId'");
                if($up){
                    echo 'Successfully Created';
                }else{
                    echo 'Failed';
                }
            }else if($smallImage == "" && $largeImage != "" && $storyFile ==""){
                $up = mysqli_query($this->conn, "UPDATE education SET subject = '$subject', required = '$amountRequired', img_bg = '$largeImage' WHERE id = '$campId'");
                if($up){
                    echo 'Successfully Created';
                }else{
                    echo 'Failed';
                }
            }else if($smallImage != "" && $largeImage == "" && $storyFile ==""){
                $up = mysqli_query($this->conn, "UPDATE education SET subject = '$subject', required = '$amountRequired', img_sm = '$smallImage' WHERE id = '$campId'");
                if($up){
                    echo 'Successfully Created';
                }else{
                    echo 'Failed';
                }
            }else if($smallImage != "" && $largeImage != "" && $storyFile !=""){
                $up = mysqli_query($this->conn, "UPDATE education SET subject = '$subject', required = '$amountRequired', img_bg = '$largeImage', img_sm = '$smallImage', detail = '$storyFile' WHERE id = '$campId'");
                if($up){
                    echo 'Successfully Created';
                }else{
                    echo 'Failed';
                }
            }
        }

        function editNews($topic, $link, $smallImage, $newsId){
            
            if($smallImage == ""){
                $up = mysqli_query($this->conn, "UPDATE news SET topic = '$topic', link = '$link' WHERE id = '$newsId'");
                if($up){
                    echo 'Successfully Created';
                }else{
                    echo 'Failed';
                }
            }else if($smallImage != ""){
                $up = mysqli_query($this->conn, "UPDATE news SET topic = '$topic', link = '$link', image = '$smallImage' WHERE id = '$newsId'");
                if($up){
                    echo 'Successfully Created';
                }else{
                    echo 'Failed';
                }                
            }
        }

        function editVideo($topic, $link, $videoId){
            
            $up = mysqli_query($this->conn, "UPDATE videos SET topic = '$topic', v_link = '$link' WHERE id = '$videoId'");
            if($up){
                echo 'Successfully Created';
            }else{
                echo 'Failed';
            }
        }

        function createStory($patientName, $subject, $amountRequired, $v_link, $smallImage, $largeImage, $storyFile, $status, $raised, $percentage, $date_time, $patientId){
            
            $tableFields = "name, img_sm, img_bg, subject, detail, percentage, required, raised, date_created, status, v_link, patient_id";
            $variables = "'$patientName','$smallImage','$largeImage', '$subject', '$storyFile', '$percentage', '$amountRequired', '$raised', '$date_time', '$status', '$v_link', '$patientId'";
            $table = "story";
            $success = "Successfully Created";
            $failure = "Oops! Something went wrong, please try again";
            Query::dbInsert($this->conn, $table, $tableFields, $variables, $success, $failure);
        }

        function editStory($patientName, $subject, $v_link, $amountRequired, $smallImage, $largeImage, $storyFile, $campId){
            
            if($smallImage == "" && $largeImage == "" && $storyFile ==""){
                $up = mysqli_query($this->conn, "UPDATE story SET name = '$patientName', subject = '$subject', v_link = '$v_link', required = '$amountRequired', raised = '$amountRequired' WHERE id = '$campId'");
                if($up){
                    echo 'Successfully Created';
                }else{
                    echo 'Failed';
                }
            }else if($smallImage == "" && $largeImage != "" && $storyFile !=""){
                $up = mysqli_query($this->conn, "UPDATE story SET name = '$patientName', subject = '$subject', v_link = '$v_link', required = '$amountRequired', raised = '$amountRequired', img_bg = '$largeImage', detail = '$storyFile' WHERE id = '$campId'");
                if($up){
                    echo 'Successfully Created';
                }else{
                    echo 'Failed';
                }
            }else if($smallImage != "" && $largeImage == "" && $storyFile !=""){
                $up = mysqli_query($this->conn, "UPDATE story SET name = '$patientName', subject = '$subject', v_link = '$v_link', required = '$amountRequired', raised = '$amountRequired', img_sm = '$smallImage', detail = '$storyFile' WHERE id = '$campId'");
                if($up){
                    echo 'Successfully Created';
                }else{
                    echo 'Failed';
                }                
            }else if($smallImage != "" && $largeImage != "" && $storyFile ==""){
                $up = mysqli_query($this->conn, "UPDATE story SET name = '$patientName', subject = '$subject', v_link = '$v_link', required = '$amountRequired', raised = '$amountRequired', img_bg = '$largeImage', img_sm = '$smallImage' WHERE id = '$campId'");
                if($up){
                    echo 'Successfully Created';
                }else{
                    echo 'Failed';
                }   
            }else if($smallImage == "" && $largeImage == "" && $storyFile !=""){
                $up = mysqli_query($this->conn, "UPDATE story SET name = '$patientName', subject = '$subject', v_link = '$v_link', required = '$amountRequired', raised = '$amountRequired', detail = '$storyFile' WHERE id = '$campId'");
                if($up){
                    echo 'Successfully Created';
                }else{
                    echo 'Failed';
                }
            }else if($smallImage == "" && $largeImage != "" && $storyFile ==""){
                $up = mysqli_query($this->conn, "UPDATE story SET name = '$patientName', subject = '$subject', v_link = '$v_link', required = '$amountRequired', raised = '$amountRequired', img_bg = '$largeImage' WHERE id = '$campId'");
                if($up){
                    echo 'Successfully Created';
                }else{
                    echo 'Failed';
                }
            }else if($smallImage != "" && $largeImage == "" && $storyFile ==""){
                $up = mysqli_query($this->conn, "UPDATE story SET name = '$patientName', subject = '$subject', v_link = '$v_link', required = '$amountRequired', raised = '$amountRequired', img_sm = '$smallImage' WHERE id = '$campId'");
                if($up){
                    echo 'Successfully Created';
                }else{
                    echo 'Failed';
                }
            }else if($smallImage != "" && $largeImage != "" && $storyFile !=""){
                $up = mysqli_query($this->conn, "UPDATE story SET name = '$patientName', subject = '$subject', v_link = '$v_link', required = '$amountRequired', raised = '$amountRequired', img_bg = '$largeImage', img_sm = '$smallImage', detail = '$storyFile' WHERE id = '$campId'");
                if($up){
                    echo 'Successfully Created';
                }else{
                    echo 'Failed';
                }
            }
        }

        function createNews($topic, $link, $smallImage, $status, $date_time){
            
            $tableFields = "topic, image, link, date, status";
            $variables = "'$topic','$smallImage','$link', '$date_time', '$status'";
            $table = "news";
            $success = "Successfully Created";
            $failure = "Oops! Something went wrong, please try again";
            Query::dbInsert($this->conn, $table, $tableFields, $variables, $success, $failure);
        }

        function createVideo($topic, $link, $status, $date_time){
            
            $tableFields = "topic, v_link, date, status";
            $variables = "'$topic', '$link', '$date_time', '$status'";
            $table = "videos";
            $success = "Successfully Created";
            $failure = "Oops! Something went wrong, please try again";
            Query::dbInsert($this->conn, $table, $tableFields, $variables, $success, $failure);
        }

        function createEduCamp($subject, $amountRequired, $smallImage, $largeImage, $storyFile, $status, $raised, $date_time){
            
            $tableFields = "img_sm, img_bg, subject, detail, required, raised, date_created, status";
            $variables = "'$smallImage','$largeImage', '$subject', '$storyFile', '$amountRequired', '$raised', '$date_time', '$status'";
            $table = "education";
            $success = "Successfully Created";
            $failure = "Oops! Something went wrong, please try again";
            Query::dbInsert($this->conn, $table, $tableFields, $variables, $success, $failure);
        }

        function fetchAllEduCamps(){
            $returnArray = array();
            $sel = mysqli_query($this->conn, "SELECT * FROM education ORDER BY id DESC");
            while($row = mysqli_fetch_array($sel)){
                $holdingArray = array();
                $holdingArray["id"] = $row["id"];
                $holdingArray["img_sm"] = $row["img_sm"];
                $holdingArray["img_bg"] = $row["img_bg"];
                $holdingArray["subject"] = $row["subject"];
                $holdingArray["detail"] = $row["detail"];
                $holdingArray["required"] = $row["required"];
                $holdingArray["raised"] = $row["raised"];
                $holdingArray["date_created"] = $row["date_created"];
                $holdingArray["status"] = $row["status"];

                array_push($returnArray, $holdingArray);
            }

            echo json_encode($returnArray);
        }

        function fetchEduCampsApp(){
            $returnArray = array();
            $sel = mysqli_query($this->conn, "SELECT * FROM education ORDER BY id DESC LIMIT 20");
            while($row = mysqli_fetch_array($sel)){
                $holdingArray = array();
                $holdingArray["id"] = $row["id"];
                $holdingArray["img_sm"] = $row["img_sm"];
                $holdingArray["img_bg"] = $row["img_bg"];
                $holdingArray["subject"] = $row["subject"];
                $holdingArray["detail"] = $row["detail"];
                $holdingArray["required"] = $row["required"];
                $holdingArray["raised"] = $row["raised"];
                $holdingArray["date_created"] = $row["date_created"];
                $holdingArray["status"] = $row["status"];

                array_push($returnArray, $holdingArray);
            }

            echo json_encode($returnArray);
        }

        function fetchCampDetails($campId){
            $returnArrayPatient = array();
            $returnArraySupporter = array();
            $returnArray = array();
            $sel = mysqli_query($this->conn, "SELECT * FROM education WHERE id = '$campId'");
            while($row = mysqli_fetch_array($sel)){
                $holdingArray = array();
                $holdingArray["id"] = $row["id"];
                $holdingArray["img_sm"] = $row["img_sm"];
                $holdingArray["img_bg"] = $row["img_bg"];
                $holdingArray["subject"] = $row["subject"];
                $holdingArray["detail"] = $row["detail"];
                $holdingArray["required"] = $row["required"];
                $holdingArray["raised"] = $row["raised"];
                $holdingArray["date_created"] = $row["date_created"];
                $holdingArray["status"] = $row["status"];

                array_push($returnArrayPatient, $holdingArray);
            }

            $sel = mysqli_query($this->conn, "SELECT * FROM supporters WHERE patient_id = '$campId'");
            while($row = mysqli_fetch_array($sel)){
                $holdingArray = array();
                $holdingArray["id"] = $row["id"];
                $holdingArray["name"] = $row["name"];
                $holdingArray["amount"] = $row["amount"];

                array_push($returnArraySupporter, $holdingArray);
            }

            array_push($returnArray, $returnArrayPatient);
            array_push($returnArray, $returnArraySupporter);

            echo json_encode($returnArray);
        }
    }

?>