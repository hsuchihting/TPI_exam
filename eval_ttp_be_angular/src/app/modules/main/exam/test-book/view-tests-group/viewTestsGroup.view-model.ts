import { ParticipantService } from './../../../participant/participant.service';
import { MessageService } from './../../message.service';
import { Router } from '@angular/router';
import { AlertService } from './../../../../../common/services/alert.service';
import { ParameterMessageService } from './../../../parameter/parameter-message.service';
import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { BaseViewModel } from "src/app/common/base/base.view-model";
import { LoadingService } from "src/app/common/services/loading.service";
import { TestBookService } from "../../test-book.service";
import { TestsSelect } from 'src/app/models/testBookModels/GetTestsGroupModel';
import { ParticipantMessageService } from './../../../participant/message.service';
import { threadId } from 'node:worker_threads';

@Injectable({
  providedIn: 'root',
})
export class ViewTestsGroupViewModel extends BaseViewModel {
  displayedColumns!: string[];
  testGroupForm!: FormGroup;
  testGroupList: TestsSelect[] = [];
  dataSource = new MatTableDataSource<TestsSelect>(this.testGroupList);
  subscription!: Subscription;
  subscriptionRouter!: Subscription;
  getListIndex: any[] = [];
  getRouterIndex: any[] = [];
  testsGroupId!: string | undefined;
  testsGroupName!: string | undefined;
  updateDatetime!: string | undefined;
  updateEmail!: string | undefined;
  updateUserName!: string | undefined;
  updateInfo!: string[]| undefined;


  constructor(
    private fb: FormBuilder,
    private testBookService: TestBookService,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private participantMessageService: ParticipantMessageService,
    private alertService: AlertService,
    private router: Router,
    private participantService: ParticipantService
  ){
    super();
  }
  private _vm?: BaseViewModel;

  init():void{
    this.displayedColumns = ['testsId', 'testsTypeName', 'testsName', 'testTime','action'];
    this.subscription = this.messageService.messageEvent.subscribe(
      (message: any) => {
        this.getListIndex = message;
      }
    );

    this.subscriptionRouter = this.participantMessageService.messageEvent2.subscribe(
      (message: any) => {
        this.getRouterIndex = message;
      }
    );

    this.getTestGroup();
    console.log(this.getRouterIndex);
  }

  destroy(){
    this.subscription.unsubscribe();
  }

  // 查詢題本
  getTestGroup(){
    /** 查詢題本 EB090106 */
    if(this.getRouterIndex[0]){
      this.participantService.getTesterTestGroup({testsGroupSeq: this.getRouterIndex[1]}).subscribe((res)=>{

          this.testsGroupId = res.body?.testsGroupId;
          this.testsGroupName = res.body?.testsGroupName;
          this.updateDatetime = res.body?.updateDatetime;
          this.updateUserName = res.body?.updateUser.split(' ')[0];
          this.updateEmail = res.body?.updateUser.split(' ')[2];
          this.testGroupList = res.body?.testsSelectList as TestsSelect[];
          this.dataSource.data = res.body?.testsSelectList as TestsSelect[];
          this.getRouterIndex[0] = false;
      })
    }
    else{
      /** 查詢題本 EB080102 */
      this.testBookService.getTestsGroup({testsGroupId: this.getListIndex[0]}).subscribe((res)=>{
        if(res.header?.returnCode==='B0801'){
          this.alertService.error('查無題本，請重新查詢!');
          this.router.navigate(['/main/exam/test-book']);
        }
        else{
          this.testsGroupId = res.body?.testsGroupId;
          this.testsGroupName = res.body?.testsGroupName;
          this.updateDatetime = res.body?.updateDatetime;
          this.updateUserName = res.body?.updateUserName;
          this.updateEmail = res.body?.updateEmail;

          this.testGroupList = res.body?.testsSelectList as TestsSelect[];
          this.dataSource.data = res.body?.testsSelectList as TestsSelect[];
        }
        this.loadingService.hide();
      })
    }
  }
}
