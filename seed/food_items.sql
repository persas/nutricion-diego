-- ============================================================
-- food_items.sql
-- Seed file: 300+ food items classified by anti-inflammatory
-- protocol for psoriasis management.
-- ============================================================

-- Extensions and table creation
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE IF NOT EXISTS food_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_normalized TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('excelente','bueno','neutro','precaucion','evitar')),
  category TEXT NOT NULL,
  benefits TEXT,
  warnings TEXT,
  emoji TEXT
);

CREATE INDEX IF NOT EXISTS idx_food_items_tier ON food_items(tier);
CREATE INDEX IF NOT EXISTS idx_food_items_category ON food_items(category);
CREATE INDEX IF NOT EXISTS idx_food_items_name_trgm ON food_items USING gin (name_normalized gin_trgm_ops);

-- ============================================================
-- 1. PESCADOS Y MARISCOS (28 items)
-- ============================================================
INSERT INTO food_items (name, name_normalized, tier, category, benefits, warnings, emoji) VALUES
('Salmón', 'salmon', 'excelente', 'Pescados y mariscos', 'Rico en omega-3 EPA/DHA, reduce inflamación sistémica y mejora la barrera cutánea', NULL, '🐟'),
('Sardinas', 'sardinas', 'excelente', 'Pescados y mariscos', 'Altísimo en omega-3, vitamina D y calcio. Antiinflamatorio potente', NULL, '🐟'),
('Caballa', 'caballa', 'excelente', 'Pescados y mariscos', 'Muy rico en omega-3, vitamina B12 y selenio', NULL, '🐟'),
('Arenque', 'arenque', 'excelente', 'Pescados y mariscos', 'Excelente fuente de omega-3 y vitamina D', NULL, '🐟'),
('Anchoas', 'anchoas', 'excelente', 'Pescados y mariscos', 'Omega-3 concentrado, bajo en mercurio', 'Cuidado con las anchoas en conserva muy saladas', '🐟'),
('Trucha', 'trucha', 'excelente', 'Pescados y mariscos', 'Rica en omega-3, proteína de alta calidad y vitamina D', NULL, '🐟'),
('Boquerones', 'boquerones', 'excelente', 'Pescados y mariscos', 'Omega-3, calcio (si se comen con espina), bajo en mercurio', NULL, '🐟'),
('Merluza', 'merluza', 'bueno', 'Pescados y mariscos', 'Pescado blanco magro, buena proteína, fácil digestión', NULL, '🐟'),
('Bacalao', 'bacalao', 'bueno', 'Pescados y mariscos', 'Proteína magra, rico en vitamina B12 y selenio', NULL, '🐟'),
('Lubina', 'lubina', 'bueno', 'Pescados y mariscos', 'Proteína de calidad, bajo en grasa, algo de omega-3', NULL, '🐟'),
('Dorada', 'dorada', 'bueno', 'Pescados y mariscos', 'Proteína magra, fósforo, potasio', NULL, '🐟'),
('Lenguado', 'lenguado', 'bueno', 'Pescados y mariscos', 'Muy bajo en grasa, fácil digestión, buena proteína', NULL, '🐟'),
('Rape', 'rape', 'bueno', 'Pescados y mariscos', 'Proteína magra, muy bajo en grasa, versátil en cocina', NULL, '🐟'),
('Corvina', 'corvina', 'bueno', 'Pescados y mariscos', 'Pescado blanco de calidad, bajo en grasa', NULL, '🐟'),
('Atún fresco', 'atun fresco', 'bueno', 'Pescados y mariscos', 'Rico en omega-3, proteína y selenio', 'Limitar a 2 veces/semana por contenido en mercurio', '🐟'),
('Gambas', 'gambas', 'bueno', 'Pescados y mariscos', 'Proteína magra, selenio, zinc, vitamina B12', NULL, '🦐'),
('Langostinos', 'langostinos', 'bueno', 'Pescados y mariscos', 'Alto en proteína, bajo en grasa, zinc y selenio', NULL, '🦐'),
('Mejillones', 'mejillones', 'bueno', 'Pescados y mariscos', 'Ricos en hierro, zinc, vitamina B12 y omega-3', NULL, '🦪'),
('Almejas', 'almejas', 'bueno', 'Pescados y mariscos', 'Hierro, vitamina B12, bajo en grasa', NULL, '🦪'),
('Pulpo', 'pulpo', 'bueno', 'Pescados y mariscos', 'Proteína magra, hierro, vitamina B12, taurina', NULL, '🐙'),
('Sepia', 'sepia', 'bueno', 'Pescados y mariscos', 'Baja en grasa, rica en proteína y minerales', NULL, '🦑'),
('Calamares', 'calamares', 'neutro', 'Pescados y mariscos', 'Proteína magra cuando se cocina al horno o plancha', 'Evitar rebozados y fritos', '🦑'),
('Pez espada', 'pez espada', 'precaucion', 'Pescados y mariscos', 'Alto en proteína', 'Alto contenido en mercurio, limitar consumo', '🐟'),
('Atún en lata', 'atun en lata', 'neutro', 'Pescados y mariscos', 'Proteína accesible y práctica', 'Limitar por mercurio. Preferir en aceite de oliva', '🥫'),
('Surimi (palitos de cangrejo)', 'surimi palitos de cangrejo', 'precaucion', 'Pescados y mariscos', 'Algo de proteína', 'Ultra-procesado con aditivos, almidón y azúcar añadidos', '🦀'),
('Salmón ahumado', 'salmon ahumado', 'bueno', 'Pescados y mariscos', 'Omega-3 conservado, proteína de calidad', 'Contiene sal y ahumado; consumo moderado', '🐟'),
('Sardinas en lata (en AOVE)', 'sardinas en lata en aove', 'excelente', 'Pescados y mariscos', 'Omega-3 + AOVE. Calcio si se comen con espina. Prácticas', NULL, '🥫'),
('Berberechos', 'berberechos', 'bueno', 'Pescados y mariscos', 'Hierro, vitamina B12, proteína, bajo en grasa', NULL, '🦪');

-- ============================================================
-- 2. CARNES (18 items)
-- ============================================================
INSERT INTO food_items (name, name_normalized, tier, category, benefits, warnings, emoji) VALUES
('Pechuga de pollo', 'pechuga de pollo', 'bueno', 'Carnes', 'Proteína magra de alta calidad, versátil, baja en grasa saturada', NULL, '🍗'),
('Muslos de pollo', 'muslos de pollo', 'bueno', 'Carnes', 'Buena proteína, más jugosos, hierro', 'Algo más de grasa que la pechuga; retirar piel si se desea', '🍗'),
('Pavo (pechuga)', 'pavo pechuga', 'bueno', 'Carnes', 'Muy magra, alta proteína, rica en triptófano y selenio', NULL, '🦃'),
('Conejo', 'conejo', 'bueno', 'Carnes', 'Carne magra, baja en colesterol, buena digestibilidad', NULL, '🐇'),
('Codorniz', 'codorniz', 'bueno', 'Carnes', 'Carne magra, rica en hierro y vitaminas del grupo B', NULL, '🐦'),
('Ternera ecológica (alimentada con pasto)', 'ternera ecologica', 'neutro', 'Carnes', 'Hierro hemo, zinc, vitamina B12, mejor perfil de omega-3 que convencional', 'Limitar a 1-2 veces/semana. La carne roja puede aumentar inflamación', '🥩'),
('Ternera convencional', 'ternera convencional', 'precaucion', 'Carnes', 'Hierro y B12', 'Rica en omega-6 y grasa saturada. Proinflamatoria en exceso. Max 1/semana', '🥩'),
('Cerdo (lomo)', 'cerdo lomo', 'neutro', 'Carnes', 'Proteína, tiamina (B1), relativamente magro', 'Moderación. La grasa del cerdo convencional es omega-6', '🥩'),
('Cerdo (costillas)', 'cerdo costillas', 'precaucion', 'Carnes', 'Sabor', 'Alta grasa saturada, proinflamatorio en exceso', '🥩'),
('Cordero', 'cordero', 'precaucion', 'Carnes', 'Hierro, zinc, B12', 'Alto en grasa saturada. Limitar consumo para reducir inflamación', '🥩'),
('Jamón serrano', 'jamon serrano', 'neutro', 'Carnes', 'Proteína, hierro, tradición culinaria', 'Embutido curado, alto en sal. Consumo moderado', '🍖'),
('Jamón ibérico', 'jamon iberico', 'neutro', 'Carnes', 'Ácido oleico (similar al AOVE), proteína', 'Alto en sal. Consumo moderado', '🍖'),
('Chorizo', 'chorizo', 'precaucion', 'Carnes', 'Sabor', 'Procesado, alto en grasa saturada, sal y aditivos', '🌭'),
('Salchichón', 'salchichon', 'precaucion', 'Carnes', 'Proteína', 'Embutido procesado con grasa saturada y sal', '🌭'),
('Bacon', 'bacon', 'precaucion', 'Carnes', 'Sabor', 'Procesado, nitritos, alto en grasa saturada y sal', '🥓'),
('Salchichas (tipo frankfurt)', 'salchichas frankfurt', 'evitar', 'Carnes', NULL, 'Ultra-procesadas, aditivos, nitritos, baja calidad proteica', '🌭'),
('Carne picada mixta', 'carne picada mixta', 'precaucion', 'Carnes', 'Práctica para cocinar', 'Mezcla cerdo/ternera convencional, grasa saturada', '🥩'),
('Hígado de pollo', 'higado de pollo', 'bueno', 'Carnes', 'Muy rico en hierro, vitamina A, B12, folato', 'No consumir en exceso por vitamina A. 1 vez/semana', '🍖');

-- ============================================================
-- 3. VERDURAS Y HORTALIZAS (40 items)
-- ============================================================
INSERT INTO food_items (name, name_normalized, tier, category, benefits, warnings, emoji) VALUES
('Espinacas', 'espinacas', 'excelente', 'Verduras y hortalizas', 'Antiinflamatoria, rica en folato, hierro, magnesio, vitamina K y antioxidantes', NULL, '🥬'),
('Kale (col rizada)', 'kale col rizada', 'excelente', 'Verduras y hortalizas', 'Superalimento antiinflamatorio, vitaminas A, C, K, calcio y antioxidantes', NULL, '🥬'),
('Rúcula', 'rucula', 'excelente', 'Verduras y hortalizas', 'Crucífera antiinflamatoria, rica en vitamina K, calcio y glucosinolatos', NULL, '🥬'),
('Brócoli', 'brocoli', 'excelente', 'Verduras y hortalizas', 'Sulforafano antiinflamatorio potente, vitamina C, fibra, folato', NULL, '🥦'),
('Aguacate', 'aguacate', 'excelente', 'Verduras y hortalizas', 'Grasas monoinsaturadas antiinflamatorias, potasio, vitamina E, fibra', NULL, '🥑'),
('Coliflor', 'coliflor', 'bueno', 'Verduras y hortalizas', 'Crucífera con sulforafano, vitamina C, fibra, baja en calorías', NULL, '🥦'),
('Coles de Bruselas', 'coles de bruselas', 'bueno', 'Verduras y hortalizas', 'Crucífera antiinflamatoria, vitamina C y K, fibra', NULL, '🥬'),
('Repollo', 'repollo', 'bueno', 'Verduras y hortalizas', 'Crucífera, vitamina C, fibra, glucosinolatos protectores', NULL, '🥬'),
('Zanahoria', 'zanahoria', 'bueno', 'Verduras y hortalizas', 'Beta-caroteno (vitamina A), buena para la piel, fibra', NULL, '🥕'),
('Calabaza', 'calabaza', 'bueno', 'Verduras y hortalizas', 'Beta-caroteno, vitamina A, fibra, baja en calorías', NULL, '🎃'),
('Calabacín', 'calabacin', 'bueno', 'Verduras y hortalizas', 'Bajo en calorías, buena hidratación, vitamina C, potasio', NULL, '🥒'),
('Boniato (batata)', 'boniato batata', 'bueno', 'Verduras y hortalizas', 'Beta-caroteno, fibra, índice glucémico moderado, vitamina A para la piel', NULL, '🍠'),
('Pepino', 'pepino', 'bueno', 'Verduras y hortalizas', 'Hidratante, bajo en calorías, vitamina K, silicio para la piel', NULL, '🥒'),
('Apio', 'apio', 'bueno', 'Verduras y hortalizas', 'Antiinflamatorio (apigenina), diurético natural, vitamina K', NULL, '🥬'),
('Alcachofa', 'alcachofa', 'bueno', 'Verduras y hortalizas', 'Prebiótica (inulina), protege el hígado, fibra, antioxidantes', NULL, '🌿'),
('Espárragos', 'esparragos', 'bueno', 'Verduras y hortalizas', 'Prebióticos, folato, vitaminas A/C/K, glutatión', NULL, '🌿'),
('Judías verdes', 'judias verdes', 'bueno', 'Verduras y hortalizas', 'Fibra, vitamina C y K, bajo índice glucémico', NULL, '🌿'),
('Puerro', 'puerro', 'bueno', 'Verduras y hortalizas', 'Prebiótico, vitamina K, folato, compuestos azufrados', NULL, '🧅'),
('Cebolla', 'cebolla', 'bueno', 'Verduras y hortalizas', 'Quercetina antiinflamatoria, prebiótica, compuestos azufrados', NULL, '🧅'),
('Ajo', 'ajo', 'excelente', 'Verduras y hortalizas', 'Alicina antiinflamatoria e inmunorreguladora, prebiótico, antimicrobiano', NULL, '🧄'),
('Jengibre fresco', 'jengibre fresco', 'excelente', 'Verduras y hortalizas', 'Potente antiinflamatorio (gingeroles), mejora digestión, reduce citoquinas TNF-α', NULL, '🫚'),
('Remolacha', 'remolacha', 'bueno', 'Verduras y hortalizas', 'Betalaínas antiinflamatorias, nitratos para circulación, folato', NULL, '🟣'),
('Champiñones', 'champinones', 'bueno', 'Verduras y hortalizas', 'Beta-glucanos inmunomoduladores, vitamina D (si expuestos al sol), selenio', NULL, '🍄'),
('Setas shiitake', 'setas shiitake', 'excelente', 'Verduras y hortalizas', 'Beta-glucanos potentes, inmunomoduladoras, lentinano antiinflamatorio', NULL, '🍄'),
('Lechuga romana', 'lechuga romana', 'bueno', 'Verduras y hortalizas', 'Hidratante, vitamina A y K, folato, baja en calorías', NULL, '🥬'),
('Canónigos', 'canonigos', 'bueno', 'Verduras y hortalizas', 'Vitamina C, beta-caroteno, hierro, folato', NULL, '🥬'),
('Acelgas', 'acelgas', 'bueno', 'Verduras y hortalizas', 'Vitamina K, magnesio, hierro, antioxidantes (betalaínas)', NULL, '🥬'),
('Tomate', 'tomate', 'neutro', 'Verduras y hortalizas', 'Licopeno antioxidante, vitamina C', 'Solanácea: puede empeorar psoriasis en personas sensibles. Observar tolerancia', '🍅'),
('Pimiento rojo', 'pimiento rojo', 'neutro', 'Verduras y hortalizas', 'Muy rico en vitamina C, beta-caroteno', 'Solanácea: puede empeorar psoriasis en sensibles. Probar tolerancia', '🫑'),
('Pimiento verde', 'pimiento verde', 'neutro', 'Verduras y hortalizas', 'Vitamina C, bajo en calorías', 'Solanácea: puede empeorar psoriasis en sensibles', '🫑'),
('Berenjena', 'berenjena', 'neutro', 'Verduras y hortalizas', 'Fibra, antocianinas en la piel, baja en calorías', 'Solanácea: puede empeorar psoriasis en sensibles', '🍆'),
('Patata', 'patata', 'neutro', 'Verduras y hortalizas', 'Potasio, vitamina C, energía', 'Solanácea; índice glucémico alto si no se enfría. Porciones moderadas', '🥔'),
('Rábano', 'rabano', 'bueno', 'Verduras y hortalizas', 'Crucífera, vitamina C, compuestos azufrados, bajo en calorías', NULL, '🟣'),
('Nabo', 'nabo', 'bueno', 'Verduras y hortalizas', 'Crucífera, vitamina C, fibra, bajo en calorías', NULL, '🟤'),
('Lombarda', 'lombarda', 'bueno', 'Verduras y hortalizas', 'Crucífera, antocianinas antioxidantes, vitamina C y K', NULL, '🟣'),
('Hinojo', 'hinojo', 'bueno', 'Verduras y hortalizas', 'Anetol antiinflamatorio, digestivo, vitamina C', NULL, '🌿'),
('Endivia', 'endivia', 'bueno', 'Verduras y hortalizas', 'Prebiótica (inulina), baja en calorías, folato', NULL, '🥬'),
('Col china (pak choi)', 'col china pak choi', 'bueno', 'Verduras y hortalizas', 'Crucífera, calcio, vitamina C y K', NULL, '🥬'),
('Berros', 'berros', 'excelente', 'Verduras y hortalizas', 'Crucífera densa en nutrientes, ORAC muy alto, vitamina K, antiinflamatorio', NULL, '🥬'),
('Brotes de alfalfa', 'brotes de alfalfa', 'bueno', 'Verduras y hortalizas', 'Enzimas digestivas, vitaminas C/K, bajo en calorías', NULL, '🌱');

-- ============================================================
-- 4. FRUTAS (28 items)
-- ============================================================
INSERT INTO food_items (name, name_normalized, tier, category, benefits, warnings, emoji) VALUES
('Arándanos', 'arandanos', 'excelente', 'Frutas', 'Antocianinas antiinflamatorias potentes, vitamina C, fibra, ORAC elevado', NULL, '🫐'),
('Frambuesas', 'frambuesas', 'excelente', 'Frutas', 'Ácido elágico antiinflamatorio, fibra muy alta, vitamina C, baja en azúcar', NULL, '🍇'),
('Moras', 'moras', 'excelente', 'Frutas', 'Antocianinas, vitamina C, fibra, manganeso, potente antioxidante', NULL, '🫐'),
('Fresas', 'fresas', 'bueno', 'Frutas', 'Vitamina C, antocianinas, folato, manganeso', NULL, '🍓'),
('Granada', 'granada', 'excelente', 'Frutas', 'Punicalaginas antiinflamatorias únicas, antioxidante muy potente, vitamina C', NULL, '🍎'),
('Cereza', 'cereza', 'bueno', 'Frutas', 'Antocianinas, reduce marcadores inflamatorios (PCR), melatonina natural', NULL, '🍒'),
('Manzana', 'manzana', 'bueno', 'Frutas', 'Quercetina antiinflamatoria (en la piel), pectina prebiótica, fibra', NULL, '🍎'),
('Pera', 'pera', 'bueno', 'Frutas', 'Fibra, vitamina C, baja alergenicidad, buena tolerancia digestiva', NULL, '🍐'),
('Kiwi', 'kiwi', 'bueno', 'Frutas', 'Muy rico en vitamina C (más que naranja), fibra, enzimas digestivas', NULL, '🥝'),
('Naranja', 'naranja', 'bueno', 'Frutas', 'Vitamina C, flavonoides (hesperidina), fibra', 'Ácida: puede irritar en algunos casos de psoriasis oral/intestinal', '🍊'),
('Mandarina', 'mandarina', 'bueno', 'Frutas', 'Vitamina C, beta-criptoxantina, fibra', NULL, '🍊'),
('Limón', 'limon', 'bueno', 'Frutas', 'Vitamina C, limoneno, alcalinizante, ayuda a la absorción de hierro', NULL, '🍋'),
('Pomelo', 'pomelo', 'bueno', 'Frutas', 'Vitamina C, naringenina antiinflamatoria', 'Interacciona con muchos medicamentos. Consultar si tomas medicación', '🍊'),
('Papaya', 'papaya', 'bueno', 'Frutas', 'Papaína digestiva, vitamina C y A, beta-caroteno', NULL, '🍈'),
('Piña', 'pina', 'bueno', 'Frutas', 'Bromelina antiinflamatoria, vitamina C, manganeso', 'Moderación por contenido en azúcar', '🍍'),
('Mango', 'mango', 'neutro', 'Frutas', 'Vitamina A y C, beta-caroteno', 'Alto en azúcar, porciones moderadas', '🥭'),
('Plátano', 'platano', 'neutro', 'Frutas', 'Potasio, vitamina B6, prebiótico (almidón resistente si verde)', 'Índice glucémico moderado-alto cuando maduro', '🍌'),
('Uvas', 'uvas', 'neutro', 'Frutas', 'Resveratrol (en las tintas), vitamina C', 'Altas en azúcar. Porciones pequeñas', '🍇'),
('Higos', 'higos', 'neutro', 'Frutas', 'Fibra, calcio, potasio, polifenoles', 'Altos en azúcar natural. Moderar cantidad', '🟤'),
('Sandía', 'sandia', 'neutro', 'Frutas', 'Licopeno, hidratante, vitamina C', 'Índice glucémico alto. Porciones moderadas', '🍉'),
('Melón', 'melon', 'neutro', 'Frutas', 'Vitamina A y C, hidratante, potasio', 'Azúcar moderado', '🍈'),
('Melocotón', 'melocoton', 'bueno', 'Frutas', 'Vitamina C, beta-caroteno, fibra, polifenoles', NULL, '🍑'),
('Ciruela', 'ciruela', 'bueno', 'Frutas', 'Antioxidantes, fibra, vitamina C y K', NULL, '🟣'),
('Albaricoque', 'albaricoque', 'bueno', 'Frutas', 'Beta-caroteno, vitamina A, potasio, fibra', NULL, '🟠'),
('Dátiles', 'datiles', 'neutro', 'Frutas', 'Fibra, potasio, magnesio, energía rápida', 'Muy alto en azúcar. Máximo 2-3 unidades al día', '🟤'),
('Coco fresco', 'coco fresco', 'neutro', 'Frutas', 'Ácido láurico (antimicrobiano), fibra, minerales', 'Alto en grasa saturada, aunque de cadena media', '🥥'),
('Acai', 'acai', 'excelente', 'Frutas', 'Antocianinas muy concentradas, antioxidante excepcional, omega-3 y fibra', NULL, '🟣'),
('Lima', 'lima', 'bueno', 'Frutas', 'Vitamina C, limonoides, bajo en azúcar', NULL, '🍋');

-- ============================================================
-- 5. LEGUMBRES (14 items)
-- ============================================================
INSERT INTO food_items (name, name_normalized, tier, category, benefits, warnings, emoji) VALUES
('Lentejas', 'lentejas', 'bueno', 'Legumbres', 'Fibra prebiótica, hierro, folato, proteína vegetal. Butirato intestinal', NULL, '🫘'),
('Garbanzos', 'garbanzos', 'bueno', 'Legumbres', 'Fibra, proteína vegetal, folato, magnesio, saciantes', NULL, '🫘'),
('Judías blancas (alubias)', 'judias blancas alubias', 'bueno', 'Legumbres', 'Fibra, proteína vegetal, hierro, potasio', NULL, '🫘'),
('Judías pintas', 'judias pintas', 'bueno', 'Legumbres', 'Fibra, proteína vegetal, antioxidantes, folato', NULL, '🫘'),
('Judías rojas (kidney)', 'judias rojas kidney', 'bueno', 'Legumbres', 'Fibra, proteína vegetal, antocianinas, hierro', NULL, '🫘'),
('Edamame', 'edamame', 'bueno', 'Legumbres', 'Proteína completa, fibra, isoflavonas, vitamina K', NULL, '🫘'),
('Guisantes', 'guisantes', 'bueno', 'Legumbres', 'Proteína vegetal, fibra, vitamina C y K, folato', NULL, '🟢'),
('Habas', 'habas', 'bueno', 'Legumbres', 'Proteína vegetal, fibra, L-dopa, folato, hierro', NULL, '🫘'),
('Soja (tofu)', 'soja tofu', 'neutro', 'Legumbres', 'Proteína completa, calcio (si cuajado con él), isoflavonas', 'Efectos sobre psoriasis debatidos. Moderar si hay sensibilidad hormonal', '🧊'),
('Soja (tempeh)', 'soja tempeh', 'bueno', 'Legumbres', 'Fermentado: probiótico natural, proteína completa, mejor biodisponibilidad', NULL, '🧊'),
('Azukis', 'azukis', 'bueno', 'Legumbres', 'Fibra, proteína, antioxidantes, bajo en grasa', NULL, '🫘'),
('Altramuces', 'altramuces', 'bueno', 'Legumbres', 'Proteína muy alta, fibra, bajo índice glucémico, snack saludable', NULL, '🫘'),
('Cacahuetes', 'cacahuetes', 'neutro', 'Legumbres', 'Proteína, grasas monoinsaturadas, resveratrol', 'Técnicamente legumbre. Alergénico y puede contener aflatoxinas', '🥜'),
('Harina de garbanzo', 'harina de garbanzo', 'bueno', 'Legumbres', 'Sin gluten, proteína, fibra, versátil para cocinar', NULL, '🫘');

-- ============================================================
-- 6. CEREALES Y GRANOS (18 items)
-- ============================================================
INSERT INTO food_items (name, name_normalized, tier, category, benefits, warnings, emoji) VALUES
('Quinoa', 'quinoa', 'bueno', 'Cereales y granos', 'Pseudocereal sin gluten, proteína completa, fibra, magnesio, hierro', NULL, '🌾'),
('Arroz integral', 'arroz integral', 'bueno', 'Cereales y granos', 'Fibra, magnesio, sin gluten, índice glucémico moderado', NULL, '🍚'),
('Arroz blanco', 'arroz blanco', 'neutro', 'Cereales y granos', 'Sin gluten, fácil digestión, energía', 'Índice glucémico alto. Porciones pequeñas. Mejor si se enfría (almidón resistente)', '🍚'),
('Avena (sin gluten)', 'avena sin gluten', 'bueno', 'Cereales y granos', 'Beta-glucanos inmunomoduladores, fibra soluble, saciante', 'Asegurar que sea certificada sin gluten si hay sensibilidad', '🌾'),
('Avena convencional', 'avena convencional', 'neutro', 'Cereales y granos', 'Fibra, beta-glucanos, saciante', 'Puede contener trazas de gluten por contaminación cruzada', '🌾'),
('Trigo sarraceno (alforfón)', 'trigo sarraceno alforfon', 'bueno', 'Cereales y granos', 'Sin gluten, rutina antiinflamatoria, proteína, magnesio', NULL, '🌾'),
('Mijo', 'mijo', 'bueno', 'Cereales y granos', 'Sin gluten, magnesio, fósforo, fibra', NULL, '🌾'),
('Amaranto', 'amaranto', 'bueno', 'Cereales y granos', 'Pseudocereal sin gluten, proteína, calcio, hierro, lisina', NULL, '🌾'),
('Pan de centeno integral', 'pan de centeno integral', 'neutro', 'Cereales y granos', 'Fibra alta, índice glucémico más bajo que el trigo', 'Contiene gluten. No apto para celíacos o si el gluten agrava la psoriasis', '🍞'),
('Pan blanco', 'pan blanco', 'precaucion', 'Cereales y granos', 'Energía rápida', 'Gluten, índice glucémico alto, bajo valor nutricional. Proinflamatorio', '🍞'),
('Pan de espelta', 'pan de espelta', 'neutro', 'Cereales y granos', 'Más nutrientes que trigo moderno, algo de fibra', 'Contiene gluten. Observar tolerancia', '🍞'),
('Pasta integral', 'pasta integral', 'neutro', 'Cereales y granos', 'Fibra, más nutrientes que la refinada', 'Contiene gluten. Porciones moderadas', '🍝'),
('Pasta blanca', 'pasta blanca', 'precaucion', 'Cereales y granos', 'Energía', 'Gluten, índice glucémico alto, pobre en nutrientes. Proinflamatoria', '🍝'),
('Tortitas de arroz', 'tortitas de arroz', 'neutro', 'Cereales y granos', 'Sin gluten, ligeras, snack rápido', 'Índice glucémico muy alto. Combinar con proteína o grasa', '🍘'),
('Cuscús', 'cuscus', 'precaucion', 'Cereales y granos', 'Fácil preparación', 'Es sémola de trigo: gluten e IG alto', '🌾'),
('Bulgur', 'bulgur', 'neutro', 'Cereales y granos', 'Fibra, minerales', 'Contiene gluten', '🌾'),
('Maíz (mazorca)', 'maiz mazorca', 'neutro', 'Cereales y granos', 'Sin gluten, fibra, vitamina B, luteína', 'Índice glucémico moderado-alto', '🌽'),
('Teff', 'teff', 'bueno', 'Cereales y granos', 'Sin gluten, hierro, calcio, proteína, fibra resistente', NULL, '🌾');

-- ============================================================
-- 7. LÁCTEOS Y HUEVOS (18 items)
-- ============================================================
INSERT INTO food_items (name, name_normalized, tier, category, benefits, warnings, emoji) VALUES
('Huevos (camperos/ecológicos)', 'huevos camperos ecologicos', 'bueno', 'Lacteos y huevos', 'Proteína completa, colina, vitamina D, omega-3 (si camperos), luteína', NULL, '🥚'),
('Huevos convencionales', 'huevos convencionales', 'neutro', 'Lacteos y huevos', 'Proteína completa, colina, vitaminas', 'Peor perfil omega-3/omega-6 que los camperos', '🥚'),
('Yogur griego natural (sin azúcar)', 'yogur griego natural sin azucar', 'bueno', 'Lacteos y huevos', 'Probióticos, proteína alta, calcio, mejora microbioma intestinal', NULL, '🥛'),
('Kéfir', 'kefir', 'bueno', 'Lacteos y huevos', 'Probiótico potente (30+ cepas), mejora permeabilidad intestinal, calcio, vitamina B12', NULL, '🥛'),
('Yogur natural', 'yogur natural', 'bueno', 'Lacteos y huevos', 'Probióticos, calcio, proteína', NULL, '🥛'),
('Queso fresco de cabra', 'queso fresco de cabra', 'bueno', 'Lacteos y huevos', 'Más digestible que vaca, menos caseína A1, probióticos', NULL, '🧀'),
('Queso manchego curado', 'queso manchego curado', 'neutro', 'Lacteos y huevos', 'Calcio, proteína, sabor', 'Alto en grasa saturada y sal. Porciones pequeñas', '🧀'),
('Queso de oveja', 'queso de oveja', 'neutro', 'Lacteos y huevos', 'Calcio, proteína, más ácido linoleico conjugado que vaca', 'Moderación por grasa saturada', '🧀'),
('Requesón', 'requeson', 'bueno', 'Lacteos y huevos', 'Alto en proteína, bajo en grasa, calcio, versátil', NULL, '🧀'),
('Leche entera convencional', 'leche entera convencional', 'precaucion', 'Lacteos y huevos', 'Calcio, vitamina D', 'Caseína A1 puede promover inflamación. La lactosa puede irritar el intestino', '🥛'),
('Leche de cabra', 'leche de cabra', 'neutro', 'Lacteos y huevos', 'Más digestible, menos caseína A1, calcio', 'Aún contiene lactosa', '🥛'),
('Leche de avena', 'leche de avena', 'neutro', 'Lacteos y huevos', 'Sin lactosa, sin caseína, sabor agradable', 'Puede contener azúcar añadido. Elegir sin azúcar y enriquecida en calcio', '🥛'),
('Leche de almendras', 'leche de almendras', 'neutro', 'Lacteos y huevos', 'Sin lactosa, baja en calorías', 'Muy baja en proteína, elegir sin azúcar añadido', '🥛'),
('Queso crema (tipo Philadelphia)', 'queso crema tipo philadelphia', 'precaucion', 'Lacteos y huevos', 'Sabor', 'Alto en grasa saturada, procesado, aditivos según marca', '🧀'),
('Nata para cocinar', 'nata para cocinar', 'precaucion', 'Lacteos y huevos', 'Sabor en cocina', 'Alta en grasa saturada, lácteo convencional', '🥛'),
('Mantequilla', 'mantequilla', 'neutro', 'Lacteos y huevos', 'Vitamina A, butirato, sabor', 'Grasa saturada, moderar cantidad. Mejor ecológica/de pasto', '🧈'),
('Ghee (mantequilla clarificada)', 'ghee mantequilla clarificada', 'bueno', 'Lacteos y huevos', 'Sin caseína ni lactosa, butirato, punto de humo alto, vitamina A', NULL, '🧈'),
('Yogur de sabores azucarado', 'yogur de sabores azucarado', 'evitar', 'Lacteos y huevos', NULL, 'Alto en azúcar añadido, aditivos, colorantes. Proinflamatorio', '🥛');

-- ============================================================
-- 8. FRUTOS SECOS Y SEMILLAS (18 items)
-- ============================================================
INSERT INTO food_items (name, name_normalized, tier, category, benefits, warnings, emoji) VALUES
('Nueces', 'nueces', 'excelente', 'Frutos secos y semillas', 'Omega-3 (ALA) más alto entre los frutos secos, antiinflamatorio, polifenoles, magnesio', NULL, '🥜'),
('Almendras', 'almendras', 'excelente', 'Frutos secos y semillas', 'Vitamina E antioxidante para la piel, magnesio, fibra, calcio', NULL, '🥜'),
('Semillas de lino (linaza)', 'semillas de lino linaza', 'excelente', 'Frutos secos y semillas', 'Omega-3 ALA muy alto, lignanos antiinflamatorios, fibra soluble', 'Moler antes de consumir para absorber los omega-3', '🌱'),
('Semillas de chía', 'semillas de chia', 'excelente', 'Frutos secos y semillas', 'Omega-3 ALA, fibra soluble (mucílago), calcio, magnesio, saciantes', NULL, '🌱'),
('Semillas de cáñamo', 'semillas de canamo', 'excelente', 'Frutos secos y semillas', 'Ratio omega-6/omega-3 ideal (3:1), proteína completa, GLA antiinflamatorio', NULL, '🌱'),
('Pistachos', 'pistachos', 'bueno', 'Frutos secos y semillas', 'Antioxidantes (luteína, zeaxantina), fibra, proteína, potasio', NULL, '🥜'),
('Anacardos', 'anacardos', 'bueno', 'Frutos secos y semillas', 'Magnesio, zinc (importante para la piel), hierro, cobre', NULL, '🥜'),
('Avellanas', 'avellanas', 'bueno', 'Frutos secos y semillas', 'Vitamina E, grasas monoinsaturadas, manganeso, cobre', NULL, '🥜'),
('Nueces de Brasil', 'nueces de brasil', 'bueno', 'Frutos secos y semillas', 'Selenio excepcional (1-2 nueces = dosis diaria), antioxidante, tiroides', '1-3 al día máximo por exceso de selenio', '🥜'),
('Nueces de macadamia', 'nueces de macadamia', 'bueno', 'Frutos secos y semillas', 'Grasas monoinsaturadas, bajo en omega-6, manganeso', NULL, '🥜'),
('Semillas de calabaza (pipas)', 'semillas de calabaza pipas', 'bueno', 'Frutos secos y semillas', 'Zinc muy alto (clave para la piel), magnesio, hierro, triptófano', NULL, '🌱'),
('Semillas de girasol (pipas)', 'semillas de girasol pipas', 'neutro', 'Frutos secos y semillas', 'Vitamina E, selenio, magnesio', 'Alto en omega-6. Moderar cantidad', '🌻'),
('Piñones', 'pinones', 'bueno', 'Frutos secos y semillas', 'Ácido pinolénico, vitamina E, magnesio, hierro', NULL, '🌱'),
('Semillas de sésamo', 'semillas de sesamo', 'bueno', 'Frutos secos y semillas', 'Calcio, lignanos (sesamina antiinflamatoria), zinc, hierro', NULL, '🌱'),
('Tahini', 'tahini', 'bueno', 'Frutos secos y semillas', 'Calcio, hierro, zinc, grasas saludables, sesamina', NULL, '🥜'),
('Crema de almendras (100%)', 'crema de almendras 100', 'bueno', 'Frutos secos y semillas', 'Vitamina E, magnesio, grasas monoinsaturadas, sin aditivos', NULL, '🥜'),
('Crema de cacahuete (100%)', 'crema de cacahuete 100', 'neutro', 'Frutos secos y semillas', 'Proteína, grasas monoinsaturadas', 'Omega-6 moderado. Elegir 100% cacahuete sin azúcar ni aceite de palma', '🥜'),
('Mix de frutos secos (con azúcar/sal)', 'mix de frutos secos con azucar sal', 'precaucion', 'Frutos secos y semillas', 'Algún beneficio del fruto seco base', 'Azúcar añadido, sal excesiva, a veces aceites refinados', '🥜');

-- ============================================================
-- 9. ACEITES Y GRASAS (14 items)
-- ============================================================
INSERT INTO food_items (name, name_normalized, tier, category, benefits, warnings, emoji) VALUES
('Aceite de oliva virgen extra (AOVE)', 'aceite de oliva virgen extra aove', 'excelente', 'Aceites y grasas', 'Oleocanthal antiinflamatorio (similar al ibuprofeno), polifenoles, ácido oleico, vitamina E', NULL, '🫒'),
('Aceite de coco virgen', 'aceite de coco virgen', 'neutro', 'Aceites y grasas', 'Ácido láurico antimicrobiano, MCTs, punto de humo alto', 'Alto en grasa saturada. Usar con moderación. Efecto sobre inflamación debatido', '🥥'),
('Aceite de aguacate', 'aceite de aguacate', 'bueno', 'Aceites y grasas', 'Grasas monoinsaturadas, punto de humo alto, vitamina E, luteína', NULL, '🥑'),
('Aceite de lino (linaza)', 'aceite de lino linaza', 'excelente', 'Aceites y grasas', 'Omega-3 ALA concentrado, antiinflamatorio', 'No calentar. Solo en frío. Conservar en nevera', '🌱'),
('Aceite de sésamo', 'aceite de sesamo', 'bueno', 'Aceites y grasas', 'Sesamina antiinflamatoria, antioxidantes, sabor', NULL, '🌱'),
('Aceite de nuez', 'aceite de nuez', 'bueno', 'Aceites y grasas', 'Omega-3 ALA, polifenoles, vitamina E', 'No calentar, solo en frío', '🥜'),
('Aceite de girasol', 'aceite de girasol', 'precaucion', 'Aceites y grasas', 'Vitamina E', 'Muy alto en omega-6 proinflamatorio. Evitar para freír', '🌻'),
('Aceite de girasol alto oleico', 'aceite de girasol alto oleico', 'neutro', 'Aceites y grasas', 'Alto en ácido oleico, punto de humo alto', 'Mejor que el convencional pero sin los polifenoles del AOVE', '🌻'),
('Aceite de palma', 'aceite de palma', 'evitar', 'Aceites y grasas', NULL, 'Grasa saturada, proinflamatorio, asociado a procesos inflamatorios. Presente en ultra-procesados', '🛢️'),
('Margarina', 'margarina', 'evitar', 'Aceites y grasas', NULL, 'Puede contener grasas trans, aceites refinados, aditivos. Proinflamatoria', '🧈'),
('Manteca de cerdo', 'manteca de cerdo', 'precaucion', 'Aceites y grasas', 'Punto de humo alto, cocina tradicional', 'Alta en grasa saturada y omega-6', '🛢️'),
('Aceite de canola/colza', 'aceite de canola colza', 'neutro', 'Aceites y grasas', 'Algo de omega-3, ratio aceptable omega-6/3', 'Refinado, pobre en polifenoles. AOVE es siempre mejor opción', '🛢️'),
('Spray antiadherente para cocinar', 'spray antiadherente para cocinar', 'precaucion', 'Aceites y grasas', 'Práctico, pocas calorías', 'Aceites refinados, propelentes, aditivos', '🛢️'),
('Aceite de hígado de bacalao', 'aceite de higado de bacalao', 'excelente', 'Aceites y grasas', 'Omega-3 EPA/DHA, vitamina D y A. Suplemento antiinflamatorio clásico', 'No exceder dosis por vitamina A', '🐟');

-- ============================================================
-- 10. CONDIMENTOS Y ESPECIAS (28 items)
-- ============================================================
INSERT INTO food_items (name, name_normalized, tier, category, benefits, warnings, emoji) VALUES
('Cúrcuma', 'curcuma', 'excelente', 'Condimentos y especias', 'Curcumina: potente antiinflamatorio demostrado en psoriasis, inhibe NF-κB y TNF-α', 'Combinar con pimienta negra y grasa para mejorar absorción', '🟡'),
('Jengibre en polvo', 'jengibre en polvo', 'excelente', 'Condimentos y especias', 'Gingeroles y shogaoles antiinflamatorios, mejora digestión, reduce náuseas', NULL, '🫚'),
('Canela de Ceilán', 'canela de ceilan', 'excelente', 'Condimentos y especias', 'Antiinflamatoria, mejora sensibilidad a la insulina, antioxidante', 'Preferir Ceilán sobre Cassia por menor contenido en cumarina', '🟤'),
('Pimienta negra', 'pimienta negra', 'bueno', 'Condimentos y especias', 'Piperina: mejora absorción de curcumina x2000, antiinflamatoria por sí misma', NULL, '⚫'),
('Orégano', 'oregano', 'bueno', 'Condimentos y especias', 'Carvacrol y timol antiinflamatorios, antioxidante ORAC muy alto', NULL, '🌿'),
('Romero', 'romero', 'bueno', 'Condimentos y especias', 'Ácido rosmarínico antiinflamatorio, carnosol antioxidante, mejora circulación', NULL, '🌿'),
('Tomillo', 'tomillo', 'bueno', 'Condimentos y especias', 'Timol antimicrobiano, antiinflamatorio, vitamina C', NULL, '🌿'),
('Albahaca', 'albahaca', 'bueno', 'Condimentos y especias', 'Eugenol antiinflamatorio, vitamina K, antioxidantes', NULL, '🌿'),
('Perejil', 'perejil', 'bueno', 'Condimentos y especias', 'Vitamina C y K, apigenina antiinflamatoria, miricetina', NULL, '🌿'),
('Cilantro', 'cilantro', 'bueno', 'Condimentos y especias', 'Quelante natural de metales pesados, antioxidante, digestivo', NULL, '🌿'),
('Comino', 'comino', 'bueno', 'Condimentos y especias', 'Antiinflamatorio, ayuda digestión, hierro', NULL, '🌰'),
('Clavo', 'clavo', 'bueno', 'Condimentos y especias', 'Eugenol antiinflamatorio, ORAC más alto de todas las especias', NULL, '🟤'),
('Nuez moscada', 'nuez moscada', 'neutro', 'Condimentos y especias', 'Antiinflamatoria en pequeñas dosis', 'Tóxica en exceso. Usar solo pequeñas cantidades', '🟤'),
('Pimentón (páprika)', 'pimenton paprika', 'neutro', 'Condimentos y especias', 'Capsaicina antiinflamatoria, vitamina A', 'Proviene de pimiento (solanácea). Observar tolerancia', '🔴'),
('Cayena', 'cayena', 'neutro', 'Condimentos y especias', 'Capsaicina puede reducir dolor y psoriasis tópica', 'Solanácea. Puede irritar el intestino en exceso', '🌶️'),
('Sal marina sin refinar', 'sal marina sin refinar', 'neutro', 'Condimentos y especias', 'Minerales traza, yodo', 'Moderar consumo. Exceso de sodio proinflamatorio', '🧂'),
('Sal rosa del Himalaya', 'sal rosa del himalaya', 'neutro', 'Condimentos y especias', 'Minerales traza', 'Mismas precauciones que cualquier sal. Moderar', '🧂'),
('Vinagre de manzana (sin filtrar)', 'vinagre de manzana sin filtrar', 'bueno', 'Condimentos y especias', 'Ácido acético: mejora sensibilidad insulina, prebiótico, alcalinizante', NULL, '🍎'),
('Vinagre balsámico', 'vinagre balsamico', 'neutro', 'Condimentos y especias', 'Polifenoles de uva, sabor', 'Contiene algo de azúcar. Moderar cantidad', '🍇'),
('Salsa de soja (tamari sin gluten)', 'salsa de soja tamari sin gluten', 'neutro', 'Condimentos y especias', 'Umami, aminoácidos, sin gluten', 'Alta en sodio. Usar con moderación', '🥢'),
('Miso', 'miso', 'bueno', 'Condimentos y especias', 'Fermentado probiótico, enzimas digestivas, umami, vitaminas B', NULL, '🥢'),
('Mostaza de Dijon', 'mostaza de dijon', 'bueno', 'Condimentos y especias', 'Semilla de mostaza antiinflamatoria, baja en calorías, sin azúcar', NULL, '🟡'),
('Kétchup convencional', 'ketchup convencional', 'precaucion', 'Condimentos y especias', 'Algo de licopeno', 'Alto en azúcar añadido, solanácea (tomate)', '🔴'),
('Mayonesa convencional', 'mayonesa convencional', 'precaucion', 'Condimentos y especias', NULL, 'Aceite de girasol refinado (omega-6), a veces azúcar y aditivos', '🥚'),
('Salsa barbacoa', 'salsa barbacoa', 'precaucion', 'Condimentos y especias', 'Sabor', 'Alta en azúcar, aditivos, colorantes', '🔴'),
('Caldo de huesos (bone broth)', 'caldo de huesos bone broth', 'excelente', 'Condimentos y especias', 'Colágeno, glutamina (repara intestino permeable), glicina antiinflamatoria, minerales', NULL, '🍲'),
('Levadura nutricional', 'levadura nutricional', 'bueno', 'Condimentos y especias', 'Vitaminas B (incluida B12 si fortificada), proteína, beta-glucanos, umami', NULL, '🟡'),
('Glutamato monosódico (MSG)', 'glutamato monosodico msg', 'evitar', 'Condimentos y especias', NULL, 'Excitotoxina, puede promover inflamación sistémica. Presente en muchos procesados', '⚠️');

-- ============================================================
-- 11. BEBIDAS (18 items)
-- ============================================================
INSERT INTO food_items (name, name_normalized, tier, category, benefits, warnings, emoji) VALUES
('Agua mineral', 'agua mineral', 'excelente', 'Bebidas', 'Hidratación esencial para la piel. Minerales. Base de cualquier protocolo', NULL, '💧'),
('Té verde', 'te verde', 'excelente', 'Bebidas', 'EGCG antiinflamatorio potente, reduce estrés oxidativo, catequinas beneficiosas para psoriasis', NULL, '🍵'),
('Té matcha', 'te matcha', 'excelente', 'Bebidas', 'EGCG concentrado (10x más que té verde normal), L-teanina calmante, antioxidantes', NULL, '🍵'),
('Infusión de cúrcuma', 'infusion de curcuma', 'excelente', 'Bebidas', 'Curcumina antiinflamatoria, reconfortante, mejora digestión', NULL, '🍵'),
('Infusión de jengibre', 'infusion de jengibre', 'excelente', 'Bebidas', 'Gingeroles antiinflamatorios, digestiva, calmante', NULL, '🍵'),
('Infusión de manzanilla', 'infusion de manzanilla', 'bueno', 'Bebidas', 'Apigenina calmante y antiinflamatoria, mejora sueño, digestiva', NULL, '🍵'),
('Café', 'cafe', 'neutro', 'Bebidas', 'Antioxidantes (ácido clorogénico), mejora cognición', 'Máx 2 tazas/día. Puede aumentar cortisol y estrés. Observar si agrava psoriasis', '☕'),
('Kombucha', 'kombucha', 'bueno', 'Bebidas', 'Probiótica, mejora microbioma, ácidos orgánicos beneficiosos', 'Elegir baja en azúcar. Algunas marcas tienen mucho azúcar residual', '🍵'),
('Zumo de naranja natural', 'zumo de naranja natural', 'neutro', 'Bebidas', 'Vitamina C, flavonoides', 'Azúcar libre sin fibra. Mejor comer la fruta entera. Porciones pequeñas', '🍊'),
('Vino tinto', 'vino tinto', 'neutro', 'Bebidas', 'Resveratrol antioxidante, polifenoles', 'Máximo 1 copa. El alcohol es proinflamatorio y agrava la psoriasis', '🍷'),
('Cerveza', 'cerveza', 'precaucion', 'Bebidas', NULL, 'Gluten (de cebada), alcohol proinflamatorio, levadura puede empeorar psoriasis', '🍺'),
('Cerveza sin gluten', 'cerveza sin gluten', 'precaucion', 'Bebidas', 'Menor impacto que cerveza con gluten', 'El alcohol sigue siendo proinflamatorio independientemente del gluten', '🍺'),
('Bebidas azucaradas (Coca-Cola, Fanta, etc.)', 'bebidas azucaradas coca cola fanta', 'evitar', 'Bebidas', NULL, 'Alto contenido en azúcar, ácido fosfórico, caramelo artificial. Fuertemente proinflamatorio', '🥤'),
('Bebidas energéticas (Red Bull, Monster)', 'bebidas energeticas red bull monster', 'evitar', 'Bebidas', NULL, 'Azúcar excesivo, cafeína extrema, taurina sintética, aditivos. Muy proinflamatorio', '⚡'),
('Bebidas zero/light', 'bebidas zero light', 'evitar', 'Bebidas', NULL, 'Edulcorantes artificiales (aspartamo, sucralosa) alteran microbioma y pueden promover inflamación', '🥤'),
('Agua con gas', 'agua con gas', 'bueno', 'Bebidas', 'Hidratación, alternativa a refrescos, sin calorías', NULL, '💧'),
('Leche dorada (golden milk)', 'leche dorada golden milk', 'excelente', 'Bebidas', 'Cúrcuma + pimienta + grasa: máxima absorción de curcumina. Antiinflamatorio en taza', NULL, '🥛'),
('Smoothie verde casero', 'smoothie verde casero', 'bueno', 'Bebidas', 'Concentrado de fitonutrientes, fibra conservada, antioxidantes', 'Evitar exceso de fruta. Base de verduras con algo de fruta', '🥤');

-- ============================================================
-- 12. PROCESADOS Y PREPARADOS (45 items)
-- ============================================================
INSERT INTO food_items (name, name_normalized, tier, category, benefits, warnings, emoji) VALUES
('Hummus', 'hummus', 'bueno', 'Procesados y preparados', 'Garbanzos + tahini + AOVE + limón: fibra, proteína, grasas saludables', NULL, '🫘'),
('Guacamole', 'guacamole', 'excelente', 'Procesados y preparados', 'Aguacate + limón + cebolla: grasas monoinsaturadas, potasio, antiinflamatorio', 'Verificar ingredientes si es comprado (algunos llevan nata o aditivos)', '🥑'),
('Chucrut (sin pasteurizar)', 'chucrut sin pasteurizar', 'excelente', 'Procesados y preparados', 'Probiótico natural, vitamina C, mejora microbioma intestinal', NULL, '🥬'),
('Kimchi', 'kimchi', 'excelente', 'Procesados y preparados', 'Probiótico potente, antiinflamatorio, lactobacilos beneficiosos para la piel', NULL, '🌶️'),
('Encurtidos fermentados naturales', 'encurtidos fermentados naturales', 'bueno', 'Procesados y preparados', 'Probióticos si fermentados naturalmente (no en vinagre)', NULL, '🥒'),
('Ensalada preparada (solo hojas)', 'ensalada preparada solo hojas', 'bueno', 'Procesados y preparados', 'Práctica, conserva nutrientes, variedad de hojas verdes', NULL, '🥗'),
('Ensalada preparada (con salsa)', 'ensalada preparada con salsa', 'neutro', 'Procesados y preparados', 'Verduras', 'Las salsas incluidas suelen tener aceites refinados, azúcar y aditivos', '🥗'),
('Gazpacho envasado', 'gazpacho envasado', 'neutro', 'Procesados y preparados', 'Licopeno, vitamina C, hidratante', 'Solanáceas (tomate, pimiento). Revisar ingredientes: algunos llevan pan/azúcar', '🍅'),
('Tofu firme', 'tofu firme', 'neutro', 'Procesados y preparados', 'Proteína completa vegetal, calcio (si cuajado con él), isoflavonas', 'Efecto sobre psoriasis debatido. Probar tolerancia', '🧊'),
('Tempeh', 'tempeh', 'bueno', 'Procesados y preparados', 'Fermentado probiótico, proteína completa, prebiótico, mejor que tofu para intestino', NULL, '🧊'),
('Tortitas de arroz y maíz', 'tortitas de arroz y maiz', 'neutro', 'Procesados y preparados', 'Sin gluten, snack ligero', 'Índice glucémico muy alto. Siempre combinar con proteína o grasa', '🍘'),
('Barritas de granola convencionales', 'barritas de granola convencionales', 'precaucion', 'Procesados y preparados', 'Algo de fibra y avena', 'Alto en azúcar, jarabe de glucosa, aceites refinados, aditivos', '🍫'),
('Barritas proteicas (tipo Quest, Barebells)', 'barritas proteicas tipo quest barebells', 'precaucion', 'Procesados y preparados', 'Proteína alta, práctica', 'Edulcorantes artificiales, fibra sintética, ultra-procesadas', '🍫'),
('Chocolate negro 85%+', 'chocolate negro 85', 'bueno', 'Procesados y preparados', 'Flavonoides del cacao antiinflamatorios, magnesio, hierro, antioxidantes', 'Moderar cantidad: 20-30g/día', '🍫'),
('Chocolate negro 70-85%', 'chocolate negro 70 85', 'neutro', 'Procesados y preparados', 'Flavonoides, magnesio, algo de antioxidantes', 'Más azúcar que el 85%. Porciones moderadas', '🍫'),
('Chocolate con leche', 'chocolate con leche', 'precaucion', 'Procesados y preparados', 'Algo de cacao', 'Alto en azúcar, lácteo, bajo en flavonoides. Proinflamatorio', '🍫'),
('Chocolate blanco', 'chocolate blanco', 'evitar', 'Procesados y preparados', NULL, 'Sin cacao: solo manteca de cacao, azúcar y leche. Proinflamatorio', '🍫'),
('Galletas María', 'galletas maria', 'precaucion', 'Procesados y preparados', NULL, 'Harina refinada, azúcar, aceites de baja calidad', '🍪'),
('Galletas digestive', 'galletas digestive', 'precaucion', 'Procesados y preparados', 'Algo de fibra', 'Azúcar, aceite de palma, harina refinada', '🍪'),
('Bollería industrial (donuts, croissants, etc.)', 'bolleria industrial donuts croissants', 'evitar', 'Procesados y preparados', NULL, 'Grasas trans/aceite de palma, azúcar alto, harina refinada. Fuertemente proinflamatorio', '🍩'),
('Cereales de desayuno azucarados (Chocapic, Nesquik)', 'cereales desayuno azucarados chocapic nesquik', 'evitar', 'Procesados y preparados', NULL, 'Ultra-procesados: azúcar extremo, colorantes, harina refinada. Proinflamatorio', '🥣'),
('Cereales tipo granola con miel', 'cereales tipo granola con miel', 'precaucion', 'Procesados y preparados', 'Algo de fibra y avena', 'Alto en azúcar (miel es azúcar), aceites refinados', '🥣'),
('Muesli sin azúcar añadido', 'muesli sin azucar anadido', 'bueno', 'Procesados y preparados', 'Avena, frutos secos, semillas. Fibra, minerales', 'Revisar que no lleve azúcar oculto ni aceites', '🥣'),
('Pan de molde integral', 'pan de molde integral', 'neutro', 'Procesados y preparados', 'Fibra, más nutrientes que el blanco', 'Contiene gluten, a veces azúcar añadido y conservantes', '🍞'),
('Pan de molde blanco (tipo Bimbo)', 'pan de molde blanco tipo bimbo', 'evitar', 'Procesados y preparados', NULL, 'Ultra-procesado: azúcar, aceite de palma, conservantes, harina refinada', '🍞'),
('Tostadas de trigo', 'tostadas de trigo', 'precaucion', 'Procesados y preparados', NULL, 'Harina refinada, gluten, bajo valor nutricional', '🍞'),
('Crackers de semillas (sin gluten)', 'crackers de semillas sin gluten', 'bueno', 'Procesados y preparados', 'Semillas, fibra, sin gluten, crujientes', 'Revisar ingredientes: algunos llevan aceites refinados', '🍘'),
('Patatas fritas de bolsa', 'patatas fritas de bolsa', 'evitar', 'Procesados y preparados', NULL, 'Aceite refinado sobrecalentado, acrilamida, sal excesiva, aditivos', '🍟'),
('Snacks de maíz (Doritos, Cheetos)', 'snacks de maiz doritos cheetos', 'evitar', 'Procesados y preparados', NULL, 'Ultra-procesados: aceites refinados, MSG, colorantes, potenciadores de sabor', '🧀'),
('Palomitas de maíz naturales (sin aceite)', 'palomitas de maiz naturales sin aceite', 'neutro', 'Procesados y preparados', 'Grano entero, fibra, antioxidantes (polifenoles), saciantes', 'Sin aceites refinados ni exceso de sal', '🍿'),
('Pizza congelada', 'pizza congelada', 'evitar', 'Procesados y preparados', NULL, 'Harina refinada, queso procesado, aceites de baja calidad, aditivos, sal excesiva', '🍕'),
('Nuggets de pollo congelados', 'nuggets de pollo congelados', 'evitar', 'Procesados y preparados', NULL, 'Ultra-procesados: rebozado refinado, aceites de baja calidad, aditivos, baja calidad de pollo', '🍗'),
('Empanadillas/rollitos congelados', 'empanadillas rollitos congelados', 'evitar', 'Procesados y preparados', NULL, 'Masa refinada, relleno de baja calidad, aceites refinados, aditivos', '🥟'),
('Fiambre de pavo', 'fiambre de pavo', 'precaucion', 'Procesados y preparados', 'Algo de proteína, bajo en grasa', 'Procesado con almidón, dextrosa, conservantes (nitritos/nitratos)', '🍖'),
('Jamón cocido (jamón york)', 'jamon cocido jamon york', 'precaucion', 'Procesados y preparados', 'Proteína', 'Procesado con aditivos, almidón, dextrosa, nitritos', '🍖'),
('Salmón ahumado envasado', 'salmon ahumado envasado', 'bueno', 'Procesados y preparados', 'Omega-3 conservado, proteína de calidad', 'Sal y ahumado. Consumo moderado', '🐟'),
('Sardinas en lata (en tomate)', 'sardinas en lata en tomate', 'bueno', 'Procesados y preparados', 'Omega-3, proteína, calcio, prácticas', 'La salsa de tomate puede llevar azúcar añadido', '🥫'),
('Atún en conserva (en AOVE)', 'atun en conserva en aove', 'neutro', 'Procesados y preparados', 'Proteína, algo de omega-3, AOVE añadido', 'Mercurio en atún: limitar a 2 veces/semana', '🥫'),
('Salsa de tomate casera', 'salsa de tomate casera', 'neutro', 'Procesados y preparados', 'Licopeno (aumenta con cocción), vitamina C', 'Solanácea. Observar tolerancia individual', '🍅'),
('Salsa de tomate industrial (tipo ketchup/bote)', 'salsa de tomate industrial', 'precaucion', 'Procesados y preparados', 'Algo de licopeno', 'Azúcar añadido, sal, aceites refinados, aditivos', '🍅'),
('Helado convencional', 'helado convencional', 'evitar', 'Procesados y preparados', NULL, 'Alto en azúcar, grasa saturada láctea, aditivos, colorantes', '🍦'),
('Helado artesano / de calidad', 'helado artesano de calidad', 'precaucion', 'Procesados y preparados', 'Mejor calidad de ingredientes', 'Sigue siendo alto en azúcar y lácteo', '🍦'),
('Proteína whey (concentrado)', 'proteina whey concentrado', 'neutro', 'Procesados y preparados', 'Proteína completa, leucina, práctica post-entreno', 'Lácteo: lactosa y caseína presentes. Puede irritar intestino en sensibles', '🥛'),
('Proteína whey (aislado)', 'proteina whey aislado', 'neutro', 'Procesados y preparados', 'Proteína pura, muy baja en lactosa, leucina', 'Revisar edulcorantes artificiales en la fórmula', '🥛'),
('Edulcorantes artificiales (aspartamo, sucralosa)', 'edulcorantes artificiales aspartamo sucralosa', 'evitar', 'Procesados y preparados', NULL, 'Alteran microbioma intestinal, pueden promover inflamación sistémica', '⚠️'),
('Comida rápida (hamburguesas, perritos)', 'comida rapida hamburguesas perritos', 'evitar', 'Procesados y preparados', NULL, 'Aceites industriales, grasas trans, exceso de sal, aditivos. Altamente proinflamatorio', '🍔'),
('Platos preparados congelados (lasaña, canelones)', 'platos preparados congelados lasana canelones', 'evitar', 'Procesados y preparados', NULL, 'Harinas refinadas, queso procesado, aceites de baja calidad, conservantes', '🍝'),
('Sopas instantáneas (sobre)', 'sopas instantaneas sobre', 'evitar', 'Procesados y preparados', NULL, 'MSG, exceso de sodio, aceites de palma, potenciadores de sabor artificiales', '🍜'),
('Aceitunas', 'aceitunas', 'bueno', 'Procesados y preparados', 'Ácido oleico, polifenoles (hidroxitirosol), vitamina E, hierro', 'Moderación por sal', '🫒'),
('Miel cruda', 'miel cruda', 'neutro', 'Procesados y preparados', 'Propiedades antimicrobianas, antioxidantes, enzimas activas', 'Sigue siendo azúcar. Máximo 1 cucharadita al día', '🍯'),
('Cacao puro en polvo (sin azúcar)', 'cacao puro en polvo sin azucar', 'bueno', 'Procesados y preparados', 'Flavonoides muy concentrados, magnesio, hierro, teobromina', NULL, '🟤'),
('Nori (alga)', 'nori alga', 'bueno', 'Procesados y preparados', 'Yodo, vitaminas B, proteína, minerales traza, omega-3', NULL, '🟢'),
('Spirulina', 'spirulina', 'bueno', 'Procesados y preparados', 'Ficocianina antiinflamatoria, proteína completa, GLA, hierro, vitaminas B', NULL, '🟢'),
('Colágeno hidrolizado', 'colageno hidrolizado', 'bueno', 'Procesados y preparados', 'Glicina y prolina para reparación de piel, mejora barrera intestinal', NULL, '💊'),
('Mantequilla de cacahuete (con azúcar y aceite de palma)', 'mantequilla de cacahuete con azucar y aceite de palma', 'evitar', 'Procesados y preparados', NULL, 'Aceite de palma, azúcar añadido, sal. Elegir siempre 100% cacahuete', '🥜'),
('Bebida de arroz', 'bebida de arroz', 'precaucion', 'Procesados y preparados', 'Sin lactosa, sin gluten', 'Índice glucémico muy alto, muy baja en proteína, baja densidad nutricional', '🥛'),
('Queso rallado envasado', 'queso rallado envasado', 'precaucion', 'Procesados y preparados', 'Calcio', 'Antiaglomerantes, conservantes, lácteo convencional procesado', '🧀'),
('Pan de centeno 100% (tipo alemán)', 'pan de centeno 100 tipo aleman', 'bueno', 'Procesados y preparados', 'Fibra alta, IG bajo, saciante, fermentación natural en los de masa madre', 'Contiene gluten, aunque menor impacto que trigo', '🍞'),
('Masa madre de trigo', 'masa madre de trigo', 'neutro', 'Procesados y preparados', 'Fermentación reduce gluten parcialmente, mejor digestibilidad, IG más bajo', 'Aún contiene gluten. Mejor opción que pan convencional', '🍞'),
('Sopa miso instantánea', 'sopa miso instantanea', 'neutro', 'Procesados y preparados', 'Algo de probióticos del miso, umami, rápida', 'Sodio alto, calidad del miso inferior a fresco', '🥢');

