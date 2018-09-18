import { Component } from '@angular/core';
import { AngularEditorModel } from '../../lib/editor/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // editor: any;
  // toggleLanguage = true;

  showMultiple = true;
  options = {
    theme: 'vs-dark',
    language: 'javascript',
  };
  
  setCode(){
    this.code = 'Code changed from the app component.';
  }

  //todo: 替换成动态数据（通过服务获取的外部数据）
  code: string = `
    function foo() {
      alert('Hello');
      alert('World');
      alert('Hello World.');
  `;
  // cssCode = `.my-class {
  //   color: red;
  // }`;
  
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
    this.code = this.jsCode;
  }

  // onInit(editor) {
  //   this.editor = editor;
  //   console.log(editor);
  //   // let line = editor.getPosition();
  //   // let range = new monaco.Range(line.lineNumber, 1, line.lineNumber, 1);
  //   // let id = { major: 1, minor: 1 };
  //   // let text = 'FOO';
  //   // let op = { identifier: id, range: range, text: text, forceMoveMarkers: true };
  //   // editor.executeEdits("my-source", [op]);
  // }
}