import { MessageService } from './../message.service';
import { answer } from './../../../models/answerSubmitModel';
import { Injectable, OnDestroy } from '@angular/core';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { CounterTimeService } from 'src/app/common/services/counter-time.service';
import { ExamService } from '../exam.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TimeUpModel } from 'src/app/models/timeUpModel';
import { QuestionInfo } from 'src/app/models/testContentQryModel';
import { ModalService } from 'src/app/common/components/modal/modal.service';
import { FileUploadModel, UpdateErrorModel } from 'src/app/models/file-upload';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestViewModel extends BaseViewModel {
  subscription: Subscription = new Subscription();
  testForm!: FormGroup;
  isFinished: string = '';
  isTimeout!: boolean;
  answer: answer[] = [];
  time: TimeUpModel = {
    total: 0,
    hours: '0',
    minutes: '0',
    seconds: '0',
  };
  reminderTime!: number;

  title: string = '';
  testArr: QuestionInfo[] = [];
  start = 0;
  end = 10;
  page = 1;
  pageSize = 10;
  totalPage = 0;
  quSumQty = 0;
  count = 0;
  paramId!: string;
  requiredArr: boolean[] = [];
  lengthError: boolean[] = [];
  shortAnswer: string[] = [];
  fileArr: string[] = [];
  testsSeq: string = '';
  isEmpty!: string;
  answers!: string;
  optionsArr: string[] = [];
  sizeError: boolean[] = [];
  optionsSeqArr: string[] = [];
  uploadFiles: File[] = [];

  isTimeStart = false;
  constructor(
    private examService: ExamService,
    private counterTimeService: CounterTimeService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private msgService: MessageService
  ) {
    super();
  }

  init(): void {
    this.getTestContent();

    this.subscription.add(
      //監聽sendTest事件（有題目未作答送出）
      this.modalService.sendTest.subscribe(() => {
      this.getAnswer();
      this.answerSubmit();
    })
    );

    this.subscription.add(
      //傳送 timeout 值顯示彈窗
      this.msgService.messageEvent.subscribe((msg: any) => {
      this.isTimeout = msg;
    })
    );
  }

  destroy() {
    //this.subscription.unsubscribe();
    // this.counterTimeService.updateTime.unsubscribe();
    this.counterTimeService.clearTime();
    // this.modalService.sendTest.unsubscribe();
  }

  //清除上一份試卷內容
  clearTestContent(){
    this.testArr.length = 0;
    this.testArr = [];
    this.requiredArr.length = 0;
    this.requiredArr = [];
    this.lengthError.length = 0;
    this.lengthError = [];
    this.shortAnswer.length = 0;
    this.shortAnswer = [];
    this.fileArr.length = 0;
    this.fileArr = [];
    this.sizeError.length = 0;
    this.sizeError = [];

    this.count = 0;
    this.examService.updateProcess({
      totalPage: 0,
      currentPage: 0,
      quSumQty: 0,
      finishedNum: this.count
     });
  }

  updateProcessContent(paramId: string) {
    if (paramId) {
      /** service 更新 process 進度 */
      const currentPage = parseInt(paramId);
      this.examService.updateProcess({
       totalPage: this.totalPage,
       currentPage,
       quSumQty: this.quSumQty,
       finishedNum: this.count
      });
      /** 切換題目 */
      this.start = 0 + (currentPage - 1) * this.pageSize;
      this.end = 10 + (currentPage - 1) * this.pageSize;
      /** 更新當前頁數 */
      this.page = currentPage;
    }
  }

  /** 領取試卷 EF030201 */
  getTestContent() {
    this.clearTestContent();

    this.examService.testContentQry().subscribe((res) => {
      // console.log(res);
      this.testsSeq = res.body?.testsSeq as string;
      if (res.body) {
        this.title = res.body?.subjectTilte;
        res.body?.quList.forEach((res) => {
          console.log('res', res);
          this.testArr.push(...res.quInfoList);
        });
        this.totalPage = Math.ceil(parseInt(res.body?.quSumQty as string) / 10);
        //const paramId = this.route.snapshot.paramMap.get('id') as string;
        this.updateProcessContent(this.paramId);
        console.log('list:', this.testArr);

        this.reminderTime = parseInt(res.body.remindTime);
        this.startTime(parseInt(res.body?.testTime));
        this.testArr.forEach((item) => {
          this.lengthError.push(false);
          this.sizeError.push(false);
          this.fileArr.push('');

          item.optionsList?.forEach((child) => {
            child.value = false;
          });
        });
      }
    });
  }

  /** 表單驗證(判斷有無未作答題目) */
  formValid() {
    //選擇題驗證(單選、複選)
    this.requiredArr = [];
    this.lengthError = [];
    this.testArr.forEach((item, index) => {
      this.requiredArr.push(true);
      item.optionsList?.forEach((child) => {
        if (child.value === true) {
          this.requiredArr[index] = false;
        }
        console.log('this.requiredArr', this.requiredArr);
      });
    });

    //簡答題驗證
    this.shortAnswer.forEach((item, index) => {
      console.log('item', item, 'index', index);
      if (item.length !== 0) {
        //簡答題有輸入
        this.requiredArr[index] = false;
        if (item.length > 1000) {
          //字數超過1000字
          this.lengthError[index] = true;
        }
      }
    });

    //檔案上傳題驗證(有無上傳檔案)
    this.fileArr.forEach((item, index) => {
      if (item !== '') {
        this.requiredArr[index] = false;
      }
    });

    //進度條(判斷已作答幾題，更新進度條顯示畫面)
    console.log(this.requiredArr)
    this.quSumQty = this.requiredArr.length;
    this.count = 0;
    this.requiredArr.forEach((item)=>{
      if(item===false){
        this.count = this.count + 1;
      }
    })
    this.updateProcessContent(this.paramId);
  }

   //點擊radio-button
   radioChecked(event: any, i: number) {
    console.log(event);
    this.testArr.forEach((item, index) => {
      item.optionsList?.forEach((child) => {
        if (event.value === child.optionsSeq) {
          child.value = true;
        } else {
          if (i === index) {
            child.value = false;
          }
        }
      });
    });
  }

  onFileChange(event: FileUploadModel, i: number) {
    console.log(event.uploadFiles);
    //顯示檔案名稱
    if (event.name !== undefined) {
      this.fileArr[this.start + i] = event.name;
      this.uploadFiles[this.start + i] = event.uploadFiles;
    }
    console.log('fileArr', this.fileArr);
    console.log('files',this.uploadFiles);
    //檔案大小驗證
    const mb = event.fileDetial / 1024 / 1024;
    if (mb > 2) {
      this.sizeError[this.start + i] = true;
    } else {
      this.sizeError[this.start + i] = false;
    }
    this.formValid();
  }

  updateError(event: UpdateErrorModel) {}

  /** 取得試卷答案 */
  getAnswer() {
    this.answer = [];
    this.testArr.forEach((item, index) => {
      this.optionsArr = [];
      this.answers = '';
      let files;

      if (this.requiredArr[index] === false && item.testsQuType === 'SD') {
        //有作答取值(簡答題)
        this.isEmpty = 'N';
        this.answers = this.shortAnswer[index];
      }
      else if(this.requiredArr[index] === false && item.testsQuType === 'FU'){
        //有作答取值(檔案上傳題題)
        this.isEmpty = 'N';
        files = this.uploadFiles[index];
      }
      else {
        //未作答取值(簡答題、檔案上傳題)
        if(item.testsQuType ==='SD'|| item.testsQuType==='FU'){
          this.isEmpty = 'Y';
          this.answers = '';
        }
      }

      item.optionsList?.forEach((child) => {
        if (this.requiredArr[index] === false && item.testsQuType === 'C') {
          this.isEmpty = 'N';
          if (child.value === true) {
            //有作答取值(單選題)
            this.answers = child.optionsSeq;
          }
        } else if (
          this.requiredArr[index] === false &&
          item.testsQuType === 'S'
        ) {
          this.isEmpty = 'N';
          if (child.value === true) {
            //有作答取值(複選題)
            this.optionsArr.push(child.optionsSeq);
            console.log('optionsArr', this.optionsArr.toString());
            this.answers = this.optionsArr.toString();
          }
        } else {
          //未作答取值(單選題、複選題)
          if(item.testsQuType ==='C'|| item.testsQuType==='S'){
            this.isEmpty = 'Y';
            this.answers = '';
          }
        }
      });
      this.answer.push({
        quSeq: item.quSeq,
        testsQuType: item.testsQuType,
        isEmpty: this.isEmpty,
        answer: this.answers,
        file: files,
      });
      console.log(this.answer);
    });
  }

  send() {
    this.formValid();
    if (this.sizeError.includes(true)||this.lengthError.includes(true)) {
      //如果檔案超過10MB，則需重新上傳，才能繳交試卷
      return;
    } else {
      if (this.requiredArr.includes(true)) {
        //彈窗提醒有未作答題目
        $('#uncompleted').modal('show');
      } else {
        /** 繳交試卷 */
        this.getAnswer();
        this.answerSubmit();
      }
    }
  }

  /** 繳交試卷 EF040101 */
  answerSubmit() {
    this.examService
      .answerSubmit({
        testsSeq: this.testsSeq,
        isAutoSubmit: 'N',
        answerList: this.answer,
      })
      .subscribe((res) => {
        console.log(res);
        //$('#modal').modal('hide');
        if (res.body?.isFinished === 'Y') {
          this.router.navigate(['/exam/thank']);
        } else {
          this.router.navigate(['/exam/instruction']);
        }
      });
  }

  prev() {
    const prevPage = this.page - 1;
    this.router.navigate(['exam/test/' + prevPage]);
  }

  next() {
    const nextPage = this.page + 1;
    console.log(this.page + 1);
    this.router.navigate(['exam/test/' + nextPage]);
    return;
  }

  /** 五分鐘提醒彈窗 和 測驗時間歸零、前台系統自動把答案送出 */
  startTime(time: number) {
    this.counterTimeService.initialTime(time);
    this.counterTimeService.updateTime.subscribe((time: TimeUpModel) => {
      // console.log('time:', time);
      this.isTimeStart = true;
      this.time = time;
      if(this.time.total === this.reminderTime){
        // to do 五分鐘dialog open
        $('#hurrupin5').modal('show');
        setTimeout(() => $('#hurrupin5').modal('hide'), 3000);
      }
      if(this.time.total === 0){
        $('#timeup').modal('show');
        this.examService.answerSubmit({
          testsSeq: this.testsSeq,
          isAutoSubmit: 'Y',
          answerList: this.answer,
        }).subscribe(res => {
          console.log(res);
          /** 在 timeup 測驗結束 click 事件觸發導頁 method */
          this.isFinished = res.body?.isFinished as string;
        })
      }
    });
  }

  get total() {
    return this.time?.total as number;
  }

  //todo get 類似 computed 的用法
  // get hour() {
  //   return this.counterTimeService.hourTxt;
  // }

  // get min() {
  //   return this.counterTimeService.minTxt;
  // }

  // get sec() {
  //   return this.counterTimeService.secTxt;
  // }

  //* methods
  timeStart() {
    // this.counterTimeService.timeStart();
  }
}
