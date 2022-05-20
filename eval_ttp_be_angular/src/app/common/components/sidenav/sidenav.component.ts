import { Component, OnInit } from '@angular/core';
import { NavItem } from './nav-item';
import { SessionStorageService } from './../../services/session-storage.service';
import { RoleFunction } from 'src/app/models/login/verifyPermissionsModel';
import { StorageKey } from 'src/app/enum/storage-key.enum';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  activeName!: string;
  navItems: NavItem[] = [];
  mockItems: NavItem[] = [
    {
      id: '1',
      displayName: '後台單位權限管理',
      iconName: 'recent_actors',
    },
    {
      id: 'role_setting',
      displayName: '角色設定',
      iconName: 'group',
      route: '/main/authorization/role',
    },
    {
      id: '2',
      displayName: '測驗管理',
      iconName: 'quiz',
    },
    {
      id: 'email_setting',
      displayName: 'E-mail範本設定',
      iconName: 'email',
      route: '/main/exam/email',
    },
    {
      id: 'sysdesc_setting',
      displayName: '系統說明設定',
      iconName: 'settings_applications',
      route: '/main/exam/system',
    },
    {
      id: 'privacy_setting',
      displayName: '隱私權政策設定',
      iconName: 'privacy_tip',
      route: '/main/exam/privacy',
    },
    {
      id: 'testdesc_setting',
      displayName: '測驗說明',
      iconName: 'book',
      route: '/main/exam/test',
    },
    {
      id: 'tests_setting',
      displayName: '試卷設定',
      iconName: 'subject',
      route: '/main/exam/test-paper',
    },
    {
      id: 'testsgroup_setting',
      displayName: '題本設定',
      iconName: 'dynamic_form',
      route: '/main/exam/test-book',
    },
    {
      id: '3',
      displayName: '受測者管理',
      iconName: 'assignment_ind',
    },
    {
      id: 'tester_setting',
      displayName: '受測者設定',
      iconName: 'settings_accessibility',
      route: '/main/participant/participant-setting',
    },
    {
      id: 'testerresult_setting',
      displayName: '測驗結果查詢',
      iconName: 'find_in_page',
      route: '/main/participant/test-result',
    },
    {
      id: '4',
      displayName: '參數管理',
      iconName: 'settings',
    },
    {
      id: 'subject_setting',
      displayName: '題目類別設定',
      iconName: 'topic',
      route: '/main/parameter/category-setting',
    },
    {
      id: 'title_setting',
      displayName: '職務別設定',
      iconName: 'work',
      route: '/main/parameter/position-setting',
    },
    {
      id: 'employ_setting',
      displayName: '就業狀況設定',
      iconName: 'badge',
      route: '/main/parameter/employee-status',
    },
  ];
  constructor(private sessionService: SessionStorageService) {}

  ngOnInit(): void {
    const authMenu: RoleFunction[] = this.sessionService.get(
      StorageKey.menu
    ) as RoleFunction[];
    if (!authMenu) return;
    this.navItems = authMenu.map((item) => {
      const index = this.mockItems.findIndex(
        (mock) => mock.id === item.mainMenu
      );
      const children = item.subMenu.map((child) => {
        const id = child.funcId.split('.')[0];
        const cIndex = this.mockItems.findIndex((mock) => mock.id === id);
        return { ...child, ...this.mockItems[cIndex] };
      });

      return { ...this.mockItems[index], ...item, children };
    });
  }

  getAcName(ev: any) {
    this.activeName = ev as string;
  }
}
