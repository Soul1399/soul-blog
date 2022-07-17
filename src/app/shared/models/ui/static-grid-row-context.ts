import { StaticGridCellContext } from "./static-grid-cell-context";

export interface StaticGridRowContext {
    data: any;
    position: number;
    cells: StaticGridCellContext[];
    height: string;
    spaceAfter: string;
    isHeightRedrawn: boolean;
}