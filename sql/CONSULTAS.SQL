SELECT
  c.numero_cuenta,
  cl.nombre AS cliente_nombre,
  cl.apellido AS cliente_apellido,
  s.nombre AS sucursal_nombre,
  c.tipo_cuenta,
  c.saldo
FROM cuentas c
INNER JOIN clientes cl ON c.cliente_id = cl.cliente_id
INNER JOIN sucursales s ON c.sucursal_id = s.sucursal_id
ORDER BY s.nombre, cl.apellido;

SELECT
  cl.cliente_id,
  cl.nombre, cl.apellido,
  c.numero_cuenta,
  c.tipo_cuenta,
  c.saldo
FROM clientes cl
LEFT JOIN cuentas c ON c.cliente_id = cl.cliente_id
ORDER BY cl.cliente_id;