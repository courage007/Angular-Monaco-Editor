import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';  // import FormsModule to make ngModel attr work

import { AngularMonacoEditorConfig, AngularMonacoEditorModule } from 'angular-monaco-editor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { BaseInitEditorComponent } from './base-init/base-init-editor.component';

import { NavbarComponent } from './navbar/navbar.component';
import { ModelInitEditorComponent } from './model-init/model-init-editor.component';
import { FormatInitEditorComponent } from './format-init/format-init-editor.component';
import { ModelInitWithMarkerEditorComponent } from './model-init-with-marker/model-init-with-marker-editor.component';

declare const monaco;

const monacoConfig: AngularMonacoEditorConfig = {
  baseUrl: 'assets',
  defaultOptions: { scrollBeyondLastLine: false },
  onMonacoLoad: () => {

    const id = 'foo.json';
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [{
        uri: "http://myserver/foo-schema.json",
        fileMatch: [id],
        schema: {
          type: "object",
          properties: {
            p1: {
              enum: ["v1", "v2"]
            },
            p2: {
              $ref: "http://myserver/bar-schema.json"
            }
          }
        }
      }, {
        uri: "http://myserver/bar-schema.json",
        fileMatch: [id],
        schema: {
          type: "object",
          properties: {
            q1: {
              enum: ["x1", "x2"]
            }
          }
        }
      }]
    });

  }
};

@NgModule({
  declarations: [
    ModelInitWithMarkerEditorComponent,
    FormatInitEditorComponent,
    ModelInitEditorComponent,
    NavbarComponent,
    BaseInitEditorComponent,
    AppComponent,
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
