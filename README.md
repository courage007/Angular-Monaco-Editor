# Monaco Editor Component for Angular 2+

Using this Module you can utilize the Monaco Editor as an Angular Component. Feel free to contribute, raise feature requests and make it better.

Supports all the options available in monaco-editor [Monaco Editor Options](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html)

## Setup

### Installation

- (1) Install from npm repository:
```
npm install monaco-editor --save

npm install angular-monaco-editor --save
 ```
 
- (2) Add the glob to assets in .angular-cli.json (to make monaco-editor lib available to the app):
```typescript
{
  "apps": [
    {
      "assets": [
        { 
          "glob": "**/*", 
          "input": "../node_modules/monaco-editor/min", 
          "output": "./assets/monaco/" 
        }
      ],
      ...
    }
    ...
  ],
  ...
}
 ```

### Sample
- (1) Include AngularMonacoEditorModule in Main Module and Feature Modules where you want to use the editor component.(eg: app.module.ts): 
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AngularMonacoEditorModule } from 'angular-monaco-editor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularMonacoEditorModule.forRoot() // use forRoot() in main app module only.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

- (2) Create Editor options in component.(eg: app.component.ts)
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';
}
```
- (3) Include editor in html with options and ngModel bindings.(eg: app.component.html)
```html
<angular-monaco-editor [options]="editorOptions" [(ngModel)]="code"></angular-monaco-editor>
```

### Styling
- (1) Add class to editor tag. (eg. class="my-code-editor")
```html
<angular-monaco-editorr class="my-code-editor" [options]="editorOptions" [(ngModel)]="code"></angular-monaco-editor>
```
- (2) Add styling in css/scss file:
```scss
.my-code-editor {
  .editorContainer {
    height: calc(100vh - 100px);
  }
}
```
Set automaticLayout option to adjust editor size dynamically. Recommended when using in modal dialog or tabs where editor is not visible initially.

### Events
Output event (onInit) expose editor instance that can be used for performing custom operations on the editor. 
```html
<angular-monaco-editor [options]="editorOptions" [(ngModel)]="code" (onInit)="onInit($event)"></angular-monaco-editor>
```

```typescript
export class AppComponent {
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';
  onInit(editor) {
      let line = editor.getPosition();
      console.log(line);
    }
}
```

## Configurations
`forRoot()` method of MonacoEditorModule accepts config of type `AngularMonacoEditorConfig`.
```typescript
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MonacoEditorModule, AngularMonacoEditorConfig } from 'angular-monaco-editor';
import { AppComponent } from './app.component';

const monacoConfig: AngularMonacoEditorConfig = {
  baseUrl: 'app-name/assets', // configure base path for monaco editor
  defaultOptions: { scrollBeyondLastLine: false }, // pass default options to be used
  onMonacoLoad: () => { console.log((<any>window).monaco); } // here monaco object will be available as window.monaco use this function to extend monaco editor functionality.
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularMonacoEditorModule.forRoot(monacoConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

### Configure JSON Defaults
`onMonacoLoad` property of `AngularMonacoEditorConfig` can be used to configure JSON default.
```typescript
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MonacoEditorModule, AngularMonacoEditorConfig } from 'angular-monaco-editor';
import { AppComponent } from './app.component';

const monacoConfig: AngularMonacoEditorConfig = {
  onMonacoLoad: () => { 
    const id = "foo.json";
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [{
        uri: "http://myserver/foo-schema.json",
        fileMatch: [id],
        schema: {
          type: "object",
          properties: {
            p1: {
              enum: [ "v1", "v2"]
            },
            p2: {
              $ref: "http://myserver/bar-schema.json"
            }
          }
        }
      },{
        uri: "http://myserver/bar-schema.json",
        fileMatch: [id],
        schema: {
          type: "object",
          properties: {
            q1: {
              enum: [ "x1", "x2"]
            }
          }
        }
      }]
    });
  } 
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularMonacoEditorModule.forRoot(monacoConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

## Links
[Monaco Editor](https://github.com/Microsoft/monaco-editor/)<br/>

## License

MIT © [John Wang](https://github.com/courage007)