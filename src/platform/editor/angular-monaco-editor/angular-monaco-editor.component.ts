import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
// import { fromEvent, Subscription } from 'rxjs';
import { Subscription } from 'rxjs';

import { forwardRef, Inject, NgZone } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// import * as monaco from 'monaco-editor'; //npm install monaco-editor后，通过import方式引用它  

import { ANGULAR_MONACO_EDITOR_CONFIG, AngularMonacoEditorConfig } from '../config';

// import { AngularEditorModel } from '../types';

let loadedMonaco: boolean = false;
let loadPromise: Promise<void>;
// declare const require: any;

// 自定义输入控件:1.封装ControlValueAccessor
// https://code-examples.net/zh-CN/q/2154761
export const CODE_EDITOR_INPUT_VALUE_ACCESSOR: any = {
  // https://blog.csdn.net/wangdan_2013/article/details/81314959
  provide: NG_VALUE_ACCESSOR,//
  useExisting: forwardRef(() => AngularMonacoEditorComponent),//
  multi: true//
};

@Component({
  selector: 'angular-monaco-editor',
  templateUrl: './angular-monaco-editor.component.html',
  styleUrls: ['./angular-monaco-editor.component.css'],
  // 自定义输入控件:2.引入依赖服务ControlValueAccessor
  providers: [CODE_EDITOR_INPUT_VALUE_ACCESSOR]
})

// 自定义输入控件:3.1 implements ControlValueAccessor 
export class AngularMonacoEditorComponent implements AfterViewInit, ControlValueAccessor /*, OnDestroy*/{
  protected _editor: any;
  private _options: any;
  // protected _windowResizeSubscription: Subscription;

  @ViewChild('codeEditor') _editorComponent: ElementRef; //动态添加代码编辑器

  // @Output() onInit = new EventEmitter<any>();

  @Input('options')
  set options(options: any) {
    // 默认options + 自定义options
    this._options = Object.assign({}, this.config.defaultOptions, options);
    if (this._editor) {
      this._editor.dispose();
      this.initMonaco(options);
    }
  }
  get options(): any {
    return this._options;
  }

  // @Input('model')
  // set model(model: AngularEditorModel) {
  //   this.options.model = model;
  //   if (this._editor) {
  //     this._editor.dispose();
  //     this.initMonaco(this.options);
  //   }
  // }

  // 注入AngularMonacoEditorConfig，在创建Editor实例时设置config
  constructor(/*private zone: NgZone, */ @Inject(ANGULAR_MONACO_EDITOR_CONFIG) private config: AngularMonacoEditorConfig) {

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
        // if (typeof((<any>window).monaco) === 'object') {
        //   resolve();
        //   return;
        // }
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

  // ngOnDestroy() {
  //   if (this._windowResizeSubscription) {
  //     this._windowResizeSubscription.unsubscribe();
  //   }
  //   if (this._editor) {
  //     this._editor.dispose();
  //     this._editor = undefined;
  //   }
  // }

  protected initMonaco(options: any): void {
    console.log("Init the custom monaco code editor.");

    // const hasModel = !!options.model;
    const hasModel = false;

    // if (hasModel) {
    //   options.model = monaco.editor.createModel(options.model.value, options.model.language, options.model.uri);
    // }

    this._editor = monaco.editor.create(this._editorComponent.nativeElement, options);

    if (!hasModel) {
      this._editor.setValue(this._value);
    }

    this._editor.onDidChangeModelContent((e: any) => {
      this.value = this._editor.getValue();
    });

    this._editor.onDidBlurEditorText((e: any) => {
      this.onTouchedCallback();
    });

    // refresh layout on resize event.
    // if (this._windowResizeSubscription) {
    //   this._windowResizeSubscription.unsubscribe();
    // }
    // this._windowResizeSubscription = fromEvent(window, 'resize').subscribe(() => this._editor.layout());
    // this.onInit.emit(this._editor);
  }

  private _value: string = '';
  
  onChangeCallback = (_: any) => {
    console.log("Value changed:" + _);
  };

  onTouchedCallback = () => {
    console.log("Be touched");
  };

  //get accessor
  get value(): any {
      return this._value;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this._value) {// 注意这种写法，值得学习
      this._value = v;
      this.onChangeCallback(v);
    }
  }

  // 自定义输入控件:3.2 implements ControlValueAccesso
  
  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this._value) {
        this.value = value;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
      this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
      this.onTouchedCallback = fn;
  }
}