import { Injectable } from '@angular/core';

declare const monaco: any;

// Angular Monaco Editor Component Variables
// 汇总Angular monaco editor component 组件暴露的变量
@Injectable()
export class AngularMonacoEditorService {

    private _existError = false;//默认没有错误
    get existError() {
        return this._existError;
    }

    handleModelMarkers() {
        var self = this;
        // https://github.com/Microsoft/monaco-editor/issues/30
        const setModelMarkers = monaco.editor.setModelMarkers;
        monaco.editor.setModelMarkers = function (model, owner, markers) {
            setModelMarkers.call(monaco.editor, model, owner, markers);
            if (markers.length === 0) {
                self._existError = false;
                // there are no errors(synx error and validate error)
                // console.log('continue');
            } else {
                // there are errors
                self._existError = true;
            }
        };
    }
}
