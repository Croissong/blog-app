import { inject, TestBed } from '@angular/core/testing';

// Load the implementations that should be tested
import { AppComponent } from './app.component';

describe('App', () => {

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ AppComponent ]
    });

    /* it('app should replace loader', inject(
     *   [ AppComponent ], (app: AppComponent) => {
     *     app.activate();
     *     expect(el.previousElementSibling.tagName).toEqual('SVG');
     *     expect(el.previousElementSibling.classList.contains('inactive')).toEqual(true);
     *   }));*/
  });
});
