import { Component } from '@angular/core';
import { AngularEditorModel } from '../platform/editor/types';

// // 引用namespace
// // https://blog.csdn.net/yzzane/article/details/79075126 
// // https://www.cnblogs.com/niklai/p/5837899.html
// todo:解决 reference失效问题
// /// <reference path="../../node_modules/monaco-editor/monaco.d.ts" />

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  editor: any;
  showMultiple = true;
  toggleLanguage = true;
  options = {
    theme: 'vs-dark'
  };
  
  code: string;
  cssCode = `.my-class {
    color: red;
  }`;
  
  jsCode = `function hello() {
    alert('Hello world!');
    alert('foo1');
    alert('foo2');
  }`;

  jsonCode = [
    '{',
    '    "p1": "v3",',
    '    "p2": false',
    '}'
  ].join('\n');

  model: AngularEditorModel = {
    value: this.jsonCode,
    language: 'json',
    uri: 'foo.json'
  };

  ngOnInit() {
    this.updateOptions();
  }

  updateOptions() {
    this.toggleLanguage = !this.toggleLanguage;
    if (this.toggleLanguage) {
      this.code = this.cssCode;
      this.options = Object.assign({}, this.options, { language: 'java' });
    } else {
      this.code = this.jsCode;
      this.options = Object.assign({}, this.options, { language: 'javascript' });
    }

  }

  onInit(editor) {
    this.editor = editor;
    console.log(editor);
    // let line = editor.getPosition();
    // let range = new monaco.Range(line.lineNumber, 1, line.lineNumber, 1);
    // let id = { major: 1, minor: 1 };
    // let text = 'FOO';
    // let op = { identifier: id, range: range, text: text, forceMoveMarkers: true };
    // editor.executeEdits("my-source", [op]);
  }
}