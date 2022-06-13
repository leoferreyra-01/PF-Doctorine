//|> CONSULTAS ------------------------------<>
const consultas = [
  {
    ID: '0101',
    treatmentType: 'consultas',
    description: 'Examen - Diagnóstico - Fichado y Plan de Tratamiento.',
    price: 2812,
  },
  {
    ID: '0103',
    treatmentType: 'consultas',
    description: 'Visita a Domicilio.',
    price: 4178,
  },
  {
    ID: '0104',
    treatmentType: 'consultas',
    description:
      'Consulta de Urgencia que No Constituya Paso Intermedio de Tratamiento.',
    price: 3946,
  },
  {
    ID: '0105',
    treatmentType: 'consultas',
    description: 'Consulta Periódica Preventiva.',
    price: 3196,
  },
];

//|> OPERATORIA ------------------------------<>
const operatoria = [
  {
    ID: '0201',
    treatmentType: 'operatoria',
    description: 'Obturación con Amalgama Cavidad Simple.',
    price: 4844,
  },
  {
    ID: '0202',
    treatmentType: 'operatoria',
    description: 'Obturación con Amalgama Cavidad Compuesta.',
    price: 6168,
  },
  {
    ID: '0203',
    treatmentType: 'operatoria',
    description: 'Obturación con Amalgama Compleja. ',
    price: 8498,
  },
  {
    ID: '0204',
    treatmentType: 'operatoria',
    description: 'Reconstrucción de ángulos con tornillo en conducto.',
    price: 8197,
  },
  {
    ID: '0209',
    treatmentType: 'operatoria',
    description:
      'Reconstrucción de ángulos con material estético en dientes anteriores.',
    price: 7141,
  },
  {
    ID: '0215',
    treatmentType: 'operatoria',
    description: 'Restauración c/ Mat. Estético Simple en Anteriores.',
    price: 5087,
  },
  {
    ID: '0216',
    treatmentType: 'operatoria',
    description: 'Restauración c/ Mat. Estético Compuesta en Anteriores.',
    price: 6555,
  },
  {
    ID: '0217',
    treatmentType: 'operatoria',
    description: 'Restauración c/ Mat. Estético Compleja en anteriores.',
    price: 8633,
  },
  {
    ID: '0219',
    treatmentType: 'operatoria',
    description: 'Blanqueamiento externo en consultorio (por sesión).',
    price: 14413,
  },
  {
    ID: '0220',
    treatmentType: 'operatoria',
    description: 'Blanqueamiento ambulatorio.',
    price: 15049,
  },
];

//|> ENDODONCIA ------------------------------<>
const endodoncia = [
  {
    ID: '0301',
    treatmentType: 'endodoncia',
    description: 'Tratamiento Pulpar de 1 Conducto.',
    price: 10135,
  },
  {
    ID: '0302',
    treatmentType: 'endodoncia',
    description: 'Tratamiento Pulpar de 2 Conductos.',
    price: 14652,
  },
  {
    ID: '0303',
    treatmentType: 'endodoncia',
    description: 'Tratamiento Pulpar de 3 Conductos.',
    price: 17121,
  },
  {
    ID: '0304',
    treatmentType: 'endodoncia',
    description: 'Tratamiento Pulpar de 4 Conductos.',
    price: 20137,
  },
  {
    ID: '0305',
    treatmentType: 'endodoncia',
    description: 'Biopulpectomía Parcial.',
    price: 6949,
  },
  {
    ID: '0306',
    treatmentType: 'endodoncia',
    description: 'Necropulpectomía Parcial (momificación).',
    price: 5846,
  },
  {
    ID: '0307',
    treatmentType: 'endodoncia',
    description: 'Protección Pulpar Indirecta.',
    price: 4955,
  },
  /* {
    ID: '0308',
    treatmentType: 'endodoncia',
    description: 'Retratamiento conservador.',
    price: null, // sumar 50% al valor de tratamiento que corresponda
  }, */
];

//|> PROTESIS ------------------------------<>
const protesis = [
  {
    ID: '040101',
    treatmentType: 'protesis',
    description: 'Incrustación Cavidad Simple.',
    price: 14210,
  },
  {
    ID: '040102',
    treatmentType: 'protesis',
    description: 'Incrustación Cavidad Compuesta.',
    price: 18342,
  },
  {
    ID: '040103',
    treatmentType: 'protesis',
    description: 'Corona Forjada.',
    price: 10468,
  },
  {
    ID: '040104',
    treatmentType: 'protesis',
    description: 'Corona Colada.',
    price: 21694,
  },
  {
    ID: '040105',
    treatmentType: 'protesis',
    description: 'Corona Colada c/ Frente Estético de Acrílico.',
    price: 24237,
  },
  {
    ID: '040106',
    treatmentType: 'protesis',
    description: 'Corona Espiga',
    price: 22220,
  },
  {
    ID: '040108',
    treatmentType: 'protesis',
    description: 'Perno Muñon Simple.',
    price: 14964,
  },
  {
    ID: '040109',
    treatmentType: 'protesis',
    description: 'Perno Muñon Seccionado.',
    price: 18876,
  },
  {
    ID: '040110',
    treatmentType: 'protesis',
    description: 'Tramo de Puente Colado.',
    price: 16996,
  },
  {
    ID: '040111',
    treatmentType: 'protesis',
    description: 'Corona en Acrílico.',
    price: 17408,
  },
  {
    ID: '040112',
    treatmentType: 'protesis',
    description: 'Elemento Provisorio de Acrílico.',
    price: 7037,
  },
  {
    ID: '040113',
    treatmentType: 'protesis',
    description: 'Corona de Porcelana sobre metal',
    price: 30569,
  },
  {
    ID: '040114',
    treatmentType: 'protesis',
    description:
      'Tramo de puente de porcelana sobre metal por elemento a reemplazar c/u',
    price: 24168,
  },
  {
    ID: '040115',
    treatmentType: 'protesis',
    description: 'Corona de porcelana pura',
    price: 33124,
  },
  {
    ID: '040116',
    treatmentType: 'protesis',
    description: 'Tramo de puente de porcelan por elemento a reemplazar c/u',
    price: 29040,
  },
  /* {
    ID: '040117',
    treatmentType: 'protesis',
    description: 'Corona de porcelana sobre zirconio',
    price: null, // a convenir
  }, */
  /* {
    ID: '040118',
    treatmentType: 'protesis',
    description: 'Tramo de puente de porcelana sobre zirconio',
    price: null, // a convenir
  }, */
  {
    ID: '040119',
    treatmentType: 'protesis',
    description: 'Extracción de un Perno.',
    price: 11026,
  },
  {
    ID: '040120',
    treatmentType: 'protesis',
    description: 'Extracción de una Corona.',
    price: 8488,
  },
  {
    ID: '040121',
    treatmentType: 'protesis',
    description: 'Incrustación de resina',
    price: 24166,
  },
  {
    ID: '040122',
    treatmentType: 'protesis',
    description: 'Incrustación cerámica',
    price: 31618,
  },
  /* {
    ID: '040123',
    treatmentType: 'protesis',
    description: 'Carillas de porcelana',
    price: null, // a convenir
  },
  {
    ID: '040124',
    treatmentType: 'protesis',
    description: 'Carillas de resina',
    price: null, // a convenir
  }, */
  {
    ID: '040125',
    treatmentType: 'protesis',
    description: 'Perno de fibra de vidrio',
    price: 16639,
  },
  {
    ID: '040201',
    treatmentType: 'protesis',
    description: 'Prótesis parcial de acrílico hasta 5 elementos',
    price: 27767,
  },
  {
    ID: '040202',
    treatmentType: 'protesis',
    description: 'Prótesis Parcial de Acrílico.',
    price: 31368,
  },
  {
    ID: '040203',
    treatmentType: 'protesis',
    description: 'Prótesis parcial de Cromo Cobalto hasta 5 elementos',
    price: 39829,
  },
  {
    ID: '040204',
    treatmentType: 'protesis',
    description: 'Protesis Parcial Colada en Cromo Cobalto.',
    price: 48249,
  },
  {
    ID: '040205',
    treatmentType: 'protesis',
    description: 'Prótesis parcial inmediata',
    price: 28066,
  },
  {
    ID: '040206',
    treatmentType: 'protesis',
    description: 'Prótesis parcial de Nylon',
    price: 30767,
  },
  {
    ID: '040301',
    treatmentType: 'protesis',
    description: 'Prótesis Completa Acrílico Superior o Inferior.',
    price: 43686,
  },
  {
    ID: '040303',
    treatmentType: 'protesis',
    description: 'Protesis Completa Inmediata.',
    price: 43712,
  },
  {
    ID: '040304',
    treatmentType: 'protesis',
    description: 'Base Colada para Prótesis Completa.',
    price: 15327,
  },
  {
    ID: '040401',
    treatmentType: 'protesis',
    description: 'Compostura Simple.',
    price: 6178,
  },
  {
    ID: '040402',
    treatmentType: 'protesis',
    description: 'Compostura c/ Agregado de 1 Diente.',
    price: 6578,
  },
  {
    ID: '040403',
    treatmentType: 'protesis',
    description: 'Compostura c/ Agregado de 1 Retenedor.',
    price: 6306,
  },
  {
    ID: '040404',
    treatmentType: 'protesis',
    description: 'Compostura c/ Agregado de 1 Diente y 1 Retenedor.',
    price: 9076,
  },
  {
    ID: '040405',
    treatmentType: 'protesis',
    description: 'Dientes Subsiguientes: cada uno.',
    price: 3341,
  },
  {
    ID: '040406',
    treatmentType: 'protesis',
    description: 'Retenedor Subsiguiente: cada uno.',
    price: 3059,
  },
  {
    ID: '040407',
    treatmentType: 'protesis',
    description: 'Soldadura de Armazon de Cromo Cobalto c/ Agregado.',
    price: 10735,
  },

  {
    ID: '040408',
    treatmentType: 'protesis',
    description: 'Soldadura de Retenedor Subsiguiente.',
    price: 5206,
  },
  {
    ID: '040409',
    treatmentType: 'protesis',
    description: 'Carilla de Acrílico.',
    price: 5472,
  },
  {
    ID: '040410',
    treatmentType: 'protesis',
    description: 'Rebasado de Prótesis.',
    price: 8548,
  },
  {
    ID: '040411',
    treatmentType: 'protesis',
    description: 'Cubeta Individual',
    price: 4144,
  },
  {
    ID: '040412',
    treatmentType: 'protesis',
    description: 'Levante de Artic. en Acrílico y Retenedores Forjado.',
    price: 19104,
  },
];

//|> PREVENCION ------------------------------<>
const prevencion = [
  {
    ID: '0500',
    treatmentType: 'prevencion',
    description: 'Consulta Preventiva y de Relevamiento',
    price: 2840,
  },
  {
    ID: '0501',
    treatmentType: 'prevencion',
    description: 'Tartrectomía, cepillado mecánico y fisioterapia -motivación-',
    price: 4186,
  },
  {
    ID: '0502',
    treatmentType: 'prevencion',
    description: 'Topicación con Fluor por Tratamiento.',
    price: 4395,
  },
  {
    ID: '050201',
    treatmentType: 'prevencion',
    description: 'Topicación con Fluor en Embarazada.',
    price: 3931,
  },
  {
    ID: '0503',
    treatmentType: 'prevencion',
    description: 'Inactivación de Policaries Activas.',
    price: 6594,
  },
  {
    ID: '0504',
    treatmentType: 'prevencion',
    description:
      'Detección - Control de Placa Bact. y Enseñanza de Higiene Bucal.',
    price: 4013,
  },
  {
    ID: '0505',
    treatmentType: 'prevencion',
    description: 'Sellantes de Fosas y Fisuras, por Pieza.',
    price: 3791,
  },
  {
    ID: '0506',
    treatmentType: 'prevencion',
    description:
      'Protectores Bucales (NO incluido en estructura de costos CORA)',
    price: 5164,
  },
];

//|> ORTODONCIA ------------------------------<>
const ortodoncia = [
  {
    ID: '0601',
    treatmentType: 'ortodoncia',
    description: 'Consulta de Estudio.',
    price: 9451,
  },
  {
    ID: '0602',
    treatmentType: 'ortodoncia',
    description:
      'Tratam. de la Dentición Primaria/Mixta (Ortopedia).(12 meses de tratam.)', //12 meses de tratam.)
    price: 92373,
  },
  {
    ID: '0603',
    treatmentType: 'ortodoncia',
    description:
      'Tratam. de la Dentición Permanente (Ortodoncia).(12 meses de tratam.)', //(12 meses de tratam.)
    price: 179239,
  },
  {
    ID: '0604',
    treatmentType: 'ortodoncia',
    description: 'Corrección de Malposiciones Simples con Espacio.',
    price: 62334,
  },
  /* {
    ID: '0607',
    treatmentType: 'ortodoncia',
    description: 'Tratamiento de pacientes con fisura palatina',
    price: null,
  },
  {
    ID: '0608',
    treatmentType: 'ortodoncia',
    description: 'Contención (incluye consultas y aparatología)',
    price: null,
  }, */
];

//|> ODONTOPEDIATRIA ------------------------------<>
const odontopediatria = [
  {
    ID: '0701',
    treatmentType: 'odontopediatria',
    description: 'Motivación en Menores de 13 años.',
    price: 5671,
  },
  {
    ID: '0702',
    treatmentType: 'odontopediatria',
    description: 'Motivación en Personas con Discapacidad.',
    price: 12340,
  },
  {
    ID: '0703',
    treatmentType: 'odontopediatria',
    description: 'Coronas Metálicas de Acero para Dientes Primarios.',
    price: 8798,
  },
  {
    ID: '0704',
    treatmentType: 'odontopediatria',
    description: 'Mantenedor de Espacio Fijo.',
    price: 9969,
  },
  {
    ID: '0705',
    treatmentType: 'odontopediatria',
    description: 'Mantenedor de Espacio Removible.',
    price: 8680,
  },
  {
    ID: '0706',
    treatmentType: 'odontopediatria',
    description: 'Reducción de Luxación con Inmovilización Dentaria.',
    price: 14054,
  },
  {
    ID: '0707',
    treatmentType: 'odontopediatria',
    description: 'Reducción Total (reimplante) e Inmovilización Dentaria.',
    price: 17059,
  },
  {
    ID: '0708',
    treatmentType: 'odontopediatria',
    description: 'Fractura Coronaria de Esmalte.',
    price: 7213,
  },
  {
    ID: '0709',
    treatmentType: 'odontopediatria',
    description:
      'Fractura Amelodentinaria. Protección Pulpar Coronas Provisorias.',
    price: 10323,
  },
  {
    ID: '0710',
    treatmentType: 'odontopediatria',
    description: 'Tratamiento de Dientes Primarios con Formocresol.',
    price: 6135,
  },
];

//|> PERIODONCIA ------------------------------<>
const periodoncia = [
  {
    ID: '0801',
    treatmentType: 'periodoncia',
    description: 'Consulta periodontal - Diagnóstico - Pronóstico.',
    price: 4194,
  },
  {
    ID: '0802',
    treatmentType: 'periodoncia',
    description: 'Tratamiento de gingivitis marginal crónica (ambas arcadas)',
    price: 7319,
  },
  {
    ID: '0803',
    treatmentType: 'periodoncia',
    description:
      'Trat. de Periodontitis Destructiva Leve o Moderada Hasta 5mm por Sector',
    price: 5834,
  },
  {
    ID: '0804',
    treatmentType: 'periodoncia',
    description:
      'Trat. de periodontitis destructiva leve o moderada de 6mm o más por sector',
    price: 7310,
  },
  {
    ID: '0805',
    treatmentType: 'periodoncia',
    description: 'Desgaste Selectivo o Armonización Oclusal.',
    price: 10605,
  },
  {
    ID: '0806',
    treatmentType: 'periodoncia',
    description: 'Placas Oclusales (temporarias) de Acrílico Removibles.',
    price: 17807,
  },
  {
    ID: '0807',
    treatmentType: 'periodoncia',
    description: 'Gingivectomía por sector',
    price: 4752,
  },
  {
    ID: '0812',
    treatmentType: 'periodoncia',
    description: 'Tratamiento de Gingivitis por Arcada.',
    price: 4545,
  },
  {
    ID: '0813',
    treatmentType: 'periodoncia',
    description: 'Enseñanza de Técnicas de Higiene Oral en Adultos.',
    price: 4358,
  },
  {
    ID: '0814',
    treatmentType: 'periodoncia',
    description: 'Controles Post Tratamiento sin Instrumentación.',
    price: 2998,
  },
  {
    ID: '0815',
    treatmentType: 'periodoncia',
    description: 'Controles Post Tratamiento con Instrumentación.',
    price: 3062,
  },
  {
    ID: '0816',
    treatmentType: 'periodoncia',
    description: 'Raspaje y Curetaje por Elemento.',
    price: 2575,
  },
  {
    ID: '0817',
    treatmentType: 'periodoncia',
    description: 'Tratamiento Quirúrgico por Elemento.',
    price: 3062,
  },
];

//|> RADIOLOGIA ------------------------------<>
const radiologia = [
  {
    ID: '090101',
    treatmentType: 'radiologia',
    description: 'Radiografía Periapical.',
    price: 2274,
  },
  {
    ID: '090102',
    treatmentType: 'radiologia',
    description: 'Bite-Wing.',
    price: 2274,
  },
  {
    ID: '090103',
    treatmentType: 'radiologia',
    description: 'Radiografía Oclusal.',
    price: 2556,
  },
  {
    ID: '090104',
    treatmentType: 'radiologia',
    description: 'Radiografía Media Seriada hasta 7 Placas.',
    price: 5680,
  },
  {
    ID: '090105',
    treatmentType: 'radiologia',
    description: 'Radiografía Seriada Ambos Maxilares hasta 14 Placas.',
    price: 8169,
  },
  {
    ID: '090201',
    treatmentType: 'radiologia',
    description: 'Radiografía Extrabucal Primera Exposición.',
    price: 5244,
  },
  {
    ID: '090202',
    treatmentType: 'radiologia',
    description: 'Radiografía Extrabucal Subsiguientes.',
    price: 2532,
  },
  {
    ID: '090203',
    treatmentType: 'radiologia',
    description: 'Articulación Temporo-Mandibular',
    price: 13949,
  },
  {
    ID: '090204',
    treatmentType: 'radiologia',
    description: 'Pantomografía.',
    price: 6729,
  },
  {
    ID: '090205',
    treatmentType: 'radiologia',
    description: 'Teleradiografía.',
    price: 6729,
  },
  {
    ID: '090206',
    treatmentType: 'radiologia',
    description: 'Sialografía.',
    price: 6729,
  },
  /*  {
    ID: '090207',
    treatmentType: 'radiologia',
    description: 'Estudio Cefalométrico.',
    price: null, // a convenir
  },
  {
    ID: '090300',
    treatmentType: 'radiologia',
    description: 'Tomografías',
    price: null, // a convenir
  },
  {
    ID: '090301',
    treatmentType: 'radiologia',
    description: 'Tomografía computada multislice',
    price: null, // a convenir
  },
  {
    ID: '090302',
    treatmentType: 'radiologia',
    description: 'Tomografia CBCT bimaxilar',
    price: null, // a convenir
  },
  {
    ID: '090303',
    treatmentType: 'radiologia',
    description: 'Tomografía CBCT monomaxilar',
    price: null, // a convenir
  },
  {
    ID: '090304',
    treatmentType: 'radiologia',
    description: 'Tomografía CBCT sectorizada',
    price: null, // a convenir
  },
  {
    ID: '090400',
    treatmentType: 'radiologia',
    description: 'Otras técnicas de diagnóstico por imagen',
    price: null, // a convenir
  },
  {
    ID: '090401',
    treatmentType: 'radiologia',
    description: 'Resonancia magnética nuclear',
    price: null, // a convenir
  },
  {
    ID: '090402',
    treatmentType: 'radiologia',
    description: 'Ecografía de glándulas Salivales',
    price: null,
  },
  {
    ID: '090403',
    treatmentType: 'radiologia',
    description: 'Ecografía de Tejidos blandos (Ej. Piso de boca)',
    price: null,
  },
  {
    ID: '090404',
    treatmentType: 'radiologia',
    description: 'Centellografía',
    price: null,
  }, */
];

//|> CIRUGIA ------------------------------<> -TODO-
const cirugia = [
  {
    ID: '1001',
    treatmentType: 'cirugia',
    description: 'Extracción dentaria simple.',
    price: 5901,
  },
  {
    ID: '1002',
    treatmentType: 'cirugia',
    description:
      'Plástica de Comunicación Bucosinusal Inmediata a la Exodoncia.',
    price: 6770,
  },
  {
    ID: '1003',
    treatmentType: 'cirugia',
    description: 'Biopsia por Punción o Aspiración.',
    price: 6143,
  },
  {
    ID: '1004',
    treatmentType: 'cirugia',
    description: 'Alveolectomía Estabilizadora por 6 Zonas.',
    price: 6143,
  },
  {
    ID: '1005',
    treatmentType: 'cirugia',
    description: 'Reimplante Dentario Inmediato al Traumatismo.',
    price: 6613,
  },
  {
    ID: '1006',
    treatmentType: 'cirugia',
    description: 'Biopsia por Escisión.',
    price: 6613,
  },
  {
    ID: '1007',
    treatmentType: 'cirugia',
    description: 'Incisiones y drenajes de abscesos por vía bucal',
    price: 4171,
  },
  {
    ID: '1008',
    treatmentType: 'cirugia',
    description: 'Alargamiento Quirúrgico de la Corona Clínica.',
    price: 6620,
  },
  {
    ID: '1009',
    treatmentType: 'cirugia',
    description: 'Extracción de Dientes Retenidos.',
    price: 16764,
  },
  {
    ID: '100901',
    treatmentType: 'cirugia',
    description: 'Extracción de dientes con retención mucosa',
    price: 6616,
  },
  {
    ID: '1010',
    treatmentType: 'cirugia',
    description: 'Germectomía',
    price: 17444,
  },
  {
    ID: '1011',
    treatmentType: 'cirugia',
    description: 'Liberación de Dientes Retenidos.',
    price: 7225,
  },
  {
    ID: '1012',
    treatmentType: 'cirugia',
    description: 'Apicectomía',
    price: 9514,
  },
  {
    ID: '1013',
    treatmentType: 'cirugia',
    description: 'Tratamiento de Osteomielitis.',
    price: 9472,
  },
  {
    ID: '1014',
    treatmentType: 'cirugia',
    description: 'Extracción de Cuerpo Extraño.',
    price: 14912,
  },
  {
    ID: '1015',
    treatmentType: 'cirugia',
    description: 'Alveolectomia Correctiva por 6 Zonas.',
    price: 6103,
  },
  {
    ID: '1016',
    treatmentType: 'cirugia',
    description: 'Tratamiento de alveolitis',
    price: 7787,
  },
  /* {
    ID: '1017',
    treatmentType: 'cirugia',
    description: 'Tratamiento quirúrgico de hemorragia post extracción',
    price: null, // a convenir
  }, */
  {
    ID: '1018',
    treatmentType: 'cirugia',
    description: 'Extracción c/ Alveolectomia Ext. y Restos Radiculares.',
    price: 7787,
  },
  {
    ID: '1020',
    treatmentType: 'cirugia',
    description: 'Frenectomía Técnica Simple',
    price: 16125,
  },
  {
    ID: '1021',
    treatmentType: 'cirugia',
    description: 'Gingivectomía con fines protéticos por elemento',
    price: 4918,
  },
];

//|> IMPLANTOLOGIA BUCAL ------------------------------<>
const implantologiaBucal = [
  {
    ID: '1102',
    treatmentType: 'implantologiaBucal',
    description:
      'Técnica Quirúrgica Simple: colocación de 1 implante Maxilar Sup. ó Inferior.',
    price: 83848,
  },
];

//|> PRESTACIONES VARIAS ------------------------------<>
const prestacionesVarias = [
  /*  {
    ID: '1201',
    treatmentType: 'prestacionesVarias',
    description:
      'Exámenes complementarios para diagnóstico y plan de tratamiento',
    price: null,
  }, */
  {
    ID: '1202',
    treatmentType: 'prestacionesVarias',
    description: 'Toma de material para citología',
    price: 4395,
  },
  {
    ID: '1203',
    treatmentType: 'prestacionesVarias',
    description: 'Toma de material para bacteriología',
    price: 4395,
  },

  {
    ID: '1204',
    treatmentType: 'prestacionesVarias',
    description: 'Toma de material micología',
    price: 4395,
  },
  {
    ID: '1205',
    treatmentType: 'prestacionesVarias',
    description: 'Toma de material para antibiograma y prueba de sensibilidad',
    price: 4395,
  },
  /*  {
    ID: '1210',
    treatmentType: 'prestacionesVarias',
    description:
      'Asesoramiento Odontológico Legal Escrito (Se toma de la hora odontológica -H.O.-)',
    price: null, //desde 10 H.O.
  }, */
];

//|> ALL TREATMENTS ------------------------------<>
const treatments = [
  ...consultas,
  ...operatoria,
  ...endodoncia,
  ...protesis,
  ...prevencion,
  ...ortodoncia,
  ...odontopediatria,
  ...periodoncia,
  ...radiologia,
  ...cirugia,
  ...implantologiaBucal,
  ...prestacionesVarias,
];

module.exports = {
  treatments,
};
