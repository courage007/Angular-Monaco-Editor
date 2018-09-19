import { CommonModule } from '@angular/common';

import { ModuleWithProviders, NgModule } from '@angular/core';
import { ANGULAR_MONACO_EDITOR_CONFIG, AngularMonacoEditorConfig } from './config';
import { AngularMonacoEditorComponent } from './angular-monaco-editor/angular-monaco-editor.component';
import { CodeEditorEventService } from './services/code-editor.event.service';

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
  providers: [CodeEditorEventService]
})

export class AngularMonacoEditorModule {
  public static forRoot(config: AngularMonacoEditorConfig = {}): ModuleWithProviders {
    return {
      ngModule: AngularMonacoEditorModule,
      providers: [
        { provide: ANGULAR_MONACO_EDITOR_CONFIG, useValue: config }
      ]
    };
  }
}
