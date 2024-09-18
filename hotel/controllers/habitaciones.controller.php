<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

require_once('../models/habitaciones.model.php');
error_reporting(0);
$habitaciones = new Habitaciones;

switch ($_GET["op"]) {
    case 'buscar': 
        if (!isset($_POST["texto"])) {
            echo json_encode(["error" => "Room number not specified."]);
            exit();
        }
        $texto = $_POST["texto"]; 
        $datos = $habitaciones->buscar($texto);
        $todos = [];
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'todos':
        $datos = $habitaciones->todos();
        $todos = [];
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno': 
        if (!isset($_POST["habitacion_id"])) {
            echo json_encode(["error" => "Room ID not specified."]);
            exit();
        }
        $habitacion_id = intval($_POST["habitacion_id"]);
        $datos = $habitaciones->uno($habitacion_id);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar': 
        if (!isset($_POST["numero"]) || !isset($_POST["tipo"]) || !isset($_POST["precio"]) || !isset($_POST["disponible"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $numero = $_POST["numero"];
        $tipo = $_POST["tipo"];
        $precio = $_POST["precio"];
        $disponible = $_POST["disponible"];

        $datos = $habitaciones->insertar($numero, $tipo, $precio, $disponible);
        echo json_encode($datos);
        break;

    case 'actualizar': 
        if (!isset($_POST["habitacion_id"]) || !isset($_POST["numero"]) || !isset($_POST["tipo"]) || !isset($_POST["precio"]) || !isset($_POST["disponible"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $habitacion_id = intval($_POST["habitacion_id"]);
        $numero = $_POST["numero"];
        $tipo = $_POST["tipo"];
        $precio = $_POST["precio"];
        $disponible = $_POST["disponible"];

        $datos = $habitaciones->actualizar($habitacion_id, $numero, $tipo, $precio, $disponible);
        echo json_encode($datos);
        break;

    case 'eliminar': 
        if (!isset($_POST["habitacion_id"])) {
            echo json_encode(["error" => "Room ID not specified."]);
            exit();
        }
        $habitacion_id = intval($_POST["habitacion_id"]);
        $datos = $habitaciones->eliminar($habitacion_id);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Ingrese el ?op=todos"]);
        break;
}
