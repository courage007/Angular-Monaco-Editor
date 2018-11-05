import { Injectable } from '@angular/core';

import { assign } from 'lodash';

import { CODE_EDITOR_EVENTS } from '../constant/events';

@Injectable()
export class CodeEditorEventService {
    public eventNames = Object.keys(CODE_EDITOR_EVENTS);
    private _events: any = {}; // 使用事件

    /**
     * 设置启用事件
     * @param  事件
     */
    addEvent(event) {
        assign(this._events, event);
        // console.log(this.events);
    }

    fireEvent(event) {
        this._events[event.eventName].emit(event);
        // console.log("Emit Event:" + event);
    }
}
