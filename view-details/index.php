<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />

        <?php
            $dbhost = 'localhost';
             $dbuser = 'giftingv';
             $dbpass = '3cP-n0q56rYX!T';
            // $dbuser = 'root';
            // $dbpass = '';
            $db = 'giftingv_gvn';
            $conn = @mysqli_connect($dbhost, $dbuser, $dbpass, $db);
            
            $patientId=$_GET['id'];
            $sel = @mysqli_query($conn, "SELECT * FROM patients WHERE id = '$patientId'");
            $row = @mysqli_fetch_array($sel);
            
            $ogTitle = $row["subject"];
            $ogDesc = "Required: $".$row["required"]. " Raised: ".$row["raised"];
            $ogImg = "https://giftingvolunteernetwork.org/assets/images/".$row["img_bg"];

            echo '
                <meta property="og:title" id="ogTitle" content="'.$ogTitle.'" />
                <meta property="og:url" content="giftingvolunteernetwork.org/view-edu-camp/?id=1" />
                <meta property="og:description" content="'.$ogDesc.'" />
                <meta property="og:image" content="'.$ogImg.'" />
                <meta property="og:type" content="article" />
            ';
        ?>

        <title>Gifting Volonteer Network - Medical Procedures</title>
        <link rel="icon" href="../assets/logos/logo.png" type="image/x-icon" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css">
        <link rel="stylesheet" href="../css/bootstrap.min.css">
        <link rel="stylesheet" href="../css/style.css">

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
        <link rel="me" href="https://twitter.com/twitterdev">
    </head>
    <body>
        <div id="fb-root"></div>
        <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v12.0" nonce="eMV0WmnN"></script>
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-white shadow">
                <div class="container-fluid px-2 py-3">
                  <img src="../assets/logos/logo.png" class="d-none d-md-block" style="max-height: 50px; max-width: auto;">
                  <img src="../assets/logos/logo.png" class="d-block d-md-none" style="max-height: 30px; max-width: auto;">
                  <div class="collapse navbar-collapse px-5" id="navbarNavDropdown">
                    <ul class="navbar-nav ubuntu-font">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="../">Home</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="../about">About Us</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="../patients">Patients/MedCamps</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="../edu-camp">Edu Campaigns</a>
                      </li>
                      <!-- <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Patients
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                          <li><a class="dropdown-item" href="../surgeries">Surgeries</a></li>
                          <li><a class="dropdown-item" href="#">Medical Procedures</a></li>
                          <li><a class="dropdown-item" href="../campaigns">Special Campaigns</a></li>
                        </ul>
                      </li> -->
                      <li class="nav-item">
                        <a class="nav-link" href="../stories">Success Stories</a>
                      </li>
                      <!-- <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Medical Camps
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                          <li><a class="dropdown-item" href="#">Upcoming Medical Camps</a></li>
                          <li><a class="dropdown-item" href="#">Completed Medical Camps</a></li>
                        </ul>
                      </li> -->
                      <li class="nav-item">
                        <a class="nav-link" href="../contact">Contact Us</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="../blog">Blog</a>
                      </li>
                    </ul>
                  </div>
                  <!-- <div class="mx-3 d-flex flex-row">
                    <img src="../assets/icons/carts.png" class="mx-1"> 
                    <div class="bg-success d-flex justify-content-center align-items-center p-2" style="width: 30px; height: 30px; border-radius: 40px; font-weight: bold;">0</div>
                  </div> -->
                  <button class="navbar-toggler" style="border-width: 0px;" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <!-- <div class="d-flex flex-row justify-content-end align-items-center d-none d-sm-block">
                    <button class="btn btn-sm btn-success ubuntu-font">Login</button>
                    <button class="btn btn-sm btn-success m-1 ubuntu-font">Register</button>
                  </div> -->
                </div>
            </nav>

            <div class="ubuntu-font p-3 d-flex justify-content-between align-items-center bg-success d-block d-md-none">
                <div>
                    <h5 class="text-white">Patient</h5>
                    <span style="font-size: 10px;"><a class="text-white" href="../" style="text-decoration: none;">Home</a></span><span style="font-size: 10px;" class="text-white"> > Patients/MedCamps</span>
                </div>
                <div class="d-flex flex-column">
                    <span class="text-white" style="font-size: 12px;">Contributions with an impact</span>
                    <button class="btn bg-white text-success btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" style="font-size: 10px;">Donate now</button>
                </div>
                <div style="display: none;" class="patientId"><?php echo $_GET['id'] ?></div>
            </div>
            <div class="ubuntu-font p-3 bg-success d-none d-md-block">
                <div class="d-flex flex-row justify-content-between align-items-center">
                    <div>
                        <h3 class="text-white">Patient</h3>
                        <a class="text-white" href="../" style="text-decoration: none;">Home</a><span class="text-white"> > Patients/MedCamps</span>
                    </div>
                    <div class="d-flex flex-column">
                        <span class="text-white">Contributions with an impact</span>
            
                        <button class="btn bg-white text-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Donate now</button>
                    </div>
                </div>
            </div>

            <div class="ubuntu-font row mt-3">
                <div class="col-sm-12 col xs-12 col-md-8 p-4 patientDetails">
                    
                </div>
                <div class="col-sm-12 col-xs-12 col-md-4 p-3">
                    <h4 style="font-weight: bold;">Related Campaigns</h4>
                    <!-- <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-6">
                            <div class="d-flex flex-column patientCampaignInner">
                                <img src="../assets/images/hamza.jpg" style="border-radius: 10px;">
                                <h6 style="font-weight: bold;">Donate to Hamza Ali for his cochlear implant</h6>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6">
                            <div class="d-flex flex-column">
                                <img src="../assets/images/hamza.jpg" style="border-radius: 10px;">
                                <h6 style="font-weight: bold;">Donate to Hamza Ali for his cochlear implant</h6>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6">
                            <div class="d-flex flex-column">
                                <img src="../assets/images/hamza.jpg" style="border-radius: 10px;">
                                <h6 style="font-weight: bold;">Donate to Hamza Ali for his cochlear implant</h6>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>

            <footer class="footer-06 bg-dark">
                <div class="container">
                    <div class="row pt-4 text-white ubuntu-font">
                        <div class="col-md-8">
                            <div class="row">
                                <div class="col-md-3">
                                    <h5 class="footer-heading">Explore</h5>
                                    <ul class="list-unstyled text-success" style="font-size: 12px;">
                                        <a href="../" class="text-success" style="text-decoration: none;"><li><span class="ion-ios-checkmark-circle-outline mx-2"><i class="fas fa-home"></i></span>Home</li></a>
                                        <a href="../about" class="text-success" style="text-decoration: none;"><li><span class="ion-ios-checkmark-circle-outline mx-2"><i class="fas fa-id-card-alt"></i></span>About</li></a>
                                        <a href="../contact" class="text-success" style="text-decoration: none;"><li><span class="ion-ios-checkmark-circle-outline mx-2"><i class="fas fa-address-card"></i></span>Contact Us</li></a>
                                        <!-- <li><span class="ion-ios-checkmark-circle-outline mx-2"><i class="fas fa-sign-in-alt"></i></span>Login/Register</li> -->
                                    </ul>
                                </div>
                                <div class="col-md-6">
                                    <h5 class="footer-heading">Contact</h5>
                                    <ul class="list-unstyled text-success" style="font-size: 12px;">
                                        <li><span class="ion-ios-checkmark-circle-outline mx-2"><i class="fab fa-whatsapp"></i></span>+2348051226464</li>
                                        <li><span class="ion-ios-checkmark-circle-outline mx-2"><i class="fas fa-envelope"></i></span>support@giftingvolunteernetwork.com</li>
                                        <li><span class="ion-ios-checkmark-circle-outline mx-2"><i class="fas fa-map-marker-alt"></i></span>No 5, Pastor Samuel Abeji street, Eti-Osa LGA, Lagos State</li>
                                    </ul>
                                </div>
                                <div class="col-md-3">
                                    <h5 class="footer-heading">Vision</h5>
                                    <span class="text-success" style="font-size: 12px;">Gifting Volunteer Network is a non-profit organization to support people worldwide and keep an eye in the future Support.</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="row justify-content-end">
                                <div class="col-md-12 col-lg-9 text-md-right mb-md-0 mb-4">
                                    <div class="d-flex flex-row">
                                        <a href="https://facebook.com/giftingvolunteernetwork" target="_blank"><i class="m-1 fab fa-facebook-square text-white" style="font-size: 25px;"></i></a>
                                        <a href="https://youtube.com/channel/UCoEBP-1_wLzoJ05PlPhYWDA" target="_blank"><i class="m-1 fab fa-youtube text-white" style="font-size: 25px;"></i></a>
                                        <a href="https://www.instagram.com/giftingvolunteer_n/" target="_blank"><i class="m-1 fab fa-instagram text-white" style="font-size: 25px;"></i></a>
                                    </div>
                                    <p class="copyright mt-3">
                                        Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | Designed by <a href="https://pci-ng.com" target="_blank">proSoft</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="d-flex flex-row justify-content-between align-items-center">
                                <h6 class="text-success">Payment Details</h6>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="d-flex flex-column mt-3">
                            <div class="input-group mb-3" style="display: none;">
                                    <input type="text" class="form-control pId" value="0" placeholder="Patient Id">
                                </div>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control fname" placeholder="First Name">
                                </div>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control lname" placeholder="Last Name">
                                </div>
                                <div class="input-group mb-3">
                                    <input type="email" class="form-control email" placeholder="Email Address*" required>
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">$</span>
                                    <input type="text" class="form-control amount donateAmount" aria-label="Amount (to the nearest dollar)">
                                    <span class="input-group-text">.00</span>
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">Donation Tips</span>
                                    <input type="text" class="form-control charges" aria-label="Charges (to the nearest dollar)" disabled>
                                    <span class="input-group-text">.00</span>
                                </div>
                                <div class="input-group mb-3 d-flex justify-content-center align-items-center">
                                    <button class="btn btn-success freePaymentInner">Donate Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script type="text/javascript" src="../js/jquery.min.js"></script>
        <script type="text/javascript" src="../js/popper.min.js"></script>
        <script type="text/javascript" src="../js/bootstrap.min.js"></script>
        <script src="https://js.paystack.co/v1/inline.js"></script>
        <!-- <script src="https://checkout.flutterwave.com/v3.js"></script> -->
        <script type="text/javascript" src="../js/index.js"></script>
    </body>
</html>