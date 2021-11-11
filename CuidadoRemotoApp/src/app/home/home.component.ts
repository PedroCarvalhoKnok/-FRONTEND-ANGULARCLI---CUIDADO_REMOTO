import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {

    this.storeService.profileVisible = true;
    this.storeService.isMenuOpen = true;


    
  }

}
