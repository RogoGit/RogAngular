import {Component, Directive, OnInit} from '@angular/core';
import {Dot} from './Dot';
import {Router} from '@angular/router';
import {AbstractControl, FormControl, NG_VALIDATORS, Validator, ValidatorFn} from '@angular/forms';

@Component({
  selector: 'app-area-render',
  templateUrl: './area.component.html',
  styleUrls: ['../maindesign.component.css']
})

export class AreaComponent implements OnInit {
  constructor(private _router: Router) {}
  old;
  model = new Dot('', 0 , '0.5');
  dotsCollection;
  submitted = false;
  isNaN: Function = Number.isNaN;
  public radiuses = [
    {value: '0.5', display: '0.5', checked: true}, {value: '1', display: '1.0' , checked: true},
    {value: '1.5', display: '1.5 ' , checked: true}, {value: '2', display: '2.0 ' , checked: true}
  ];
  public Xes = [
    {value: '-2', display: '-2', checked: false}, {value: '-1.5', display: '-1.5', checked: false},
    {value: '-1', display: '-1', checked: false}, {value: '-0.5', display: '-0.5', checked: false},
    {value: '0', display: '0', checked: false}, {value: '0.5', display: '0.5', checked: false},
    {value: '1', display: '1', checked: false}, {value: '1.5', display: '1.5', checked: false},
    {value: '2', display: '2', checked: false}
  ];
  get oldR() {
    return this.old; }
  get selectedXes() {
    return this.Xes
      .filter(opt => opt.checked)
      .map(opt => opt.value);
  }

  ngOnInit() {
    this.dotsCollection = [
      { x: '1', y: '0.3', r: '0.5', res: true},
      { x: '-1', y: '-0.6', r: '0.5', res: false}
    ];
  }
  deleteDots() {
    this.dotsCollection = [
    ];
  }
  getCoord(event) {
    const e = event.target;
    const dim = e.getBoundingClientRect();
    const x = event.clientX - dim.left;
    const y = event.clientY - dim.top;
    this.addDot(((x - 160) / (80 * Number(this.model.r))).toFixed(3), ((y - 160) / ((-1) * 80 * Number(this.model.r))).toFixed(3), Number(this.model.r));
  }
  onSubmit() {
    this.submitted = true;
    alert(this.selectedXes);
  }
  onBack() {
    this._router.navigate(['/']);
  }
  addDot(kx, ky, dr) {
    this.dotsCollection.push(
      {x: kx, y: ky, r: dr}
    );
  }
}
