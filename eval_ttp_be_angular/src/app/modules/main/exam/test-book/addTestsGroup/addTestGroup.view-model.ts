import { AlertService } from 'src/app/common/services/alert.service';
import { MessageService } from './../../message.service';
import { Injectable, ViewChild } from "@angular/core";
import { BaseViewModel } from "src/app/common/base/base.view-model";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { TestBookService } from "../../test-book.service";
import { TestsTypeSelect } from "src/app/models/testBookModels/GetTestsTypeList";
import { TestsBasic } from "src/app/models/testBookModels/GetTestsBasicList";
import { TestsSelect } from "src/app/models/testBookModels/GetTestsGroupModel";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { matchLangNum } from "src/app/common/validator/checkLangNum";


@Injectable({
  providedIn: 'root',
})

export class AddTestGroupViewModel extends BaseViewModel{

  @ViewChild('table') table!: MatTable<any>;

  columns: string[] = ['order', 'testsTypeName', 'testsName', 'testTime', 'operating'];
  testsList: TestsSelect[] = [] ;
  testsIdList: string[] = [];
  dataSource = new MatTableDataSource<TestsSelect>(this.testsList);
  addTestGroupForm!: FormGroup;
  testsGroupName!: string;
  testGroupArr: any[] = [];
  testsTypeList!: TestsTypeSelect[];
  testsTypeNumber!: string;
  testsSelectList!: TestsBasic[];
  testsSelectNumber!: string;

  get addTestsGroupName(){
    return this.addTestGroupForm.get('addTestsGroupName');
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private testBookService: TestBookService,
    private messageService: MessageService,
    private alertService: AlertService,
  ){
    super();
    console.log('testList',this.testsList);
  }

  init(){
    this.getTestsTypeList();
    this.createForm();
  }

  createForm(){
    this.addTestGroupForm = this.fb.group({
      addTestsGroupName: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(100),
        matchLangNum
      ])],
    })
  }

  getTestsTypeList(){
    this.testBookService.getTestsTypeList({testsTypeStatus: 'N'}).subscribe(
      res => {
        console.log(res.body?.testsTypeList);
        this.testsTypeList = res.body?.testsTypeList as TestsTypeSelect[];
        this.testsTypeNumber = res.body?.testsTypeList[0].testsType as string;
      }
    )
    this.testsList.length = 0;
    this.testsList = [];
    this.testsIdList.length = 0; // 把 testsIdList 長度歸零再給空陣列
    this.testsIdList = [];
    this.dataSource.data = this.testsList;
  }
  /** 查詢試卷基本資料清單 */
  changeTypeList(event: any){
    console.log('event1', event);
    this.testBookService.getTestsBasicList({testsType: this.testsTypeNumber ,testsStatus: 'Y'}).subscribe(
      res => {
        console.log(res);
        this.testsSelectList = res.body?.testsBasicList as TestsBasic[];
        this.testsSelectNumber = res.body?.testsBasicList[0].testsId as string;
      }
    )
  }

  changeSelectList(event: any){
    console.log('event2',this.testsSelectNumber);
  }
  /** 新增題本 */
  addTestGroup(){
    this.testBookService.addTestGroup({
      testsGroupName: this.addTestGroupForm.value.addTestsGroupName,
      testsIdList: this.testsIdList
    }).subscribe(res => {
      console.log(res);
      const returnCode = res.header?.returnCode;
      if(returnCode === 'B0802'){
        return this.alertService.error('題本名稱不可重複，請重新輸入!')
      }
      if(returnCode === 'B0803'){
        return this.alertService.error('請添加1筆試卷，請重新輸入!')
      }
      this.backTestBookHome();
      this.alertService.success('儲存成功');
      return;
    });
  }
  /** 查詢試卷新增 */
  getTests() {
    console.log('from getTests',this.testsSelectNumber)
    this.testBookService.getTestsAdd({testsId: this.testsSelectNumber, testsStatus: 'Y'}).subscribe(res => {
      console.log('from getTests res',res);
      const testsId: any = res.body?.testsSelect[0].testsId;
      this.testsIdList.push(testsId);
      if(this.testsList.length === 0){
        this.testsList = res.body?.testsSelect as TestsSelect[];
        this.dataSource.data = this.testsList;
        return
      }
      this.testsList.push(res.body?.testsSelect[0] as TestsSelect);
      this.dataSource.data = this.testsList ;
      console.log('dataSource',this.dataSource.data);
      return
    });
    setTimeout(() => {console.log('from setTimeOut',this.testsIdList)}, 100)
  }

  onDelete(id: number){
    this.testsList = this.testsList.filter((currentArr, index) => {
      console.log(currentArr, index);
      return id !== index;
    });
    //console.log('from onDelete',this.testsIdList);
    this.dataSource.data = this.testsList ;
  }

  onView(testId: string){
    console.log(testId);
    this.testGroupArr[0] = testId;
    this.messageService.sendArrMessage(this.testGroupArr);
  }

  onDrop(event: CdkDragDrop<TestsSelect[]>) {
    const prevIndex = this.testsList.findIndex((d) => {
      d === event.item.data
    });
    moveItemInArray(this.dataSource.data, prevIndex, event.currentIndex);
    this.dataSource.data = this.dataSource.data.slice();
    this.testsIdList = this.dataSource.data.map(test => test.testsId);
  }

  backTestBookHome(){
    this.router.navigate(['/main/exam/test-book'])
  }

}
