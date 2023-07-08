import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  HostListener,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  @Input()
  callbackFunction!: (filters: {
    n: number;
    state: string;
    name: string[];
  }) => void;

  @Input() message: any;
  @Input() selectedPlant: any;
  defaultStates: string[] = [
    'AK',
    'AL',
    'AR',
    'AZ',
    'CA',
    'CO',
    'CT',
    'DC',
    'DE',
    'FL',
    'GA',
    'HI',
    'IA',
    'ID',
    'IL',
    'IN',
    'KS',
    'KY',
    'LA',
    'MA',
    'MD',
    'ME',
    'MI',
    'MN',
    'MO',
    'MS',
    'MT',
    'NC',
    'ND',
    'NE',
    'NH',
    'NJ',
    'NM',
    'NV',
    'NY',
    'OH',
    'OK',
    'OR',
    'PA',
    'PR',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VA',
    'VT',
    'WA',
    'WI',
    'WV',
    'WY',
  ];
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  ngOnInit() {}

  /**
   * This function is responsible to pass the values from filter form to the app component where
   * params will be sent to api.service to request express server the filtered data.
   * @param {n: number, state: String, name: string[] } result is the filter submitted
   * the default values are n=10, state=all
   */
  onClickSubmit(result: { n: number; state: string; name: string[] }) {
    this.callbackFunction(result);
  }
}
