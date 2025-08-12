CREATE OR REPLACE FUNCTION registrar_investigador(
  p_nombre VARCHAR,
  p_apellido VARCHAR,
  p_departamento VARCHAR,
  p_experiencia INT
)
RETURNS TABLE (
  id INT,
  nombre VARCHAR,
  apellido VARCHAR,
  departamento VARCHAR,
  experiencia INT
) AS $$
BEGIN
  RETURN QUERY
  INSERT INTO investigadores (nombre, apellido, departamento, experiencia)
  VALUES (p_nombre, p_apellido, p_departamento, p_experiencia)
  RETURNING investigadores.id AS id, 
            investigadores.nombre AS nombre, 
            investigadores.apellido AS apellido,
            investigadores.departamento AS departamento,
            investigadores.experiencia AS experiencia;
END;
$$ LANGUAGE plpgsql;
SELECT registrar_investigador('Juan', 'Pérez', 'Matemáticas', 12);

CREATE OR REPLACE FUNCTION obtener_investigadores()
RETURNS TABLE (
  id INT,
  nombre VARCHAR,
  apellido VARCHAR,
  departamento VARCHAR,
  experiencia INT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    i.id AS id,
    i.nombre AS nombre,
    i.apellido AS apellido,
    i.departamento AS departamento,
    i.experiencia AS experiencia
  FROM investigadores i
  ORDER BY i.id ASC;
END;
$$ LANGUAGE plpgsql;
SELECT * FROM obtener_investigadores()

--consulta lineas
CREATE OR REPLACE FUNCTION registrar_linea(
  p_nombre VARCHAR,
  p_area VARCHAR
) RETURNS TABLE (
  id INT,
  nombre VARCHAR,
  area VARCHAR
) AS $$
BEGIN
  RETURN QUERY
  INSERT INTO lineas_investigacion (nombre, area)
  VALUES (p_nombre, p_area)
  RETURNING lineas_investigacion.id, lineas_investigacion.nombre, lineas_investigacion.area;
END;
$$ LANGUAGE plpgsql;


SELECT registrar_linea('Natacion', 'Deporte');

CREATE OR REPLACE FUNCTION obtener_lineas()
RETURNS TABLE (
  id INT,
  nombre VARCHAR,
  area VARCHAR
) AS $$
BEGIN
  RETURN QUERY
  SELECT lineas_investigacion.id, lineas_investigacion.nombre, lineas_investigacion.area
  FROM lineas_investigacion
  ORDER BY lineas_investigacion.id ASC;
END;
$$ LANGUAGE plpgsql;

--grupos


CREATE OR REPLACE FUNCTION obtener_grupos(
  p_linea_nombre VARCHAR DEFAULT NULL,
  p_disponibilidad_modalidad VARCHAR DEFAULT NULL
)
RETURNS TABLE (
  investigador_nombre VARCHAR,
  investigador_apellido VARCHAR,
  departamento VARCHAR,
  experiencia INT,
  linea_nombre VARCHAR,
  area VARCHAR,
  franja_horaria VARCHAR,
  modalidad VARCHAR
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    i.nombre AS investigador_nombre,
    i.apellido,
    i.departamento,
    i.experiencia,
    l.nombre AS linea_nombre,
    l.area,
    d.franja_horaria,
    d.modalidad
  FROM investigador_linea_disponibilidad ild
  JOIN investigadores i ON ild.investigador_id = i.id
  JOIN lineas_investigacion l ON ild.linea_id = l.id
  JOIN disponibilidad d ON ild.disponibilidad_id = d.id
  WHERE (p_linea_nombre IS NULL OR l.nombre ILIKE '%' || p_linea_nombre || '%')
    AND (p_disponibilidad_modalidad IS NULL OR d.modalidad ILIKE '%' || p_disponibilidad_modalidad || '%')
  ORDER BY i.nombre, l.nombre;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM obtener_grupos();
SELECT * FROM obtener_grupos('ML-Genética', NULL);

SELECT * FROM obtener_grupos(NULL, 'Presencial');
SELECT * FROM obtener_grupos('ML-Genética', 'Presencial');

SELECT * FROM obtener_grupos('Inteligencia Artificial', 'Presencial');

CREATE OR REPLACE FUNCTION registrar_disponibilidad(
    p_franja_horaria VARCHAR,
    p_modalidad VARCHAR
)
RETURNS TABLE (
    id INT,
    franja_horaria VARCHAR,
    modalidad VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    INSERT INTO disponibilidad (franja_horaria, modalidad)
    VALUES (p_franja_horaria, p_modalidad)
    RETURNING disponibilidad.id, disponibilidad.franja_horaria, disponibilidad.modalidad;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION registrar_asignacion(
    p_investigador_id INT,
    p_linea_id INT,
    p_disponibilidad_id INT
)
RETURNS TABLE (
    investigador_id INT,
    linea_id INT,
    disponibilidad_id INT
) AS $$
BEGIN
    RETURN QUERY
    INSERT INTO investigador_linea_disponibilidad (investigador_id, linea_id, disponibilidad_id)
    VALUES (p_investigador_id, p_linea_id, p_disponibilidad_id)
    RETURNING investigador_linea_disponibilidad.investigador_id, 
              investigador_linea_disponibilidad.linea_id, 
              investigador_linea_disponibilidad.disponibilidad_id;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION crear_grupos_automaticos()
RETURNS VOID AS $$
DECLARE
  rec RECORD;
  nuevo_grupo_id INT;
BEGIN
  -- Recorre cada combinación línea + disponibilidad con ≥ 3 investigadores
  FOR rec IN (
    SELECT linea_id, disponibilidad_id
    FROM investigador_linea_disponibilidad
    GROUP BY linea_id, disponibilidad_id
    HAVING COUNT(investigador_id) >= 3
  ) LOOP
    -- Verifica si ya existe un grupo para esta combinación
    SELECT grupo_id INTO nuevo_grupo_id
    FROM grupos_investigacion
    WHERE linea_id = rec.linea_id AND disponibilidad_id = rec.disponibilidad_id;

    -- Si no existe, crea un nuevo grupo
    IF nuevo_grupo_id IS NULL THEN
      INSERT INTO grupos_investigacion(linea_id, disponibilidad_id)
      VALUES (rec.linea_id, rec.disponibilidad_id)
      RETURNING grupo_id INTO nuevo_grupo_id;
    END IF;

    -- Inserta los investigadores en el grupo (sin duplicados)
    INSERT INTO grupo_investigador(grupo_id, investigador_id)
    SELECT nuevo_grupo_id, investigador_id
    FROM investigador_linea_disponibilidad
    WHERE linea_id = rec.linea_id AND disponibilidad_id = rec.disponibilidad_id
    ON CONFLICT DO NOTHING;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

--obtener disponibilidad

CREATE FUNCTION obtener_grupos(
  p_linea_nombre VARCHAR DEFAULT NULL,
  p_disponibilidad_modalidad VARCHAR DEFAULT NULL
)
RETURNS TABLE (
  investigador TEXT,
  linea_investigacion TEXT,
  disponibilidad TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    CONCAT(i.nombre, ' ', i.apellido)::TEXT AS investigador,
    l.nombre::TEXT AS linea_investigacion,
    CONCAT(d.franja_horaria, ' ', d.modalidad)::TEXT AS disponibilidad
  FROM investigador_linea_disponibilidad ild
  JOIN investigadores i ON ild.investigador_id = i.id
  JOIN lineas_investigacion l ON ild.linea_id = l.id
  JOIN disponibilidad d ON ild.disponibilidad_id = d.id
  WHERE (p_linea_nombre IS NULL OR l.nombre ILIKE '%' || p_linea_nombre || '%')
    AND (p_disponibilidad_modalidad IS NULL OR d.modalidad ILIKE '%' || p_disponibilidad_modalidad || '%')
  ORDER BY i.nombre, l.nombre;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM obtener_grupos();