<?php
require_once ('../../../../../wp-config.php');
global $wpdb;
$current_user = wp_get_current_user();
$userId = $current_user->ID;
$tablename=$wpdb->prefix.'pat_scorecharts';
if(isset($_POST["adjust_errors"]) && isset($_POST["duration"])){
		$errors = ($_POST["adjust_errors"]);
		$accu = $_POST["accuracy"];
		$gameId = "adjust_advanced";
		$gdate = date('Y/m/d H:i:s');
		$du =($_POST["duration"]);;
		$dataA = array('user_id'=>$userId,
						'game_id'=>$gameId,
						'game_date'=>$gdate,
						'game_duration'=>$du,
						'score_errors'=>$errors,
						'score_accuracy'=>$accu,
						'score_accuracy2'=>NULL,
						'score_reactiontime'=>NULL
						);
						

		
$wpdb->insert( $tablename,$dataA);	
}


?>

