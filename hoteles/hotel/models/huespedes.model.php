<?php
// TODO: Clase de Huespedes
require_once('../config/conex.php');

class Huespedes
{
    public function buscar($texto) // select * from huespedes where nombre = $texto
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `huespedes` WHERE `nombre` = '$texto'";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function todos() // select * from huespedes
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `huespedes`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($huesped_id) // select * from huespedes where huesped_id = $huesped_id
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `huespedes` WHERE `huesped_id` = $huesped_id";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($nombre, $apellido, $email, $telefono) // insert into huespedes (nombre, apellido, email, telefono) values ($nombre, $apellido, $email, $telefono)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `huespedes`(`nombre`, `apellido`, `email`, `telefono`) 
                       VALUES ('$nombre', '$apellido', '$email', '$telefono')";
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

    public function actualizar($huesped_id, $nombre, $apellido, $email, $telefono) // update huespedes set nombre = $nombre, apellido = $apellido, email = $email, telefono = $telefono where huesped_id = $huesped_id
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `huespedes` SET 
                       `nombre`='$nombre',
                       `apellido`='$apellido',
                       `email`='$email',
                       `telefono`='$telefono' 
                       WHERE `huesped_id` = $huesped_id";
            if (mysqli_query($con, $cadena)) {
                return $huesped_id; // Retorna el ID actualizado
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($huesped_id) // delete from huespedes where huesped_id = $huesped_id
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `huespedes` WHERE `huesped_id` = $huesped_id";
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
