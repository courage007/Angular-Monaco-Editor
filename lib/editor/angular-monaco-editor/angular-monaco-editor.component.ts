import { Component, OnInit, AfterViewInit, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { forwardRef, Inject, NgZone } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';



import { ANGULAR_MONACO_EDITOR_CONFIG, AngularMonacoEditorConfig } from '../config';
import { CodeEditorEventService } from '../services/code-editor.event.service';
import { CODE_EDITOR_EVENTS } from '../constants/events';
import { AngularEditorModel } from '../types';
import { BaseMonacoEditor } from '../base-monaco-editor';

declare const monaco: any;

// 自定义输入控件:1.封装ControlValueAccessor
// https://code-examples.net/zh-CN/q/2154761
export const CODE_EDITOR_INPUT_VALUE_ACCESSOR: any = {
  // https://blog.csdn.net/wangdan_2013/article/details/81314959
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AngularMonacoEditorComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'angular-monaco-editor',
  templateUrl: './angular-monaco-editor.component.html',
  styleUrls: ['./angular-monaco-editor.component.css'],
  // 自定义输入控件:2.引入依赖服务ControlValueAccessor
  providers: [CODE_EDITOR_INPUT_VALUE_ACCESSOR, CodeEditorEventService]
})

// 自定义输入控件 <-> Monaco Edtor

// 自定义输入控件:3.1 implements ControlValueAccessor
export class AngularMonacoEditorComponent extends BaseMonacoEditor implements ControlValueAccessor {

  // protected _windowResizeSubscription: Subscription;
  private _value = '';

  // tslint:disable-next-line:max-line-length
  constructor(private zone: NgZone, private editorEventService: CodeEditorEventService, @Inject(ANGULAR_MONACO_EDITOR_CONFIG) private angularEditorconfig: AngularMonacoEditorConfig) {
    super(editorEventService, angularEditorconfig);
  }

  protected initMonaco(options: any): void {
    const hasModel = options.model;

    if (hasModel) {
      options.model = monaco.editor.createModel(options.model.value, options.model.language, options.model.uri);
    }

    this._editor = monaco.editor.create(this._editorComponent.nativeElement, options);

    if (!hasModel) {
      this._editor.setValue(this._value);
    }

    // monaco editor -> outside component
    this._editor.onDidChangeModelContent((e: any) => this.onChangeModelContentHandler(e));

    this._editor.onDidBlurEditorText((e: any) => this.onBlurEditorTextHandler(e));

    this._editor.onDidLayoutChange((e: any) => this.onLayoutChangeHandler(e));

    // refresh layout on resize event.
    // if (this._windowResizeSubscription) {
    //   this._windowResizeSubscription.unsubscribe();
    // }
    // this._windowResizeSubscription = fromEvent(window, 'resize').subscribe(() => this._editor.layout());
    this.editorEventService.fireEvent({
      eventName: CODE_EDITOR_EVENTS.onInit,
      target: this,
      editor: this._editor
    });

  }

  onChangeModelContentHandler(e) {
    const _value = this._editor.getValue();

    // monaco editor -> outside component
    // https://github.com/JTangming/tm/issues/4 ngZone详解
    this.zone.run(() => this.value = _value); // value is not propagated to parent when executing outside zone.
  }

  onBlurEditorTextHandler(e) {

    this.onControlTouched();
  }

  onLayoutChangeHandler(e) {
    console.log('Layout changed:\n' + e);
  }

  // get accessor
  get value(): any {
    return this._value;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.value) {// 注意这种写法，值得学习
      this._value = v;
    }

    this.onControlValueChange(this.value); // 在属性修饰器里调用onControlValueChange方法
  }

  localEditor() {// Demo: outside component -> monaco editor
    this.writeValue('test');
  }

  // 自定义输入控件:3.2 implements ControlValueAccesso

  // outside component -> monaco editor

  // From ControlValueAccessor interface
  writeValue(value: any) {
    this.value = value || '';

    // Fix for value change while dispose in process.
    setTimeout(() => {
      if (this._editor /*&& !this.options.model*/) {
        this._editor.setValue(this._value);
        // console.log("write to the editor:" + this._value);
      }
    });
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onControlValueChange = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onControlTouched = fn;
  }

  // ControlValueAccessor提供的事件回调
  onControlValueChange = (_: any) => {
  }

  // ControlValueAccessor提供的事件回调
  onControlTouched = () => {
  }

}
