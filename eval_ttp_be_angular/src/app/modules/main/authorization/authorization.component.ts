import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavService } from 'src/app/common/components/sidenav/nav.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  constructor() {
   }

  ngOnInit(): void {
  }
}
