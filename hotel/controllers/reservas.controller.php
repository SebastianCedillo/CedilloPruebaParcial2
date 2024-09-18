<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

require_once('../models/reservas.model.php');
error_reporting(0);
$reservas = new Reservas;

switch ($_GET["op"]) {
    case 'buscar': 
        if (!isset($_POST["texto"])) {
            echo json_encode(["error" => "Reservation criteria not specified."]);
            exit();
        }
        $texto = $_POST["texto"]; 
        $datos = $reservas->buscar($texto);
        $todos = [];
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'todos':
        $datos = $reservas->todos();
        $todos = [];
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno': 
        if (!isset($_POST["reserva_id"])) {
            echo json_encode(["error" => "Reservation ID not specified."]);
            exit();
        }
        $reserva_id = intval($_POST["reserva_id"]);
        $datos = $reservas->uno($reserva_id);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar': 
        if (!isset($_POST["huesped_id"]) || !isset($_POST["habitacion_id"]) || !isset($_POST["fecha_reserva"]) || !isset($_POST["fecha_entrada"]) || !isset($_POST["fecha_salida"]) || !isset($_POST["estado"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $huesped_id = intval($_POST["huesped_id"]);
        $habitacion_id = intval($_POST["habitacion_id"]);
        $fecha_reserva = $_POST["fecha_reserva"];
        $fecha_entrada = $_POST["fecha_entrada"];
        $fecha_salida = $_POST["fecha_salida"];
        $estado = $_POST["estado"];

        $datos = $reservas->insertar($huesped_id, $habitacion_id, $fecha_reserva, $fecha_entrada, $fecha_salida, $estado);
        echo json_encode($datos);
        break;

    case 'actualizar': 
        if (!isset($_POST["reserva_id"]) || !isset($_POST["huesped_id"]) || !isset($_POST["habitacion_id"]) || !isset($_POST["fecha_reserva"]) || !isset($_POST["fecha_entrada"]) || !isset($_POST["fecha_salida"]) || !isset($_POST["estado"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $reserva_id = intval($_POST["reserva_id"]);
        $huesped_id = intval($_POST["huesped_id"]);
        $habitacion_id = intval($_POST["habitacion_id"]);
        $fecha_reserva = $_POST["fecha_reserva"];
        $fecha_entrada = $_POST["fecha_entrada"];
        $fecha_salida = $_POST["fecha_salida"];
        $estado = $_POST["estado"];

        $datos = $reservas->actualizar($reserva_id, $huesped_id, $habitacion_id, $fecha_reserva, $fecha_entrada, $fecha_salida, $estado);
        echo json_encode($datos);
        break;

    case 'eliminar': 
        if (!isset($_POST["reserva_id"])) {
            echo json_encode(["error" => "Reservation ID not specified."]);
            exit();
        }
        $reserva_id = intval($_POST["reserva_id"]);
        $datos = $reservas->eliminar($reserva_id);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Ingrese el ?op=todos"]);
        break;
}
