import { Observable } from "rxjs";
import { SelectItem } from "./select-item";
import { StaticGridCellOfRow } from "./static-grid-cell-of-row";
import { StaticGridRowContext } from "./static-grid-row-context";
import * as _ from 'lodash';
import { StaticGridEditMode } from "./static-grid-edit-mode";

export interface StaticGridCellContext {
    row: StaticGridRowContext;
    settings: StaticGridCellOfRow;
    value: any;
    displayedValue: string;
    editedValue: string;
    order: number;
    elementId?: string | null;
    width: string;
    spaceAfter: string;
    visible: boolean;
    enabled: boolean;
    relatedValues?: Observable<SelectItem[]>;
    isEditable: boolean;
    isDirectEdit: boolean;
    isEditing: boolean;
    cssClass?: string[];
    cssStyle?: { [klass: string]: any; };
    params?: any;
}

export function getCellContextValues(rowContext: StaticGridRowContext, cellOfRow: StaticGridCellOfRow): { value: any, displayedValue: string, editedValue: string } {
    if (cellOfRow == null) return { value: null, displayedValue: '', editedValue: '' };
    const value = cellOfRow.valueField != null
        ? rowContext.data[cellOfRow.valueField]
        : null;
    const displayedValue = _.isFunction(cellOfRow.formatter?.format)
        ? cellOfRow.formatter?.format(value)
        : cellOfRow.displayField != null
        ? rowContext.data[cellOfRow.displayField]
        : value;
    
    return { value, displayedValue, editedValue: '' };
}

export function defineEmptyCell(cell: StaticGridCellContext) {
    if (cell == null) return;
    if (((cell.displayedValue || cell.value) === '' || (cell.displayedValue || cell.value) == null) && 
        _.isArray(cell.cssClass) &&
        (cell.settings.cellEditMode == StaticGridEditMode.doubleClick || cell.settings.cellEditMode == StaticGridEditMode.singleClick)) {
        cell.cssClass.push('empty');
    }
    else if (_.isArray(cell.cssClass)) {
        const x = cell.cssClass.indexOf('empty');
        if (x > -1) cell.cssClass.splice(x, 1);
    }
}
