const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('ClinicalHistory', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    a_smoker: {
      type: DataTypes.BOOLEAN,
    },
    a_useDrugs: {
      type: DataTypes.BOOLEAN,
    },
    a_pregnant: {
      type: DataTypes.BOOLEAN,
    },
    a_takeMedicine: {
      type: DataTypes.BOOLEAN,
    },
    a_sufferedFromIllness: {
      type: DataTypes.BOOLEAN,
    },
    a_alergicToMedicine: {
      type: DataTypes.BOOLEAN,
    },
    a_normalWoundHealing: {
      type: DataTypes.BOOLEAN,
    },
    a_other: {
      type: DataTypes.STRING,
    },
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
    ic_others: {
      type: DataTypes.STRING,
    },
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
    ih_others: {
      type: DataTypes.STRING,
    },
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
    ir_others: {
      type: DataTypes.STRING,
    },
    ig_ulcer: {
      type: DataTypes.BOOLEAN,
    },
    ig_hepatitis: {
      type: DataTypes.BOOLEAN,
    },
    ig_cirrohsis: {
      type: DataTypes.BOOLEAN,
    },
    ig_others: {
      type: DataTypes.STRING,
    },
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
    },
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
    },
  });
};
