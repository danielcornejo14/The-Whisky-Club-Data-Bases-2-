import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Whisky} from "../../_interfaces/Whiskey/Whisky";
import {environment} from "../../../environments/environment";
import {Presentation} from "../../_interfaces/Whiskey/Presentation";
import {WhiskyType} from "../../_interfaces/Whiskey/WhiskyType";
import {Supplier} from "../../_interfaces/Whiskey/Supplier";
import {Currency} from "../../_interfaces/Whiskey/Currency";
import { Customer } from 'src/app/_interfaces/Customer/Customer';
import { PaymentMethod } from 'src/app/_interfaces/Customer/PaymentMethod';
import { Subscription } from 'src/app/_interfaces/Misc/Subscription';

const DB_URL = environment.apiUrl+'/main-db'

@Injectable({
  providedIn: 'root'
})
export class MainframeService {

  constructor(
    private http: HttpClient
  ) { }


  // =================
  // ==== Insert =====
  // =================

  createWhiskey(whiskey: Whisky){
    return this.http.post(DB_URL+'/insertWhiskey', whiskey)
  }

  createCustomer(customer: Customer){
    return this.http.post(DB_URL+'/insertCustomer', customer)
  }

  createSub(sub: Subscription){
    return this.http.post(DB_URL+'/insertSubscription', sub)
  }

  createType(type: WhiskyType){
    return this.http.post(DB_URL+'/insertWhiskeyType', type)
  }

  createPresentation(presentation: Presentation){
    return this.http.post(DB_URL+'/insertPresentation', presentation)
  }

  createCurrency(currency: Currency){
    return this.http.post(DB_URL+'/insertCurrency', currency)
  }

  // =================
  // ==== Select =====
  // =================
  getWhiskey(){
    return this.http.get<Whisky[]>(DB_URL+'/selectWhiskey')
  }
  getPresentation(){
    return this.http.get<Presentation[]>(DB_URL+'/selectPresentation')
  }
  getWhiskeyType(){
    return this.http.get<WhiskyType[]>(DB_URL+'/selectWhiskeyType')
  }
  getSupplier(){
    return this.http.get<Supplier[]>(DB_URL+'/selectSupplier')
  }
  getCurrency(){
    return this.http.get<Currency[]>(DB_URL+'/selectCurrency')
  }
  getPaymentMethods(){
    return this.http.get<PaymentMethod[]>(DB_URL+'/selectPaymentMethod')
  }

  getSubscriptions(){
    return this.http.get<Subscription[]>(DB_URL+'/selectSubscription')
  }

  // =================
  // ==== Updates ====
  // =================

  updateWhiskey(whiskey: Whisky){
    return this.http.post(DB_URL+'/updateWhiskey', whiskey)
  }

  updateSub(sub: Subscription){
    return this.http.post(DB_URL+'/updateSubscription', sub)
  }

  updateType(type: WhiskyType){
    return this.http.post(DB_URL+'/updateWhiskeyType', type)
  }

  updatePresentation(presentation: Presentation){
    return this.http.post(DB_URL+'/updatePresentation', presentation)
  }

  updateCurrency(currency: Currency){
    return this.http.post(DB_URL+'/updateCurrency', currency)
  }

  // =================
  // ==== Deletes ====
  // =================

  deleteWhiskey(whiskeyId: number){
    return this.http.post(DB_URL+'/deleteWhiskey', {"id":whiskeyId})
  }

  deleteSub(subId: number){
    return this.http.post(DB_URL+'/deleteSubscription', {"id":subId})
  }

  deleteType(typeId: number){
    return this.http.post(DB_URL+'/deleteWhiskeyType', {"id":typeId})
  }

  deletePresentation(presentationId: number){
    return this.http.post(DB_URL+'/deletePresentation', {"id": presentationId})
  }

  deleteCurrency(currencyId: number){
    return this.http.post(DB_URL+'/deleteCurrency', {"id": currencyId})
  }

}
