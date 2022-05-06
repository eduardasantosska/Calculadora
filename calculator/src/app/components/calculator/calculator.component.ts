import { Component, OnInit } from '@angular/core';
import { Operation_e } from '../../../../../common/enum/enum';
import { Key } from '../../../../../common/models/Key';
import { RoutesService } from '../../services/routes.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  arrayCalculatorValues: Array<Array<object>> = [
    [
      {value: Operation_e.Clear, name: 'AC', color: 'var(--color-600)', width: 1, isEnum: true}
      , {value: Operation_e.SquareRoot, name: '√', color: 'var(--color-600)', width: 1, isEnum: true}
      , {value: Operation_e.Percent, name: '%', color: 'var(--color-600)', width: 1, isEnum: true}
      , {value: Operation_e.Divided, name: '/', color: 'var(--color-red)', width: 1, isEnum: true}
    ]
    , [
      {value: 7, name: '7', color: 'var(--color-600)', width: 1, isEnum: false}
      , {value: 8, name: '8', color: 'var(--color-600)', width: 1, isEnum: false}
      , {value: 9, name: '9', color: 'var(--color-600)', width: 1, isEnum: false}
      , {value: Operation_e.Times, name: 'X', color: 'var(--color-red)', width: 1, isEnum: true}
    ]
    , [
      {value: 4, name: '4', color: 'var(--color-600)', width: 1, isEnum: false}
      , {value: 5, name: '5', color: 'var(--color-600)', width: 1, isEnum: false}
      , {value: 6, name: '6', color: 'var(--color-600)', width: 1, isEnum: false}
      , {value: Operation_e.Minus, name: '-', color: 'var(--color-red)', width: 1, isEnum: true}
    ]
    , [
      {value: 1, name: '1', color: 'var(--color-600)', width: 1, isEnum: false}
      , {value: 2, name: '2', color: 'var(--color-600)', width: 1, isEnum: false}
      , {value: 3, name: '3', color: 'var(--color-600)', width: 1, isEnum: false}
      , {value: Operation_e.Plus, name: '+', color: 'var(--color-red)', width: 1, isEnum: true}
    ]
    , [
      {value: 0, name: '0', color: 'var(--color-600)', width: 2, isEnum: false}
      , {value: Operation_e.Comma, name: ',', color: 'var(--color-600)', width: 1, isEnum: true}
      , {value: Operation_e.Equal, name: '=', color: 'var(--color-green)', width: 1, isEnum: true}
    ]
    , [
      {value: Operation_e.Return, name: 'Voltar', color: 'var(--color-600)', width: 4, isEnum: true}
    ]
  ];
  displayValues: string = ('');
  operation: Key[] = [];
  id: number = (0);
  constructor(private routeService: RoutesService) { }

  ngOnInit(): void {
  }

  onClickButton(event): void {
    if (event.isEnum && (event.value !== Operation_e.Equal && event.value !== Operation_e.Return && event.value !== Operation_e.Clear)) {
      const lastButton = this.operation[this.operation.length - 1];
      if (lastButton.isEnum && (lastButton.value !== Operation_e.Equal && lastButton.value !== Operation_e.Return
        && lastButton.value !== Operation_e.Clear)) {
          this.operation = this.operation.filter(op => op.id !== lastButton.id);
          this.displayValues = '';
          this.operation.forEach(op => {
            this.displayValues = this.displayValues + op.name;
          });
      }
    }
    if (event.isEnum && event.value === Operation_e.Equal) {
      this.routeService.runAndSaveOperation(this.operation).subscribe((result: Key) => {
        this.displayValues = result.value + '';
        this.operation = [result];
      });
    } else if (event.name == 'AC') {
      this.displayValues = '';
    } else {
      this.displayValues += event.name;
      this.operation.push({...event, ...{id: this.id}});
      this.id = this.id + 1;
    }
  }
}
