<?php

require_once __DIR__ . '/../wp-load.php';

$current_user_id = get_current_user_id();

if (!$current_user_id) {
    header("HTTP/1.1 401 Unauthorized");
    exit;
}
