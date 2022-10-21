export interface ProvinceModel {
  pK_SyPr: string;
  name_Th: string;
  name_En: string;
  code: number;
}


export interface AmphureModel {
  pK_SyAm: string;
  cK_SyPr: string;
  name_Th: string;
  name_En: string;
  code: number;
}

export interface DistrictModel {
  pK_SyDi: string;
  cK_SyAm: string;
  name_Th: string;
  name_En: string;
  code: number;
}