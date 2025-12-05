// src/types/navigation.ts
export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  CodeEntry: undefined;
};

export type AdminTabParamList = {
  Benefits: undefined;
  Employees: undefined;
  Company: undefined;
};

export type EmployeeTabParamList = {
  EmployeeBenefits: undefined;
  EmployeeRecommendation: undefined;
  EmployeeVouchers: undefined;
};

export type AppStackParamList = {
  Help: undefined;
  AdminTabs: undefined;
  EmployeeTabs: undefined;
  EmployeeDetail: { employeeId: number };
  BenefitDetail: { benefitType: string };
};