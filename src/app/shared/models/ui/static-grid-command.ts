import * as _ from "lodash";
import { Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { StaticGridCellContext } from "./static-grid-cell-context";
import { StaticGridConfiguration } from "./static-grid-configuration";
import { StaticGridRowContext } from "./static-grid-row-context";

export class StaticGridCommand<TReturn> {
    constructor(
        public visible: boolean = true,
        public enabled: boolean = true,
        public command: ((config?: StaticGridConfiguration, rowContext?: StaticGridRowContext | null, cellContext?: StaticGridCellContext | null, data?: any, dataSet?: any[] | null) => TReturn | Observable<TReturn | null> | null) | null = null,
        public beforeCommand: ((config?: StaticGridConfiguration, rowContext?: StaticGridRowContext | null, cellContext?: StaticGridCellContext | null, data?: any, dataSet?: any[] | null) => TReturn | Observable<any> | null) | null = null,
        public afterCommand: ((result: TReturn | null, config?: StaticGridConfiguration, rowContext?: StaticGridRowContext | null, cellContext?: StaticGridCellContext | null, data?: any, dataSet?: any[] | null) => TReturn | Observable<TReturn> | null) | null = null) {
        
    }

    execute(config?: StaticGridConfiguration, rowContext?: StaticGridRowContext | null, cellContext?: StaticGridCellContext | null, data?: any, dataSet?: any[] | null) : Observable<TReturn | null> {
        if (!_.isFunction(this.command) || !this.enabled) return of(null);
        const beforeResult = _.isFunction(this.beforeCommand) ? this.beforeCommand(config, rowContext, cellContext, data, dataSet) : null;
        const commandResult =  this.command(config, rowContext, cellContext, data, dataSet);
        const before = beforeResult instanceof Observable ? beforeResult : of(beforeResult);
        const result = commandResult instanceof Observable ? commandResult : of(commandResult);
        
        return before.pipe(switchMap(b => {
            return result.pipe(switchMap(r => {
                const afterResult = _.isFunction(this.afterCommand) ? this.afterCommand(r, config, rowContext, cellContext, data, dataSet) : null;
                const after = afterResult instanceof Observable ? afterResult : of(afterResult);
                return after.pipe(map(a => a ?? r));
            }));
        }));
    }
}
