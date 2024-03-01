<?php
	 $dbhost = 'localhost';
	//  $dbuser = 'giftingv';
	//  $dbpass = '3cP-n0q56rYX!T';
	$dbuser = 'root';
	$dbpass = '';
	 $db = 'giftingv_gvn';
	 $conn = mysqli_connect($dbhost, $dbuser, $dbpass, $db);
	 if(!$conn ){
		die('Could not connect');
	 }
	//echo 'Connected successfully';

	//@mysqli_select_db( 'prohms' );

	//mysqli_close($conn);
?>