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
    // this.dotsCollection = [
    // [{x: '1', y: '0.3', r: '0.5', res: true}, {x: '-1', y: '-0.6', r: '0.5', res: false}],
    // [{x: '1', y: '0.3', r: '1', res: true}, {x: '-1', y: '-0.6', r: '1', res: false}],
    // [{x: '1', y: '0.3', r: '1.5', res: true}, {x: '-1', y: '-0.6', r: '1.5', res: false}],
    // {x: '1', y: '0.3', r: '1', res: true}, {x: '-1', y: '-0.6', r: '2', res: false}
    // ];
    this.server.getAllDots().subscribe(dots => this.dotsCollection = dots);
  }

  deleteDots() {
    // this.dotsCollection = [];
    // this.server.deleteAllDots(); TODO: раскомментим эти строки - будем удалять данные на сервере (надеюсь)
    // this.dotsCollection = this.server.getAllDots();
  }

  getCoord(event) {
    const dim = document.querySelector('svg').getBoundingClientRect();
    const x = event.clientX - dim.left;
    const y = event.clientY - dim.top;
    const dot = new Dot(((x - 160) / (80 / Number(this.model.r))).toFixed(3), Number(((Number(y) - 160) / ((-1) * 80 / Number(this.model.r))).toFixed(3)), (this.model.r), false);
    // this.addDot(dot);
    // this.server.addDot(dot); TODO: расскомментим это - клики на область будут добавляться на сервер (надеюсь)
    // this.dotsCollection = this.server.getAllDots();
  }

  onSubmit() {
    this.submitted = true;
    alert(this.selectedXes);
    /* for (let i = 0; i < this.selectedXes.length; i++ ) { TODO: раскомментим этот блок - отправляем на сервер данные с формы
      const dot = new Dot(this.selectedXes[i], this.model.y, this.model.r);
      this.server.addDot(dot);
    } */
    // this.dotsCollection = this.server.getAllDots();
  }

  onBack() {
    this.auth.doSignOut();
    this._router.navigate(['/']);
  }

  /* addDot(dot: Dot) {
    this.dotsCollection.push(
      {x: dot.x, y: dot.y, r: dot.r, result: dot.result}
    );
  } */
}
