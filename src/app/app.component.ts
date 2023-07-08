import { Component } from '@angular/core';
import { ApiService } from './api.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translate3d(0,0,0)',
        })
      ),
      state(
        'out',
        style({
          transform: 'translate3d(100%, 0, 0)',
        })
      ),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out')),
    ]),
  ],
})
export class AppComponent {
  title = 'my-ng-app';
  message: any;
  menuState: string = 'out';
  selectedPlant: any = null;
  selectedState: any = null;
  centerLon: number = -101.1392640867402;
  centerLet: number = 40.72979684690499;
  zoom: number = 3;
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.apiService.getMessage().subscribe((data) => {
      this.message = data;
    });
  }

  /**
   * This functoin is used to select a plant and change longitude and latitude of the center
   * also to zoom on marker click. It sets the selected Plant(with api call) when the marker is clicked
   *
   * @param plant is the selected plant
   */
  setSelected = (plant: any) => {
    this.apiService
      .getState(plant['Plant state abbreviation'])
      .subscribe((data) => {
        this.selectedState = data;
      });
    this.selectedPlant = plant;
    this.zoom = 5;
    this.centerLon = plant['Plant longitude'];
    this.centerLet = plant['Plant latitude'];
  };

  /**
   * This function is use to toggle the filter and list sidebar
   */
  toggleMenu = () => {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  };

  /**
   * This function is resonsible to request the data from api.service that gets the data
   * by itself
   * @param {n: number; state: string; name: string[]}filters
   */
  getPlants = (filters: { n: number; state: string; name: string[] }) => {
    this.apiService.getPlants(filters).subscribe((data) => {
      this.message = data;
    });
  };
}
