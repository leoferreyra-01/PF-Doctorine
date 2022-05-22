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
    },
    b_pregnant: {
      type: DataTypes.BOOLEAN,
    },
    b_takeMedicine: {
      type: DataTypes.BOOLEAN,
    },
    b_sufferedFromIllness: {
      type: DataTypes.BOOLEAN,
    },
    b_alergicToMedicine: {
      type: DataTypes.BOOLEAN,
    },
    b_normalWoundHealing: {
      type: DataTypes.BOOLEAN,
    },
    b_other: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    // INFECTION, CARDIOVASCULAR
    ic_anginaPectoris: {
      type: DataTypes.BOOLEAN,
    },
    ic_myocardialInfarction: {
      type: DataTypes.BOOLEAN,
    },
    ic_hypertension: {
      type: DataTypes.BOOLEAN,
    },
    ic_vascularAffections: {
      type: DataTypes.BOOLEAN,
    },
    ic_other: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    // INFECTION, HEMATOLOGICAL
    ih_anemia: {
      type: DataTypes.BOOLEAN,
    },
    ih_leukemia: {
      type: DataTypes.BOOLEAN,
    },
    ih_haemophilia: {
      type: DataTypes.BOOLEAN,
    },
    ih_alterationWhiteSerie: {
      type: DataTypes.BOOLEAN,
    },
    ih_other: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    // INFECTION, RESPIRATORY
    ir_asthma: {
      type: DataTypes.BOOLEAN,
    },
    ir_pulmonaryEdema: {
      type: DataTypes.BOOLEAN,
    },
    ir_ephysemia: {
      type: DataTypes.BOOLEAN,
    },
    ir_tuberculosis: {
      type: DataTypes.BOOLEAN,
    },
    ir_chronicBronchitis: {
      type: DataTypes.BOOLEAN,
    },
    ir_other: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    // INFECTION, GASTROINTESTINAL
    ig_ulcer: {
      type: DataTypes.BOOLEAN,
    },
    ig_hepatitis: {
      type: DataTypes.BOOLEAN,
    },
    ig_cirrohsis: {
      type: DataTypes.BOOLEAN,
    },
    ig_other: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    // INFECTION, NERVOUS
    in_epilepsy: {
      type: DataTypes.BOOLEAN,
    },
    in_useOfTranquilizers: {
      type: DataTypes.BOOLEAN,
    },
    in_seizures: {
      type: DataTypes.BOOLEAN,
    },
    in_other: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    // INFECTION, BONES
    ib_osteoporosis: {
      type: DataTypes.BOOLEAN,
    },
    ib_paget: {
      type: DataTypes.BOOLEAN,
    },
    ib_rickets: {
      type: DataTypes.BOOLEAN,
    },
    ib_osteomalacia: {
      type: DataTypes.BOOLEAN,
    },
    ib_other: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  });
};
