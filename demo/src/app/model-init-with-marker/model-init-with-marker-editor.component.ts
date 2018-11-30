import { Component, OnInit } from '@angular/core';
import { AngularEditorModel } from 'angular-monaco-editor';

declare const monaco;

@Component({
  selector: 'app-model-init-with-marker-seditor',
  template: `
  <div class="modelInitEditor">
    <div class="dataShow">
      <pre>Data in the app: {{jsonCode}}</pre>
    </div>
    
    <div class="editorPanel">
      <angular-monaco-editor class="customMonacoEditor" [options]="options" [(ngModel)]="jsonCode" [model]="model" (onInit)="onInitHandler($event)" 
        (onBlurEditorText)="onBlurEditorTextHandler($event)"></angular-monaco-editor>
    </div>
  </div>
  `,
  styles: [`
    .customMonacoEditor {
      height: 400px
    }
  `],
})

export class ModelInitWithMarkerEditorComponent implements OnInit {

  options = {
    theme: 'vs-dark',                    // 代码编辑器主题
    language: 'json',                    // 语言
    formatOnType: true,                  // 启用格式化（暂不可用）
    foldingStrategy: 'indentation',      // 显示缩进
    folding: true,                       // 启用代码折叠功能
    showFoldingControls: 'always',       // 默认显示装订线
  };

  jsonCode = [
    '{',
    '    "p1": "v3",',
    '    "p2": false,',
    '             "p3": true',
    '}'
  ].join('\n');

  model: AngularEditorModel = {
    value: this.jsonCode,
    language: 'json',
    uri: 'foo.json'
  };
  _editor: any; // 编辑器指针
  get editor() {
    return this._editor;
  }
  set editor(value) {
    this._editor = value;
  }

  constructor() {

  }

  ngOnInit() {

  }

  // Add Event Handler
  onInitHandler(event: any) {
    this.editor = event.editor;
  }

  onBlurEditorTextHandler($event) {
    // console.log('失去焦点' + $event);
    const verfitiedPass = $event.editorState.verifyResut;
    if (!verfitiedPass) {
      this.editor.focus();
      console.log('检测出错误');
    }
  }

}
