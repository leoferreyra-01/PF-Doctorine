//|> CONSULTAS ------------------------------<>
const consultas = [
  {
    ID: '0101',
    treatmentType: 'consultas',
    description: 'Examen - Diagnóstico - Fichado y Plan de Tratamiento.',
    price: 1170,
  },
  {
    ID: '0103',
    treatmentType: 'consultas',
    description: 'Visita a Domicilio.',
    price: 1950,
  },
  {
    ID: '0104',
    treatmentType: 'consultas',
    description:
      'Consulta de Urgencia que No Constituya Paso Intermedio de Tratamiento.',
    price: 1560,
  },
  {
    ID: '0105',
    treatmentType: 'consultas',
    description: 'Consulta Periódica Preventiva.',
    price: 1560,
  },
];

//|> OPERATORIA ------------------------------<>
const operatoria = [
  {
    ID: '0201',
    treatmentType: 'operatoria',
    description: 'Obturación con Amalgama Cavidad Simple.',
    price: 1950,
  },
  {
    ID: '0202',
    treatmentType: 'operatoria',
    description: 'Obturación con Amalgama Cavidad Compuesta.',
    price: 2340,
  },
  {
    ID: '0203',
    treatmentType: 'operatoria',
    description: 'Obturación con Amalgama Compleja. ',
    price: 3120,
  },
  {
    ID: '0204',
    treatmentType: 'operatoria',
    description: 'Reconstrucción de ángulos con tornillo en conducto.',
    price: 3120,
  },
  {
    ID: '0209',
    treatmentType: 'operatoria',
    description:
      'Reconstrucción de ángulos con material estético en dientes anteriores.',
    price: 2535,
  },
  {
    ID: '0215',
    treatmentType: 'operatoria',
    description: 'Restauración c/ Mat. Estético Simple en Anteriores.',
    price: 1950,
  },
  {
    ID: '0216',
    treatmentType: 'operatoria',
    description: 'Restauración c/ Mat. Estético Compuesta en Anteriores.',
    price: 2340,
  },
  {
    ID: '0217',
    treatmentType: 'operatoria',
    description: 'Restauración c/ Mat. Estético Compleja en anteriores.',
    price: 3120,
  },
  {
    ID: '0219',
    treatmentType: 'operatoria',
    description: 'Blanqueamiento externo en consultorio (por sesión).',
    price: 3900,
  },
  {
    ID: '0220',
    treatmentType: 'operatoria',
    description: 'Blanqueamiento ambulatorio.',
    price: 3120,
  },
];

//|> ENDODONCIA ------------------------------<>
const endodoncia = [
  {
    ID: '0301',
    treatmentType: 'endodoncia',
    description: 'Tratamiento Pulpar de 1 Conducto.',
    price: 3120,
  },
  {
    ID: '0302',
    treatmentType: 'endodoncia',
    description: 'Tratamiento Pulpar de 2 Conductos.',
    price: 4095,
  },
  {
    ID: '0303',
    treatmentType: 'endodoncia',
    description: 'Tratamiento Pulpar de 3 Conductos.',
    price: 4680,
  },
  {
    ID: '0304',
    treatmentType: 'endodoncia',
    description: 'Tratamiento Pulpar de 4 Conductos.',
    price: 5850,
  },
  {
    ID: '0305',
    treatmentType: 'endodoncia',
    description: 'Biopulpectomía Parcial.',
    price: 2535,
  },
  {
    ID: '0306',
    treatmentType: 'endodoncia',
    description: 'Necropulpectomía Parcial (momificación).',
    price: 2145,
  },
  {
    ID: '0307',
    treatmentType: 'endodoncia',
    description: 'Protección Pulpar Indirecta.',
    price: 4955,
  },
  {
    ID: '0308',
    treatmentType: 'endodoncia',
    description: 'Retratamiento conservador.',
    price: null,
  },
];

//|> PROTESIS ------------------------------<> -TODO-
const protesis = [
  {
    ID: '04',
    treatmentType: 'protesis',
    description: '',
    price: null,
  },
];

//|> PREVENCION ------------------------------<> -TODO-
const prevencion = [
  {
    ID: '05',
    treatmentType: 'prevencion',
    description: '',
    price: null,
  },
];

//|> ORTODONCIA ------------------------------<> -TODO-
const ortodoncia = [
  {
    ID: '06',
    treatmentType: 'ortodoncia',
    description: '',
    price: null,
  },
];

//|> ODONTOPEDIATRIA ------------------------------<> -TODO-
const odontopediatria = [
  {
    ID: '07',
    treatmentType: 'odontopediatria',
    description: '',
    price: null,
  },
];

//|> PERIODONCIA ------------------------------<> -TODO-
const periodoncia = [
  {
    ID: '08',
    treatmentType: 'periodoncia',
    description: '',
    price: null,
  },
];

//|> RADIOLOGIA ------------------------------<> -TODO-
const radiologia = [
  {
    ID: '09',
    treatmentType: 'radiologia',
    description: '',
    price: null,
  },
];

//|> CIRUGIA ------------------------------<> -TODO-
const cirugia = [
  {
    ID: '10',
    treatmentType: 'cirugia',
    description: '',
    price: null,
  },
];

//|> IMPLANTOLOGIA BUCAL ------------------------------<> -TODO-
const implantologiaBucal = [
  {
    ID: '11',
    treatmentType: 'implantologiaBucal',
    description: '',
    price: null,
  },
];

//|> PRESTACIONES VARIAS ------------------------------<> -TODO-
const prestacionesVarias = [
  {
    ID: '12',
    treatmentType: 'prestacionesVarias',
    description: '',
    price: null,
  },
];

//|> ALL TREATMENTS ------------------------------<>
const treatments = [
  ...consultas,
  ...operatoria,
  ...endodoncia,
  // ...protesis,
  // ...prevencion,
  // ...ortodoncia,
  // ...odontopediatria,
  // ...periodoncia,
  // ...radiologia,
  // ...cirugia,
  // ...implantologiaBucal,
  // ...prestacionesVarias,
];

module.exports = {
  treatments,
};
