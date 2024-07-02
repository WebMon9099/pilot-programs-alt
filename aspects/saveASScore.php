<?php

require_once ('../../../../../wp-config.php');
global $wpdb;

$current_user = wp_get_current_user ();
$userId = $current_user->ID;
$tablename = $wpdb->prefix . 'pat_scorecharts';

if (isset ( $_POST ['aspectErrors'] ) && isset ( $_POST ['duration'] )) {

  $errors = ($_POST ['aspectErrors']);

  $gameId = 'aspects_basic';
  $gdate = date ( 'Y/m/d H:i:s' );
  $du = ($_POST ['duration']);

  $dataA = array (
    'user_id' => $userId,
    'game_id' => $gameId,
    'game_date' => $gdate,
    'game_duration' => $du,
    'score_errors' => $errors,
    'score_accuracy' => NULL,
    'score_accuracy2' => NULL,
    'score_reactiontime' => NULL
  );

  $wpdb->insert ( $tablename, $dataA );
}

?>

