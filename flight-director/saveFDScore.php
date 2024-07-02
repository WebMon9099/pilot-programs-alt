<?php
require_once('../../../../../wp-config.php');
global $wpdb;
$current_user = wp_get_current_user();
$userId = $current_user->ID;
$tablename=$wpdb->prefix.'pat_scorecharts';
if(isset($_POST["Errors"]) && isset($_POST["Accuracy"])){
	$errors = ($_POST["Errors"]);
	$accuracy =($_POST["Accuracy"]);
	$accuracy2 =($_POST["Accuracy2"]);
	$gameId = "flightdirector_basic";
	$gdate = date('Y/m/d H:i:s');
	$du =($_POST["Duration"]);;
	$dataA = array(
      'user_id'=>$userId,
  		'game_id'=>$gameId,
  		'game_date'=>$gdate,
  		'game_duration'=>$du,
  		'score_errors'=>$errors,
  		'score_accuracy'=>$accuracy,
  		'score_accuracy2'=>$accuracy2,
  		'score_reactiontime'=>NULL
		);
								
  $wpdb->insert( $tablename,$dataA);	
}
?>