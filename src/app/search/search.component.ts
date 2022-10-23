import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public title = 'cebuano';
  public dictionary: Record<string, any> = {};
  public isInitialized: boolean = false;
  public searchResults: any[] = [];
  public searchText: string = "crazy";
  public doC: boolean = true;
  public doE: boolean = true;
  public examplesOnly: boolean = true;
  public wholeWordOnly: boolean = false;

  constructor(private dataService: DataService) { }

  public ngOnInit() {
    this.dataService.getDictionary().subscribe(json => {
      this.dictionary = json;
      this.decorate();
      console.log('dictionary:', this.dictionary);
      this.isInitialized = true;
      this.doSearch(this.searchText, this.doC, this.doE, this.examplesOnly, this.wholeWordOnly);
    });
  }

  private searchableCebuano(text: string) {
    if (text == null) {
      return null;
    }
    let s = text.toLowerCase();
    s = s.replace(/[áâàā]/g,  'a'); // ăǎǟǡȃ
    s = s.replace(/[éêèē]/g,  'e');
    s = s.replace(/[íîìī]/g,  'i');
    s = s.replace(/[óôòō]/g,  'o');
    s = s.replace(/[úûùūū́]/g, 'u');
    s = s.replace(/[ẃŵ]/g,    'w');
    s = s.replace(/[ýŷȳ]/g,   'y');
    s = s.replace(/e/g, 'i');
    s = s.replace(/o/g, 'u');
    return s;
  }

  private searchableEnglish(text: string) {
    if (text == null) {
        return null;
    }
    let s = text.toLowerCase();
    return s;
  }

  private decorate() {
    for (let root in this.dictionary) {
      let entries = this.dictionary[root];
      for (let entry of entries) {
        entry.root2 = this.searchableCebuano(entry.root);
        entry.form2 = this.searchableCebuano(entry.form);
        entry.meaning2 = this.searchableEnglish(entry.meaning);
        if (entry.examples) {
          for (let example of entry.examples) {
            example.c2 = this.searchableCebuano(example.c);
            example.e2 = this.searchableEnglish(example.e);
          }
        }
      }
    }
  }

  public addSearchResult(root:string, rootPreview:string, c:string, e:string) {
    this.searchResults.push({
      root: root,
      rootPreview: rootPreview,
      c: c,
      e: e
    });
  }

  public doSearch(s: string, doC: boolean, doE: boolean, examplesOnly: boolean, wholeWordOnly: boolean) {
    console.log('doSearch(): s=' + s + ', doC=' + doC + ', doE=' + doE + ', examplesOnly=' + examplesOnly + ', wholeWordOnly=' + wholeWordOnly);
    let sc = this.searchableCebuano(s);
    let se = this.searchableEnglish(s);
    this.searchResults = []; // clear
    for (let root in this.dictionary) {
      let entries = this.dictionary[root];
      // let mainEntry = entries[0];
      // let root2 = mainEntry.root2;
      // if (doC && root2.includes(sc)) {
      //   console.log("[C] [" + root + "] " + root + " => " + mainEntry.meaning + " ...");
      //   this.addSearchResult(root, mainEntry.meaning + " ...", root, mainEntry.meaning);
      // }
      // if (doE && mainEntry.meaning.includes(se)) {
      //   console.log("[C] [" + root + "] " + root + " => " + mainEntry.meaning + " ...");
      //   this.addSearchResult(root, mainEntry.meaning + " ...", root, mainEntry.meaning);
      // }
      for (let entry of entries) {
        if (!examplesOnly && doC && entry.form2 && entry.form2.includes(sc)) {
          this.addSearchResult(root, this.dictionary[root][0].meaning + " ...", entry.form, entry.meaning);
        }
        if (!examplesOnly && doE && entry.meaning2 && entry.meaning2.includes(se)) {
          this.addSearchResult(root, this.dictionary[root][0].meaning + " ...", entry.form, entry.meaning);
        }
        if (entry.examples) {
          for (let example of entry.examples) {
            if (wholeWordOnly) {
              if (doE && example.e2 && example.e2.match('\\b' + se + '\\b')) {
                this.addSearchResult(root, this.dictionary[root][0].meaning + " ...", example.c, example.e);
              }
              if (doC && example.c2 && example.c2.match('\\b' + sc + '\\b')) {
                this.addSearchResult(root, this.dictionary[root][0].meaning + " ...", example.c, example.e);
              }
            } else {
              if (doC && example.c2 && example.c2.includes(sc)) {
                this.addSearchResult(root, this.dictionary[root][0].meaning + " ...", example.c, example.e);
              }
              if (doE && example.e2 && example.e2.includes(se)) {
                this.addSearchResult(root, this.dictionary[root][0].meaning + " ...", example.c, example.e);
              }
            }
          }
        }
      }
    }
  }

  // public onSearch($event: any) {
  //   console.log("onSearch(): $event:", $event);
  //   this.doSearch(this.searchText, this.doC, this.doE, this.examplesOnly, this.wholeWordOnly);
  // }

  // public onEnter($event: any) {
  //   console.log("onEnter(): $event:", $event);
  //   this.doSearch(this.searchText, this.doC, this.doE, this.examplesOnly, this.wholeWordOnly);
  // }

  public onForceSearch() {
    console.log("onForceSearch()");
    this.doSearch(this.searchText, this.doC, this.doE, this.examplesOnly, this.wholeWordOnly);
  }

  public onChangeInput($event: any) {
    console.log("onInputChange(): $event:", $event);
    if (this.canAutoSearch()) {
      this.doSearch(this.searchText, this.doC, this.doE, this.examplesOnly, this.wholeWordOnly);
    } else {
      this.searchResults = [];
    }
  }

  public canAutoSearch(): boolean {
    if (this.searchText.length >= 4) {
      return true;
    }
    return false;
  }

}
