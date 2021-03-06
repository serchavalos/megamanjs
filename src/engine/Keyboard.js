'use strict';

Engine.Keyboard = class Keyboard {
    constructor()
    {
        this.EVENT_TRIGGER = 'trigger';

        this.LEFT = 'left';
        this.RIGHT = 'right';
        this.UP = 'up';
        this.DOWN = 'down';
        this.A = 'a';
        this.B = 'b';
        this.SELECT = 'select';
        this.START = 'start';

        this.ENGAGE = 'keydown';
        this.RELEASE = 'keyup';

        this.events = new Engine.Events();
        this._events = new Engine.Events();

        this._map = {
            65: this.LEFT,
            68: this.RIGHT,
            87: this.UP,
            83: this.DOWN,
            80: this.A,
            79: this.B,
            81: this.SELECT,
            69: this.START,
        };

        this._state = {};
    }
    assign(key, name)
    {
        this._map[key] = name;
    }
    hit(key, engage)
    {
        this._events.bind(key + '_' + this.ENGAGE, engage);
    }
    intermittent(key, engage, release)
    {
        this._events.bind(key + '_' + this.ENGAGE, engage);
        this._events.bind(key + '_' + this.RELEASE, release);
    }
    release()
    {
        for (let key in this._map) {
            this.trigger(this._map[key], this.RELEASE);
        }
    }
    trigger(key, state)
    {
        if (this._state[key] === state) {
            return false;
        }

        this._state[key] = state;
        this._events.trigger(key + '_' + state);
        this.events.trigger(this.EVENT_TRIGGER, [key, state]);

        return true;
    }
    triggerEvent(event)
    {
        const key = event.keyCode;
        if (this._map[key]) {
            if (event.preventDefault) {
                event.preventDefault();
            }
            this.trigger(this._map[key], event.type);
        }
    }
    unassign(key)
    {
        this.trigger(this._map[key], this.RELEASE);
        delete this._map[key];
    }
}
