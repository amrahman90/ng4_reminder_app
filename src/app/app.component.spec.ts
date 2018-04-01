import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {CommonModule} from '@angular/common';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,CommonModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));



  it('should delete reminder on clicking delete icon', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.task="Start the car";
    app.time=new Date('2017/07/21');
    let button=fixture.debugElement.nativeElement.querySelector('.btn.btn-success');
    button.click();
    fixture.detectChanges();
    expect(app.data.length).toBe(1);
    const compiled = fixture.debugElement.nativeElement.querySelector('.table.table-responsive');
    let deleteBtn=compiled.querySelector('button');
    deleteBtn.click();
    let swalContainer=fixture.debugElement.nativeElement.parentElement.querySelector('.swal2-container');
    let confirmDelete=swalContainer.querySelector('.swal2-confirm');
    confirmDelete.click();
    console.log(confirmDelete);
    console.log(app.data);
    tick(1000);
    fixture.detectChanges();
    expect(app.data.length).toBe(0);
  }));
  
  it('should add 2 reminder on clicking add icon', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.task="Start the car";
    app.time=new Date('2017/07/21');
    let button=fixture.debugElement.nativeElement.querySelector('.btn.btn-success');
    button.click();
    app.task="Pack things";
    app.time=new Date('2017/07/19');
    button.click();
    fixture.detectChanges();
    expect(app.data.length).toBe(2);
  }));
});
