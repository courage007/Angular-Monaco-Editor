import { Component } from '@angular/core';
import { AngularEditorModel } from 'angular-monaco-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  options = {
    theme: 'vs-dark',
    language: 'json',
    formatOnType: true// did not work here
  };
  
  jsonCode = '{"p1":"foo1","p2":false}';

  ngOnInit() {

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

}