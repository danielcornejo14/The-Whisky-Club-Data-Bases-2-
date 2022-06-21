import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MainframeService } from 'src/app/_services/mainframe-db/mainframe.service';

@Injectable({
  providedIn: 'root'
})
export class WhiskeyAdminResolver implements Resolve<boolean> {
  constructor(
    private mainframe: MainframeService
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.mainframe.getWhiskeyAdmin();
  }
}
