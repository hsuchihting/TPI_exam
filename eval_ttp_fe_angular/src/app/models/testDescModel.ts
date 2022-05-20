export interface testDescRes {
  tdContent: string;
  tbContentList: TbContent[];
  // 自訂義屬性
  tdIntroArr?: string[];
}

export interface TbContent {
  testsTypeName: string;
  testTime: string;
  isFinished: string;
}
