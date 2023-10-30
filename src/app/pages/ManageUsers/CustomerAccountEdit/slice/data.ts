export interface Type {
  name: string;
  value: string;
}
export const gender: Type[] = [
  { name: 'Male', value: 'MALE' },
  { name: 'Female', value: 'FEMALE' },
];

export const maritalStatus: Type[] = [
  { name: 'Single', value: 'SINGLE' },
  { name: 'Married', value: 'MARRIED' },
  { name: 'Divorced', value: 'DIVORCED' },
];
export const education: Type[] = [
  { name: 'School', value: 'SCHOOL' },
  { name: 'Diploma', value: 'DIPLOMA' },
  { name: 'Bachelor Degree', value: 'BACHELOR_DEGREE' },
  { name: 'Master Degree', value: 'MASTER_DEGREE' },
  { name: 'Doctoral Degree', value: 'DOCTORAL_DEGREE' },
];
export const idCard: Type[] = [
  { name: 'Id Card', value: 'ID_CARD' },
  { name: 'Family Card', value: 'FAMILY_CARD' },
  { name: 'Driver License', value: 'DRIVER_LICENSE' },
  { name: 'Passport', value: 'PASSPORT' },
];
export const homeOwnershipStatus: Type[] = [
  { name: 'Owner', value: 'OWNER' },
  { name: 'Rent', value: 'RENT' },
];

export const employmentType: Type[] = [
  { name: 'Employee', value: 'EMPLOYEE' },
  { name: 'Entrepreneur', value: 'ENTREPRENEUR' },
  { name: 'Professional', value: 'PROFESSIONAL' },
  { name: 'Others', value: 'OTHERS' },
];
export const businessOwnershipType: Type[] = [
  { name: 'Sole Proprietorship', value: 'SOLE_PROPRIETORSHIP' },
  { name: 'Partnership', value: 'PARTNERSHIP' },
  { name: 'Limited Liability Company', value: 'LIMITED_LIABILITY_COMPANY' },
];
export const duration: Type[] = [
  { name: 'Below 6 Months', value: 'BELOW_6_MONTHS' },
  { name: '6 to 12 Months', value: '6_TO_12_MONTHS' },
  { name: '1 to 2 Years', value: '1_TO_2_YEARS' },
  { name: '2 to 5 Years', value: '2_TO_5_YEARS' },
  { name: '5 to 10 Years', value: '5_TO_10_YEARS' },
  { name: 'Above 10 Years', value: 'ABOVE_10_YEARS' },
];
export const businessSector: Type[] = [
  { name: 'Agriculture Business', value: 'AGRICULTURE_BUSINESS' },
  {
    name: 'Raw Material Production Business',
    value: 'RAW_MATERIAL_PRODUCTION_BUSINESS',
  },
  { name: 'Manufacturing Business', value: 'MANUFACTURING_BUSINESS' },
  { name: 'Constructions Business', value: 'CONSTRUCTIONS_BUSINESS' },
  { name: 'Transportation Business', value: 'TRANSPORTATION_BUSINESS' },
  { name: 'Communication Business', value: 'COMMUNICATION_BUSINESS' },
  {
    name: 'Information Technology or Digital Products Business',
    value: 'INFORMATION_TECHNOLOGY_OR_DIGITAL_PRODUCTS_BUSINESS',
  },
  { name: 'Small Medium Enterprise', value: 'SMALL_MEDIUM_ENTERPRISE' },
  { name: 'Financial Business', value: 'FINANCIAL_BUSINESS' },
  { name: 'Service Type of Business', value: 'SERVICE_TYPE_OF_BUSINESS' },
  { name: 'Others', value: 'OTHERS' },
];

export const ProductType: Type[] = [
  { name: 'Revolving Credit', value: 'REVOLVING_CREDIT' },
  { name: 'Charged Credit', value: 'CHARGED_CREDIT' },
  { name: 'Installment', value: 'INSTALLMENT' },
  { name: 'None Installment', value: 'NON_INSTALLMENT' },
];
