import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Countries } from 'src/app/shared/models/countries-ref';
import { SelectItem } from 'src/app/shared/models/ui/select-item';
import { StaticGridCellOfRow } from 'src/app/shared/models/ui/static-grid-cell-of-row';
import { StaticGridCellType } from 'src/app/shared/models/ui/static-grid-cell-type';
import { StaticGridConfiguration } from 'src/app/shared/models/ui/static-grid-configuration';
import { StaticGridEditMode } from 'src/app/shared/models/ui/static-grid-edit-mode';
import { StaticGridHeader } from 'src/app/shared/models/ui/static-grid-header';
import { changePageLoading } from '../../shared/store/app-actions';
import { AppState } from '../../shared/store/app-state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  gridConfig = new StaticGridConfiguration();
  gridHeadersMap = new Map<string, StaticGridHeader>();
  gridData = [
    { value: '1', text: 'test 1', type: 'S', avgValue: 0.0, country: null },
    { value: '2', text: 'test 2', type: 'S', avgValue: null, country: null },
    { value: '3', text: 'test 3', type: 'S', avgValue: null, country: null },
  ];
  typesOfData = [
    new SelectItem('S', 'single'),
    new SelectItem('M', 'multiple'),
    new SelectItem('B', 'both'),
    new SelectItem('H', 'hybrid'),
  ];

  constructor(private appStore: Store<AppState>) {}

  get gridHeaders(): StaticGridHeader[] {
    return Array.from(this.gridHeadersMap.values());
  }

  ngOnInit(): void {
    this.gridConfig.forceRedrawOnChange = true;
    this.gridConfig.rowsArea.minHeight = '20px';
    this.gridConfig.rowsArea.maxHeight = '500px';
    this.gridConfig.rowsArea.maxWidth = '500px';
    this.gridConfig.rowsArea.overflow = 'auto';
    this.gridConfig.rowGap = 5;

    this.initGridCells();

    this.initGridCommands();

    this.appStore.dispatch(changePageLoading({ value: false }));
  }

  private initGridCommands() {
    this.gridConfig.commands.set.command = (cfg, r, c, data) => {
      if (
        r &&
        r.data != data &&
        c?.isEditable !== false &&
        c?.enabled !== false
      ) {
        Object.assign(r.data, data);
        return true;
      }
      return false;
    };
    this.gridConfig.commands.add.visible = true;
    this.gridConfig.commands.add.command = (cfg, r, c, data, dataSet) => {
      const lastValue =
        (_.isArray(dataSet) && dataSet.length > 0
          ? _.last(
              dataSet
                .map((x) => parseInt(x.value))
                .sort((a, b) => (a == b ? 0 : a > b ? 1 : -1))
            )
          : 1) ?? 1;
      const newData = { value: (lastValue + 1).toString(), text: '', type: '', avgValue: 0.0, country: null };
      this.gridData = this.gridData.concat([newData]);
      return newData;
    };
  }

  private initGridCells() {
    let key = 'KEY';
    this.gridHeadersMap.set(key, {
      label: 'Key',
      width: 35,
      relatedCells: [{ valueField: 'value', headers: [], cssClass: ['p-3'], placeItem: 'center' }],
    });
    this.linkCellWithHeader(key);

    key = 'VALUE';
    this.gridHeadersMap.set(key, {
      label: 'Value',
      width: 150,
      relatedCells: [
        {
          valueField: 'text',
          cellType: StaticGridCellType.input,
          cellEditMode: StaticGridEditMode.direct,
          headers: [],
          cssClass: ['grid-input', 'p-3'],
          placeItem: 'center'
        },
      ],
    });
    this.linkCellWithHeader(key);

    key = 'TYPE';
    this.gridHeadersMap.set(key, {
      label: 'Type',
      width: 150,
      relatedCells: [
        {
          valueField: 'type',
          cellType: StaticGridCellType.select,
          cellEditMode: StaticGridEditMode.direct,
          headers: [],
          cssClass: ['grid-select', 'p-3'],
          relatedValues: this.typesOfData,
          params: { emptyItem: new SelectItem() },
          placeItem: 'center' ,
          width: 200
        },
      ],
    });
    this.linkCellWithHeader(key);

    key = 'AVG_VALUE';
    this.gridHeadersMap.set(key, {
      label: 'Avg. Value',
      width: 150,
      relatedCells: [
        {
          valueField: 'avgValue',
          cellType: StaticGridCellType.input,
          cellEditMode: StaticGridEditMode.singleClick,
          formatter: {
            format: val => {
              let n: number;
              return typeof val === 'number' ? val.toFixed(2) : isNaN(n = parseFloat(val)) ? '' : n.toFixed(2);
            },
            parse: text => {
              let n: number;
              return isNaN(n = parseFloat(text)) ? null : n;
            }
          },
          headers: [],
          cssClass: ['grid-input', 'p-3'],
          placeItem: 'center'
        },
      ],
    });
    this.linkCellWithHeader(key);

    const countries = Countries.map(c => Object.assign(new SelectItem(), c));
    key = 'COUNTRY';
    this.gridHeadersMap.set(key, {
      label: 'Country',
      width: 150,
      relatedCells: [
        {
          valueField: 'country',
          cellType: StaticGridCellType.autocomplete,
          cellEditMode: StaticGridEditMode.direct,
          headers: [],
          cssClass: ['grid-innput', 'p-3'],
          relatedValues: countries,
          formatter: {
            format: code => countries.find(c => c.code == code)?.name ?? '',
            parse: text => countries.find(c => c.name == text)?.code
          },
          params: { filterDelay: 0 },
          placeItem: 'center'
        },
      ],
    });
    this.linkCellWithHeader(key);
  }

  linkCellWithHeader(key: string) {
    let c: StaticGridCellOfRow | undefined;
    let h: StaticGridHeader | undefined;
    if (
      (c = _.first(this.gridHeadersMap.get(key)?.relatedCells)) &&
      (h = this.gridHeadersMap.get(key))
    ) {
      c.headers = [h];
    }
  }
}
