import { InjectionToken } from '@angular/core';

//todo: injectionToken作用
export const ANGULAR_MONACO_EDITOR_CONFIG = new InjectionToken('ANGULAR_MONACO_EDITOR_CONFIG');

export interface AngularMonacoEditorConfig {
  baseUrl?: string;
  defaultOptions?: { [key: string]: any; },
  onMonacoLoad?: Function;
}