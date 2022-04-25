import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private storeService: StoreService, private router: Router) { }

  ngOnInit(): void {

    this.storeService.profileVisible = true;
    this.storeService.isMenuOpen = true;

    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
    
  }

  goSchedule(){

    this.router.navigate(['/agendamento']);

  }

  goGames(){

    this.router.navigate(['/jogos']);

  }

  goServices(){

    this.router.navigate(['/servicos']);

  }

  goBeats(){

    this.router.navigate(['/batimentos']);

  }

  goScheduleList(){

    this.router.navigate(['/agendamento/listar']);

  }

}
