<?php
require_once('../../../../../wp-config.php');

global $wpdb;

$current_user = wp_get_current_user();

$userId = $current_user->ID;
$tablename=$wpdb->prefix.'pat_scorecharts';

if(isset($_POST["Errors"]) && isset($_POST["Accuracy"])){
	$duration = ($_POST["Duration"]);
	$errors = ($_POST["Errors"]);
	$accuracy =($_POST["Accuracy"]);
	$gameId = "multitasker_basic";
	$gdate = date('Y/m/d H:i:s');
	$du =NULL;
	$dataA = array(
    'user_id'=>$userId,
		'game_id'=>$gameId,
		'game_date'=>$gdate,
		'game_duration'=>$duration,
		'score_errors'=>$errors,
		'score_accuracy'=>$accuracy,
		'score_accuracy2'=>NULL,
		'score_reactiontime'=>NULL
  );
	
  $wpdb->insert( $tablename,$dataA);	
}


?>

