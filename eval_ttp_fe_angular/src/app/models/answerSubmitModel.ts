
export interface AnswerSubmitReq {
  testsSeq: string;
  isAutoSubmit: string;
  answerList: answer[];
}

export interface answer {
  quSeq: string;
  testsQuType: string;
  isEmpty: string;
  answer: string;
  file?: File;
}

export interface AnswerSubmitRes {
  isFinished: string;
}
