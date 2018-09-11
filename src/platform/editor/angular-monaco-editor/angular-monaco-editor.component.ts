import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
// import { fromEvent, Subscription } from 'rxjs';
import { Subscription } from 'rxjs';

import { forwardRef, Inject, NgZone } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ANGULAR_MONACO_EDITOR_CONFIG, AngularMonacoEditorConfig } from '../config';
import { AngularEditorModel } from '../types';

let loadedMonaco: boolean = false;
let loadPromise: Promise<void>;
declare const require: any;

@Component({
  selector: 'angular-monaco-editor',
  templateUrl: './angular-monaco-editor.component.html',
  styleUrls: ['./angular-monaco-editor.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AngularMonacoEditorComponent),
    multi: true
  }]
})
export class AngularMonacoEditorComponent implements  AfterViewInit, ControlValueAccessor, OnDestroy{
  protected _editor: any;
  private _options: any;
  protected _windowResizeSubscription: Subscription;

  @ViewChild('editorContainer') _editorContainer: ElementRef;

  @Output() onInit = new EventEmitter<any>();

  @Input('options')
  set options(options: any) {
    this._options = Object.assign({}, this.config.defaultOptions, options);
    if (this._editor) {
      this._editor.dispose();
      this.initMonaco(options);
    }
  }

  get options(): any {
    return this._options;
  }

  @Input('model')
  set model(model: AngularEditorModel) {
    this.options.model = model;
    if (this._editor) {
      this._editor.dispose();
      this.initMonaco(this.options);
    }
  }

  constructor(private zone: NgZone, @Inject(ANGULAR_MONACO_EDITOR_CONFIG) private config: AngularMonacoEditorConfig) {

  }

  ngAfterViewInit(): void {
    if (loadedMonaco) {
      // Wait until monaco editor is available
      loadPromise.then(() => {
        this.initMonaco(this.options);
      });
    } else {
      loadedMonaco = true;
      loadPromise = new Promise<void>((resolve: any) => {
        const baseUrl = this.config.baseUrl || '/assets';
        if (typeof((<any>window).monaco) === 'object') {
          resolve();
          return;
        }
        const onGotAmdLoader: any = () => {
          // Load monaco
          (<any>window).require.config({ paths: { 'vs': `${baseUrl}/monaco/vs` } });
          (<any>window).require(['vs/editor/editor.main'], () => {
            if (typeof this.config.onMonacoLoad === 'function') {
              this.config.onMonacoLoad();
            }
            this.initMonaco(this.options);
            resolve();
          });
        };

        // Load AMD loader if necessary
        if (!(<any>window).require) {
          const loaderScript: HTMLScriptElement = document.createElement('script');
          loaderScript.type = 'text/javascript';
          loaderScript.src = `${baseUrl}/monaco/vs/loader.js`;
          loaderScript.addEventListener('load', onGotAmdLoader);
          document.body.appendChild(loaderScript);
        } else {
          onGotAmdLoader();
        }
      });
    }
  }

  ngOnDestroy() {
    if (this._windowResizeSubscription) {
      this._windowResizeSubscription.unsubscribe();
    }
    if (this._editor) {
      this._editor.dispose();
      this._editor = undefined;
    }
  }

  private _value: string = '';

  propagateChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this._value = value || '';
    // Fix for value change while dispose in process.
    setTimeout(() => {
      if (this._editor && !this.options.model) {
        this._editor.setValue(this._value);
      }
    });
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  protected initMonaco(options: any): void {

    const hasModel = !!options.model;

    if (hasModel) {
      options.model = monaco.editor.createModel(options.model.value, options.model.language, options.model.uri);
    }

    this._editor = monaco.editor.create(this._editorContainer.nativeElement, options);

    if (!hasModel) {
      this._editor.setValue(this._value);
    }

    this._editor.onDidChangeModelContent((e: any) => {
      const value = this._editor.getValue();
      this.propagateChange(value);
      // value is not propagated to parent when executing outside zone.
      this.zone.run(() => this._value = value);
    });

    this._editor.onDidBlurEditor((e: any) => {
      this.onTouched();
    });

    // refresh layout on resize event.
    // if (this._windowResizeSubscription) {
    //   this._windowResizeSubscription.unsubscribe();
    // }
    // this._windowResizeSubscription = fromEvent(window, 'resize').subscribe(() => this._editor.layout());
    // this.onInit.emit(this._editor);

  }
}