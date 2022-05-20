import { HomeDataResponse } from './../../models/home-data-test';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/common/base/base.service';
import { Observable } from 'rxjs';
import { environment } from '@env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OptionsModel } from 'src/app/models/OptionsModel';

@Injectable({
  providedIn: 'root'
})
export class MainService extends BaseService {


  test():HomeDataResponse{
    let data:HomeDataResponse={value1:"v100",value2:"v2",value3:"v3"};
    return data;
  }







}
