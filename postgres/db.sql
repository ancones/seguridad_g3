CREATE TABLE IF NOT EXISTS area (
    id_area SERIAL PRIMARY KEY,
    nombre VARCHAR NOT NULL
);

CREATE INDEX IF NOT EXISTS ix_area_id_area ON area (id_area);

CREATE TABLE IF NOT EXISTS estado_solicitud (
    id_estado SERIAL PRIMARY KEY,
    nombre VARCHAR NOT NULL
);

CREATE INDEX IF NOT EXISTS ix_estado_solicitud_id_estado ON estado_solicitud (id_estado);

CREATE TABLE IF NOT EXISTS tipo_solicitud (
    id_tipo_solicitud SERIAL PRIMARY KEY,
    nombre VARCHAR NOT NULL,
    id_area INTEGER NOT NULL,
    FOREIGN KEY (id_area) REFERENCES area (id_area)
);

CREATE INDEX IF NOT EXISTS ix_tipo_solicitud_id_tipo_solicitud ON tipo_solicitud (id_tipo_solicitud);

INSERT INTO area (id_area, nombre) VALUES
(1, 'Atencion al Cliente'),
(2, 'Facturacion'),
(3, 'Tecnico/Soporte Tecnico'),
(4, 'Ventas'),
(5, 'Postventa'),
(6, 'Gestion de Dispositivos')
ON CONFLICT (id_area) DO NOTHING;

INSERT INTO tipo_solicitud (id_tipo_solicitud, nombre, id_area) VALUES
(1, 'Revision de contrato', 1),
(2, 'Solicitud de cambio de plan', 1),
(3, 'Reclamo por cargo indebido', 2),
(4, 'Solicitud de factura electronica', 2),
(5, 'Detalle de consumo mensual', 2),
(6, 'Reporte de falla en la red', 3),
(7, 'Sin senal o cobertura', 3),
(8, 'Problemas con datos moviles', 3),
(9, 'Solicitud de nuevo plan postpago', 4),
(10, 'Compra de dispositivo', 4),
(11, 'Activacion de linea adicional', 4),
(12, 'Devolucion de equipo', 5),
(13, 'Garantia de dispositivo', 5),
(14, 'Solicitud de reparacion', 5),
(15, 'Reporte de IMEI robado', 6),
(16, 'Solicitud de desbloqueo de equipo', 6)
ON CONFLICT (id_tipo_solicitud) DO NOTHING;

INSERT INTO estado_solicitud (id_estado, nombre) VALUES
(1, 'Pendiente'),
(2, 'Resuelta'),
(3, 'Cerrada'),
(4, 'Rechazada'),
(5, 'Cancelada')
ON CONFLICT (id_estado) DO NOTHING;

SELECT setval(
    pg_get_serial_sequence('area', 'id_area'),
    COALESCE((SELECT MAX(id_area) FROM area), 1),
    true
);

SELECT setval(
    pg_get_serial_sequence('tipo_solicitud', 'id_tipo_solicitud'),
    COALESCE((SELECT MAX(id_tipo_solicitud) FROM tipo_solicitud), 1),
    true
);

SELECT setval(
    pg_get_serial_sequence('estado_solicitud', 'id_estado'),
    COALESCE((SELECT MAX(id_estado) FROM estado_solicitud), 1),
    true
);
