import { Component, OnInit } from '@angular/core';
import { AngularEditorModel } from 'angular-monaco-editor';

@Component({
  selector: 'app-format-init-editor',
  templateUrl: './format-init-editor.component.html',
  styleUrls: ['./format-init-editor.component.css']
})

export class FormatInitEditorComponent implements OnInit {

  options = {
    theme: 'vs-dark',                    // 代码编辑器主题
    language: 'json',                    // 语言
    automaticLayout: true,
    autoIndent: true
  };

  jsonOriginCode = [
    '{',
    '             "p3": true',
    '}'
  ].join('\n');
  
  // https://msdn.microsoft.com/zh-cn/library/cc836459(v=vs.94).aspx
  jsonFormatCode = JSON.stringify(JSON.parse(this.jsonOriginCode), undefined , 4);

  model: AngularEditorModel = {
    value: this.jsonFormatCode,
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
  updateOptions() {
    this.Editor.updateOptions({
      'formatOnType': true,                  // 启用格式化
    });
  }

  // Add Event Handler
  onInitHandler(event: any) {
    this.Editor = event.editor;

    // this.Editor.trigger('anyString', 'editor.action.formatDocument');
    this.updateOptions();

    // // format editor’s content after initialized
    // setTimeout(() => {
    //   this.Editor.getAction('editor.action.formatDocument').run().then(this.afterFormatDocument);
    // }, 300);
  }

  afterFormatDocument() {
    console.log('format document finished');
  }

}
