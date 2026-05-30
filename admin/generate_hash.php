<?php
$passwordToHash = isset($_GET['p']) && $_GET['p'] !== '' ? $_GET['p'] : 'admin';
$newHash = password_hash($passwordToHash, PASSWORD_DEFAULT);
header('Content-Type: text/plain; charset=utf-8');
echo "Password: " . $passwordToHash . PHP_EOL;
echo "Hash: " . $newHash . PHP_EOL;
?>
