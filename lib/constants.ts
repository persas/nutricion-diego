export const FOOD_CATEGORIES = [
  {
    level: 'excellent',
    title: 'Alimentos Excelentes',
    description: 'Base de tu alimentación - Consumir regularmente',
    color: '#00b894',
    foods: [
      { name: 'Pescados grasos (salmón, sardinas, caballa)', benefits: 'Omega-3, Vitamina D' },
      { name: 'Vegetales de hoja verde (espinaca, kale, lechuga)', benefits: 'Antioxidantes, Minerales' },
      { name: 'Aguacate', benefits: 'Grasas saludables, Potasio' },
      { name: 'Huevos (enteros)', benefits: 'Proteína completa, Colina' },
      { name: 'Bayas (arándanos, fresas, frambuesas)', benefits: 'Antioxidantes, Fibra' },
      { name: 'Aceite de oliva virgen extra', benefits: 'Polifenoles, Grasas monoinsaturadas' },
      { name: 'Frutos secos (almendras, nueces)', benefits: 'Grasas omega, Vitamina E' },
      { name: 'Caldo de hueso', benefits: 'Colágeno, Minerales' },
    ]
  },
  {
    level: 'good',
    title: 'Alimentos Buenos',
    description: 'Incluir frecuentemente en tu dieta',
    color: '#00d2d3',
    foods: [
      { name: 'Pollo orgánico', benefits: 'Proteína magra, B vitaminas' },
      { name: 'Verduras crucíferas (brócoli, coliflor, col)', benefits: 'Sulforafano, Fibra' },
      { name: 'Tubérculos (batata, remolacha)', benefits: 'Carbohidratos complejos' },
      { name: 'Legumbres (lentejas, garbanzos)', benefits: 'Proteína vegetal, Fibra' },
      { name: 'Hongos medicinales (shiitake, maitake)', benefits: 'Beta-glucanos, Inmunidad' },
      { name: 'Té verde y blanco', benefits: 'Catequinas, L-teanina' },
      { name: 'Cúrcuma y jengibre', benefits: 'Curcumina, Gingeroles antiinflamatorios' },
      { name: 'Carne roja (orgánica, grass-fed)', benefits: 'Hierro, B12, Creatina' },
    ]
  },
  {
    level: 'neutral',
    title: 'Alimentos Neutros',
    description: 'Moderar - Ocasionalmente permitidos',
    color: '#fdcb6e',
    foods: [
      { name: 'Pan integral de grano germinado', benefits: 'Fibra, Menor contenido de antinutrientes' },
      { name: 'Arroz blanco (pequeñas porciones)', benefits: 'Carbohidratos digeribles' },
      { name: 'Queso artesanal (porciones pequeñas)', benefits: 'Calcio, Proteína' },
      { name: 'Chocolate negro 70%+', benefits: 'Flavonoides, Magnesio' },
      { name: 'Miel cruda', benefits: 'Enzimas, Antioxidantes' },
      { name: 'Vino tinto (máximo 1 copa/día)', benefits: 'Resveratrol' },
      { name: 'Café orgánico (máximo 2 tazas/día)', benefits: 'Polifenoles, Cafeína' },
      { name: 'Productos lácteos fermentados', benefits: 'Probióticos, Calcio' },
    ]
  },
  {
    level: 'caution',
    title: 'Alimentos de Precaución',
    description: 'Minimizar o evitar - Pueden agravar inflamación',
    color: '#e17055',
    foods: [
      { name: 'Aceites vegetales refinados (soja, maíz, canola)', benefits: 'Evitar - Proinflamatorios' },
      { name: 'Azúcares refinados y dulces', benefits: 'Evitar - Picos de glucosa' },
      { name: 'Harina blanca y productos ultra procesados', benefits: 'Evitar - Baja calidad nutricional' },
      { name: 'Productos con gluten (si sensibilidad)', benefits: 'Puede aumentar inflamación intestinal' },
      { name: 'Lácteos convencionales de alta temperatura', benefits: 'Contienen casomorfinas' },
      { name: 'Carnes procesadas (embutidos, salchichas)', benefits: 'Contienen aditivos y nitratos' },
      { name: 'Bebidas energéticas y refrescos', benefits: 'Azúcar, aditivos químicos' },
      { name: 'Alimentos fritos en aceites de baja calidad', benefits: 'Grasas trans, Acroleína' },
    ]
  },
  {
    level: 'avoid',
    title: 'Alimentos a Evitar',
    description: 'Prohibidos o máxima restricción - Agravan psoriasis',
    color: '#d63031',
    foods: [
      { name: 'Grasas trans (margarinas, manteca vegetal)', benefits: 'Altamente proinflamatorias' },
      { name: 'Aditivos artificiales (colorantes, saborizantes)', benefits: 'Pueden disparar reacciones' },
      { name: 'Glutamato monosódico (MSG)', benefits: 'Excitotoxina, inflamación' },
      { name: 'Edulcorantes artificiales sintéticos', benefits: 'Alteran microbioma, inflamación' },
      { name: 'Comida ultra procesada (fast food, snacks)', benefits: 'Múltiples factores inflamatorios' },
      { name: 'Alcohol destilado (en exceso)', benefits: 'Daña barrera intestinal' },
      { name: 'Alimentos que causan reacción personal', benefits: 'Según sensibilidades individuales' },
      { name: 'Productos con conservantes y sulfitos', benefits: 'Pueden aumentar carga inflamatoria' },
    ]
  }
];

export const SUPPLEMENTS = [
  {
    name: 'Omega-3 (EPA/DHA)',
    dosage: '2-3g/día (combinado)',
    benefits: 'Reducción de inflamación sistémica, soporte articular',
    recommendation: 'De pescado o algas de calidad farmacéutica',
    timing: 'Con comidas grasas',
  },
  {
    name: 'Vitamina D3',
    dosage: '2,000-4,000 IU/día',
    benefits: 'Regulación inmunológica, absorción de calcio, deficiencia común',
    recommendation: 'Medir niveles primero (objetivo: 40-60 ng/mL)',
    timing: 'Con comida que contiene grasas',
  },
  {
    name: 'Probióticos de alta potencia',
    dosage: '25-100 billones CFU/día',
    benefits: 'Restaura microbioma, mejora barrera intestinal',
    recommendation: 'Múltiples cepas, entérico-recubierto',
    timing: 'Entre comidas o con comida según marca',
  },
  {
    name: 'Glutamina L',
    dosage: '5-10g/día',
    benefits: 'Repara mucosa intestinal, reduce permeabilidad',
    recommendation: 'Forma pura, polvo o cápsulas',
    timing: 'Entre comidas',
  },
  {
    name: 'Curcumina (Cúrcuma)',
    dosage: '500-1,000mg/día',
    benefits: 'Potente antiinflamatorio, antioxidante',
    recommendation: 'Con pimienta negra (piperina) para absorción',
    timing: 'Con comidas grasas',
  },
  {
    name: 'Zinc',
    dosage: '15-30mg/día',
    benefits: 'Inmunidad, cicatrización de piel, barrera intestinal',
    recommendation: 'Quelado (glycinato, citrato), no óxido',
    timing: 'Alejado de otras suplementos',
  },
  {
    name: 'Vitaminas B complejas',
    dosage: 'Según dosis recomendada',
    benefits: 'Soporte energético, reducción estrés, metilación',
    recommendation: 'Formas activas (metilcobalamina, piridoxal-5-fosfato)',
    timing: 'Por la mañana con comida',
  },
  {
    name: 'Selenio',
    dosage: '100-200 mcg/día',
    benefits: 'Antioxidante, función tiroidea',
    recommendation: 'Selenometionina',
    timing: 'Con comida',
  },
];

export const RESTAURANT_GUIDE = [
  {
    category: 'Restaurantes de Pescado/Mariscos',
    tips: 'Busca: salmón a la parrilla, trucha, caballa. Evita: rebozados, salsas cremosas.',
    order: 'Pescado a la parrilla + vegetales al vapor + limón y aceite de oliva',
  },
  {
    category: 'Asadores/Parrillas',
    tips: 'Elige carnes grass-fed si es posible. Pide carne roja sin marinadas azucaradas.',
    order: 'Carne a la parrilla + ensalada sin dressing procesado + batata asada',
  },
  {
    category: 'Restaurantes de Comida Asiática',
    tips: 'Pide al chef que evite MSG y azúcar. Elige vapor o salteado ligero.',
    order: 'Vapor de vegetales + proteína salteada en aceite de oliva + arroz integral (pequeña porción)',
  },
  {
    category: 'Pizzerías Artesanales',
    tips: 'Si consumes gluten: mínima cantidad. Bases alternativas (coliflor, aguacate).',
    order: 'Ensalada grande + una porción pequeña de pizza con ingredientes limpios',
  },
  {
    category: 'Cafés/Desayunerías',
    tips: 'Busca opciones sin gluten. Evita pasteles y productos con azúcar refinada.',
    order: 'Huevos (revueltos o pochados) + verduras + aguacate + té o café negro',
  },
  {
    category: 'Restaurantes Veganos/Vegetarianos',
    tips: 'Verifica que no usen aceites refinados. Pide proteína vegetal de calidad.',
    order: 'Plato con legumbres, vegetales variados, semillas y grasas saludables',
  },
  {
    category: 'Estrategia General',
    tips: 'Siempre: pide agua, evita refrescos y alcohol en exceso, pregunta ingredientes.',
    order: 'Proteína (pescado/carne/legumbres) + Verduras variadas + Grasas saludables',
  },
];

export const SCIENCE_CARDS = [
  {
    title: 'Eje Intestinal-Piel',
    subtitle: 'Disbiosis y Barrera Intestinal Comprometida',
    content: 'La psoriasis está fuertemente asociada con mayor permeabilidad intestinal. Las toxinas bacterianas (lipopolisacáridos) traspasan una barrera intestinal comprometida, activando respuestas inflamatorias sistémicas que se manifiestan en la piel.',
    research: 'Estudios demuestran que restaurar la microbiota intestinal reduce síntomas de psoriasis en 60-80% de casos.',
  },
  {
    title: 'Inflamación Crónica de Bajo Grado',
    subtitle: 'Citoquinas proinflamatorias',
    content: 'La psoriasis es una enfermedad mediada por Th17 con niveles elevados de TNF-α, IL-17, IL-23. Ciertos alimentos (gluten, azúcares refinados, aceites seed) disparan estas citoquinas.',
    research: 'Dietas antiinflamatorias reducen TNF-α sistémico en 40-50% en 4-6 semanas.',
  },
  {
    title: 'Eje Intestino-Inmunidad',
    subtitle: 'Inmunidad de Mucosa (IgA)',
    content: 'El 70% del sistema inmunológico reside en el intestino. Una microbiota diversa estimula producción de IgA secretoria que protege la barrera intestinal. Sin ella, hay mayor translocación bacteriana.',
    research: 'Probióticos específicos pueden aumentar IgA en 30-50% en 8 semanas.',
  },
  {
    title: 'Metabolismo del Triptófano',
    subtitle: 'Arilo Hidrocarburos y Regulación de Th17',
    content: 'La microbiota fermenta triptófano a metabolitos (como AhR ligandos) que regulan células Th17. Una microbiota comprometida no produce suficientes metabolitos protectores, permitiendo expansión de Th17 patogénico.',
    research: 'Alimentos ricos en triptófano + fibra prebiótica pueden restaurar este eje.',
  },
  {
    title: 'Respuesta a Lipopolisacáridos (LPS)',
    subtitle: 'Endotoxemia Metabólica',
    content: 'Algunos alimentos (grasas trans, harinas refinadas) aumentan permeabilidad y absorción de LPS bacteriano, disparando inflamación sistémica. Este estado se llama endotoxemia metabólica de bajo grado.',
    research: 'Cambios dietéticos pueden reducir LPS plasmático en 40% en 2-4 semanas.',
  },
  {
    title: 'Eje HPA y Psoriasis',
    subtitle: 'Estrés, Cortisol y Brotes',
    content: 'El estrés crónico aumenta cortisol, que paradójicamente puede exacerbar Th17 y debilitar la barrera intestinal. Esto explica por qué el estrés es disparador común de brotes psoriáticos.',
    research: 'Técnicas de gestión del estrés + nutrición pueden mejorar síntomas en 50% de pacientes.',
  },
  {
    title: 'Factor Reumatoide Aumento',
    subtitle: 'Artritis Psoriásica y Permeabilidad',
    content: 'Algunos pacientes con psoriasis desarrollan artritis. Mayor riesgo si hay permeabilidad intestinal + exposición a antígenos de patógenos. Restaurar barrera es clave preventivo.',
    research: 'Intervención dietética temprana puede prevenir transición a artritis en 70% de casos.',
  },
  {
    title: 'Metabolismo de Ácidos Grasos de Cadena Corta',
    subtitle: 'Butirato y Salud de Colonocitos',
    content: 'Fibra + alimentos fermentados producen butirato, que alimenta colonocitos y fortalece la barrera. Deficiencia de butirato está asociada con mayor permeabilidad intestinal.',
    research: 'Dietas altas en fibra pueden aumentar butirato fecal en 50-100% en 3-4 semanas.',
  },
];

export const TARGETS = [
  {
    id: 'energy',
    title: 'Energía y Vitalidad',
    description: 'Mantener niveles estables de energía durante el día',
    current: 7,
    target: 9,
    metrics: [
      'Energía matutina consistente',
      'Sin caídas energéticas post-comida',
      'Resistencia mental durante el día',
    ],
  },
  {
    id: 'inflammation',
    title: 'Reducción de Inflamación',
    description: 'Disminuir marcadores inflamatorios sistémicos',
    current: 5,
    target: 2,
    metrics: [
      'Reducción de enrojecimiento/irritación',
      'Mejora de sensibilidad cutánea',
      'Menor hinchazón articular',
    ],
  },
  {
    id: 'digestion',
    title: 'Salud Digestiva',
    description: 'Mejorar función GI y barrera intestinal',
    current: 6,
    target: 9,
    metrics: [
      'Digestiones sin molestias',
      'Regularidad intestinal',
      'Ausencia de inflamación abdominal',
    ],
  },
  {
    id: 'skin',
    title: 'Salud de la Piel',
    description: 'Reducción de síntomas y mejora de recuperación',
    current: 4,
    target: 8,
    metrics: [
      'Menos placas y eritema',
      'Prurito reducido',
      'Regeneración más rápida',
    ],
  },
  {
    id: 'metabolic',
    title: 'Salud Metabólica',
    description: 'Optimizar peso, composición corporal y glucemia',
    current: 7,
    target: 9,
    metrics: [
      'Peso corporal estable',
      'Mejor composición corporal (masa muscular)',
      'Glucemia más estable',
    ],
  },
  {
    id: 'mental',
    title: 'Salud Mental y Emocional',
    description: 'Mejorar humor, claridad mental y bienestar',
    current: 6,
    target: 8,
    metrics: [
      'Claridad mental mejorada',
      'Mejor regulación emocional',
      'Menos ansiedad/depresión asociada a psoriasis',
    ],
  },
];
