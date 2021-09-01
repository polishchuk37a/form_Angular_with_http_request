import { Component, OnInit } from '@angular/core';
import {ServiceService} from "../service.service";
import {delay, switchMap, tap} from "rxjs/operators";
import {Data} from "../data";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.scss']
})
export class MyFormComponent implements OnInit {

  form: FormGroup;
  dataJson: Data[] = [];

  constructor(private readonly httpService: ServiceService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      userInputText: new FormControl('')
    })
  }

  ngOnInit(): void {
    //getting written word from input using switchMap
    this.form.get("userInputText")?.valueChanges.pipe(
      switchMap((val) => {
          console.log(val);
          return this.httpService.getData(val)
        }),
      //display cards with got data from switchMap
      tap(item => {
          this.dataJson = item.items
      })
    ).subscribe()
  }
}
