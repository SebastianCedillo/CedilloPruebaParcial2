<?php
require('../reports/fpdf.php');
require_once("../models/habitaciones.model.php");

// Crear una instancia de FPDF
$pdf = new FPDF();
$pdf->AddPage();

// Crear una instancia de la clase Habitaciones
$habitaciones = new Habitaciones();  

// Configurar la fuente y título
$pdf->SetFont('Arial', 'B', 12);
$pdf->Text(30, 10, 'Reporte de Habitaciones');
$pdf->SetFont('Arial', '', 12);

// Obtener la lista de habitaciones
$listahabitaciones = $habitaciones->todos();  

// Verificar si hay datos
if ($listahabitaciones) {
    $pdf->Ln(10); 

    // Encabezados de la tabla
    $pdf->Cell(10, 10, "#", 1);
    $pdf->Cell(30, 10, "ID Habitacion", 1);
    $pdf->Cell(30, 10, "Numero", 1);
    $pdf->Cell(30, 10, "Tipo", 1);
    $pdf->Cell(30, 10, "Precio", 1);
    $pdf->Cell(30, 10, "Disponible", 1);
    $pdf->Ln();

    // Contador de filas
    $index = 1;

    // Agregar los datos de las habitaciones
    while ($habitacion = mysqli_fetch_assoc($listahabitaciones)) {
        $pdf->Cell(10, 10, $index, 1);
        $pdf->Cell(30, 10, $habitacion["habitacion_id"], 1);
        $pdf->Cell(30, 10, $habitacion["numero"], 1);
        $pdf->Cell(30, 10, $habitacion["tipo"], 1);
        $pdf->Cell(30, 10, $habitacion["precio"], 1);
        $pdf->Cell(30, 10, $habitacion["disponible"], 1);
        $pdf->Ln();
        $index++;
    }
} else {
    $pdf->Ln(20);
    $pdf->Cell(0, 10, 'No hay habitaciones disponibles.', 1, 1, 'C');
}

// Generar el PDF
$pdf->Output();
?>

