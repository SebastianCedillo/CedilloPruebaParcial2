<?php
// TODO: Clase de Habitaciones
require_once('../config/conex.php');

class Habitaciones
{
    public function buscar($texto) // select * from habitaciones where numero = $texto
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `habitaciones` WHERE `numero` = '$texto'";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function todos() // select * from habitaciones
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `habitaciones`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($habitacion_id) // select * from habitaciones where habitacion_id = $habitacion_id
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `habitaciones` WHERE `habitacion_id` = $habitacion_id";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($numero, $tipo, $precio, $disponible) // insert into habitaciones (numero, tipo, precio, disponible) values ($numero, $tipo, $precio, $disponible)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `habitaciones`(`numero`, `tipo`, `precio`, `disponible`) 
                       VALUES ('$numero', '$tipo', '$precio', '$disponible')";
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

    public function actualizar($habitacion_id, $numero, $tipo, $precio, $disponible) // update habitaciones set numero = $numero, tipo = $tipo, precio = $precio, disponible = $disponible where habitacion_id = $habitacion_id
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `habitaciones` SET 
                       `numero`='$numero',
                       `tipo`='$tipo',
                       `precio`='$precio',
                       `disponible`='$disponible' 
                       WHERE `habitacion_id` = $habitacion_id";
            if (mysqli_query($con, $cadena)) {
                return $habitacion_id; // Retorna el ID actualizado
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($habitacion_id) // delete from habitaciones where habitacion_id = $habitacion_id
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `habitaciones` WHERE `habitacion_id` = $habitacion_id";
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
