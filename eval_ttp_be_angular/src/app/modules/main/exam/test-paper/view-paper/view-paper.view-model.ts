import { AlertService } from './../../../../../common/services/alert.service';
import { ExamService } from './../../exam.service';
import { MessageService } from './../../message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { BaseViewModel } from "src/app/common/base/base.view-model";
import { GetTestsRes, ViewTestsQuList} from "src/app/models/Exam/testPaper/getTestsModel";
import { Subscription } from 'rxjs';
import { testQuOption } from 'src/app/enum/testQuOpiton.enum';

@Injectable({
  providedIn: 'root',
})
export class ViewPaperViewModel extends BaseViewModel {
 //question: GetTestsRes[] = TEST_ELEMENT_DATA;
  testId!: string | undefined;
  testsTypeName!: string | undefined;
  testsName!: string | undefined;
  testDTime!: string | undefined;
  testHTime!: string | undefined;
  testMTime!: string | undefined;
  remindTime!: string | undefined;
  memo!: string | undefined;
  updateDatetime!: string | undefined;
  updateEmail!: string | undefined;
  updateUserName!: string | undefined;
  viewTestsQuList: ViewTestsQuList[] = [];
  subscription!: Subscription;
  getTestsId: any[] = [];

  constructor(
    private messageService: MessageService,
    private examService: ExamService,
    private alertService: AlertService,
    private router: Router
  ){
    super();
  }

  init(){
    this.subscription = this.messageService.messageEvent.subscribe(
      (message: any) => {
        this.getTestsId = message;
      }
    );

    this.getAllDatas();
  }

  //*答案枚舉
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

  getAllDatas(){
    this.examService.getTests({testsId: this.getTestsId[0]}).subscribe((res)=>{
      if(res.header?.returnCode==='B0701' || res.header?.returnCode==='B0001'){
        this.alertService.error('查無試卷，請重新查詢!');
        this.router.navigate(['/main/exam/test-paper']);
        return;
      }
      else{
        this.testId = res.body?.testsId;
        this.testsTypeName = res.body?.testsTypeName;
        this.testsName = res.body?.testsName;
        this.testDTime = res.body?.testDTime;
        this.testHTime = res.body?.testHTime;
        this.testMTime = res.body?.testMTime;
        this.remindTime = res.body?.remindTime;
        this.memo = res.body?.memo;
        this.updateDatetime = res.body?.updateDatetime;
        this.updateEmail = res.body?.updateEmail;
        this.updateUserName = res.body?.updateUserName;
        this.viewTestsQuList = res.body?.viewTestsQuList as ViewTestsQuList[];
      }
    })
  }
}

// export const TEST_ELEMENT_DATA: GetTestsRes[] = [
//   {
//     testId: '20210324095656789',
//     testsTypeName:'前端',
//     testsName: 'vue測驗',
//     testDTime: '0',
//     testHTime: '00',
//     testMTime: '30',
//     remindTime: '5',
//     memo: '超級無敵霹靂爆炸難',
//     updateDatetime: '2021/03/20 06:24',
//     updateEmail: 'mrbear@tpisoftware.com',
//     updateUserName: '熊大先生',
//     viewTestsQuList: [
//       {
//         testsQuId:'99f1211c-c39a-43b6-80f3-f5d390cbb031',
//         testsQuType:'S',
//         testsQuDesc:'熊大先生有幾塊地？',
//         testsQuImg: {name:'超大土地', url:'big.gif'},
//         viewTestsQuOptionsList:[
//           {
//             testsQuOptionsId:'A',
//             testsQuOptionsDesc:'A',
//             testsQuOptionsImg: {name:'', url:''},
//             isTestsQuAns:'0'
//           },
//           {
//             testsQuOptionsId:'B',
//             testsQuOptionsDesc:'B',
//             testsQuOptionsImg: {name:'', url:''},
//             isTestsQuAns:'1'
//           },
//           {
//             testsQuOptionsId:'C',
//             testsQuOptionsDesc:'C',
//             testsQuOptionsImg: {name:'', url:''},
//             isTestsQuAns:'1'
//           },
//           {
//             testsQuOptionsId:'D',
//             testsQuOptionsDesc:'D',
//             testsQuOptionsImg: {name:'', url:''},
//             isTestsQuAns:'0'
//           }
//         ]
//       },
//       {
//         testsQuId:'08407bc1-7f5e-45b6-a0af-0e764596f731',
//         testsQuType:'S',
//         testsQuDesc:'超Easy試卷',
//         testsQuImg: {name:'EasyEasy', url:'SoEasy.jepg'},
//         viewTestsQuOptionsList:[
//           {
//             testsQuOptionsId:'A',
//             testsQuOptionsDesc:'A:物件',
//             testsQuOptionsImg: {name:'object', url:'object.gif'},
//             isTestsQuAns:'1'
//           },
//           {
//             testsQuOptionsId:'B',
//             testsQuOptionsDesc:'B:陣列',
//             testsQuOptionsImg: {name:'Array', url:'Array.gif'},
//             isTestsQuAns:'0'
//           },
//           {
//             testsQuOptionsId:'C',
//             testsQuOptionsDesc:'C:函式',
//             testsQuOptionsImg: {name:'Function', url:''},
//             isTestsQuAns:'0'
//           }
//         ]
//       },
//       {
//         testsQuId:'9d201feb-f81c-4eff-ba16-2641c396e02b',
//         testsQuType:'C',
//         testsQuDesc:'MrDonnut買十送幾？',
//         testsQuImg: {name:'GoodGoodEat', url:'Good.jpg'},
//         viewTestsQuOptionsList:[
//           {
//             testsQuOptionsId:'A',
//             testsQuOptionsDesc:'A',
//             testsQuOptionsImg: {name:'Donnut', url:'Donnut.gif'},
//             isTestsQuAns:'0'
//           },
//           {
//             testsQuOptionsId:'B',
//             testsQuOptionsDesc:'B',
//             testsQuOptionsImg: {name:'DonnutDonnut', url:'DonnutDonnut.jpg'},
//             isTestsQuAns:'1'
//           }
//         ]
//       }
//     ]
//   },
//   {
//     testId: '20210325102278321',
//     testsTypeName:'後端',
//     testsName: 'go測驗',
//     testDTime: '02',
//     testHTime: '10',
//     testMTime: '30',
//     remindTime: '60',
//     memo: '',
//     updateDatetime: '2021/03/21 08:30',
//     updateEmail: 'mrsnake@tpisoftware.com',
//     updateUserName: '蛇先生',
//     viewTestsQuList: [
//       {
//         testsQuId:'c1fd8b2b-b93f-43c9-99d2-a33c3c6d21f8',
//         testsQuType:'S',
//         testsQuDesc:'',
//         testsQuImg: {name:'', url:''},
//         viewTestsQuOptionsList:[
//           {
//             testsQuOptionsId:'A',
//             testsQuOptionsDesc:'',
//             testsQuOptionsImg: {name:'', url:''},
//             isTestsQuAns:'0'
//           },
//           {
//             testsQuOptionsId:'B',
//             testsQuOptionsDesc:'',
//             testsQuOptionsImg: {name:'', url:''},
//             isTestsQuAns:'1'
//           },
//           {
//             testsQuOptionsId:'C',
//             testsQuOptionsDesc:'',
//             testsQuOptionsImg: {name:'', url:''},
//             isTestsQuAns:'0'
//           }
//         ]
//       },
//       {
//         testsQuId:'82fada4e-2f4f-4bcd-bcc6-eadc7561c402',
//         testsQuType:'C',
//         testsQuDesc:'',
//         testsQuImg: {name:'', url:''},
//         viewTestsQuOptionsList:[
//           {
//             testsQuOptionsId:'A',
//             testsQuOptionsDesc:'',
//             testsQuOptionsImg: {name:'', url:''},
//             isTestsQuAns:'1'
//           },
//           {
//             testsQuOptionsId:'B',
//             testsQuOptionsDesc:'',
//             testsQuOptionsImg: {name:'', url:''},
//             isTestsQuAns:'0'
//           }
//         ]
//       }
//     ]
//   },
//   {
//     testId: '20210320112487654',
//     testsTypeName:'前端',
//     testsName: 'angular測驗',
//     testDTime: '01',
//     testHTime: '12',
//     testMTime: '10',
//     remindTime: '60',
//     memo: '',
//     updateDatetime: '2021/03/15 12:30',
//     updateEmail: 'mrdonnut@tpisoftware.com',
//     updateUserName: '多納茲先生',
//     viewTestsQuList: [
//       {
//         testsQuId:'9d201feb-f81c-4eff-ba16-2641c396e02b',
//         testsQuType:'C',
//         testsQuDesc:'MrDonnut買十送幾？',
//         testsQuImg: {name:'', url:''},
//         viewTestsQuOptionsList:[
//           {
//             testsQuOptionsId:'A',
//             testsQuOptionsDesc:'1',
//             testsQuOptionsImg: {name:'', url:''},
//             isTestsQuAns:'0'
//           },
//           {
//             testsQuOptionsId:'B',
//             testsQuOptionsDesc:'2',
//             testsQuOptionsImg: {name:'', url:''},
//             isTestsQuAns:'1'
//           }
//         ]
//       }
//     ]
//   },
//   {
//     testId: '20210331183078789',
//     testsTypeName:'後端',
//     testsName: 'mangoDB測驗',
//     testDTime: '04',
//     testHTime: '05',
//     testMTime: '30',
//     remindTime: '60',
//     memo: '',
//     updateDatetime: '2021/03/25 13:50',
//     updateEmail: 'mselephant@tpisoftware.com',
//     updateUserName: '大象太太',
//     viewTestsQuList: [
//       {
//         testsQuId:'82fada4e-2f4f-4bcd-bcc6-eadc7561c402',
//         testsQuType:'C',
//         testsQuDesc:'',
//         testsQuImg: {name:'', url:''},
//         viewTestsQuOptionsList:[
//           {
//             testsQuOptionsId:'A',
//             testsQuOptionsDesc:'',
//             testsQuOptionsImg: {name:'', url:''},
//             isTestsQuAns:'1'
//           },
//           {
//             testsQuOptionsId:'B',
//             testsQuOptionsDesc:'',
//             testsQuOptionsImg: {name:'', url:''},
//             isTestsQuAns:'0'
//           }
//         ]
//       }
//     ]
//   },
// ]
