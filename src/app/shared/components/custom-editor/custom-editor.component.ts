
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';

@Component({
  template: `
    <p></p>`,
})
export class CustomEditorComponent extends DefaultEditor implements AfterViewInit {

  @ViewChild('name') name: ElementRef;
  @ViewChild('url') url: ElementRef;
  @ViewChild('htmlValue') htmlValue: ElementRef;

  constructor() {
    super();
  }

  ngAfterViewInit() {
    
  }

 
}
