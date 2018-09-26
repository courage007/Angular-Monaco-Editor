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
 
- (2) Add the glob to assets in **.angular-cli.json** (to make monaco-editor lib available to the app):
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
 PS: In Angular 6 CLI, please copy node_modules/monaco-editor/min to src/assets and rename folder as 'monaco' by hand.  
 PPS: Angular 6 CLI does not allow to dymanicly load resource using input/output.

### Sample
- (1) Include AngularMonacoEditorModule in Main Module and Feature Modules where you want to use the editor component.(eg: app.module.ts): 
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';  //import FormsModule to make ngModel attr work

import { AngularMonacoEditorConfig, AngularMonacoEditorModule } from 'angular-monaco-editor';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AngularMonacoEditorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

- (2) Create Editor options in component.(eg: app.component.ts)
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  options = {
    theme: 'vs-dark',
    language: 'javascript',
  };
 
  code: string = `
    function foo() {
      alert('Hello');
      alert('World');
      alert('Hello World.');
    }`;
}
```
- (3) Include editor in html with options and ngModel bindings.(eg: app.component.html)
```html
<angular-monaco-editor class="customMonacoEditor" [options]="options" [(ngModel)]="code"> </angular-monaco-editor>
```

### Styling
- (1) Add class to editor tag. (eg. class="editorPanel")
```html
<div class="editorPanel">
    <angular-monaco-editor class="customMonacoEditor" [options]="options" [(ngModel)]="code"></angular-monaco-editor>
</div>
```
- (2) Add styling in css/scss file:
```css
.editorPanel{
    display: block;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
}
.editorPanel .customMonacoEditor { /*set automaticLayout*/
    height: calc(100vh - 0px);
}
```
Set automaticLayout option to adjust editor size dynamically. Recommended when using in modal dialog or tabs where editor is not visible initially.

### Events
Output event (onInit) expose editor instance that can be used for performing custom operations on the editor. 
```html
<angular-monaco-editor class="customMonacoEditor" [options]="options" [(ngModel)]="code" (onInit)="onInitHandler($event)"></angular-monaco-editor>
```

```typescript

export class AppComponent {
  options = {theme: 'vs-dark',language: 'javascript'};
  code: string = `
    function foo() {
      alert('Hello');
      alert('World');
      alert('Hello World.');
  `;
  
  // Add Event Handler
  onInitHandler(event: any){
    console.log(event);
  }

}
```

## Configurations
`forRoot()` method of AngularMonacoEditorModule accepts config of type `AngularMonacoEditorConfig`.
```typescript
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AngularMonacoEditorModule, AngularMonacoEditorConfig } from 'angular-monaco-editor';
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
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';  //import FormsModule to make ngModel attr work

import * as monaco from 'monaco-editor';
import { AngularMonacoEditorConfig, AngularMonacoEditorModule } from 'angular-monaco-editor';

import { AppComponent } from './app.component';

const monacoConfig: AngularMonacoEditorConfig = {
  baseUrl: 'assets',
  defaultOptions: { scrollBeyondLastLine: false },
  onMonacoLoad: () => {
    // console.log("moncaco: " + (<any>window).monaco);

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
      }]
    });

  }
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AngularMonacoEditorModule.forRoot(monacoConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Links
[Monaco Editor](https://github.com/Microsoft/monaco-editor/)<br/>

## License

MIT © [John Wang](https://github.com/courage007)
