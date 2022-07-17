import { Pipe, PipeTransform } from '@angular/core';
import { StaticGridRowContext } from '../models/ui/static-grid-row-context';
import * as _ from 'lodash';
import { StaticGridComponent } from '../components/static-grid/static-grid.component';

@Pipe({
  name: 'staticGridRowFilter',
})
export class StaticGridRowFilterPipe implements PipeTransform {
  transform(
    array: any,
    gridComponent: StaticGridComponent
  ): StaticGridRowContext[] {
    if (gridComponent == null) return [];
    return gridComponent.buildRows(array);
  }
}
