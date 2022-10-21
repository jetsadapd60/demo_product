import { Directive, ElementRef } from "@angular/core";

@Directive({ selector: "[phone]" })
export class PhoneFormatDirective {

    constructor(private el: ElementRef) {}
}
