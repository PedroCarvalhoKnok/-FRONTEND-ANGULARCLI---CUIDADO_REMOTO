import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 @ViewChild(MatSidenav)
 sidenav!: MatSidenav;

 constructor(private observer: BreakpointObserver, private router: Router, public storeService: StoreService){}

  title = 'CuidadoRemotoApp';
  profileVisible: boolean = false;
  isMenuOpen: boolean = false;
  opened: boolean = false;

  // ngAfterViewInit() {
  //   this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
  //     if (res.matches) {
  //       this.sidenav.mode = 'over';
  //       this.sidenav.close();
  //     } else {
  //       this.sidenav.mode = 'side';
  //       this.sidenav.open();
  //     }
  //   });
  // }

  ngOnInit(){
    this.profileVisible = this.storeService.profileVisible;
    this.isMenuOpen = this.storeService.isMenuOpen;
  }

  clickhandler(){
    this.opened = !this.opened;
  }

  editProfile(){

    localStorage.setItem('Edicao','E');

    this.router.navigate(['/cadastrar']);
  }
}


