import { IEntity } from "../ientity";

export class SelectItem implements IEntity {
    constructor(
        public code: string = '',
        public name: string = '',
        public selected: boolean = false,
        public disabled: boolean = false) { }
}