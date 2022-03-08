import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'eva-task';
  showHeader = false;
  showFooter = false;
  @ViewChild("progressBar") progressBar: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}


  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.progressBar.start();
      } else if (event instanceof NavigationEnd) {
        let child = this.activatedRoute.firstChild;
        if (child) {
          this.showHeader = child.snapshot.data['showHeader'] !== false;
          this.showFooter = child.snapshot.data['showFooter'] !== false;
        }
        setTimeout(() => {
          this.progressBar.complete();
        }, 250);
      }
    });
  }
}
