import { Directive, Input, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatRadioButton } from '@angular/material/radio';
import { SessionStorageService } from 'src/app/common/services/session-storage.service';
import { StorageKey } from 'src/app/enum/storage-key.enum';

@Directive({
  selector: '[appCheckAuth]',
})
export class CheckUserAuthDirective implements OnInit {
  //雙重判斷:題本、試卷、參數管理
  //檢視按鈕不需判斷
  //無"可視"權限 代表那整頁無法被看到

  authMenu: any[] = [];
  @Input() auth_btn!: MatButton;
  @Input() auth_radioBtn!: MatRadioButton;
  @Input() auth_type!: string;
  @Input() auth_btnEnable?: boolean; //API回傳值

  testMenu=MENU_ELEMENT_DATA

  constructor(private sessionService: SessionStorageService) {}

  ngOnInit(): void {
    //console.log('CheckUserAuthDirective ');
    this.authMenu = this.sessionService.get(StorageKey.menu) as any[];
    // console.log('authMenu =',this.authMenu);
    this.authMenu.forEach((item) => {
      //console.log('item =' , item);
      item.subMenu.forEach((element: any) => {
        //console.log('element =', element);
        // console.log(element.funcId,' ,  = ' , checkType_view);
        const checkType_add = element.function.some((child: any) =>
          child.funcId.includes('add')
        );
        const checkType_delete = element.function.some((child: any) =>
          child.funcId.includes('delete')
        );
        const checkType_edit = element.function.some((child: any) =>
          child.funcId.includes('edit')
        );
        switch (element.funcId) {
          case 'role_setting.view': //權限管理-角色設定
            this.auth_role_setting(
              checkType_add,
              checkType_delete,
              checkType_edit
            );
            break;
          case 'email_setting.view': //測驗管理-Email範本設定
            this.auth_email_setting(
              checkType_add,
              checkType_delete,
              checkType_edit
            );
            break;
          case 'privacy_setting.view': //測驗管理-隱私權政策設定
            this.auth_privacy_setting(
              checkType_add,
              checkType_delete,
              checkType_edit
            );
            break;
          case 'sysdesc_setting.view': //測驗管理-系統說明設定
            this.auth_sysdesc_setting(
              checkType_add,
              checkType_delete,
              checkType_edit
            );
            break;
          case 'testdesc_setting.view': //測驗管理-測驗說明設定
            this.auth_testdesc_setting(
              checkType_add,
              checkType_delete,
              checkType_edit
            );
            break;
          case 'testsgroup_setting.view': //測驗管理-題本設定
            this.auth_testsgroup_setting(
              checkType_add,
              checkType_delete,
              checkType_edit
            );
            break;
          case 'tests_setting.view': //測驗管理-試卷設定
            this.auth_tests_setting(
              checkType_add,
              checkType_delete,
              checkType_edit
            );
            break;
          case 'testerresult_setting.view': //受測者管理-受測結果查詢
            break;
          case 'tester_setting.view': //受測者管理-受測者設定
            this.auth_tester_setting(
              checkType_add,
              checkType_delete,
              checkType_edit
            );
            break;
          case 'employ_setting.view': //參數管理-就業狀況設定
            this.auth_employ_setting(
              checkType_add,
              checkType_delete,
              checkType_edit
            );
            break;
          case 'subject_setting.view': //參數管理-題目類型設定
            this.auth_subject_setting(
              checkType_add,
              checkType_delete,
              checkType_edit
            );
            break;
          case 'title_setting.view': //參數管理-職務別設定
            this.auth_title_setting(
              checkType_add,
              checkType_delete,
              checkType_edit
            );
            break;

          default:
            break;
        }
      });
    });
  }

  //*權限管理-角色設定
  auth_role_setting(
    checkType_add: boolean,
    checkType_delete: boolean,
    checkType_edit: boolean
  ) {
    //如有編輯權限則顯示設定成員、角色功能修改
    //如有新增權限則顯示新增角色
    switch (this.auth_type) {
      case 'btn_role_setting':
        if (!checkType_edit) {
          this.auth_btn.disabled = true;
        }
        break;
      case 'btn_role_edit':
        if (!checkType_edit) {
          this.auth_btn.disabled = true;
        }
        break;
      case 'btn_role_add':
        if (!checkType_add) {
          this.auth_btn.disabled = true;
        }
        break;
    }
  }

  //*測驗管理-Email範本設定
  auth_email_setting(
    checkType_add: boolean,
    checkType_delete: boolean,
    checkType_edit: boolean
  ) {
    //如有編輯權限則顯示編輯按鈕
    //如果刪除權限則顯示刪除按鈕
    switch (this.auth_type) {
      case 'btn_email_edit':
        if (!checkType_edit) {
          this.auth_btn.disabled = true;
        }
        break;
      case 'btn_email_del':
        if (!checkType_delete) {
          this.auth_btn.disabled = true;
        }
        break;
    }
  }

  //*測驗管理-隱私權政策設定
  auth_privacy_setting(
    checkType_add: boolean,
    checkType_delete: boolean,
    checkType_edit: boolean
  ) {
    //如有編輯權限則顯示編輯按鈕
    //如果刪除權限則顯示刪除按鈕
    switch (this.auth_type) {
      case 'btn_privacy_edit':
        if (!checkType_edit) {
          this.auth_btn.disabled = true;
        }
        break;
      case 'btn_privacy_del':
        if (!checkType_delete) {
          this.auth_btn.disabled = true;
        }
        break;
    }
  }

  //*測驗管理-系統說明設定
  auth_sysdesc_setting(
    checkType_add: boolean,
    checkType_delete: boolean,
    checkType_edit: boolean
  ) {
    //如有編輯權限則顯示編輯按鈕
    //如果刪除權限則顯示刪除按鈕
    switch (this.auth_type) {
      case 'btn_system_edit':
        if (!checkType_edit) {
          this.auth_btn.disabled = true;
        }
        break;
      case 'btn_system_del':
        if (!checkType_delete) {
          this.auth_btn.disabled = true;
        }
        break;
    }
  }

  //*測驗管理-測驗說明設定
  auth_testdesc_setting(
    checkType_add: boolean,
    checkType_delete: boolean,
    checkType_edit: boolean
  ) {
    //如有編輯權限則顯示編輯按鈕
    //如果刪除權限則顯示刪除按鈕
    switch (this.auth_type) {
      case 'btn_testdesc_edit':
        if (!checkType_edit) {
          this.auth_btn.disabled = true;
        }
        break;
      case 'btn_testdesc_del':
        if (!checkType_delete) {
          this.auth_btn.disabled = true;
        }
        break;
    }
  }

  //*測驗管理-題本設定
  auth_testsgroup_setting(
    checkType_add: boolean,
    checkType_delete: boolean,
    checkType_edit: boolean
  ) {
    // console.log('check = ' , checkType_view,checkType_add,checkType_delete,checkType_edit);

    //判斷A :
    //若登入角色擁有此功能【新增權限】，則顯示新增按鈕。
    //若登入角色擁有此功能【編輯權限】，可顯示切換使用狀態(啟用或停用)和操作的編輯按鈕。
    //若登入角色擁有此功能【刪除權限】，可顯示操作的刪除按鈕。
    //判斷B:EB080101回傳action : Y：可編輯與刪除、N：不可編輯與刪除
    switch (this.auth_type) {
      case 'btn_testsgroup_add':
        if (!checkType_add) {
          this.auth_btn.disabled = true;
        }
        break;
      case 'btn_testsgroup_edit':
        if (!checkType_edit || !this.auth_btnEnable) {
          this.auth_btn.disabled = true;
        }
        break;
      case 'btn_testsgroup_del':
        if (!checkType_delete || !this.auth_btnEnable) {
          this.auth_btn.disabled = true;
        }
        break;
      case 'btn_testsgroup_enable':
        if (!checkType_edit) {
          this.auth_radioBtn.disabled = true;
        }
        break;
      case 'btn_testsgroup_disable':
        if (!checkType_edit) {
          this.auth_radioBtn.disabled = true;
        }
        break;
    }
  }

  //*測驗管理-試卷設定
  auth_tests_setting(
    checkType_add: boolean,
    checkType_delete: boolean,
    checkType_edit: boolean
  ) {
    //判斷A :
    //若登入角色擁有此功能【新增權限】，則顯示新增按鈕
    //若登入角色擁有此功能【編輯權限】，可顯示切換使用狀態(啟用或停用)和操作的編輯按鈕。
    //若登入角色擁有此功能【刪除權限】，可顯示操作的刪除按鈕。
    //判斷B :
    //EB070101回傳 isEdit : Y：可編輯、N：不可編輯
    //EB070101回傳 isDelete : Y：可刪除、N：不刪除
    switch (this.auth_type) {
      case 'btn_tests_add':
        if (!checkType_add) {
          this.auth_btn.disabled = true;
        }
        break;
      case 'btn_tests_edit':
        if (!checkType_edit || !this.auth_btnEnable) {
          this.auth_btn.disabled = true;
        }
        break;
      case 'btn_tests_del':
        if (!checkType_delete || !this.auth_btnEnable) {
          this.auth_btn.disabled = true;
        }
        break;
      case 'btn_tests_enable':
        if (!checkType_edit) {
          this.auth_radioBtn.disabled = true;
        }
        break;
      case 'btn_tests_disable':
        if (!checkType_edit) {
          this.auth_radioBtn.disabled = true;
        }
        break;
    }
  }

  //*受測者管理-受測結果查詢

  //*受測者管理-受測者設定
  auth_tester_setting(
    checkType_add: boolean,
    checkType_delete: boolean,
    checkType_edit: boolean
  ) {
    //如有編輯權限則顯示寄送、編輯按鈕
    //如有刪除權限則顯示寄送、刪除按鈕
    switch (this.auth_type) {
      case 'btn_paticipant_edit':
        if (!checkType_edit) {
          this.auth_btn.disabled = true;
        }
        break;
      case 'btn_paticipant_del':
        if (!checkType_delete) {
          this.auth_btn.disabled = true;
        }
        break;
      case 'btn_paticipant_send':
        if (!checkType_edit || !checkType_delete) {
          this.auth_btn.disabled = true;
        }
        break;
    }
  }

  //*參數管理-就業狀況設定
  auth_employ_setting(
    checkType_add: boolean,
    checkType_delete: boolean,
    checkType_edit: boolean
  ) {
    //判斷A : 如有編輯權限則顯示編輯按鈕 / 如果刪除權限則顯示刪除按鈕
    //判斷B : EB120101回傳deletable(可否刪除) : 1:可/0:不可
    switch (this.auth_type) {
      case 'btn_employ_edit':
        if (!checkType_edit) {
          this.auth_btn.disabled = true;
        }
        break;
      case 'btn_employ_del':
        if (!checkType_delete || !this.auth_btnEnable) {
          this.auth_btn.disabled = true;
        }
        break;
    }
  }

  //*參數管理-題目類型設定
  auth_subject_setting(
    checkType_add: boolean,
    checkType_delete: boolean,
    checkType_edit: boolean
  ) {
    //判斷A : 如有編輯權限則顯示編輯按鈕 / 如果刪除權限則顯示刪除按鈕
    //判斷B :EB100101回傳editable(可否編輯/刪除) : 1:可/0:不可
    switch (this.auth_type) {
      case 'btn_subject_edit':
        if (!checkType_edit || !this.auth_btnEnable) {
          this.auth_btn.disabled = true;
        }
        break;
      case 'btn_subject_del':
        if (!checkType_delete || !this.auth_btnEnable) {
          this.auth_btn.disabled = true;
        }
        break;
    }
  }

  //*參數管理-職務別設定
  auth_title_setting(
    checkType_add: boolean,
    checkType_delete: boolean,
    checkType_edit: boolean
  ) {
    //判斷A : 如有編輯權限則顯示編輯按鈕 / 如果刪除權限則顯示刪除按鈕
    //判斷B :EB110101回傳editable(可否編輯/刪除) : 1:可/0:不可
    switch (this.auth_type) {
      case 'btn_title_edit':
        if (!checkType_edit || !this.auth_btnEnable) {
          this.auth_btn.disabled = true;
        }
        break;
      case 'btn_title_del':
        if (!checkType_delete || !this.auth_btnEnable) {
          this.auth_btn.disabled = true;
        }
        break;
    }
  }
}

export interface MenuElement {
  mainMenu: string;
  mainMenuName: string;
  subMenu: subMenuElement[];
}
export interface subMenuElement {
  funcId: string;
  funcName: string;
  function: functionElement[];
}
export interface functionElement {
  funcId: string;
  funcName: string;
}
export const MENU_ELEMENT_DATA: MenuElement[] = [
  {
    mainMenu: '1',
    mainMenuName: '權限管理',
    subMenu: [
      {
        funcId:'role_setting.view',
        funcName:'角色設定可視',
        function:[
          {
            funcId:'role_setting.add',
            funcName:'角色設定新增'
          },
          {
            funcId:'role_setting.delete',
            funcName:'角色設定刪除'
          },
          {
            funcId:'role_setting.edit',
            funcName:'角色設定編輯'
          },
        ]

      }
    ]
  },
  {
    mainMenu: '2',
    mainMenuName: '測驗管理',
    subMenu: [
      {
        funcId:'email_setting.view',
        funcName:'Email範本設定可視',
        function:[
          {
            funcId:'email_setting.add',
            funcName:'Email範本設定新增'
          },
          {
            funcId:'email_setting.delete',
            funcName:'Email範本設定刪除'
          },
          {
            funcId:'email_setting.edit',
            funcName:'Email範本設定編輯'
          },
        ]
      },
      {
        funcId:'privacy_setting.view',
        funcName:'隱私權政策設定可視',
        function:[
          {
            funcId:'privacy_setting.add',
            funcName:'隱私權政策設定新增'
          },
          {
            funcId:'privacy_setting.delete',
            funcName:'隱私權政策設定刪除'
          },
          {
            funcId:'privacy_setting.edit',
            funcName:'隱私權政策設定編輯'
          },
        ]
      },
      {
        funcId:'sysdesc_setting.view',
        funcName:'系統說明設定可視',
        function:[
          {
            funcId:'sysdesc_setting.add',
            funcName:'系統說明設定新增'
          },
          {
            funcId:'sysdesc_setting.delete',
            funcName:'系統說明設定刪除'
          },
          {
            funcId:'sysdesc_setting.edit',
            funcName:'系統說明設定編輯'
          },
        ]
      },
      {
        funcId:'testdesc_setting.view',
        funcName:'測驗說明設定可視',
        function:[
          {
            funcId:'testdesc_setting.add',
            funcName:'測驗說明設定新增'
          },
          {
            funcId:'testdesc_setting.delete',
            funcName:'測驗說明設定刪除'
          },
          {
            funcId:'testdesc_setting.edit',
            funcName:'測驗說明設定編輯'
          },
        ]
      },
      {
        funcId:'testsgroup_setting.view',
        funcName:'題本設定可視',
        function:[
          {
            funcId:'testsgroup_setting.add',
            funcName:'題本設定新增'
          },
          {
            funcId:'testsgroup_setting.delete',
            funcName:'題本設定刪除'
          },
          {
            funcId:'testsgroup_setting.edit',
            funcName:'題本設定編輯'
          },
        ]
      },
      {
        funcId:'tests_setting.view',
        funcName:'試卷設定可視',
        function:[
          {
            funcId:'tests_setting.add',
            funcName:'試卷設定新增'
          },
          {
            funcId:'tests_setting.delete',
            funcName:'試卷設定刪除'
          },
          {
            funcId:'tests_setting.edit',
            funcName:'試卷設定編輯'
          },
        ]
      },


    ]
  },
  {
    mainMenu: '3',
    mainMenuName: '受測者管理',
    subMenu: [
      {
        funcId:'testerresult_setting.view',
        funcName:'受測結果查詢可視',
        function:[
        ]
      },
      {
        funcId:'tester_setting.view',
        funcName:'受測者設定可視',
        function:[
          {
            funcId:'tester_setting.add',
            funcName:'受測者設定新增'
          },
          {
            funcId:'tester_setting.delete',
            funcName:'受測者設定刪除'
          },
          {
            funcId:'tester_setting.edit',
            funcName:'受測者設定編輯'
          },
        ]
      },

    ]
  },
  {
    mainMenu: '4',
    mainMenuName: '參數管理',
    subMenu: [
      {
        funcId:'employ_setting.view',
        funcName:'就業狀況設定可視',
        function:[
          {
            funcId:'employ_setting.add',
            funcName:'就業狀況設定新增'
          },
          {
            funcId:'employ_setting.delete',
            funcName:'就業狀況設定刪除'
          },
          {
            funcId:'employ_setting.edit',
            funcName:'就業狀況設定編輯'
          },
        ]
      },
      {
        funcId:'subject_setting.view',
        funcName:'題目類型設定可視',
        function:[
          {
            funcId:'subject_setting.add',
            funcName:'題目類型設定新增'
          },
          {
            funcId:'subject_setting.delete',
            funcName:'題目類型設定刪除'
          },
          {
            funcId:'subject_setting.edit',
            funcName:'題目類型設定編輯'
          },
        ]
      },
      {
        funcId:'title_setting.view',
        funcName:'職務別設定可視',
        function:[
          {
            funcId:'title_setting.add',
            funcName:'職務別設定新增'
          },
          {
            funcId:'title_setting.delete',
            funcName:'職務別設定刪除'
          },
          {
            funcId:'title_setting.edit',
            funcName:'職務別設定編輯'
          },
        ]
      },

    ]
  },


];
