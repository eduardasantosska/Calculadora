export class Key {
    value: number = -1;
    name: string = '';
    color: string = '';
    width: number = 0;
    isEnum: boolean = false;
    id: number = -1;

    constructor(value: number, isEnum: boolean) {
        this.value = value;
        this.isEnum = isEnum;
    }
}