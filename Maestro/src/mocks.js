/**
 * Created by jordan on 2/14/17.
 */
/* tslint:disable */
// IONIC:
export var ConfigMock = (function () {
    function ConfigMock() {
    }
    ConfigMock.prototype.get = function () {
        return '';
    };
    ConfigMock.prototype.getBoolean = function () {
        return true;
    };
    ConfigMock.prototype.getNumber = function () {
        return 1;
    };
    return ConfigMock;
}());
export var FormMock = (function () {
    function FormMock() {
    }
    FormMock.prototype.register = function () {
        return true;
    };
    return FormMock;
}());
export var NavMock = (function () {
    function NavMock() {
    }
    NavMock.prototype.pop = function () {
        return new Promise(function (resolve) {
            resolve();
        });
    };
    NavMock.prototype.push = function () {
        return new Promise(function (resolve) {
            resolve();
        });
    };
    NavMock.prototype.getActive = function () {
        return {
            'instance': {
                'model': 'something',
            },
        };
    };
    NavMock.prototype.setRoot = function () {
        return true;
    };
    return NavMock;
}());
export var PlatformMock = (function () {
    function PlatformMock() {
    }
    PlatformMock.prototype.ready = function () {
        return new Promise(function (resolve) {
            resolve('READY');
        });
    };
    PlatformMock.prototype.registerBackButtonAction = function (fn, priority) {
        return (function () { return true; });
    };
    PlatformMock.prototype.hasFocus = function (ele) {
        return true;
    };
    PlatformMock.prototype.doc = function () {
        return document;
    };
    PlatformMock.prototype.registerListener = function (ele, eventName, callback) {
        return (function () { return true; });
    };
    PlatformMock.prototype.win = function () {
        return window;
    };
    PlatformMock.prototype.raf = function (callback) {
        return 1;
    };
    return PlatformMock;
}());
export var MenuMock = (function () {
    function MenuMock() {
    }
    MenuMock.prototype.close = function () {
        return new Promise(function (resolve) {
            resolve();
        });
    };
    return MenuMock;
}());
/* tslint:enable */ 
//# sourceMappingURL=mocks.js.map