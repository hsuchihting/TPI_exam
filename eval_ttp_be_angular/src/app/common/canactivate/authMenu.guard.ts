import { Inject, Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  NavigationEnd,
  Data,
} from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { SessionStorageService } from '../services/session-storage.service';
import { StorageKey } from 'src/app/enum/storage-key.enum';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthMenuGuard implements CanActivate {
  constructor(
    private sessionService: SessionStorageService,
    private router: Router
  ) {}

  authMenu: any[] = [];
  testMenu = MENU_ELEMENT_DATA;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const menuId = route.data.menuId;
    return this.doAction(menuId);
  }

  doAction(menuId: string) {
    this.authMenu = this.sessionService.get(StorageKey.menu) as any[];
    //console.log('AuthMenuGuard = ', this.authMenu);
    //console.log('menuId = ', menuId);
    //console.log('testMenu = ', this.testMenu);
    //權限管理
    let checkView_role = false;
    //測驗管理
    let checkView_email = false;
    let checkView_privacy = false;
    let checkView_sysdesc = false;
    let checkView_testdesc = false;
    let checkView_testsgroup = false;
    let checkView_tests = false;
    //受測者管理
    let checkView_testerresult = false;
    let checkView_tester = false;
    //參數管理
    let checkView_employ = false;
    let checkView_subject = false;
    let checkView_title = false;

    this.authMenu.forEach((item) => {
      switch (item.mainMenu) {
        case '1'://權限管理
          checkView_role = item.subMenu.some((child: any) =>
            child.funcId.includes('role_setting.view')
          );
          break;
        case '2': //測驗管理
          checkView_email = item.subMenu.some((child: any) =>
            child.funcId.includes('email_setting.view')
          );
          checkView_privacy = item.subMenu.some((child: any) =>
            child.funcId.includes('privacy_setting.view')
          );
          checkView_sysdesc = item.subMenu.some((child: any) =>
            child.funcId.includes('sysdesc_setting.view')
          );
          checkView_testdesc = item.subMenu.some((child: any) =>
            child.funcId.includes('testdesc_setting.view')
          );
          checkView_testsgroup = item.subMenu.some((child: any) =>
            child.funcId.includes('testsgroup_setting.view')
          );
          checkView_tests = item.subMenu.some((child: any) =>
            child.funcId.includes('tests_setting.view')
          );
          break;
        case '3': //受測者管理
          checkView_testerresult = item.subMenu.some((child: any) =>
            child.funcId.includes('testerresult_setting.view')
          );
          checkView_tester = item.subMenu.some((child: any) =>
            child.funcId.includes('tester_setting.view')
          );
          break;
        case '4': //參數管理
          checkView_employ = item.subMenu.some((child: any) =>
            child.funcId.includes('employ_setting.view')
          );
          checkView_subject = item.subMenu.some((child: any) =>
            child.funcId.includes('subject_setting.view')
          );
          checkView_title = item.subMenu.some((child: any) =>
            child.funcId.includes('title_setting.view')
          );
          break;
      }
    });

    switch (menuId) {
      case 'role_setting.view': //權限管理-角色設定
        return checkView_role;
      case 'email_setting.view': //測驗管理-Email範本設定
        return checkView_email;
      case 'privacy_setting.view': //測驗管理-隱私權政策設定
        return checkView_privacy;
      case 'sysdesc_setting.view': //測驗管理-系統說明設定
        return checkView_sysdesc;
      case 'testdesc_setting.view': //測驗管理-測驗說明設定
        return checkView_testdesc;
      case 'testsgroup_setting.view': //測驗管理-題本設定
        return checkView_testsgroup;
      case 'tests_setting.view': //測驗管理-試卷設定
        return checkView_tests;
      case 'testerresult_setting.view': //受測者管理-受測結果查詢
        return checkView_testerresult;
      case 'tester_setting.view': //受測者管理-受測者設定
        return checkView_tester;
      case 'employ_setting.view': //參數管理-就業狀況設定
        return checkView_employ;
      case 'subject_setting.view': //參數管理-題目類型設定
        return checkView_subject;
      case 'title_setting.view': //參數管理-職務別設定
        return checkView_title;
      default:
        return true;
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
        funcId: 'role_setting.view',
        funcName: '角色設定可視',
        function: [
          {
            funcId: 'role_setting.add',
            funcName: '角色設定新增',
          },
          {
            funcId: 'role_setting.delete',
            funcName: '角色設定刪除',
          },
          {
            funcId: 'role_setting.edit',
            funcName: '角色設定編輯',
          },
        ],
      },
    ],
  },
  {
    mainMenu: '2',
    mainMenuName: '測驗管理',
    subMenu: [
      {
        funcId: 'email_setting.view',
        funcName: 'Email範本設定可視',
        function: [
          {
            funcId: 'email_setting.add',
            funcName: 'Email範本設定新增',
          },
          {
            funcId: 'email_setting.delete',
            funcName: 'Email範本設定刪除',
          },
          {
            funcId: 'email_setting.edit',
            funcName: 'Email範本設定編輯',
          },
        ],
      },
      {
        funcId: 'privacy_setting.view',
        funcName: '隱私權政策設定可視',
        function: [
          {
            funcId: 'privacy_setting.add',
            funcName: '隱私權政策設定新增',
          },
          {
            funcId: 'privacy_setting.delete',
            funcName: '隱私權政策設定刪除',
          },
          {
            funcId: 'privacy_setting.edit',
            funcName: '隱私權政策設定編輯',
          },
        ],
      },
      {
        funcId: 'sysdesc_setting.view',
        funcName: '系統說明設定可視',
        function: [
          {
            funcId: 'sysdesc_setting.add',
            funcName: '系統說明設定新增',
          },
          {
            funcId: 'sysdesc_setting.delete',
            funcName: '系統說明設定刪除',
          },
          {
            funcId: 'sysdesc_setting.edit',
            funcName: '系統說明設定編輯',
          },
        ],
      },
      {
        funcId: 'testdesc_setting.view',
        funcName: '測驗說明設定可視',
        function: [
          {
            funcId: 'testdesc_setting.add',
            funcName: '測驗說明設定新增',
          },
          {
            funcId: 'testdesc_setting.delete',
            funcName: '測驗說明設定刪除',
          },
          {
            funcId: 'testdesc_setting.edit',
            funcName: '測驗說明設定編輯',
          },
        ],
      },
      {
        funcId: 'testsgroup_setting.view',
        funcName: '題本設定可視',
        function: [
          {
            funcId: 'testsgroup_setting.add',
            funcName: '題本設定新增',
          },
          {
            funcId: 'testsgroup_setting.delete',
            funcName: '題本設定刪除',
          },
          {
            funcId: 'testsgroup_setting.edit',
            funcName: '題本設定編輯',
          },
        ],
      },
      {
        funcId: 'tests_setting.view',
        funcName: '試卷設定可視',
        function: [
          {
            funcId: 'tests_setting.add',
            funcName: '試卷設定新增',
          },
          {
            funcId: 'tests_setting.delete',
            funcName: '試卷設定刪除',
          },
          {
            funcId: 'tests_setting.edit',
            funcName: '試卷設定編輯',
          },
        ],
      },
    ],
  },
  {
    mainMenu: '3',
    mainMenuName: '受測者管理',
    subMenu: [
      {
        funcId: 'testerresult_setting.view',
        funcName: '受測結果查詢可視',
        function: [],
      },
      {
        funcId: 'tester_setting.view',
        funcName: '受測者設定可視',
        function: [
          {
            funcId: 'tester_setting.add',
            funcName: '受測者設定新增',
          },
          {
            funcId: 'tester_setting.delete',
            funcName: '受測者設定刪除',
          },
          {
            funcId: 'tester_setting.edit',
            funcName: '受測者設定編輯',
          },
        ],
      },
    ],
  },
  {
    mainMenu: '4',
    mainMenuName: '參數管理',
    subMenu: [
      {
        funcId: 'employ_setting.view',
        funcName: '就業狀況設定可視',
        function: [
          {
            funcId: 'employ_setting.add',
            funcName: '就業狀況設定新增',
          },
          {
            funcId: 'employ_setting.delete',
            funcName: '就業狀況設定刪除',
          },
          {
            funcId: 'employ_setting.edit',
            funcName: '就業狀況設定編輯',
          },
        ],
      },
      {
        funcId: 'subject_setting.view',
        funcName: '題目類型設定可視',
        function: [
          {
            funcId: 'subject_setting.add',
            funcName: '題目類型設定新增',
          },
          {
            funcId: 'subject_setting.delete',
            funcName: '題目類型設定刪除',
          },
          {
            funcId: 'subject_setting.edit',
            funcName: '題目類型設定編輯',
          },
        ],
      },
      {
        funcId: 'title_setting.view',
        funcName: '職務別設定可視',
        function: [
          {
            funcId: 'title_setting.add',
            funcName: '職務別設定新增',
          },
          {
            funcId: 'title_setting.delete',
            funcName: '職務別設定刪除',
          },
          {
            funcId: 'title_setting.edit',
            funcName: '職務別設定編輯',
          },
        ],
      },
    ],
  },
];
