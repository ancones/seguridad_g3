-- Insertar Áreas
INSERT INTO area (id_area, nombre) VALUES
(1, 'Atención al Cliente'),
(2, 'Facturación'),
(3, 'Técnico/Soporte Técnico'),
(4, 'Ventas'),
(5, 'Postventa'),
(6, 'Gestión de Dispositivos');

-- Insertar Tipos de Solicitud por Área
INSERT INTO tipo_solicitud (id_tipo_solicitud, nombre, id_area) VALUES
-- Atención al Cliente
(1, 'Revisión de contrato', 1),
(2, 'Solicitud de cambio de plan', 1),

-- Facturación
(3, 'Reclamo por cargo indebido', 2),
(4, 'Solicitud de factura electrónica', 2),
(5, 'Detalle de consumo mensual', 2),

-- Técnico / Soporte Técnico
(6, 'Reporte de falla en la red', 3),
(7, 'Sin señal o cobertura', 3),
(8, 'Problemas con datos móviles', 3),

-- Ventas
(9, 'Solicitud de nuevo plan postpago', 4),
(10, 'Compra de dispositivo', 4),
(11, 'Activación de línea adicional', 4),

-- Postventa
(12, 'Devolución de equipo', 5),
(13, 'Garantía de dispositivo', 5),
(14, 'Solicitud de reparación', 5),

-- Gestión de Dispositivos
(15, 'Reporte de IMEI robado', 6),
(16, 'Solicitud de desbloqueo de equipo', 6);

-- Insertar Estados de Solicitud
INSERT INTO estado_solicitud (id_estado, nombre) VALUES
(1, 'Pendiente'),
(2, 'Resuelta'),
(3, 'Cerrada'),
(4, 'Rechazada'),
(5, 'Cancelada');
