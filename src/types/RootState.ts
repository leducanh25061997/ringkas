import { KprProgramState } from 'app/pages/BankProgram/KPRProgram/KPRProgramList/slice/types';
import { ProductState } from 'app/pages/InventoryManagement/Products/CreateProduct/slice/types';
import { ProductManagementState } from 'app/pages/InventoryManagement/Products/ProductManagement/slice/types';
import { CreateProjectState } from 'app/pages/InventoryManagement/ProjectManagement/CreateProject/slice/types';
import { ProjectState } from 'app/pages/InventoryManagement/ProjectManagement/Project/slice/types';
import { ProjectInformationState } from 'app/pages/InventoryManagement/ProjectManagement/ProjectInformation/slice/types';
import { UpdateProjectState } from 'app/pages/InventoryManagement/ProjectManagement/UpdateProject/slice/types';
import { AuthState } from 'app/pages/Login/slice/types';
import { CreateBranchBankPartner } from 'app/pages/ManageUsers/BankAccount/BranchBankPartnerManagement/CreateBranchBankAccount/slice/types';
import { CreateHqBankPartner } from 'app/pages/ManageUsers/BankAccount/HQBankPartnerManagement/CreateHqBankAccount/slice/types';
import { HQBankAccountInfoState } from 'app/pages/ManageUsers/BankAccount/HQBankPartnerManagement/HQBankAccountInformation/slice/types';
import { ManageBankState } from 'app/pages/ManageUsers/BankAccount/slice/types';
import { ScoringReadyState } from 'app/pages/ManageUsers/CustomerAccount/ScoringReady/slice/types';
import { ManageCustomerState } from 'app/pages/ManageUsers/CustomerAccount/slice/types';
import { CustomerUpdateState } from 'app/pages/ManageUsers/CustomerAccountEdit/slice/types';
import { DeveloperAccountCreateState } from 'app/pages/ManageUsers/DeveloperAccount/DeveloperAccountCreate/slice/types';
import { DeveloperAccountEditState } from 'app/pages/ManageUsers/DeveloperAccount/DeveloperAccountEdit/slice/types';
import { DeveloperAccountInfoState } from 'app/pages/ManageUsers/DeveloperAccount/DeveloperAccountInformation/slice/types';
import { DeveloperAccountState } from 'app/pages/ManageUsers/DeveloperAccount/DeveloperAccountManagement/slice/types';
import { CreatePartnerAccountState } from 'app/pages/ManageUsers/PartnerAccount/CreatePartnerAccount/slice/types';
import { ManagePartnerState } from 'app/pages/ManageUsers/PartnerAccount/PartnerAccountManagement/slice/types';
import { PartnerDataVerifyState } from 'app/pages/ManageUsers/PartnerAccount/PartnerDataVerification/slice/types';
import { signUpState } from 'app/pages/Register/slice/types';
import { MediaState } from '../app/pages/InventoryManagement/ImageAndVideo/slice/types';
import { PartnerInformationDetailState } from '../app/pages/ManageUsers/PartnerInfomation/Component/types';

import { SlikDetailsState } from 'app/pages/ManageUsers/CustomerAccount/CustomerInformation/SlikDetails/slice/types';
import { EmployeeAccountState } from 'app/pages/ManageUsers/EmployeeAccount/Developer/slice/types';
import { RegisterNewClientState } from 'app/pages/ManageUsers/PartnerAccount/RegisterNewClient/slice/types';
import { RegisterBankHQState } from 'app/pages/ManageUsers/BankAccount/HQBankPartnerManagement/RegisterBankHQ/slice/types';
import { RegisterNewDeveloperState } from 'app/pages/ManageUsers/DeveloperAccount/RegisterNewDeveloper/slice/types';
import { BankTaskState } from 'app/pages/ManageUsers/BankAccount/BankTasks/Task/slice/type';
import { HistoryLogsState } from '../app/pages/ManageUsers/CustomerAccount/CustomerInformation/CustomerDetails/HistoryLog/slice/types';
import { PartnerDetailsState } from 'app/pages/ManageUsers/PartnerAccount/PartnerDetails/slice/types';
import { KprState } from '../app/pages/ManageUsers/CustomerAccount/KprRegister/slice/types';

/*
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  kprInformation: KprState;
  auth?: AuthState;
  manageCustomer: ManageCustomerState;
  manageBank: ManageBankState;
  developerAccountManagement?: DeveloperAccountState;
  developerAccountInfo?: DeveloperAccountInfoState;
  developerAccountCreate?: DeveloperAccountCreateState;
  signUp?: signUpState;
  editDevelopAccount: DeveloperAccountEditState;
  createProject: CreateProjectState;
  updateProject: UpdateProjectState;
  customerAccountUpdate: CustomerUpdateState;
  projectManagement: ProjectState;
  productManagement: ProductManagementState;
  productState: ProductState;
  createHqBankPartner: CreateHqBankPartner;
  hqBankAccount: HQBankAccountInfoState;
  projectInformation: ProjectInformationState;
  uploadMedia: MediaState;
  createBranchBankPartner: CreateBranchBankPartner;
  partnerAccountManagement?: ManagePartnerState;
  partnerInformationDetail?: PartnerInformationDetailState;
  createPartnerAccount?: CreatePartnerAccountState;
  // customerInformation: CustomerManagementState;
  scoringReady: ScoringReadyState;
  partnerDataVerification: PartnerDataVerifyState;
  KprProgramManagement: KprProgramState;
  bankTask: BankTaskState;
  slikDetails: SlikDetailsState;
  historyLogs: HistoryLogsState;
  employeeAccountManagement?: EmployeeAccountState;
  registerNewClient?: RegisterNewClientState;
  registerBankHQ?: RegisterBankHQState;
  registerNewDeveloper?: RegisterNewDeveloperState;
  partnerDetails?: PartnerDetailsState;
}
