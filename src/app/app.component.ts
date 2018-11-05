import { Component } from '@angular/core';
import { AngularEditorModel } from '../../lib/editor/model/types';
import { AngularMonacoEditorService } from '../../lib/editor/service/angular-monaco-editor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    AngularMonacoEditorService
  ],
})
export class AppComponent {
  // editor: any;
  // toggleLanguage = true;

  showMultiple = true;
  options = {
    theme: 'vs-dark',
    language: 'json',
    formOnType: true
  };
  constructor(private angularMonacoEditorService: AngularMonacoEditorService) {

  }

  setCode() {
    this.jsonCode = [
      '{',
      '"pp": false,',
      '    "p2": false,',
      '"p3": false',
      '}'
    ].join('\n');
  }

  // todo: 替换成动态数据（通过服务获取的外部数据）
  code: string = `
    function foo() {
      alert('Hello');
      alert('World');
      alert('Hello World.');
  `;

  jsCode = `function hello() {
    alert('Hello world!');
    alert('foo1');
    alert('foo2');
  }`;

  jsonCode = [
    '{',
    '    "p1": "v3",',
    '    "p2": false,',
    '"p3": false',
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

  editor: any;
  // Add Event Handler
  onInitHandler(event: any) {
    console.log(event);

    //   this.editor = editor;
    //   console.log(editor);
    //   // let line = editor.getPosition();
    //   // let range = new monaco.Range(line.lineNumber, 1, line.lineNumber, 1);
    //   // let id = { major: 1, minor: 1 };
    //   // let text = 'FOO';
    //   // let op = { identifier: id, range: range, text: text, forceMoveMarkers: true };
    //   // editor.executeEdits("my-source", [op]);

    // console.log('测试前'+ this.angularMonacoEditor.testField);
    // this.angularMonacoEditor.testField = true;
    // console.log('测试后'+ this.angularMonacoEditor.testField);
    this.editor = event.editor;
    this.editor.onDidBlurEditorText(() => this.onBlurEditorTextHandler());
  }

  onBlurEditorTextHandler() {
    if (this.angularMonacoEditorService.existError) {
      // 将焦点停留在编辑器
      console.log('将焦点停留在编辑器');
      this.editor.focus();
    }
  }

  onChangeHandler(event: any) {
    console.log('Changing:' + event);
  }

  onTouchedHandler(event: any) {
    console.log(event);
  }

}
