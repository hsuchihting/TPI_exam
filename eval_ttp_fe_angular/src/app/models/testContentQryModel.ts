export interface TestContentQryRes {
  testsSeq: string;
  testTime: string;
  subjectTilte: string;
  quSumQty: string;
  remindTime: string;
  quList: Question[];
}

export interface Question {
  testsQuType: string;
  qty: string;
  quInfoList: QuestionInfo[];
}

export interface QuestionInfo {
  index: string;
  quSeq: string;
  quDesc: string;
  quImg: string;
  testsQuType: string;
  optionsList?: Options[];
}

export interface Options {
  optionsSeq: string;
  optionsDesc: string;
  optionsImg: string;
  value: boolean;
}
