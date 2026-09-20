import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';

@Component({
    selector: 'app-word-root',
    templateUrl: './word-root.component.html',
    styleUrls: ['./word-root.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class WordRootComponent implements OnInit {

  public dictionary: Record<string, any> = {};
  public isInitialized: boolean = false;
  public root: string = "dakù";
  public entries: any = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getDictionary().subscribe(json => {
      this.dictionary = json;
      this.entries = this.dictionary[this.root];
      console.log('entries:', this.entries);
      this.isInitialized = true;
    });
  }

  public nice(s: string): string {
    if (s == '-') {
      return '';
    }
    if (s == '0') {
      return '';
    }
    return s;
  }

}
