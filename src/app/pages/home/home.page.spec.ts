import { TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomePage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        HomePage
      ],
    }).compileComponents();
  });

  it('should create the home page', () => {
    const fixture = TestBed.createComponent(HomePage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('the default values are set correctly', () => {
    const fixture = TestBed.createComponent(HomePage);
    const app = fixture.componentInstance;
    expect(app.plate).toEqual("");
    expect(app.plateLetters).toEqual("");
    expect(app.plateNumbers).toEqual("");
    expect(app.date).toEqual("");
    expect(app.time).toEqual("");
    expect(app.allowedToDrive).toBeUndefined();
  });  

});
