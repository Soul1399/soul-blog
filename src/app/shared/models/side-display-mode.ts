import { MatDrawerMode } from "@angular/material/sidenav";

export interface SideDisplayMode {
    mode: MatDrawerMode;
    opened: boolean;
    position: "start" | "end";
}

export function defaultSideDisplayMode(): SideDisplayMode {
    return {
        mode: "side",
        opened: false,
        position: "end"
    };
}