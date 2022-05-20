import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavService } from 'src/app/common/components/sidenav/nav.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
@ViewChild('drawer') appDrawer!: ElementRef;
breadcrumbs$!: Observable<any>;
  constructor(private navService: NavService) {  
   }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }
}
