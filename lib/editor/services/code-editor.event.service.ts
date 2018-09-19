import { Injectable } from '@angular/core';
import { assign } from 'lodash';

import { CODE_EDITOR_EVENTS } from '../constants/events';

@Injectable()
export class CodeEditorEventService {
    eventNames = Object.keys(CODE_EDITOR_EVENTS);
    events: any = {}; // 使用事件

    /**
     * 设置启用事件
     * @param  事件
     */
    addEvent(event){
        assign(this.events, event);
        console.log(this.events);
    }

    fireEvent(event) {
        this.events[event.eventName].emit(event);
        console.log("Emit Event:" + event);
    }
}
