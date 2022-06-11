import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import { RouterLinkDirectiveStub } from './../testing/router-link-directive-stub';
import { queryAllByDirective } from 'src/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-banner'
})
class BannerComponentStub {}

@Component({
  selector: 'app-footer'
})
class FooterComponentStub {}


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        RouterLinkDirectiveStub,
        BannerComponentStub,
        FooterComponentStub
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should there are 7 routerlinks', () => {
    const links = queryAllByDirective(fixture, RouterLinkDirectiveStub);
    expect(links.length).toEqual(7);
  });

  it('should there are 7 routerlinks with match routes', () => {
    const links = queryAllByDirective(fixture, RouterLinkDirectiveStub);
    const routerLinks = links.map(link => link.injector.get(RouterLinkDirectiveStub));
    expect(links.length).toEqual(7);
    expect(routerLinks[0].linkParams).toEqual('/');
    expect(routerLinks[1].linkParams).toEqual('/auth/register');
    expect(routerLinks[2].linkParams).toEqual('/people');
  });
});
