
import { Component, Directive, Injectable } from '@angular/core';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { MainService } from '../../main.service';


@Injectable({
  providedIn: 'root'
})

export class HomeViewModel extends BaseViewModel {

  constructor(private mainService: MainService) { super(); }
  public testValue1: string = ""
  public testValue2: string = ""
  public testValue3: string = ""

  init(): void {
    let result = this.mainService.test();
    this.testValue1 = result.value1;
    this.testValue2 = result.value2;
    this.testValue3 = result.value3;
  }

}
