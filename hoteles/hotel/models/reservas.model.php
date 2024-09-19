<?php
// TODO: Clase de Reservas
require_once('../config/conex.php');

class Reservas
{
    public function buscar($texto) // select * from reservas where estado = $texto
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `reservas` WHERE `estado` = '$texto'";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function todos() // select * from reservas
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `reservas`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($reserva_id) // select * from reservas where reserva_id = $reserva_id
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `reservas` WHERE `reserva_id` = $reserva_id";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($huesped_id, $habitacion_id, $fecha_reserva, $fecha_entrada, $fecha_salida, $estado) // insert into reservas (huesped_id, habitacion_id, fecha_reserva, fecha_entrada, fecha_salida, estado) values ($huesped_id, $habitacion_id, $fecha_reserva, $fecha_entrada, $fecha_salida, $estado)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `reservas`(`huesped_id`, `habitacion_id`, `fecha_reserva`, `fecha_entrada`, `fecha_salida`, `estado`) 
                       VALUES ('$huesped_id', '$habitacion_id', '$fecha_reserva', '$fecha_entrada', '$fecha_salida', '$estado')";
            if (mysqli_query($con, $cadena)) {
                return $con->insert_id; // Retorna el ID insertado
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function actualizar($reserva_id, $huesped_id, $habitacion_id, $fecha_reserva, $fecha_entrada, $fecha_salida, $estado) // update reservas set huesped_id = $huesped_id, habitacion_id = $habitacion_id, fecha_reserva = $fecha_reserva, fecha_entrada = $fecha_entrada, fecha_salida = $fecha_salida, estado = $estado where reserva_id = $reserva_id
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `reservas` SET 
                       `huesped_id`='$huesped_id',
                       `habitacion_id`='$habitacion_id',
                       `fecha_reserva`='$fecha_reserva',
                       `fecha_entrada`='$fecha_entrada',
                       `fecha_salida`='$fecha_salida',
                       `estado`='$estado' 
                       WHERE `reserva_id` = $reserva_id";
            if (mysqli_query($con, $cadena)) {
                return $reserva_id; // Retorna el ID actualizado
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($reserva_id) // delete from reservas where reserva_id = $reserva_id
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `reservas` WHERE `reserva_id` = $reserva_id";
            if (mysqli_query($con, $cadena)) {
                return 1; // Éxito
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
}
