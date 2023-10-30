const path = {
  root: '/',
  all: '*',
  inventoryManagement: '/inventory-management',

  // login routes
  login: '/login',

  // register routes
  setPassword: '/set-password',
  updatePassword: '/update-password',
  changePassword: '/change-password',
  checkResetLink: '/check-reset-link',
  register: '/sign-up',
  registerDeveloper: '/sign-up/developer',
  registerHeadquarterBank: '/sign-up/bank/headquarter',
  registerBranchBank: '/sign-up/bank/branch',
  registerAgen: '/sign-up/agen',
  registerPartner: '/sign-up/partner',
  successfulAccountRegistration: '/sign-up/developer/successful',

  // inventory management
  // project routes
  project: '/inventory-management/project',
  projectList: '/inventory-management/project',
  createProject: '/inventory-management/project/create',
  detailProject: '/inventory-management/project/:id',
  updateProject: '/inventory-management/project/update/:id',
  updateProjectTask: '/inventory-management/project/task/update/:id',
  // product routes
  product: '/inventory-management/products',
  productList: '/inventory-management/products',
  createProduct: '/inventory-management/products/create',
  productInformation: '/inventory-management/products/:id',
  updateProduct: '/inventory-management/products/update/:id',
  productBulkUpload: '/inventory-management/products/bulk-upload',

  // image and video
  imgAndVideoList: '/inventory-management/image-and-video',

  //manageUser routes
  manageUsers: '/manage-users',

  // customer routes
  customerAccountList: '/manage-users/customer',
  createCustomerAccount: '/manage-users/customer/create',
  detailCustomer: '/manage-users/customer/:id',
  detailCustomerSlik: '/manage-users/customer/:id/slik',
  verifyCustomer: '/manage-users/customer/kyc-verification/:id',
  customerScoringReady: '/manage-users/customer/scoring-verification/:id',
  updateCustomerAccount: '/manage-users/customer/edit/:id',

  // partner
  partnerAccountList: '/manage-users/partner',
  partnerAccountInformation: '/manage-users/partner/:id',
  createPartnerAccount: '/manage-users/partner/create',
  updatePartnerAccount: '/manage-users/partner/edit/:id',
  partnerDataVerification: '/manage-users/partner/verification/:id',

  // partner registration
  registerNewPartnerClient: '/manage-users/partner/client/register',
  registerNewPartnerBankHq: '/manage-users/partner/bankHq/register',
  registerNewPartnerAgent: '/manage-users/partner/agent/register',
  registerNewPartnerDeveloper: '/manage-users/partner/developer/register',

  // bank
  detailBankAccount: '/manage-users/bank/:id',
  updateBankBranchAccount: '/manage-users/bank-branch/edit/:id',
  createHqBankAccount: '/manage-users/bank/hq-bank-account/create',
  updateHQBankAccount: '/manage-users/bank/hq-bank-account/edit/:id',
  hqBankAccountInformation: '/manage-users/bank/hq-bank-account/:id',
  hqBankAccountList: '/manage-users/bank/hq-bank-account',
  branchBankAccountList: '/manage-users/bank-branch',
  createBranchBankAccount: '/manage-users/bank/branch-bank-account/create',
  bankAccountList: '/manage-users/bank',
  bankTasks: '/manage-users/bank/workspace/:id',

  // developer
  developerAccountList: '/manage-users/developer',
  detailDeveloperAccount: '/manage-users/developer/:id',
  developerAccountEdit: '/manage-users/developer/edit/:id',
  createDeveloper: '/manage-users/developer/create',
  developerTasks: '/manage-user/developer/workspace/:id',

  // agent
  agentAccountList: '/manage-users/agent',
  detailAgentAccount: '/manage-users/agent/:id',
  agentAccountEdit: '/manage-users/agent/edit/:id',

  // bank program
  bankProgram: '/bank-program',
  createKprProgram: '/bank-program/kpr-program/create',
  kprProgram: '/bank-program/kpr-program',
  kprRequirement: '/bank-program/kpr-requirement',
  kprDetail: '/bank-program/kpr-detail',

  // employee account
  employeeAccountList: '/manage-users/employee',
  createEmployeeAccount: '/manage-users/employee/create',
  detailEmployeeAccount: '/manage-users/employee/:id',
  updateEmployeeAccount: '/manage-users/employee/edit/:id',

  employeeAccountListByAdmin: '/manage-users/employee-admin',
  createEmployeeAccountByAdmin: '/manage-users/employee-admin/create',
  detailEmployeeAccountByAdmin: '/manage-users/employee-admin/:id',
  updateEmployeeAccountByAdmin: '/manage-users/employee-admin/edit/:id',

  // manageAdmin routes
  manageAdmin: 'manage-admin',

  // kpr register
  kprRegister: '/manage-users/customer/kpr-register/:id',

  // not found page
  notFound: '/404',
};

export const permissionPathConfig = {
  [path.project]: 'PROJECT_VIEW',
  [path.projectList]: 'PROJECT_READ_LIST',
  [path.createProject]: 'PROJECT_CREATE',
  [path.detailProject]: 'PROJECT_READ_DETAIL',
  [path.updateProject]: 'PROJECT_UPDATE',
  [path.updateProjectTask]: 'PROJECT_UPDATE',
  [path.imgAndVideoList]: 'PROJECT_VIEW',

  [path.product]: 'PRODUCT_VIEW',
  [path.productList]: 'PRODUCT_READ_LIST',
  [path.productInformation]: 'PRODUCT_READ_DETAIL',
  [path.updateProduct]: 'PRODUCT_UPDATE',
  [path.createProduct]: 'PRODUCT_CREATE',
  [path.productBulkUpload]: 'PRODUCT_UPDATE',

  [path.customerAccountList]: 'CUSTOMER_READ_LIST',
  [path.detailCustomer]: 'CUSTOMER_READ_DETAIL',
  [path.createCustomerAccount]: 'CUSTOMER_CREATE',
  [path.updateCustomerAccount]: 'CUSTOMER_UPDATE',
  [path.verifyCustomer]: 'CUSTOMER_UPDATE',
  [path.customerScoringReady]: 'CUSTOMER_UPDATE',
  [path.detailCustomerSlik]: 'PRE_KPR_READ_DETAIL',

  [path.developerAccountList]: 'DEVELOPER_READ_LIST',
  [path.detailDeveloperAccount]: 'DEVELOPER_READ_DETAIL',
  [path.developerAccountEdit]: 'DEVELOPER_UPDATE',
  [path.createDeveloper]: 'DEVELOPER_CREATE',
  [path.registerNewPartnerDeveloper]: 'DEVELOPER_CREATE',
  [path.developerTasks]: 'CUSTOMER_UPDATE',

  [path.bankAccountList]: 'BANK_READ_LIST',
  [path.createHqBankAccount]: 'BANK_CREATE',
  [path.registerNewPartnerBankHq]: 'BANK_CREATE',
  [path.createBranchBankAccount]: 'BANK_CREATE',
  [path.updateHQBankAccount]: 'BANK_UPDATE',
  [path.updateBankBranchAccount]: 'BANK_UPDATE',
  [path.hqBankAccountInformation]: 'BANK_READ_DETAIL',
  [path.detailBankAccount]: 'BANK_READ_DETAIL',
  [path.bankTasks]: 'CUSTOMER_UPDATE',

  [path.partnerAccountList]: 'PARTNER_READ_LIST',
  [path.partnerAccountInformation]: 'PARTNER_READ_DETAIL',
  [path.createPartnerAccount]: 'PARTNER_CREATE',
  [path.registerNewPartnerClient]: 'PARTNER_CREATE',
  [path.updatePartnerAccount]: 'PARTNER_UPDATE',
  [path.partnerDataVerification]: 'PARTNER_CREATE',

  [path.kprProgram]: 'LOAN_PROGRAM_READ_LIST',
  [path.kprRegister]: 'CUSTOMER_UPDATE',
  [path.createKprProgram]: 'LOAN_PROGRAM_CREATE',
  [path.kprDetail]: 'LOAN_PROGRAM_READ_DETAIL',
  [path.kprRequirement]: 'LOAN_PROGRAM_UPDATE',

  [path.employeeAccountList]: 'EMPLOYEE_READ_LIST',
  [path.createEmployeeAccount]: 'EMPLOYEE_CREATE',
  [path.detailEmployeeAccount]: 'EMPLOYEE_READ_DETAIL',
  [path.updateEmployeeAccount]: 'EMPLOYEE_UPDATE',
  [path.employeeAccountListByAdmin]: 'EMPLOYEE_READ_LIST',
  [path.createEmployeeAccountByAdmin]: 'EMPLOYEE_CREATE',
  [path.detailEmployeeAccountByAdmin]: 'EMPLOYEE_READ_DETAIL',
  [path.updateEmployeeAccountByAdmin]: 'EMPLOYEE_UPDATE',
};

export default path;
