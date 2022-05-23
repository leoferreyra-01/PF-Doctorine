const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('ClinicalHistory', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // BACKGROUND
    b_smoker: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    b_useDrugs: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    b_pregnant: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    b_takeMedicine: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    b_sufferedFromIllness: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    b_alergicToMedicine: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    b_normalWoundHealing: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    b_other: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    // INFECTION, CARDIOVASCULAR
    ic_anginaPectoris: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ic_myocardialInfarction: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ic_hypertension: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ic_vascularAffections: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ic_other: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    // INFECTION, HEMATOLOGICAL
    ih_anemia: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ih_leukemia: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ih_haemophilia: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ih_alterationWhiteSerie: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ih_other: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    // INFECTION, RESPIRATORY
    ir_asthma: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ir_pulmonaryEdema: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ir_ephysemia: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ir_tuberculosis: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ir_chronicBronchitis: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ir_other: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    // INFECTION, GASTROINTESTINAL
    ig_ulcer: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ig_hepatitis: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ig_cirrohsis: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ig_other: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    // INFECTION, NERVOUS
    in_epilepsy: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    in_useOfTranquilizers: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    in_seizures: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    in_other: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    // INFECTION, BONES
    ib_osteoporosis: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ib_paget: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ib_rickets: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ib_osteomalacia: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ib_other: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  });
};
