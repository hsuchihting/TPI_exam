import { AlertService } from './../../../../../common/services/alert.service';
import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { BaseViewModel } from "src/app/common/base/base.view-model";
import { LoadingService } from "src/app/common/services/loading.service";
import { matchLangNum } from "src/app/common/validator/checkWordLimit";
import { GetTestsGroupRes, } from "src/app/models/testBookModels/GetTestsGroupModel";
import { TestBookService } from "../../test-book.service";
import { TestsTypeSelect } from 'src/app/models/testBookModels/GetTestsTypeList';
import { MessageService } from '../../message.service';

@Injectable({
  providedIn: 'root',
})
export class ViewTestsGroupViewModel extends BaseViewModel {
  displayedColumns!: string[];
  testGroupForm!: FormGroup;
  testGroupList: TestsTypeSelect[] = [];
  dataSource = new MatTableDataSource<TestsTypeSelect>(this.testGroupList);
  subscription!: Subscription;
  getListIndex: any[] = [];
  testsGroupId!: string | undefined;
  testsGroupName!: string | undefined;
  updateDatetime!: string | undefined;
  updateEmail!: string | undefined;
  updateUserName!: string | undefined;


  constructor(
    private fb: FormBuilder,
    private testBookService: TestBookService,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private alertService: AlertService
  ){
    super();
  }
  private _vm?: BaseViewModel;

  init():void{
    this.displayedColumns = ['testsId', 'testsTypeName', 'testsName', 'testTime'];
    this.subscription = this.messageService.messageEvent.subscribe(
      (message: any) => {
        this.getListIndex = message;
      }
    );
    this.getTestGroup();
  }

  /** 查詢題本 */
  getTestGroup(){
    console.log(this.getListIndex[0]);
    this.testBookService.getTestsGroup({testsGroupId: this.getListIndex[0]}).subscribe((res)=>{
      this.testsGroupId = res.body?.testsGroupId;
      this.testsGroupName = res.body?.testsGroupName;
      this.updateDatetime = res.body?.updateDatetime;
      this.updateUserName = res.body?.updateUserName;
      this.updateEmail = res.body?.updateEmail;

      this.testGroupList = res.body?.testsSelectList as TestsTypeSelect[];
      this.dataSource.data = res.body?.testsSelectList as TestsTypeSelect[];
      this.loadingService.hide();
        if(res.header?.returnMsg=='查無資料'){
          this.alertService.noDatas(res.header?.returnMsg);
        };
    })
  }
}
