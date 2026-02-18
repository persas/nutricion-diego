-- ============================================================
-- RECIPES V4: Add preparation steps to ALL remaining recipes
-- Run AFTER recipes_v3.sql
-- 56 recipes that were missing preparation steps
-- ============================================================

-- ============================================================
-- LUNCH RECIPES
-- ============================================================

-- lunch_3: Lubina a la sal con ensalada verde
UPDATE recipes SET preparation = '["Precalentar el horno a 220°C","Cubrir la lubina entera con una capa gruesa de sal gorda humedecida con agua","Hornear 25-30 minutos hasta que la costra de sal este firme y dorada","Mientras, preparar la ensalada mezclando lechuga y tomate troceado","Romper la costra de sal con cuidado y retirar la piel del pescado","Servir la lubina con la ensalada aliñada con aceite de oliva"]' WHERE id = 'lunch_3';

-- lunch_5: Dorada al papillote con vegetales
UPDATE recipes SET preparation = '["Precalentar el horno a 180°C","Cortar el calabacin en rodajas finas y la zanahoria en juliana","Colocar las verduras en el centro de un papel de horno grande","Poner la dorada limpia encima, regar con aceite de oliva y salpimentar","Cerrar el papillote bien sellado para que no escape el vapor","Hornear 20-25 minutos y servir abriendo el papillote en el plato"]' WHERE id = 'lunch_5';

-- lunch_6: Atun a la plancha con quinua
UPDATE recipes SET preparation = '["Cocinar la quinua en agua con sal 15 minutos y escurrir","Cortar el pimiento rojo en tiras finas","Saltear el pimiento en aceite de oliva 3-4 minutos a fuego medio","Calentar una plancha a fuego alto y cocinar el atun 2 min por lado (dejarlo rosado por dentro)","Mezclar la quinua con el pimiento salteado","Servir el atun en rodajas sobre la quinua"]' WHERE id = 'lunch_6';

-- lunch_7: Pollo con hierbas y batata
UPDATE recipes SET preparation = '["Precalentar el horno a 200°C","Pelar la batata y cortarla en cubos de 2cm","Extender la batata en bandeja con aceite de oliva y sal, hornear 15 min","Salpimentar la pechuga de pollo y frotar con tomillo fresco","Anadir el pollo a la bandeja con la batata y hornear 20-25 min mas","Dejar reposar 5 minutos antes de cortar y servir"]' WHERE id = 'lunch_7';

-- lunch_8: Pavo asado con manzana y jengibre
UPDATE recipes SET preparation = '["Precalentar el horno a 190°C","Cortar la manzana en gajos y rallar el jengibre fresco","Sellar el lomo de pavo en sarten con aceite caliente 2 min por lado","Colocar en bandeja de horno rodeado de los gajos de manzana","Espolvorear con jengibre rallado y hornear 25-30 minutos","Dejar reposar 5 minutos, laminar y servir con la manzana asada"]' WHERE id = 'lunch_8';

-- lunch_9: Huevos revueltos con aguacate
UPDATE recipes SET preparation = '["Tostar el pan integral en tostadora o sarten","Batir los huevos con una pizca de sal y pimienta","Cocinar los huevos en sarten con aceite a fuego bajo removiendo constantemente","Retirar cuando esten cremosos (no secos) en 2-3 minutos","Cortar el aguacate en laminas o aplastarlo con tenedor","Servir los huevos sobre las tostadas con el aguacate encima"]' WHERE id = 'lunch_9';

-- lunch_10: Lentejas rojas con verduras
UPDATE recipes SET preparation = '["Picar la cebolla y la zanahoria en dados pequenos","Rehogar la cebolla en aceite de oliva 3 minutos hasta que transparente","Anadir la zanahoria y cocinar 2 minutos mas","Incorporar las lentejas rojas lavadas y cubrir con agua (doble volumen)","Cocinar a fuego medio 15-18 minutos hasta que las lentejas esten tiernas","Anadir las espinacas en los ultimos 2 minutos, salpimentar y servir"]' WHERE id = 'lunch_10';

-- lunch_11: Arroz integral con champinones
UPDATE recipes SET preparation = '["Cocinar el arroz integral en agua con sal 25-30 minutos y escurrir","Laminar los champinones y picar el ajo finamente","Calentar aceite de oliva en sarten y dorar el ajo 1 minuto","Anadir los champinones y saltear a fuego fuerte 5-6 minutos","Mezclar el arroz con los champinones salteados","Salpimentar al gusto y servir caliente"]' WHERE id = 'lunch_11';

-- lunch_12: Garbanzos tostados con especias
UPDATE recipes SET preparation = '["Precalentar el horno a 200°C","Escurrir y secar bien los garbanzos con papel de cocina","Mezclar los garbanzos con aceite de oliva, comino y paprika","Extender en bandeja de horno en una sola capa","Hornear 25-30 minutos removiendo a mitad, hasta que esten crujientes","Salpimentar al gusto y dejar enfriar ligeramente antes de servir"]' WHERE id = 'lunch_12';

-- lunch_14: Curry de garbanzos con espinacas
UPDATE recipes SET preparation = '["Picar la cebolla (si la hubiera) y rallar el jengibre fresco","Calentar aceite de oliva y tostar la curcuma y el jengibre 1 minuto","Anadir los garbanzos cocidos y rehogar 3 minutos","Verter la leche de coco y cocinar a fuego medio 10 minutos","Incorporar las espinacas y cocinar 2-3 minutos hasta que se marchiten","Rectificar de sal y servir con arroz integral si se desea"]' WHERE id = 'lunch_14';

-- lunch_16: Wok de pollo con verduras y jengibre
UPDATE recipes SET preparation = '["Cortar la pechuga de pollo en tiras finas","Cortar el brocoli en ramilletes pequenos y el pimiento en tiras","Rallar el jengibre fresco","Calentar el aceite de sesamo en un wok a fuego muy alto","Saltear el pollo 3-4 minutos hasta que este dorado","Anadir las verduras y el jengibre, saltear 3-4 minutos mas manteniendo las verduras crujientes","Salpimentar y servir inmediatamente"]' WHERE id = 'lunch_16';

-- lunch_17: Ensalada mediterranea de atun
UPDATE recipes SET preparation = '["Escurrir bien el atun en conserva","Cortar el tomate en rodajas y el pepino en medias lunas","Disponer las verduras en un plato amplio","Desmenuzar el atun por encima de las verduras","Anadir las aceitunas negras","Aliñar generosamente con aceite de oliva virgen extra, sal y pimienta"]' WHERE id = 'lunch_17';

-- lunch_18: Buddha bowl de boniato y garbanzos
UPDATE recipes SET preparation = '["Precalentar el horno a 200°C","Pelar y cortar el boniato en cubos, mezclar con aceite, comino y sal","Hornear el boniato 25 minutos hasta que este tierno y dorado","Calentar los garbanzos en sarten con un poco de aceite y especias","Masajear el kale con unas gotas de aceite de oliva para ablandarlo","Montar el bowl: kale, boniato asado, garbanzos especiados","Aliñar con tahini diluido en un poco de agua y limon"]' WHERE id = 'lunch_18';

-- lunch_19: Sopa de miso con tofu y algas
UPDATE recipes SET preparation = '["Calentar 500ml de agua sin llegar a hervir","Hidratar las algas wakame en agua tibia 5 minutos y escurrir","Cortar el tofu sedoso en cubos de 2cm","Disolver la pasta de miso en un poco de caldo caliente (no hervir)","Anadir el tofu y las algas al caldo con el miso disuelto","Picar la cebolleta y servir la sopa decorada con cebolleta fresca"]' WHERE id = 'lunch_19';

-- lunch_20: Revuelto de setas silvestres con ajo
UPDATE recipes SET preparation = '["Limpiar las setas con un pano humedo y trocearlas","Picar el ajo finamente y el perejil","Calentar aceite de oliva en sarten grande a fuego fuerte","Saltear las setas sin mover mucho para que se doren bien, 5-6 minutos","Anadir el ajo picado y saltear 1 minuto mas","Batir los huevos, verter sobre las setas y revolver suavemente","Retirar cuando el huevo este cuajado pero cremoso, decorar con perejil"]' WHERE id = 'lunch_20';

-- ============================================================
-- DINNER RECIPES
-- ============================================================

-- dinner_1: Bacalao a la vizcaina
UPDATE recipes SET preparation = '["Desalar el bacalao si es necesario (24h en agua cambiando cada 8h)","Asar los pimientos rojos al horno a 200°C 30 minutos, pelar y trocear","Pochar la cebolla picada en aceite de oliva a fuego suave 15 minutos","Triturar el pimiento asado con la cebolla pochada hasta obtener salsa","Colocar el bacalao en una cazuela y cubrir con la salsa vizcaina","Cocinar a fuego suave 15 minutos sin que llegue a hervir"]' WHERE id = 'dinner_1';

-- dinner_2: Rape a la gallega
UPDATE recipes SET preparation = '["Cocer la patata pelada y cortada en rodajas en agua con sal 15-18 minutos","En otra olla, cocer el rape en agua hirviendo con laurel 8-10 minutos","Picar el ajo finamente y calentarlo en aceite de oliva sin que se queme","Disponer las rodajas de patata en plato, colocar el rape encima","Regar con el aceite de ajo caliente y espolvorear pimenton si se desea"]' WHERE id = 'dinner_2';

-- dinner_5: Sepia a la tinta con arroz
UPDATE recipes SET preparation = '["Limpiar la sepia reservando las bolsas de tinta","Cortar la sepia en trozos y salpimentar","Picar el ajo y sofreir en aceite de oliva 1 minuto","Anadir la sepia y cocinar a fuego fuerte 3-4 minutos","Disolver la tinta en un poco de caldo y anadir a la cazuela","Incorporar el arroz y cocinar con caldo 18-20 minutos a fuego medio","Preparar el alioli batiendo ajo con aceite y huevo","Servir el arroz negro con un toque de alioli"]' WHERE id = 'dinner_5';

-- dinner_6: Pez espada con champinones
UPDATE recipes SET preparation = '["Salpimentar los filetes de pez espada","Laminar los champinones y picar el ajo","Calentar aceite de oliva en sarten y dorar el pez espada 3 min por lado","Retirar el pescado y en la misma sarten saltear los champinones 5 minutos","Anadir el ajo y el vino blanco, dejar reducir 2-3 minutos","Volver a colocar el pez espada sobre los champinones y calentar 1 minuto","Servir con el jugo de la sarten por encima"]' WHERE id = 'dinner_6';

-- dinner_7: Caldo de verduras con fideos integrales
UPDATE recipes SET preparation = '["Picar la zanahoria en rodajas y el apio en trozos pequenos","Calentar el caldo de verduras en una olla grande","Cuando hierva, anadir la zanahoria y el apio, cocinar 8 minutos","Incorporar los fideos integrales y cocinar segun el paquete (8-10 min)","Picar el perejil fresco","Servir caliente con perejil por encima y un chorrito de aceite de oliva"]' WHERE id = 'dinner_7';

-- dinner_9: Brocoli gratinado con queso de cabra
UPDATE recipes SET preparation = '["Precalentar el horno a 200°C con el grill activado","Cocinar el brocoli al vapor 5 minutos (que quede al dente)","Colocar el brocoli en una fuente de horno","Desmenuzar el queso de cabra por encima","Anadir las nueces troceadas y un chorrito de aceite de oliva","Gratinar en el horno 8-10 minutos hasta que el queso se funda y dore"]' WHERE id = 'dinner_9';

-- dinner_10: Sopa minestrone con verduras
UPDATE recipes SET preparation = '["Picar la cebolla, zanahoria y apio en dados pequenos","Rehogar las verduras en aceite de oliva 5 minutos","Anadir el tomate enlatado troceado y cocinar 3 minutos","Cubrir con agua o caldo y llevar a ebullicion","Incorporar los frijoles cannellini escurridos","Cocinar a fuego medio 15-20 minutos","Salpimentar al gusto y servir con un hilo de aceite de oliva"]' WHERE id = 'dinner_10';

-- dinner_11: Espinacas salteadas con ajo
UPDATE recipes SET preparation = '["Lavar bien las espinacas frescas y escurrir","Pelar y laminar los ajos finamente","Calentar el aceite de oliva en sarten grande a fuego medio","Dorar los ajos laminados 1-2 minutos sin que se quemen","Anadir las espinacas de golpe y saltear 2-3 minutos removiendo","Salpimentar y servir inmediatamente con el aceite del ajo"]' WHERE id = 'dinner_11';

-- dinner_12: Alcachofas al limon
UPDATE recipes SET preparation = '["Preparar un bol con agua y zumo de limon para evitar que se oxiden","Limpiar las alcachofas retirando hojas externas duras y pelar el tallo","Cortar en cuartos y sumergir en el agua con limon","Cocinar las alcachofas en agua hirviendo con sal 15-20 minutos hasta tiernas","Escurrir bien y disponer en plato","Aliñar con aceite de oliva virgen extra y un chorrito de zumo de limon"]' WHERE id = 'dinner_12';

-- dinner_13: Salmon al horno con costra de frutos secos
UPDATE recipes SET preparation = '["Precalentar el horno a 190°C","Triturar las almendras y pistachos groseramente (no polvo)","Mezclar los frutos secos triturados con un poco de aceite y sal","Colocar el salmon en bandeja de horno con los esparragos alrededor","Cubrir la parte superior del salmon con la mezcla de frutos secos presionando","Hornear 15-18 minutos hasta que la costra este dorada y el salmon jugoso"]' WHERE id = 'dinner_13';

-- dinner_14: Crema de brocoli con almendras
UPDATE recipes SET preparation = '["Picar la cebolla y sofreirla en aceite de oliva 3 minutos","Anadir el brocoli troceado y rehogar 2 minutos","Verter el caldo de verduras caliente y cocinar 15 minutos","Triturar con batidora hasta obtener crema suave","Tostar las almendras en sarten seca hasta que esten doradas","Servir la crema con las almendras tostadas y un hilo de aceite por encima"]' WHERE id = 'dinner_14';

-- dinner_15: Caballa al horno con pisto manchego
UPDATE recipes SET preparation = '["Precalentar el horno a 190°C","Cortar calabacin, berenjena y pimiento en dados pequenos","Sofreir las verduras en aceite de oliva 10 minutos con tomate troceado","Salpimentar el pisto y extender en base de una fuente de horno","Colocar las caballas limpias encima del pisto","Hornear 20-25 minutos hasta que el pescado este hecho","Servir directamente en la fuente con un chorrito de aceite"]' WHERE id = 'dinner_15';

-- dinner_16: Ensalada templada de lentejas y salmon
UPDATE recipes SET preparation = '["Cocinar las lentejas verdes en agua con sal 20-25 minutos, escurrir","Salpimentar el salmon y hacerlo a la plancha 3 min por lado","Preparar vinagreta mezclando mostaza de Dijon con aceite de oliva y limon","Disponer la rucula en la base del plato","Anadir las lentejas templadas y el salmon desmenuzado en trozos grandes","Aliñar con la vinagreta de mostaza"]' WHERE id = 'dinner_16';

-- dinner_17: Pollo al limon con curcuma y arroz basmati
UPDATE recipes SET preparation = '["Marinar los muslos de pollo con zumo de limon, curcuma, sal y aceite 30 min","Cocinar el arroz basmati segun instrucciones del paquete","Calentar aceite en sarten y dorar los muslos 4-5 min por cada lado","Anadir un chorrito de agua y tapar, cocinar a fuego medio 15 minutos","Comprobar que el pollo esta bien cocinado por dentro","Servir sobre el arroz basmati con zumo de limon fresco por encima"]' WHERE id = 'dinner_17';

-- dinner_18: Gazpacho andaluz con gambas
UPDATE recipes SET preparation = '["Lavar los tomates, pepino y pimiento verde","Trocear todas las verduras y triturar con batidora potente","Anadir aceite de oliva, sal y un chorrito de vinagre de jerez","Colar si se desea una textura mas fina y refrigerar minimo 2 horas","Pelar las gambas y hacerlas a la plancha con sal 1-2 min por lado","Servir el gazpacho bien frio con las gambas a la plancha encima"]' WHERE id = 'dinner_18';

-- dinner_19: Tortilla de calabacin y cebolla caramelizada
UPDATE recipes SET preparation = '["Cortar la cebolla en juliana fina y el calabacin en rodajas finas","Caramelizar la cebolla en aceite a fuego muy suave 20-25 minutos removiendo","Anadir el calabacin y cocinar 5 minutos mas","Batir los huevos con sal y pimienta","Verter los huevos sobre las verduras en la sarten","Cocinar a fuego medio-bajo 5 minutos, dar la vuelta y 3 minutos mas"]' WHERE id = 'dinner_19';

-- dinner_20: Merluza en salsa verde con almejas
UPDATE recipes SET preparation = '["Lavar las almejas en agua fria con sal para que suelten la arena","Salpimentar la merluza y enharinar ligeramente","Dorar la merluza en cazuela con aceite de oliva 2 min por lado, reservar","En el mismo aceite, dorar el ajo picado y anadir perejil","Anadir un vaso de caldo de pescado y las almejas, tapar","Cuando las almejas se abran, devolver la merluza a la cazuela","Anadir los guisantes y cocinar 5 minutos a fuego suave moviendo la cazuela"]' WHERE id = 'dinner_20';

-- ============================================================
-- BREAKFAST RECIPES
-- ============================================================

-- breakfast_3: Tostadas de salmon ahumado y aguacate
UPDATE recipes SET preparation = '["Tostar el pan de centeno hasta que este crujiente","Cortar el aguacate por la mitad y aplastarlo con un tenedor","Extender el aguacate sobre las tostadas","Colocar laminas de salmon ahumado encima","Espolvorear con semillas de sesamo y una pizca de sal","Opcion: anadir unas gotas de zumo de limon por encima"]' WHERE id = 'breakfast_3';

-- breakfast_4: Smoothie bowl de platano y espirulina
UPDATE recipes SET preparation = '["Congelar el platano en rodajas la noche anterior","Triturar el platano congelado con leche de almendra y espirulina hasta obtener textura cremosa","Verter la mezcla en un bowl (debe quedar espeso, no liquido)","Anadir la granola sin azucar por encima","Decorar con semillas de chia","Consumir inmediatamente antes de que se derrita"]' WHERE id = 'breakfast_4';

-- breakfast_5: Huevos al horno con tomate y hierbas
UPDATE recipes SET preparation = '["Precalentar el horno a 190°C","Verter el tomate triturado en una fuente de horno individual","Anadir oregano y un chorrito de aceite de oliva al tomate","Hacer huecos en el tomate y cascar los huevos dentro","Salpimentar los huevos y hornear 12-15 minutos","Decorar con albahaca fresca al servir"]' WHERE id = 'breakfast_5';

-- breakfast_6: Pudding de chia con mango
UPDATE recipes SET preparation = '["Mezclar las semillas de chia con la leche de coco en un recipiente","Anadir la miel y remover bien para evitar grumos","Tapar y refrigerar minimo 4 horas o toda la noche","Remover una vez pasada la primera hora para distribuir las semillas","Pelar y cortar el mango en cubos pequenos","Servir el pudding con el mango fresco por encima"]' WHERE id = 'breakfast_6';

-- breakfast_7: Crepes de avena con frutos rojos
UPDATE recipes SET preparation = '["Triturar la avena en copos hasta obtener harina fina","Batir los huevos con la harina de avena hasta obtener masa homogenea","Calentar una sarten antiadherente con un poco de aceite de coco","Verter un cucharon de masa y cocinar 2 min por lado hasta que dore","Repetir con el resto de la masa","Servir las crepes con frutos rojos frescos por encima"]' WHERE id = 'breakfast_7';

-- breakfast_8: Yogur griego con semillas y miel
UPDATE recipes SET preparation = '["Servir el yogur griego natural en un bowl","Tostar ligeramente las semillas de calabaza en sarten seca 1-2 minutos","Anadir las semillas de calabaza y las semillas de lino por encima","Regar con la miel cruda en hilo","Espolvorear canela al gusto","Consumir inmediatamente para mantener el crujiente de las semillas"]' WHERE id = 'breakfast_8';

-- ============================================================
-- SNACK RECIPES
-- ============================================================

-- snack_1: Manzana con almendras
UPDATE recipes SET preparation = '["Lavar la manzana y cortarla en gajos","Disponer los gajos en un plato","Acompanar con las almendras crudas al lado","Opcion: untar los gajos con un poco de mantequilla de almendra"]' WHERE id = 'snack_1';

-- snack_2: Aguacate con limon y sal
UPDATE recipes SET preparation = '["Cortar el aguacate por la mitad y retirar el hueso","Exprimir medio limon sobre la pulpa del aguacate","Espolvorear con sal marina al gusto","Comer directamente con cuchara desde la piel"]' WHERE id = 'snack_2';

-- snack_3: Yogur natural con fresas
UPDATE recipes SET preparation = '["Lavar las fresas y retirar las hojas verdes","Cortar las fresas en mitades o cuartos","Servir el yogur natural en un bol","Anadir las fresas frescas por encima"]' WHERE id = 'snack_3';

-- snack_4: Nueces y pasas
UPDATE recipes SET preparation = '["Medir la porcion de nueces crudas (un punado)","Mezclar con las pasas de uva","Servir como snack rapido","Opcion: guardar en bolsitas individuales para llevar"]' WHERE id = 'snack_4';

-- snack_5: Salmon ahumado con pepino
UPDATE recipes SET preparation = '["Lavar el pepino y cortarlo en rodajas de medio centimetro","Disponer las rodajas de pepino en un plato como base","Colocar laminas de salmon ahumado sobre cada rodaja","Opcion: anadir un toque de eneldo o pimienta negra"]' WHERE id = 'snack_5';

-- snack_6: Queso fresco con tomate
UPDATE recipes SET preparation = '["Lavar los tomates cherry y cortarlos por la mitad","Cortar el queso fresco en dados o laminas","Disponer en un plato alternando queso y tomate","Espolvorear con oregano y aliñar con un chorrito de aceite si se desea"]' WHERE id = 'snack_6';

-- snack_7: Smoothie de frutos rojos
UPDATE recipes SET preparation = '["Sacar los frutos rojos del congelador 5 minutos antes","Anadir los frutos rojos y la leche de almendra a la batidora","Triturar hasta obtener textura suave y homogenea","Anadir la miel al gusto y batir brevemente","Servir inmediatamente en un vaso grande"]' WHERE id = 'snack_7';

-- snack_8: Hummus casero con zanahorias
UPDATE recipes SET preparation = '["Escurrir los garbanzos cocidos y reservar un poco del liquido","Triturar los garbanzos con tahini, zumo de limon y un poco del liquido reservado","Batir hasta obtener una crema suave, ajustar con mas liquido si es necesario","Salpimentar al gusto y servir con un hilo de aceite de oliva","Pelar las zanahorias y cortarlas en bastones para mojar"]' WHERE id = 'snack_8';

-- snack_9: Kefir con granola sin azucar
UPDATE recipes SET preparation = '["Servir el kefir natural en un bol amplio","Anadir la granola sin azucar por encima","Mezclar ligeramente o dejar separado segun preferencia","Consumir inmediatamente para mantener la textura crujiente"]' WHERE id = 'snack_9';

-- snack_10: Te verde con almendra tostada
UPDATE recipes SET preparation = '["Calentar agua a 80°C (no hervir, para no amargar el te)","Infusionar el te verde 2-3 minutos y retirar las hojas","Tostar las almendras en sarten seca a fuego medio 2-3 minutos","Servir el te caliente acompanado de las almendras en un plato aparte"]' WHERE id = 'snack_10';

-- snack_11: Energy balls de datiles y cacao
UPDATE recipes SET preparation = '["Deshuesar los datiles Medjool si es necesario","Triturar los datiles con las almendras en procesador hasta que se forme una masa pegajosa","Anadir el cacao puro en polvo y mezclar bien","Formar bolitas del tamano de una nuez con las manos humedas","Rebozar cada bolita en coco rallado","Refrigerar 30 minutos antes de consumir, guardar en nevera hasta 1 semana"]' WHERE id = 'snack_11';

-- snack_12: Edamame con sal marina y limon
UPDATE recipes SET preparation = '["Cocinar el edamame en agua hirviendo con sal 4-5 minutos","Escurrir bien y pasar a un bol","Espolvorear con sal marina gruesa","Exprimir medio limon por encima y mezclar","Servir templado o a temperatura ambiente, comer sacando las vainas con los dedos"]' WHERE id = 'snack_12';

-- snack_13: Batido verde anti-inflamatorio
UPDATE recipes SET preparation = '["Lavar las espinacas frescas y el pepino","Pelar y trocear el jengibre fresco","Cortar la manzana verde en trozos (se puede dejar la piel)","Anadir todo a la batidora con el zumo de medio limon y un poco de agua","Triturar a maxima potencia 1-2 minutos hasta textura suave","Servir inmediatamente para aprovechar los nutrientes"]' WHERE id = 'snack_13';

-- ============================================================
-- BATCH-COOK RECIPES
-- ============================================================

-- batch_1: Chili de pavo y alubias negras
UPDATE recipes SET preparation = '["Picar la cebolla en dados pequenos","Dorar el pavo picado en una olla grande con un poco de aceite 5-6 minutos","Anadir la cebolla y cocinar 3 minutos mas","Incorporar el tomate triturado, comino y pimenton ahumado","Anadir las alubias negras escurridas y un vaso de agua","Cocinar a fuego medio-bajo 25-30 minutos removiendo ocasionalmente","Rectificar de sal y especias, servir caliente"]' WHERE id = 'batch_1';

-- batch_2: Caldo de huesos con verduras
UPDATE recipes SET preparation = '["Tostar los huesos de pollo en el horno a 200°C durante 20 minutos","Colocar los huesos en una olla grande y cubrir con agua fria (2-3 litros)","Pelar y trocear la zanahoria, apio y cebolla, anadir a la olla","Incorporar la curcuma y el jengibre fresco rallado","Llevar a ebullicion, bajar el fuego y cocinar minimo 4-6 horas a fuego muy suave","Colar el caldo, dejar enfriar y refrigerar, retirar la grasa solidificada de la superficie"]' WHERE id = 'batch_2';

-- batch_3: Salsa de tomate casera anti-inflamatoria
UPDATE recipes SET preparation = '["Picar el ajo finamente y la albahaca fresca","Calentar el aceite de oliva y sofreir el ajo 1 minuto sin que se queme","Anadir el tomate maduro troceado (o rallado) y la curcuma","Cocinar a fuego medio-bajo 30-40 minutos removiendo de vez en cuando","Triturar si se desea una textura mas fina","Anadir la albahaca fresca al final, guardar en tarros de cristal hasta 5 dias en nevera"]' WHERE id = 'batch_3';

-- ============================================================
-- CAUTION RECIPES
-- ============================================================

-- caution_1: Entrecot a la plancha con ensalada
UPDATE recipes SET preparation = '["Sacar el entrecot de la nevera 30 minutos antes de cocinar","Salpimentar generosamente por ambos lados","Calentar una sarten o plancha a fuego muy alto","Cocinar el entrecot 3-4 min por lado para punto medio (ajustar al gusto)","Dejar reposar 5 minutos tapado con papel de aluminio","Preparar la ensalada con lechuga, tomate y zanahoria rallada","Aliñar la ensalada con aceite de oliva y servir junto al entrecot cortado en laminas"]' WHERE id = 'caution_1';

-- caution_2: Hamburguesa casera de ternera sin pan
UPDATE recipes SET preparation = '["Mezclar la ternera picada con cebolla finamente picada y perejil","Anadir el huevo y salpimentar, mezclar bien con las manos","Formar hamburguesas de unos 2cm de grosor","Calentar aceite de oliva en sarten a fuego medio-alto","Cocinar la hamburguesa 4-5 minutos por lado","Servir sin pan, acompanada de ensalada o verduras al gusto"]' WHERE id = 'caution_2';

-- caution_3: Pasta bolonesa integral
UPDATE recipes SET preparation = '["Picar la cebolla y el ajo finamente","Dorar la carne de res picada en aceite de oliva 5-6 minutos desmenuzando","Anadir la cebolla y el ajo, cocinar 3 minutos","Incorporar el tomate enlatado y salpimentar","Cocinar la salsa a fuego medio-bajo 20-25 minutos removiendo","Mientras, cocer la pasta integral segun instrucciones del paquete","Escurrir la pasta y mezclar con la salsa bolonesa"]' WHERE id = 'caution_3';

-- caution_4: Costillas de cerdo al horno
UPDATE recipes SET preparation = '["Precalentar el horno a 160°C","Picar la cebolla y el ajo, mezclar con tomate triturado y pimenton","Salpimentar las costillas y colocarlas en bandeja de horno","Cubrir con la salsa de tomate y cebolla","Tapar con papel de aluminio y hornear 2 horas a fuego suave","Retirar el aluminio, subir a 200°C y hornear 15 minutos mas para dorar","Servir con la salsa reducida por encima"]' WHERE id = 'caution_4';
