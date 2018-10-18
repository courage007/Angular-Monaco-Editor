import { AfterViewInit, ElementRef, Input, OnDestroy, Output, ViewChild, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { pick } from 'lodash';

import { AngularMonacoEditorConfig } from './config';
import { CodeEditorEventService } from './services/code-editor.event.service';

let loadedMonaco = false;
let loadPromise: Promise<void>;

export abstract class BaseMonacoEditor implements AfterViewInit, OnDestroy {

  protected _editor: any;
  private _options: any;
  protected _windowResizeSubscription: Subscription;

  @ViewChild('codeEditor') _editorComponent: ElementRef; // 动态添加代码编辑器

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onInit;

  @Input('options')
  set options(options: any) {
    // 默认options(this.config.defaultOptions) + 自定义options(options)
    this._options = Object.assign({}, this.config.defaultOptions, options);
    if (this._editor) {
      this._editor.dispose();
      this.initMonaco(options);
    }
  }
  get options(): any {
    return this._options;
  }

  constructor(private codeEditorEventService: CodeEditorEventService, private config: AngularMonacoEditorConfig) {
        // 初始化自定义事件
        const self = this;
        codeEditorEventService.eventNames.forEach((name) => {
          // 创建自定义事件，此处作用等效于: @Output() onInit = new EventEmitter<any>()
          self[name] = new EventEmitter<any>();
          const eventPair = pick(self, name);
          codeEditorEventService.addEvent(eventPair);
        });
  }

  ngAfterViewInit(): void {
    if (loadedMonaco) {
      // Wait until monaco editor is available
      loadPromise.then(() => {
        this.initMonaco(this.options);
      });
    } else {
      loadedMonaco = true;
      loadPromise = new Promise<void>((resolve: any) => {
        const baseUrl = this.config.baseUrl || '/assets';
        // if (typeof((<any>window).monaco) === 'object') {
        //   resolve();
        //   return;
        // }
        const onGotAmdLoader: any = () => {
          // Load monaco
          (<any>window).require.config({ paths: { 'vs': `${baseUrl}/monaco/vs` } });
          (<any>window).require(['vs/editor/editor.main'], () => {
            if (typeof this.config.onMonacoLoad === 'function') {
              this.config.onMonacoLoad();
            }
            this.initMonaco(this.options);
            resolve();
          });
        };

        // Load AMD loader if necessary
        if (!(<any>window).require) {
          const loaderScript: HTMLScriptElement = document.createElement('script');
          loaderScript.type = 'text/javascript';
          loaderScript.src = `${baseUrl}/monaco/vs/loader.js`;
          loaderScript.addEventListener('load', onGotAmdLoader);
          document.body.appendChild(loaderScript);
        } else {
          onGotAmdLoader();
        }
      });
    }
  }

  // Monaco Editor Initializer
  protected abstract initMonaco(options: any): void ;

  ngOnDestroy() {
    if (this._windowResizeSubscription) {
      this._windowResizeSubscription.unsubscribe();
    }

    if (this._editor) {
      this._editor.dispose();
      this._editor = undefined;
    }
  }
}
