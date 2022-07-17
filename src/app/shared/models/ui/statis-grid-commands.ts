import { StaticGridCommand } from "./static-grid-command";

export interface StaticGridCommands {
    add: StaticGridCommand<any>;
    remove: StaticGridCommand<any>;
    move: StaticGridCommand<any>;
    select: StaticGridCommand<any>;
    set: StaticGridCommand<any>;
    sort: StaticGridCommand<any[]>;
    setRowHeight: StaticGridCommand<string>;
    setRowsArea: StaticGridCommand<any>;
}