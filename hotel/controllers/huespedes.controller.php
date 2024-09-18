<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

require_once('../models/huespedes.model.php');
error_reporting(0);
$huespedes = new Huespedes;

switch ($_GET["op"]) {
    case 'buscar': 
        if (!isset($_POST["texto"])) {
            echo json_encode(["error" => "Guest name not specified."]);
            exit();
        }
        $texto = $_POST["texto"]; 
        $datos = $huespedes->buscar($texto);
        $todos = [];
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'todos':
        $datos = $huespedes->todos();
        $todos = [];
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno': 
        if (!isset($_POST["huesped_id"])) {
            echo json_encode(["error" => "Guest ID not specified."]);
            exit();
        }
        $huesped_id = intval($_POST["huesped_id"]);
        $datos = $huespedes->uno($huesped_id);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar': 
        if (!isset($_POST["nombre"]) || !isset($_POST["apellido"]) || !isset($_POST["email"]) || !isset($_POST["telefono"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $email = $_POST["email"];
        $telefono = $_POST["telefono"];

        $datos = $huespedes->insertar($nombre, $apellido, $email, $telefono);
        echo json_encode($datos);
        break;

    case 'actualizar': 
        if (!isset($_POST["huesped_id"]) || !isset($_POST["nombre"]) || !isset($_POST["apellido"]) || !isset($_POST["email"]) || !isset($_POST["telefono"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $huesped_id = intval($_POST["huesped_id"]);
        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $email = $_POST["email"];
        $telefono = $_POST["telefono"];

        $datos = $huespedes->actualizar($huesped_id, $nombre, $apellido, $email, $telefono);
        echo json_encode($datos);
        break;

    case 'eliminar': 
        if (!isset($_POST["huesped_id"])) {
            echo json_encode(["error" => "Guest ID not specified."]);
            exit();
        }
        $huesped_id = intval($_POST["huesped_id"]);
        $datos = $huespedes->eliminar($huesped_id);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Ingrese el ?op=todos"]);
        break;
}
