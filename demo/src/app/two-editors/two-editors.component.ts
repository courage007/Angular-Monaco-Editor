import { Component, OnInit } from '@angular/core';
import { AngularEditorModel } from 'angular-monaco-editor';

@Component({
  selector: 'app-two-editors',
  templateUrl: './two-editors.component.html',
  styleUrls: ['./two-editors.component.css']
})
export class TwoEditorsComponent implements OnInit {

  showMultiple = true;
  options = {
    theme: 'vs-dark',                    // 代码编辑器主题
    language: 'json',                    // 语言
    formatOnType: true,                  // 启用格式化（暂不可用）
    foldingStrategy: 'indentation',      // 显示缩进
    folding: true,                       // 启用代码折叠功能
    showFoldingControls: 'always'        // 默认显示装订线
  };

  options2 = {
    theme: 'vs',                         // 代码编辑器主题
    language: 'json',                    // 语言
  };
  
  setCode(){
    this.code = 'Code changed from the app component.';
  }

  //todo: 替换成动态数据（通过服务获取的外部数据）
  code;
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
    '    "p2": false,',
    '             "p3": true',
    '}'
  ].join('\n');
  
  jsonCode2 = [
    '{',
    '    "p2": false,',
    '             "p3": true',
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
    // this.code = this.jsCode;
  }

  // Add Event Handler
  onInitHandler(event: any){
    console.log(event);
    
    //   this.editor = editor;
    //   console.log(editor);
    //   // let line = editor.getPosition();
    //   // let range = new monaco.Range(line.lineNumber, 1, line.lineNumber, 1);
    //   // let id = { major: 1, minor: 1 };
    //   // let text = 'FOO';
    //   // let op = { identifier: id, range: range, text: text, forceMoveMarkers: true };
    //   // editor.executeEdits("my-source", [op]);
  }

  onChangeHandler(event: any){
    console.log(event);
  }

  onTouchedHandler(event: any){
    console.log(event);
  }

}