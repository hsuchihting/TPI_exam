import { MessageService } from './../../message.service';
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
import { Injectable, ElementRef } from '@angular/core';
import { BaseViewModel } from 'src/app/common/base/base.view-model';

import Swal from 'sweetalert2';
import { TestsTypeSelect } from 'src/app/models/Exam/testPaper/getTestsTypeListModel';
import {
  EditTestAnsGroup,
  EditTestQuType,
  EditTestTimeSelect,
} from 'src/app/models/Exam/testPaper/editTestModel';
import { range } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatRadioChange } from '@angular/material/radio';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Tests } from 'src/app/models/Exam/testPaper/getTestsListModel';
import {
  ViewTestsQuList,
  ViewTestsQuOptions,
} from 'src/app/models/Exam/testPaper/getTestsModel';

@Injectable({
  providedIn: 'root',
})
export class EditPaperViewModel extends BaseViewModel {
  //*變數
  testDayArr: EditTestTimeSelect[] = [];
  testHourArr: EditTestTimeSelect[] = [];
  testMinsArr: EditTestTimeSelect[] = [];
  remindTimeArr: EditTestTimeSelect[] = [];
  examTypeArr: EditTestQuType[] = [];
  testTypeArr: TestsTypeSelect[] = [];
  //*form 表單
  editPaper!: FormGroup;
  editPaperItem!: FormGroup;
  //* 施測時間
  checked: boolean = true;
  getTestsId!: string;
  TestStatus!: string;
  updateDatetime!: string;
  updateUserName!: string;
  updateEmail!: string;
  testValue: string = '';
  ansUploaded: string = '';
  get paperControl() {
    return this.editPaperItem.get('papers') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private examService: ExamService,
    private alertService: AlertService,
    private router: Router,
    private messageService: MessageService
  ) {
    super();
  }

  init(): void {
    this.getData();
    this.createForm();
    this.editPaperForm();
  }

  getData() {
    this.getMessage();
    this.getTestsTypeList();
    this.testDayArrSelect();
    this.testHourArrSelect();
    this.testMinsArrSelect();
    this.remindTimeArrSelect();
    this.examTypeSelect();
    this.getTestDetail();
  }

  getMessage() {
    this.messageService.messageEvent.subscribe((res: Tests[]) => {
      const [target] = [...res];
      this.getTestsId = target.testsId;
      this.TestStatus = target.status;
    });
  }
  /** 取得編輯表單 */
  getTestDetail() {
    this.examService.getTests({ testsId: this.getTestsId }).subscribe((res) => {
      const body = res.body;
      if (body) {
        this.editPaper.patchValue({
          testsType: body?.testsTypeName,
          testDTime: body?.testDTime,
          testHTime: body?.testHTime,
          testMTime: body?.testMTime,
          remindTime: body?.remindTime,
          testsName: body?.testsName,
          memo: body?.memo,
        });
        this.updateDatetime = body?.updateDatetime as string;
        this.updateUserName = body?.updateUserName as string;
        this.updatePaperItem(res.body?.viewTestsQuList as ViewTestsQuList[]);
      }
    });
  }
  /** 顯示編輯表單 */
  updatePaperItem(body: ViewTestsQuList[]) {
    const arr = body.map((item) => {
      let answer: any = [];
      if (item.testsQuType === 'C' || item.testsQuType === 'S') {
        answer = (item?.viewTestsQuOptionsList as ViewTestsQuOptions[]).map(
          (child) => {
            return this.formBuilder.group({
              testsQuOptionsId: child.testsQuOptionsId,
              answer: [
                child.testsQuOptionsDesc,
                Validators.compose([
                  Validators.required,
                  Validators.maxLength(1000),
                ]),
              ],
              answerUpload: [null],
              ansUploaded: [child.testsQuOptionsImg.name],
              correctAns: [child.isTestsQuAns === '0' ? true : false],
            });
          }
        );
      }

      return this.formBuilder.group({
        testsQuId: item.testsQuId,
        quType: item.testsQuType,
        test: [
          item.testsQuDesc,
          Validators.compose([Validators.required, Validators.maxLength(1000)]),
        ],
        testPic: [null],
        testPicUpload: [item.testsQuImgDTO],
        answer: this.formBuilder.array(answer),
      });
    });
    this.editPaperItem.setControl('papers', this.formBuilder.array(arr));
  }

  /** 取得題目類型 */
  getTestsTypeList() {
    this.examService
      .getTestsTypeList({
        testsTypeStatus: this.TestStatus,
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
    this.editPaper = this.formBuilder.group({
      testsType: ['1'],
      testDTime: ['1'],
      testHTime: ['00'],
      testMTime: ['00'],
      remindTime: ['5'],
      testsName: [
        '123',
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      memo: ['123', Validators.maxLength(1000)],
    });
  }

  //*試卷下方表單
  editPaperForm() {
    const editPaperItemChild = this.editPaperFormChild();
    this.editPaperItem = this.formBuilder.group({
      papers: this.formBuilder.array([editPaperItemChild]),
    });
  }

  //*子試卷表單
  editPaperFormChild() {
    return this.formBuilder.group({
      quType: ['C'],
      test: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(1000)]),
      ],
      testPic: [null],
      testPicUpload: [null],
      answer: this.formBuilder.array([
        this.formBuilder.group({
          answer: [
            '',
            Validators.compose([
              Validators.required,
              Validators.maxLength(1000),
            ]),
          ],
          answerUpload: [null],
          ansUploaded: [null],
          correctAns: [false],
        }),
      ]),
    });
  }

  //*答案
  answerItem() {
    return this.formBuilder.group({
      answer: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(1000)]),
      ],
      answerUpload: [null],
      ansUploaded: [null],
      correctAns: [false],
    });
  }

  //*上傳檔案
  onFileChange(event: FileUploadModel, i: number) {
    // console.log('event:', event);
    // console.log('file:', event.file);
    const form = this.editPaperItem.get('papers') as FormArray;
    form.at(i).patchValue({
      testPic: event.name,
    });
  }

  //* 上傳答案
  uploadAns(event: FileUploadModel, i: number, j: number) {
    console.log('index:', i);
    const form = this.paperControl.at(i).get('answer') as FormArray;
    form.at(j).patchValue({
      answerUpload: event.name,
    });
  }

  //*上傳錯誤
  updateError(event: UpdateErrorModel, index: number) {
    const form = this.editPaperItem.get('papers') as FormArray;
    const testPic = form.at(index).get('testPic') as AbstractControl;
    testPic.setErrors(event);
  }

  //*答案至少選擇一項
  answerLen(answerArr: any) {
    let answer = answerArr.find((item: any) => {
      return item.controls.correctAns.value == true;
    });
    return answer == null;
  }

  /** radio change事件 */
  radioChange(event: MatRadioChange, i: number) {
    const ansArr = this.paperControl.at(i).get('answer') as FormArray;

    ansArr.controls.forEach((item) => {
      item.get('correctAns')?.patchValue(false);
    });
    ansArr.at(event.value).get('correctAns')?.patchValue(true);
  }

  /** checkbox change事件 */
  checkboxChange(event: MatCheckboxChange, i: number, j: number) {
    const ansArr = this.paperControl.at(i).get('answer') as FormArray;
    ansArr.at(j).get('correctAns')?.patchValue(event.checked);
  }
  //*儲存試卷
  save() {
    let reqBody = new FormData();
    const editPaper = this.editPaper.value;
    reqBody.append('body.testsId', this.getTestsId);
    this.testTypeArr.forEach((item) => {
      if (item.testsTypeName === editPaper.testsType) {
        reqBody.append('body.testsType', item.testsType);
      }
    });

    reqBody.append('body.testsName', editPaper.testsName);
    if (editPaper.testDTime !== undefined) {
      reqBody.append('body.testDTime', editPaper.testDTime);
    }

    if (editPaper.testHTime !== undefined) {
      reqBody.append('body.testHTime', editPaper.testHTime);
    }

    if (editPaper.testMTime !== undefined) {
      reqBody.append('body.testMTime', editPaper.testMTime);
    }
    reqBody.append('body.remindTime', editPaper.remindTime);
    reqBody.append('body.memo', editPaper.memo);

    this.paperControl.value.forEach((item: any, i: number) => {
      reqBody.append(`body.editTestsQuList[${i}].testsQuId`, item.testsQuId);

      if (item.testPic) {
        reqBody.append(
          `body.editTestsQuList[${i}].isEditTestsQuImg`,
          item.testPic ? '0' : '1'
        );
      }

      reqBody.append(`body.editTestsQuList[${i}].testsQuType`, item.quType);
      if (item.test) {
        reqBody.append(`body.editTestsQuList[${i}].testsQuDesc`, item.test);
      }

      if (item.testPic) {
        reqBody.append(`body.editTestsQuList[${i}].testsQuImg`, item.testPic);
      }

      item.answer.forEach((child: any, j: number) => {
        let index = this.answerTitle(j + 1);
        reqBody.append(
          `body.editTestsQuList[${i}].editTestsQuOptionsList[${j}].testsQuOptionsId`,
          index
        );

        if (child.answerUpload) {
          reqBody.append(
            `body.editTestsQuList[${i}].editTestsQuOptionsList[${j}].isEditTestsQuOptionsImg`,
            child.answerUpload ? '0' : '1'
          );
        }
        if (child.answer) {
          reqBody.append(
            `body.editTestsQuList[${i}].editTestsQuOptionsList[${j}].testsQuOptionsDesc`,
            child.answer
          );
        }

        if (child.answerUpload) {
          reqBody.append(
            `body.editTestsQuList[${i}].editTestsQuOptionsList[${j}].testsQuOptionsImg`,
            child.answerUpload
          );
        }
        reqBody.append(
          `body.editTestsQuList[${i}].editTestsQuOptionsList[${j}].isTestsQuAns`,
          child.correctAns ? '0' : '1'
        );
      });
    });

    this.examService.editTest(reqBody).subscribe((res) => {
      console.log('res', res);
      Swal.fire({
        title: '編輯試卷',
        text: '新增成功！',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      }).then((res) => {
        if (res.value) {
          this.router.navigate(['/main/exam/test-paper']);
        }
      });
    });
  }

  //*取消試卷
  cancel() {
    Swal.fire({
      title: '離開編輯頁面',
      text: '資料尚未儲存，是否離開新增頁面',
      icon: 'warning',
      showCancelButton: true,
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
    const child = this.editPaperFormChild();
    this.paperControl.push(child);
  }

  //*刪除試卷
  delTestPaper(index: number) {
    this.paperControl.removeAt(index);
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
    (this.paperControl.at(i).get('answer') as FormArray).removeAt(j);
  }

  //*刪除題目檔案
  delFile(item: any) {
    console.log(item);
    item.value.testPicUpload = null;
  }

  //* 刪除答案檔案
  delAnsFile(itemChild: any) {
    console.log(itemChild);
    itemChild.value.ansUploaded = null;
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
        break;
    }
  }

  /** 檢查內容 */
  checkBothContent() {
    this.paperControl.controls.forEach((group) => {
      if (group.get('answer')) {
        (group.get('answer') as FormArray).controls.forEach((child) => {
          if (
            child.get('answer')?.value ||
            child.get('answerUpload')?.value ||
            child.get('ansUploaded')?.value
          )
            return;
          child.get('answer')?.setErrors({ bothWithoutContent: true });
          child.get('answerUpload')?.setErrors({ bothWithoutContent: true });
        });
      }

      if (group.get('test')?.value || group.get('testPic')?.value) return;

      group.get('test')?.setErrors({ bothWithoutContent: true });
      group.get('testPic')?.setErrors({ bothWithoutContent: true });
    });
  }
  // /** 檢查正確答案 */
  // checkCorrectAns() {
  //   this.paperControl.controls
  //     .filter(
  //       (group) =>
  //         group.get('quType')?.value === 'C' ||
  //         group.get('quType')?.value === 'S'
  //     )
  //     .forEach((group) => {
  //       const ans = group.get('answer') as FormArray;
  //       if (ans?.length < 2) {
  //         group.get('answer')?.setErrors({ minLen: true });
  //       }

  //       if (
  //         ans.value.some((child: EditTestAnsGroup) => child?.correctAns) ===
  //         false
  //       ) {
  //         group.get('answer')?.setErrors({ minAns: true });
  //       }
  //     });
  // }
}
