import { LoginComponent } from './../../../../auth/login/login.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import {
  AddTestQuType,
  AddTestTimeSelect,
} from './../../../../../models/Exam/testPaper/addTestModel';
import { Router } from '@angular/router';
import { AlertService } from './../../../../../common/services/alert.service';
import {
  FileUploadModel,
  UpdateErrorModel,
} from './../../../../../models/Exam/testPaper/file-upload';
import { testQuOption } from './../../../../../enum/testQuOpiton.enum';
import { ExamService } from './../../exam.service';

import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { Injectable } from '@angular/core';
import { BaseViewModel } from 'src/app/common/base/base.view-model';

import {
  AddTestReq,
  AddTestsQu,
  AddTestsQuOptions,
} from 'src/app/models/Exam/testPaper/addTestModel';
import Swal from 'sweetalert2';
import { TestsTypeSelect } from 'src/app/models/Exam/testPaper/getTestsTypeListModel';
import { range } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatRadioChange } from '@angular/material/radio';

@Injectable({
  providedIn: 'root',
})
export class AddPaperViewModel extends BaseViewModel {
  //*變數
  testsQuType: string = 'C';
  testDayArr!: AddTestTimeSelect[];
  testHourArr: AddTestTimeSelect[] = [];
  testMinsArr: AddTestTimeSelect[] = [];
  remindTimeArr: AddTestTimeSelect[] = [];
  addPaperList: AddTestReq[] = [];
  testTypeArr: TestsTypeSelect[] = [];

  examTypeArr: AddTestQuType[] = [];
  radioAnsLen: boolean = false;
  checkAnsLen: boolean = false;
  testQuType!: string;
  checked: boolean = true;

  dayTime: string = '1';
  hourTime: string = '00';
  minTime: string = '00';
  radioId!: string;
  radioValue: string[] = [];
  testsType: string = '111';

  //*form 表單
  addPaper!: FormGroup;

  addPaperItem!: FormGroup;
  addPaperItemChild!: FormGroup;
  addAnswerItem!: FormGroup;

  get paperControl() {
    return this.addPaperItem.get('papers') as FormArray;
  }

  get answerControl() {
    return this.addPaperItem.get('papers') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private examService: ExamService,
    private alertService: AlertService,
    private router: Router
  ) {
    super();
  }

  init(): void {
    this.createForm();
    this.addPaperForm();
    this.getData();
    this.radioId = 'mat-radio-1';
  }

  getData() {
    this.getTestsTypeList();
    this.testDayArrSelect();
    this.testHourArrSelect();
    this.testMinsArrSelect();
    this.remindTimeArrSelect();
    this.examTypeSelect();
    this.getDefaultValue();
  }

  //*題目類別
  getTestsTypeList() {
    this.examService
      .getTestsTypeList({
        testsTypeStatus: 'N',
      })
      .subscribe((res) => {
        if (res.body?.testsSelectList) {
          this.testTypeArr = res.body?.testsSelectList;
        }
      });
  }

  //*題目類型
  examTypeSelect() {
    this.examTypeArr = [
      {
        id: 0,
        type: 'C',
        name: '單選題',
      },
      {
        id: 1,
        type: 'S',
        name: '複選題',
      },
      {
        id: 2,
        type: 'SD',
        name: '簡答題',
      },
      {
        id: 3,
        type: 'FU',
        name: '檔案上傳題',
      },
    ];
  }

  //*測驗日
  testDayArrSelect() {
    this.testDayArr = [
      {
        id: '1',
        name: '1',
      },
      {
        id: '5',
        name: '5',
      },
      {
        id: '7',
        name: '7',
      },
      {
        id: '14',
        name: '14',
      },
    ];
  }

  //*測驗小時
  testHourArrSelect() {
    range(0, 24)
      .pipe(
        map((target) => {
          return ('0' + target.toString()).slice(-2);
        })
      )
      .subscribe((item) => {
        this.testHourArr.push({
          id: item,
          name: item,
        });
      });
  }

  //*測驗分鐘
  testMinsArrSelect() {
    range(0, 60)
      .pipe(
        map((target) => {
          return ('0' + target.toString()).slice(-2);
        })
      )
      .subscribe((item) => {
        this.testMinsArr.push({
          id: item,
          name: item,
        });
      });
  }

  //*倒數提醒
  remindTimeArrSelect() {
    // this.remindTimeArr = [
    //   {
    //     id: '1',
    //     name: '5',
    //   },
    //   {
    //     id: '2',
    //     name: '10',
    //   },

    //   {
    //     id: '3',
    //     name: '15',
    //   },
    //   {
    //     id: '4',
    //     name: '20',
    //   },
    //   {
    //     id: '5',
    //     name: '25',
    //   },
    //   {
    //     id: '6',
    //     name: '30',
    //   },
    // ];
    range(1, 6)
      .pipe(
        map((target) => {
          return (target * 5).toString();
        })
      )
      .subscribe((item) => {
        this.remindTimeArr.push({
          id: item,
          name: item,
        });
      });
  }

  //*建立上方表單
  createForm() {
    this.addPaper = this.formBuilder.group({
      remindTime: ['5'],
      testsName: ['test', Validators.maxLength(1000)],
      memo: ['memo', Validators.maxLength(1000)],
    });
  }

  //*施測時間的值
  timeValue(e: any) {
    console.log(e);
    this.radioId = e.source.id;
  }

  //*試卷下方表單
  addPaperForm() {
    const addPaperItemChild = this.addPaperFormChild();
    this.addPaperItem = this.formBuilder.group({
      papers: this.formBuilder.array([addPaperItemChild]),
    });
  }

  //*試卷表單
  addPaperFormChild() {
    return this.formBuilder.group({
      quType: ['C'],
      test: [null, Validators.maxLength(1000)],
      testPic: [null],
      answer: this.formBuilder.array([
        this.formBuilder.group({
          answer: ['', Validators.maxLength(100)],
          answerUpload: [null],
          correctAns: [false],
        }),
      ]),
    });
  }

  //*答案
  answerItem() {
    return this.formBuilder.group({
      answer: ['', Validators.maxLength(100)],
      answerUpload: [null],
      correctAns: [false],
    });
  }

  //*上傳檔案
  onFileChange(event: FileUploadModel, i: number) {
    const form = this.addPaperItem.get('papers') as FormArray;
    form.at(i).patchValue({
      testPic: event,
    });
  }

  //* 上傳答案
  uploadAns(event: FileUploadModel, i: number, j: number) {
    const form = this.answerControl.at(i).get('answer') as FormArray;
    form.at(j).patchValue({
      answerUpload: event,
    });
  }

  //*上傳錯誤
  updateError(event: UpdateErrorModel, index: number) {
    const form = this.addPaperItem.get('papers') as FormArray;
    const testPic = form.at(index).get('testPic') as AbstractControl;
    testPic.setErrors(event);
  }

  //*單選答案
  radioChange(event: MatRadioChange, i: number) {
    const ansArr = this.paperControl.at(i).get('answer') as FormArray;
    ansArr.controls.forEach((item) => {
      item.get('correctAns')?.patchValue(false);
    });
    ansArr.at(event.value).get('correctAns')?.patchValue(true);
  }

  //* 複選答案
  checkboxChange(event: MatCheckboxChange, i: number, j: number) {
    const ansArr = this.paperControl.at(i).get('answer') as FormArray;
    ansArr.at(j).get('correctAns')?.patchValue(event.checked);
  }

  //?單選答案 Old
  // getRadioAnsValue(event: any, radioIndex: number) {
  //   const form = this.addPaperItem.get('papers') as FormArray;
  //   this.addTestsQuOptionsList = [];
  //   for (let i = 0; i < form.length; i++) {
  //     const answerGroup = form.at(i).get('answer') as FormArray;
  //     for (let j = 0; j < answerGroup.length; j++) {
  //       if (radioIndex === j) {
  //         event.value = '0';
  //       } else {
  //         event.value = '1';
  //       }

  //       this.addTestsQuOptionsList.push({
  //         testsQuOptionsDesc: answerGroup.value[j].answer,
  //         testsQuOptionsImg: answerGroup.value[j].answerUpload,
  //         isTestsQuAns: event.value,
  //       });
  //     }
  //   }
  // }

  //*取得題目類型的預設值
  getDefaultValue() {
    const form = this.addPaperItem.get('papers') as FormArray;
    form.at(0).patchValue({
      examTypeArr: this.examTypeArr[0].name,
    });
  }

  //*取得施測時間的 radio
  filterRadioValue() {
    if (this.radioId === 'mat-radio-1') {
      this.dayTime = this.dayTime;
      this.hourTime = '';
      this.minTime = '';
    } else {
      this.dayTime = '';
      this.hourTime = this.hourTime;
      this.minTime = this.minTime;
    }
  }

  //*答案至少選取一項
  answerLen(answerArr: any) {
    let answer = answerArr.find((item: any) => {
      return item.controls.correctAns.value == true;
    });
    return answer == null;
  }

  getTestArr() {
    let addTestsQuList: AddTestsQu[] = [];
    this.paperControl.controls.forEach((item) => {
      let form = item.value;
      let addTestsQuOptionsList: AddTestsQuOptions[] = [];
      form.answer.forEach((child: any) => {
        let radioChecked = child.correctAns ? '0' : '1';
        addTestsQuOptionsList.push({
          testsQuOptionsDesc: child.answer,
          testsQuOptionsImg: child.answerUpload?.uploadFiles,
          isTestsQuAns: radioChecked,
        });
      });
      addTestsQuList.push({
        testsQuType: form.quType,
        testsQuDesc: form.test,
        testsQuImg: form.testPic?.uploadFiles,
        addTestsQuOptionsList: addTestsQuOptionsList,
      });
    });
    return addTestsQuList;
  }

  //*儲存試卷
  save() {
    this.filterRadioValue();

    this.examService
      .addTest({
        testsType: this.testsType,
        testsName: this.addPaper.value.testsName,
        testDTime: this.dayTime,
        testHTime: this.hourTime,
        testMTime: this.minTime,
        remindTime: this.addPaper.value.remindTime,
        memo: this.addPaper.value.memo,
        addTestsQuList: this.getTestArr(),
      })
      .subscribe((res) => {
        console.log(res);
        const returnCode = res.header?.returnCode;
        const errorMsg = '新增失敗，請洽管理人員確認原因或稍後再試';
        const timeError = '請填寫日 / (時+分) 擇一填寫';
        const successMsg = '新增成功';

        if (res.header?.returnCode === 'B0000') {
          this.alertService.success(successMsg);
          this.router.navigate(['/main/exam/test-paper']);
        }

        if (res.header?.returnCode === 'B9999') {
          this.alertService.error('系統錯誤');
        }
      });
  }

  //*取消試卷
  cancel() {
    const msg = '離開編輯頁面';
    const text = '資料尚未儲存，是否離開新增頁面';
    Swal.fire({
      title: msg,
      text: text,
      icon: 'warning',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
    }).then((res) => {
      if (res.value) {
        this.router.navigate(['/main/exam/test-paper']);
      }
    });
  }

  //*新增試卷
  addTestPaper() {
    const child = this.addPaperFormChild();
    this.paperControl.push(child);
  }

  //*刪除試卷
  delTestPaper(index: number) {
    const form = this.addPaperItem.get('papers') as FormArray;
    form.removeAt(index);
  }

  //*新增答案
  add(i: number) {
    const ansList = this.paperControl.at(i).get('answer') as FormArray;
    if (ansList.length < 10) {
      const answer = this.answerItem();
      (this.paperControl.at(i).get('answer') as FormArray).push(answer);
    }
  }

  //*刪除答案
  del(i: number, j: number) {
    const form = this.paperControl.at(i).get('answer') as FormArray;
    form.removeAt(j);
  }

  //*題目枚舉
  answerTitle(idx: testQuOption): any {
    switch (idx) {
      case 1:
        return 'A';
      case 2:
        return 'B';
      case 3:
        return 'C';
      case 4:
        return 'D';
      case 5:
        return 'E';
      case 6:
        return 'F';
      case 7:
        return 'G';
      case 8:
        return 'H';
      case 9:
        return 'I';
      case 10:
        return 'J';
      default:
        return;
    }
  }

  //*二擇一答案驗證
  checkBothContent() {
    this.paperControl.controls.forEach((group) => {
      if (group.get('answer')) {
        (group.get('answer') as FormArray).controls.forEach((child) => {
          if (child.get('answer')?.value || child.get('answerUpload')?.value)
            return;
          child.get('answer')?.setErrors({ bothWithoutContent: true });
          child.get('answerUpload')?.setErrors({ bothWithoutContent: true });
        });
      }

      if (group.get('test')?.value || group.get('testPic')?.value?.name) return;

      group.get('test')?.setErrors({ bothWithoutContent: true });
      group.get('testPic')?.setErrors({ bothWithoutContent: true });
    });
  }
}
