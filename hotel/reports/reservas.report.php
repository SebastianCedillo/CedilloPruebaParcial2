<?php
require('../reports/fpdf.php');
require_once("../models/reservas.model.php");

// Crear una instancia de FPDF
$pdf = new FPDF();
$pdf->AddPage();

// Crear una instancia de la clase Reservas
$reservas = new Reservas();  

// Configurar la fuente y título
$pdf->SetFont('Arial', 'B', 12);
$pdf->Text(30, 10, 'Reporte de Reservas');
$pdf->SetFont('Arial', '', 12);

// Obtener la lista de reservas
$listareservas = $reservas->todos();  

// Verificar si hay datos
if ($listareservas) {
    $pdf->Ln(10); 

    // Encabezados de la tabla
    $pdf->Cell(10, 10, "#", 1);
    $pdf->Cell(30, 10, "ID Reserva", 1);
    $pdf->Cell(30, 10, "ID Huésped", 1);
    $pdf->Cell(30, 10, "ID Habitación", 1);
    $pdf->Cell(30, 10, "Fecha Reserva", 1);
    $pdf->Cell(30, 10, "Fecha Entrada", 1);
    $pdf->Cell(30, 10, "Fecha Salida", 1);
    $pdf->Cell(30, 10, "Estado", 1);
    $pdf->Ln();

    // Contador de filas
    $index = 1;

    // Agregar los datos de las reservas
    while ($reserva = mysqli_fetch_assoc($listareservas)) {
        $pdf->Cell(10, 10, $index, 1);
        $pdf->Cell(30, 10, $reserva["reserva_id"], 1);
        $pdf->Cell(30, 10, $reserva["huesped_id"], 1);
        $pdf->Cell(30, 10, $reserva["habitacion_id"], 1);
        $pdf->Cell(30, 10, $reserva["fecha_reserva"], 1);
        $pdf->Cell(30, 10, $reserva["fecha_entrada"], 1);
        $pdf->Cell(30, 10, $reserva["fecha_salida"], 1);
        $pdf->Cell(30, 10, $reserva["estado"], 1);
        $pdf->Ln();
        $index++;
    }
} else {
    $pdf->Ln(20);
    $pdf->Cell(0, 10, 'No hay reservas disponibles.', 1, 1, 'C');
}

// Generar el PDF
$pdf->Output();
?>
