import {Component, Directive, OnInit} from '@angular/core';
import {Dot} from './Dot';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormControl, NG_VALIDATORS, Validator, ValidatorFn} from '@angular/forms';
import {ApiService} from '../../../api.service';
import {AuthService} from '../../../auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-area-render',
  templateUrl: './area.component.html',
  styleUrls: ['../maindesign.component.css'],
  providers: [ApiService]
})

export class AreaComponent implements OnInit {
  constructor(
    private _router: Router,
    private server: ApiService,
    private route: ActivatedRoute,
    private auth: AuthService,
  ) {
  }

  model = new Dot('', 0, '0.5', false);
  dotsCollection: Dot[];
  submitted = false;
  isError = false;
  isNaN: Function = Number.isNaN;
  round: Function = Math.round;
  public radiuses = [
    {value: '0.5', display: '0.5', checked: true}, {value: '1', display: '1.0', checked: true},
    {value: '1.5', display: '1.5 ', checked: true}, {value: '2', display: '2.0 ', checked: true}
  ];
  public Xes = [
    {value: '-2', display: '-2', checked: false}, {value: '-1.5', display: '-1.5', checked: false},
    {value: '-1', display: '-1', checked: false}, {value: '-0.5', display: '-0.5', checked: false},
    {value: '0', display: '0', checked: false}, {value: '0.5', display: '0.5', checked: false},
    {value: '1', display: '1', checked: false}, {value: '1.5', display: '1.5', checked: false},
    {value: '2', display: '2', checked: false}
  ];

  get selectedXes() {
    return this.Xes
      .filter(opt => opt.checked)
      .map(opt => opt.value);
  }

  ngOnInit() {
    this.server.getAllDots().subscribe(dots => {
        this.dotsCollection = dots;
        this.isError = false;
      },
      error => this.isError = true);
  }

  deleteDots() {
    this.server.deleteAllDots().subscribe(ok => {
      this.isError = false;
      this.dotsCollection = [];
    }, error => this.isError = true);
  }

  getCoord(event) {
    const dim = document.querySelector('svg').getBoundingClientRect();
    const x = event.clientX - dim.left;
    const y = event.clientY - dim.top;
    let dot = new Dot(((x - 160) / (80 / Number(this.model.r))).toFixed(3), Number(((Number(y) - 160) / ((-1) * 80 / Number(this.model.r))).toFixed(3)), (this.model.r), false);
    this.addDot(dot);
  }

  onSubmit() {
    this.submitted = true;
    for (let i = 0; i < this.selectedXes.length; i++) {
      let dot = new Dot(this.selectedXes[i], this.model.y, this.model.r, this.model.result);
      this.addDot(dot);
    }
  }

  onBack() {
    this.auth.doSignOut();
    this._router.navigate(['/']);
  }

  addDot(dot: Dot) {
    this.server.addDot(dot).subscribe(d => {
        this.dotsCollection.push(d);
        this.isError = false;
      },
      error => this.isError = true);
  }
}
