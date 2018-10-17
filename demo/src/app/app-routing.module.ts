import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseInitEditorComponent } from './base-init/base-init-editor.component';
import { APP_ROUTE_PATH } from './app-routing-path';
import { ModelInitEditorComponent } from './model-init/model-init-editor.component';

const demosRoute: Routes = [
  { // 组件
    path: APP_ROUTE_PATH.baseInit,
    component: BaseInitEditorComponent
  },
  {
    path: APP_ROUTE_PATH.modelInit,
    component: ModelInitEditorComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(demosRoute)
  ],
  exports: [ 
    RouterModule
  ]
})

export class AppRoutingModule { }
