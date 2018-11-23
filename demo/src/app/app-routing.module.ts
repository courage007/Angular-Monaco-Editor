import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseInitEditorComponent } from './base-init/base-init-editor.component';
import { APP_ROUTE_PATH } from './app-routing-path';
import { ModelInitEditorComponent } from './model-init/model-init-editor.component';
import { FormatInitEditorComponent } from './format-init/format-init-editor.component';
import { ModelInitWithMarkerEditorComponent } from './model-init-with-marker/model-init-with-marker-editor.component';
import { TwoEditorsComponent } from './two-editors/two-editors.component';

const demosRoute: Routes = [
  { // 组件
    path: APP_ROUTE_PATH.baseInit,
    component: BaseInitEditorComponent
  }, {
    path: APP_ROUTE_PATH.modelInit,
    component: ModelInitEditorComponent
  }, {
    path: APP_ROUTE_PATH.formatInit,
    component: FormatInitEditorComponent
  }, {
    path: APP_ROUTE_PATH.modelInitWithMarker,
    component: ModelInitWithMarkerEditorComponent
  }, {
    path: APP_ROUTE_PATH.twoEditors,
    component: TwoEditorsComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(demosRoute)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
