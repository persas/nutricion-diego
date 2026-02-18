-- ============================================================
-- RECIPES V3: Add preparation + tier columns, new recipe, update all
-- Run AFTER recipes.sql and recipes_v2.sql
-- ============================================================

-- Add new columns
ALTER TABLE recipes ADD COLUMN IF NOT EXISTS preparation TEXT;
ALTER TABLE recipes ADD COLUMN IF NOT EXISTS tier TEXT DEFAULT 'bueno';

-- ============================================================
-- PART 1: Set tier for ALL existing recipes
-- ============================================================

-- EXCELENTE: Pescado graso (salmon, sardinas, caballa) + verduras anti-inflam
UPDATE recipes SET tier = 'excelente' WHERE id IN (
  'lunch_1',   -- Salmon a la mantequilla con verduras
  'lunch_3',   -- Lubina a la sal con ensalada verde
  'lunch_4',   -- Trucha con almendras y espinacas
  'lunch_13',  -- Ensalada de caballa con aguacate y quinua
  'lunch_15',  -- Poke bowl de salmon y edamame
  'dinner_1',  -- Bacalao a la vizcaina
  'dinner_3',  -- Sardinas a la plancha con tomate
  'dinner_6',  -- Pez espada con champinones
  'dinner_13', -- Salmon al horno con costra de frutos secos
  'dinner_15', -- Caballa al horno con pisto
  'dinner_16', -- Ensalada templada de lentejas y salmon
  'dinner_18', -- Gazpacho andaluz con gambas
  'dinner_20', -- Merluza en salsa verde con almejas
  'snack_5',   -- Salmon ahumado con pepino
  'breakfast_3' -- Tostadas de salmon ahumado y aguacate
);

-- BUENO: Pollo, pavo, huevos, legumbres, verduras, gut-friendly
UPDATE recipes SET tier = 'bueno' WHERE id IN (
  'lunch_2',   -- Merluza al horno con limon
  'lunch_5',   -- Dorada al papillote
  'lunch_6',   -- Atun a la plancha con quinua
  'lunch_7',   -- Pollo con hierbas y batata
  'lunch_8',   -- Pavo asado con manzana y jengibre
  'lunch_9',   -- Huevos revueltos con aguacate
  'lunch_10',  -- Lentejas rojas con verduras
  'lunch_14',  -- Curry de garbanzos con espinacas
  'lunch_16',  -- Wok de pollo con verduras y jengibre
  'lunch_17',  -- Ensalada mediterranea de atun
  'lunch_18',  -- Buddha bowl de boniato y garbanzos
  'lunch_19',  -- Sopa de miso con tofu y algas
  'lunch_20',  -- Revuelto de setas silvestres
  'dinner_2',  -- Rape a la gallega
  'dinner_4',  -- Camarones al ajillo
  'dinner_5',  -- Sepia a la tinta con arroz
  'dinner_7',  -- Caldo de verduras con fideos
  'dinner_8',  -- Crema de calabaza y jengibre
  'dinner_9',  -- Brocoli gratinado con queso de cabra
  'dinner_10', -- Sopa minestrone
  'dinner_11', -- Espinacas salteadas con ajo
  'dinner_12', -- Alcachofas al limon
  'dinner_14', -- Crema de brocoli con almendras
  'dinner_17', -- Pollo al limon con curcuma
  'dinner_19', -- Tortilla de calabacin
  'snack_1',   -- Manzana con almendras
  'snack_2',   -- Aguacate con limon y sal
  'snack_3',   -- Yogur natural con fresas
  'snack_4',   -- Nueces y pasas
  'snack_6',   -- Queso fresco con tomate
  'snack_7',   -- Smoothie de frutos rojos
  'snack_8',   -- Hummus casero con zanahorias
  'snack_9',   -- Kefir con granola
  'snack_10',  -- Te verde con almendra tostada
  'snack_11',  -- Energy balls
  'snack_12',  -- Edamame con sal marina
  'snack_13',  -- Batido verde anti-inflamatorio
  'batch_1',   -- Chili de pavo
  'batch_2',   -- Caldo de huesos
  'batch_3',   -- Salsa de tomate casera
  'breakfast_1', -- Bowl de avena
  'breakfast_2', -- Tortilla de espinacas
  'breakfast_4', -- Smoothie bowl de platano
  'breakfast_5', -- Huevos al horno con tomate
  'breakfast_6', -- Pudding de chia
  'breakfast_7', -- Crepes de avena
  'breakfast_8'  -- Yogur griego con semillas
);

-- NEUTRO: Arroz, pasta integral, cereales
UPDATE recipes SET tier = 'neutro' WHERE id IN (
  'lunch_11',  -- Arroz integral con champinones
  'lunch_12'   -- Garbanzos tostados con especias
);

-- PRECAUCION: Carne roja
UPDATE recipes SET tier = 'precaucion' WHERE id IN (
  'caution_1', -- Entrecot a la plancha
  'caution_2', -- Hamburguesa casera
  'caution_3', -- Pasta bolonesa integral
  'caution_4'  -- Costillas de cerdo
);

-- ============================================================
-- PART 2: Add preparation steps to popular recipes
-- ============================================================

UPDATE recipes SET preparation = '["Salpimentar el salmon y dorarlo en mantequilla a fuego medio 4 min por lado","Cortar el brocoli en ramilletes y la zanahoria en rodajas finas","Saltear las verduras en la misma sarten 5 min hasta que esten tiernas","Servir el salmon sobre la cama de verduras con un chorrito de limon"]' WHERE id = 'lunch_1';

UPDATE recipes SET preparation = '["Precalentar el horno a 200°C","Colocar la merluza en bandeja con papel de horno","Regar con aceite de oliva y zumo de limon, salpimentar","Hornear 18-20 minutos hasta que se deshaga facilmente","Decorar con perejil fresco picado antes de servir"]' WHERE id = 'lunch_2';

UPDATE recipes SET preparation = '["Limpiar la trucha y salpimentar por dentro y fuera","Tostar las almendras en sarten seca hasta dorar ligeramente","Asar la trucha al horno a 190°C durante 20 minutos","Saltear las espinacas con aceite de oliva y ajo 2-3 minutos","Emplatar la trucha sobre las espinacas y coronar con almendras"]' WHERE id = 'lunch_4';

UPDATE recipes SET preparation = '["Cocinar la quinua segun instrucciones del paquete y dejar enfriar","Hacer la caballa a la plancha 3 min por lado con un toque de aceite","Cortar el aguacate en laminas y preparar la vinagreta de limon","Montar el bowl: base de quinua, caballa desmenuzada, aguacate","Aliñar con la vinagreta y servir templado"]' WHERE id = 'lunch_13';

UPDATE recipes SET preparation = '["Cortar el salmon en cubos de 2cm y marinarlo 10 min con salsa de soja","Cocinar el arroz integral y dejar enfriar a temperatura ambiente","Cocer el edamame 5 min en agua con sal y escurrir","Cortar el pepino en medias lunas finas","Montar el bowl: arroz, salmon, edamame, pepino","Espolvorear semillas de sesamo y servir"]' WHERE id = 'lunch_15';

UPDATE recipes SET preparation = '["Limpiar las sardinas y salpimentar generosamente","Calentar la plancha a fuego alto y cocinar las sardinas 3 min por lado","Cortar el tomate en rodajas y la cebolla en aros finos","Disponer las sardinas sobre la ensalada de tomate y cebolla","Aliñar con aceite de oliva virgen extra"]' WHERE id = 'dinner_3';

UPDATE recipes SET preparation = '["Pelar y picar las gambas, reservar las cabezas","Calentar aceite de oliva y freir los ajos laminados hasta dorar","Añadir las gambas y saltear 2-3 minutos a fuego vivo","Espolvorear perejil fresco picado y una pizca de guindilla","Servir inmediatamente en la misma sarten de barro"]' WHERE id = 'dinner_4';

UPDATE recipes SET preparation = '["Pelar y trocear la calabaza en dados de 3cm","Rehograr con jengibre rallado y un chorrito de aceite 5 minutos","Añadir el caldo de verduras caliente y cocinar 20 min tapado","Triturar con batidora hasta obtener textura cremosa","Servir con un hilo de aceite de oliva y semillas de calabaza"]' WHERE id = 'dinner_8';

UPDATE recipes SET preparation = '["Cocinar la avena con la leche de almendra 5 min a fuego medio removiendo","Verter en un bowl y dejar reposar 2 minutos","Añadir los arandanos frescos por encima","Coronar con nueces troceadas y espolvorear canela","Opcion: preparar la noche anterior y servir frio"]' WHERE id = 'breakfast_1';

UPDATE recipes SET preparation = '["Batir los huevos con sal y pimienta","Saltear las espinacas 1 min en sarten con aceite caliente","Verter los huevos batidos sobre las espinacas","Desmenuzar el queso de cabra por encima","Cocinar a fuego medio-bajo 4-5 min, dar la vuelta y 2 min mas"]' WHERE id = 'breakfast_2';

-- ============================================================
-- PART 3: Insert new recipe "Arroz con alcachofas y sepia"
-- ============================================================

INSERT INTO recipes (id, name, description, kcal, protein, carbs, fat, tags, warning_level, warning_reason, ingredients, preparation, tier, is_custom) VALUES
('lunch_21', 'Arroz con alcachofas y sepia', 'Arroz integral con alcachofas frescas y sepia tierna salteada con ajo y perejil', 480, 38, 52, 12, '["lunch","dinner","omega-3","anti-inflam","gut"]', 'none', NULL, '[{"name":"Sepia fresca","qty":250,"unit":"g","category":"Pescados"},{"name":"Alcachofas frescas","qty":300,"unit":"g","category":"Verduras y frutas"},{"name":"Arroz integral","qty":150,"unit":"g","category":"Cereales y legumbres"},{"name":"Ajo","qty":3,"unit":"diente","category":"Aceites y condimentos"},{"name":"Perejil fresco","qty":15,"unit":"g","category":"Verduras y frutas"},{"name":"Aceite de oliva","qty":15,"unit":"ml","category":"Aceites y condimentos"},{"name":"Caldo de pescado","qty":400,"unit":"ml","category":"Aceites y condimentos"}]', '["Limpiar la sepia, retirar la pluma y la piel, cortar en trozos","Limpiar las alcachofas retirando las hojas externas y cortar en cuartos","Sofreir el ajo picado en aceite de oliva hasta que empiece a dorar","Añadir la sepia troceada y cocinar 5 minutos a fuego fuerte","Incorporar las alcachofas y rehogar 3 minutos mas","Añadir el arroz integral y remover 1 minuto para que se impregne","Verter el caldo de pescado caliente y cocinar 25-30 minutos a fuego medio","Dejar reposar 5 minutos tapado, espolvorear perejil fresco y servir"]', 'excelente', false);
