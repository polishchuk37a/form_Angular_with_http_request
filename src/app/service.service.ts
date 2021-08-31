import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JsonData} from "./json-data";


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private readonly http: HttpClient) { }

  getData(word: string):Observable<JsonData>{
    return this.http.get<JsonData>("https://chroniclingamerica.loc.gov/search/titles/results/?terms=" + word + "&format=json");
  }
}
