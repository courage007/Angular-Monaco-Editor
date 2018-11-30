import { CommonModule } from '@angular/common';

import { ModuleWithProviders, NgModule } from '@angular/core';
import { ANGULAR_MONACO_EDITOR_CONFIG, AngularMonacoEditorConfig } from './model/config';
import { AngularMonacoEditorComponent } from './angular-monaco-editor/angular-monaco-editor.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AngularMonacoEditorComponent
  ],
  exports: [
    AngularMonacoEditorComponent
  ],
  providers: [
  ]
})

// https://angularfirst.com/the-ngmodule-forroot-convention/
export class AngularMonacoEditorModule {
  public static forRoot(config: AngularMonacoEditorConfig = {}): ModuleWithProviders {
    return {
      ngModule: AngularMonacoEditorModule,
      providers: [
        {
          provide: ANGULAR_MONACO_EDITOR_CONFIG,
          useValue: config
        },

      ]
    };
  }
}
