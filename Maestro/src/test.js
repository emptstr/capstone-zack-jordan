import './polyfills.ts';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getTestBed, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { App, Config, Form, IonicModule, Keyboard, DomController, MenuController, NavController, Platform } from 'ionic-angular';
import { ConfigMock, PlatformMock } from './mocks';
// Prevent Karma from running prematurely.
__karma__.loaded = function () {
    // noop
};
// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
// Then we find all the tests.
var context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
// Finally, start Karma to run the tests.
__karma__.start();
export var TestUtils = (function () {
    function TestUtils() {
    }
    TestUtils.beforeEachCompiler = function (components) {
        return TestUtils.configureIonicTestingModule(components)
            .compileComponents().then(function () {
            var fixture = TestBed.createComponent(components[0]);
            return {
                fixture: fixture,
                instance: fixture.debugElement.componentInstance,
            };
        });
    };
    TestUtils.configureIonicTestingModule = function (components) {
        return TestBed.configureTestingModule({
            declarations: components.slice(),
            providers: [
                App, Form, Keyboard, DomController, MenuController, NavController,
                { provide: Platform, useClass: PlatformMock },
                { provide: Config, useClass: ConfigMock },
            ],
            imports: [
                FormsModule,
                IonicModule,
                ReactiveFormsModule,
            ],
        });
    };
    // http://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript
    TestUtils.eventFire = function (el, etype) {
        if (el.fireEvent) {
            el.fireEvent('on' + etype);
        }
        else {
            var evObj = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            el.dispatchEvent(evObj);
        }
    };
    return TestUtils;
}());
//# sourceMappingURL=test.js.map