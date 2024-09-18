<?php
require('../reports/fpdf.php');
require_once("../models/huespedes.model.php");

// Crear una instancia de FPDF
$pdf = new FPDF();
$pdf->AddPage();

// Crear una instancia de la clase Huespedes
$huespedes = new Huespedes();  

// Configurar la fuente y título
$pdf->SetFont('Arial', 'B', 12);
$pdf->Text(30, 10, 'Reporte de Huéspedes');
$pdf->SetFont('Arial', '', 12);

// Obtener la lista de huéspedes
$listahuespedes = $huespedes->todos();  

// Verificar si hay datos
if ($listahuespedes) {
    $pdf->Ln(10); 

    // Encabezados de la tabla
    $pdf->Cell(10, 10, "#", 1);
    $pdf->Cell(30, 10, "ID Huésped", 1);
    $pdf->Cell(40, 10, "Nombre", 1);
    $pdf->Cell(40, 10, "Apellido", 1);
    $pdf->Cell(40, 10, "Email", 1);
    $pdf->Cell(30, 10, "Teléfono", 1);
    $pdf->Ln();

    // Contador de filas
    $index = 1;

    // Agregar los datos de los huéspedes
    while ($huesped = mysqli_fetch_assoc($listahuespedes)) {
        $pdf->Cell(10, 10, $index, 1);
        $pdf->Cell(30, 10, $huesped["huesped_id"], 1);
        $pdf->Cell(40, 10, $huesped["nombre"], 1);
        $pdf->Cell(40, 10, $huesped["apellido"], 1);
        $pdf->Cell(40, 10, $huesped["email"], 1);
        $pdf->Cell(30, 10, $huesped["telefono"], 1);
        $pdf->Ln();
        $index++;
    }
} else {
    $pdf->Ln(20);
    $pdf->Cell(0, 10, 'No hay huéspedes disponibles.', 1, 1, 'C');
}

// Generar el PDF
$pdf->Output();
?>
