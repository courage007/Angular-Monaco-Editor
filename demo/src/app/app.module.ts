import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';  // import FormsModule to make ngModel attr work

import * as monaco from 'monaco-editor';
import { AngularMonacoEditorConfig, AngularMonacoEditorModule } from 'angular-monaco-editor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { InitEditorComponent } from './init/init-editor.component';
import { NavbarComponent } from './navbar/navbar.component';

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
    NavbarComponent,
    AppComponent,
    InitEditorComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AngularMonacoEditorModule.forRoot(monacoConfig),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
