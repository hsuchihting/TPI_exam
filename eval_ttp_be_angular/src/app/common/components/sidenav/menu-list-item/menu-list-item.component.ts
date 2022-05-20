import {Component, HostBinding, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {NavItem} from '../nav-item';
import {Router} from '@angular/router';
import {NavService} from '../nav.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(90deg)'})),
      state('expanded', style({transform: 'rotate(0deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ]),
    trigger(
      'inOutAnimation', 
      [
        state('collapsed', style({
          height: '0px',
          opacity: '0',
          overflow: 'hidden',
          // display: 'none'
      })),
      state('expanded', style({
          height: '*',
          opacity: '1',
          // display: 'block'
      })),
      transition('collapsed => expanded', animate('200ms ease-in')),
      transition('expanded => collapsed', animate('200ms ease-out'))
      ]
    )
  ]
})
export class MenuListItemComponent {
  expanded: boolean = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem;
  @Input() activeName!: string;
  @Input() depth: number;
  @Output() acName = new EventEmitter<string>();

  constructor(public navService: NavService,
              public router: Router) {
    this.item = [] as any;
    this.depth = 0;
    // if (this.depth === undefined) {
    //   this.depth = 0;
    // }
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    }
    if (item.children && item.children.length) {
      if(item.displayName !== this.activeName) {
        this.expanded = true
        this.acName.emit(item.displayName);
      } else {
        this.expanded = !this.expanded;
      }
    }
  }
}
