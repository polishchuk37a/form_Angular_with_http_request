import { Component, OnInit } from '@angular/core';
import {ServiceService} from "../service.service";
import {tap} from "rxjs/operators";
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

  //searching data with the written word in input from http request
  // getInfo(writtenWord: string) {
  //   this.httpService.getData(writtenWord)
  //     .pipe(
  //       tap(item => {
  //         this.dataJson = item.items
  //       })
  //     ).subscribe()
  // }

  ngOnInit(): void {
    this.form.get("userInputText")?.valueChanges.subscribe(selectedValue =>{
      this.httpService.getData(selectedValue)
        .pipe(
          tap(item => {
            this.dataJson = item.items
          })
        ).subscribe()

      console.log(this.form.get("userInputText")?.value)
    })
  }

  get f(){
    return this.form.controls;
  }

}
