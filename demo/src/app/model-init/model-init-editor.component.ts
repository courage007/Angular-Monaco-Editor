import { Component, OnInit } from '@angular/core';
import { AngularEditorModel } from 'angular-monaco-editor';

declare const monaco;

@Component({
  selector: 'app-model-init-editor',
  templateUrl: './model-init-editor.component.html',
  styleUrls: ['./model-init-editor.component.css']
})

export class ModelInitEditorComponent implements OnInit {

  options = {
    theme: 'vs-dark',                    // 代码编辑器主题
    language: 'json',                    // 语言
    formatOnType: true,                  // 启用格式化（暂不可用）
    foldingStrategy: 'indentation',      // 显示缩进
    folding: true,                       // 启用代码折叠功能
    showFoldingControls: 'always'        // 默认显示装订线
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
  get Editor() {
    return this._editor;
  }
  set Editor(value) {
    this._editor = value;
  }

  ngOnInit() {

  }

  // Add Event Handler
  onInitHandler(event: any) {
    this.Editor = event.editor;

    this.Editor.onDidBlurEditorText((e: any) => this.onBlurEditorTextHandler(e));
  }

  onBlurEditorTextHandler(e) {

    // https://github.com/Microsoft/monaco-editor/issues/30
    const setModelMarkers = monaco.editor.setModelMarkers;
    monaco.editor.setModelMarkers = function (model, owner, markers) {
      setModelMarkers.call(monaco.editor, model, owner, markers);
      if (markers.length === 0) {
        // there are no errors(synx error and validate error)
      } else {
        // there are errors
      }
    };
  }
}
