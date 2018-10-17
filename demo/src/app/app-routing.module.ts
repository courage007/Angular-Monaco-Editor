import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitEditorComponent } from './init/init-editor.component';

const demosRoute: Routes = [
  { // 组件
    path: 'init',
    component: InitEditorComponent
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
