import { Component, OnInit } from '@angular/core';
import {ServiceService} from "../service.service";
import {pipe} from "rxjs";
import {tap} from "rxjs/operators";
import {Data} from "../data";

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.scss']
})
export class MyFormComponent implements OnInit {

  dataJson: Data[] = [];

  constructor(private readonly httpService: ServiceService) { }

  ngOnInit(): void {
  }

  getInfo(writtenWord: string) {
    this.httpService.getData(writtenWord)
      .pipe(
        tap(item => {
          this.dataJson = item.items
          console.log(this.dataJson)
        })
      ).subscribe()
  }
}
