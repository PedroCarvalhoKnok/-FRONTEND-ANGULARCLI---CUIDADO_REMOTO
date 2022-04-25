import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  profileVisible: boolean = true;
  isMenuOpen : boolean = true;

  constructor() { }

  public onSideNavClick(): void{

    //this.isMenuOpen = !this.isMenuOpen;

  }
}

