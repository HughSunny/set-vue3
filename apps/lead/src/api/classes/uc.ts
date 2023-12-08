export interface IUser {
  Id: number;
  UserCode: string;
  UserName: string;
  EmployeeNumber: string;
  EmployeeName: string;
  Enabled: boolean;
  Assignable: boolean;
  UserDesc: string;
  GroupId: number;
  GroupCode: string;
  GroupName: string;
  OrgId: number;
  OrgCode: string;
  OrgName: string;
  Post: string;
  MobileNo: string;
  MailAddress: string;
  WatchAddress: string;
  TelNo: string;
  UserTheme: string;
}

export interface IApp {
  Id: number;
  AppName: string;
  AppCode: string;
  AppDesc: string;
}

export interface IMenu {
  Id: number;
  ParentId: number;
  AppId: number;
  Name: string;
  PageType: string;
  Description: string;
  Remark: string;
  Icon: string;
  Sort: number;
  IsPage: boolean;
  ResponsiblePeo: string;
  IsUsed: boolean;
  RoleId: number;
  Creator: string;
}

export class IRole {
  Id: number;
  Creator: string;
  Modifier: string;
  RoleName: string;
  RoleCode: string;
  RoleDesc: string;
  Status: boolean;
  IsHeres: boolean;
  ParentId: number;
  AppId: number;
  Remark: string;
  Assignable: boolean;
}

export class IWorker {
  Id: number;
  WorkerId: number;
  WorkerName: string;
  WorkerCode: string;
  WorkerGrade: string;
  OpUserId: string;
}
