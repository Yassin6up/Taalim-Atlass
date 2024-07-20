// this file holds possible values for entries
const EduLevel = [
  'BAC1', 'BAC2', 'BAC_PLUS_1', 'BAC_PLUS_2', 'BAC_PLUS_3',
  'BAC_PLUS_4', 'BAC_PLUS_5', 'BAC_PLUS_6', 'DOCTORANT', 'AUTRES'
];

const BacFiliere = [
  'SCIENCES_MATH_A', 'SCIENCES_MATH_B', 'SCIENCES_PHYSIQUE', 'SVT',
  'SCIENCES_ET_TECHNOLOGIES_ELECTRIQUES', 'SCIENCES_ET_TECHNOLOGIES_MECA',
  'SCIENCES_ECONOMIQUE', 'SCIENCES_GESTION_COMPTABLE', 'AUTRE_FILIERE_DU_BAC',
  'SCIENCES_AGRONOMIQUES', 'LETTRES', 'SCIENCES_HUMAINES', 'SCIENCES_DE_LA_CHARIAA',
  'ARTS_APPLIQUES'
];

const BacLangue = ['BIOF', 'ARABE'];

const FundingType = ['Public', 'Private', 'Both'];

const Services = ['inscription', 'orientation'];

const BudgetPerMonth = ['LT_5000', 'BW_5000_10000', 'GT_10000'];


module.exports = {
  EduLevel,
  BacFiliere,
  BacLangue,
  FundingType,
  Services,
  BudgetPerMonth
};
