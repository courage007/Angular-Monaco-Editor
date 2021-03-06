import { InjectionToken } from '@angular/core';

// injectionToken作用：解决同名覆盖问题
// https://segmentfault.com/a/1190000008626348
export const ANGULAR_MONACO_EDITOR_CONFIG = new InjectionToken('ANGULAR_MONACO_EDITOR_CONFIG');

export interface AngularMonacoEditorConfig {
  baseUrl?: string;
  defaultOptions?: { [key: string]: any; };
  onMonacoLoad?: Function;
}
