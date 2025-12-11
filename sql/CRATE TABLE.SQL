CREATE TABLE sucursales (
    sucursal_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ciudad VARCHAR(50) NOT NULL,
    direccion VARCHAR(150) NOT NULL
);

---------------------------------------------------------
-- 2. Tabla: empleados
---------------------------------------------------------
CREATE TABLE empleados (
    empleado_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    sucursal_id INT NOT NULL,
    cargo VARCHAR(50) NOT NULL,

    FOREIGN KEY (sucursal_id) REFERENCES sucursales(sucursal_id)
);

---------------------------------------------------------
-- 3. Tabla: clientes
---------------------------------------------------------
CREATE TABLE clientes (
    cliente_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(120) NOT NULL,
    telefono VARCHAR(20)
);

---------------------------------------------------------
-- 4. Tabla: cuentas
---------------------------------------------------------
CREATE TABLE cuentas (
    cuenta_id INT AUTO_INCREMENT PRIMARY KEY,
    numero_cuenta VARCHAR(30) NOT NULL UNIQUE,
    cliente_id INT NOT NULL,
    sucursal_id INT NOT NULL,
    tipo_cuenta ENUM('corriente','ahorros') NOT NULL,
    saldo DECIMAL(18,2) DEFAULT 0,
    fecha_apertura DATE NOT NULL,

    FOREIGN KEY (cliente_id) REFERENCES clientes(cliente_id),
    FOREIGN KEY (sucursal_id) REFERENCES sucursales(sucursal_id)
);

---------------------------------------------------------
-- 5. Tabla: tarjetas
---------------------------------------------------------
CREATE TABLE tarjetas (
    tarjeta_id INT AUTO_INCREMENT PRIMARY KEY,
    numero_tarjeta VARCHAR(20) NOT NULL UNIQUE,
    cuenta_id INT NOT NULL,
    cliente_id INT NOT NULL,
    tipo_tarjeta ENUM('debito','credito') NOT NULL,
    expiracion DATE NOT NULL,

    FOREIGN KEY (cuenta_id) REFERENCES cuentas(cuenta_id),
    FOREIGN KEY (cliente_id) REFERENCES clientes(cliente_id)
);

---------------------------------------------------------
-- 6. Tabla: transacciones
---------------------------------------------------------
CREATE TABLE transacciones (
    transaccion_id INT AUTO_INCREMENT PRIMARY KEY,
    cuenta_id INT NOT NULL,
    empleado_id INT NOT NULL,
    fecha_hora DATETIME NOT NULL,
    tipo_transaccion ENUM('deposito','retiro','transferencia') NOT NULL,
    monto DECIMAL(18,2) NOT NULL,
    ciudad VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255),

    FOREIGN KEY (cuenta_id) REFERENCES cuentas(cuenta_id),
    FOREIGN KEY (empleado_id) REFERENCES empleados(empleado_id)
);