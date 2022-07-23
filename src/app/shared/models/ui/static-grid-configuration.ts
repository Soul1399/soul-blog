import * as _ from "lodash";
import { of } from "rxjs";
import { StaticGridRowsArea } from "./static-gird-rows-area";
import { StaticGridCommand } from "./static-grid-command";
import { StaticGridCommands } from "./statis-grid-commands";

export class StaticGridConfiguration {
    readonly commands: StaticGridCommands;
    rowGap: number = 0;
    cellGap: number = 0;
    rowHeight: number = 32;
    rowHeightUnit: string = 'px';
    cellWidth: number = 50;
    getRowHeight?: (data: any) => string;
    rowSort?: (a: any, b: any) => number;
    rowsArea: StaticGridRowsArea = {
        minHeight: '0', overflow: null, maxHeight: null, minWidth: '50px', maxWidth: '500px'
    };
    getDataUniqueKey?: (data: any) => string;
    forceRedrawOnChange: boolean = false;
    cssRenderMode?: 'flex' | 'grid' = 'flex';
    
    constructor() {
        this.commands = {
            add: new StaticGridCommand<any>(false),
            remove: new StaticGridCommand<any>(false),
            move: new StaticGridCommand<any>(false),
            select: new StaticGridCommand<any>(false),
            set: new StaticGridCommand<any>(false),
            sort: new StaticGridCommand<any[]>(false),
            setRowHeight: new StaticGridCommand<any>(false),
            setRowsArea: new StaticGridCommand<any>(false, true, this.setRowsArea.bind(this))
        };
    }

    protected setRowsArea() {
        if (this.rowsArea?.domElement != null) {
            Object.assign(this.rowsArea.domElement.style, {
                overflow: this.rowsArea.overflow,
                minHeight: this.rowsArea.minHeight,
                maxHeight: this.rowsArea.maxHeight,
                minWidth: this.rowsArea.minWidth,
                maxWidth: this.rowsArea.maxWidth
            });
        }
        return of(this.rowsArea);
    }
}