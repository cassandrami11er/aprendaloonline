<?php

$name = $_POST["name"];
$number = filter_input(INPUT_POST, "number", FILTER_VALIDATE_INT);
$startofweek = filter_input(INPUT_POST, "startofweek", FILTER_VALIDATE_INT);

var_dump($name, $number, $startofweek);