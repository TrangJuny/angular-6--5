import { async, ComponentFixture,TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Component } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterLinkStubDirective } from './testing/router-stub';
import { RouterOutletStubComponent } from './testing/router-stub';

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;
//////// Testing w/ NO_ERRORS_SCHEMA //////
describe('AppComponent & NO_ERRORS_SCHEMA', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, RouterLinkStubDirective],
            schemas: [NO_ERRORS_SCHEMA]
        })

            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(AppComponent);
                comp = fixture.componentInstance;
            });
    }));
    tests();
});

function tests() {
    let links: RouterLinkStubDirective[];
    let linkDes: DebugElement[];

    beforeEach(() => {
        debugger;
        // trigger initial data binding
        fixture.detectChanges();

        // find DebugElements with an attached RouterLinkStubDirective
        linkDes = fixture.debugElement
            .queryAll(By.directive(RouterLinkStubDirective));

        // get the attached link directive instances using the DebugElement injectors
        links = linkDes
            .map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
    });

    it('can instantiate it', () => {
        expect(comp).not.toBeNull();
    });

    it('can get RouterLinks from template', () => {
        
        expect(links.length).toBe(2, 'should have 2 links');
        expect(links[0].linkParams).toBe('dashboard', '1st link should go to Dashboard');
        expect(links[1].linkParams).toBe('projects', '1st link should go to project');
    });
    it('can click Heroes link in template', () => {
        debugger;
        const heroesLinkDe = linkDes[1];
        const heroesLink = links[1];

        expect(heroesLink.navigatedTo).toBeNull('link should not have navigated yet');

        heroesLinkDe.triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(heroesLink.navigatedTo).toBe('projects');
    });
}

