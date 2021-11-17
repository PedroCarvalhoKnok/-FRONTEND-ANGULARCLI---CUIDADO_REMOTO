import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-heart-monitor',
  templateUrl: './heart-monitor.component.html',
  styleUrls: ['./heart-monitor.component.scss']
})
export class HeartMonitorComponent implements OnInit {

  listHeartBeatAtual!: any[];

  //intervalId = setInterval(this.generateBeats(), 10000);


  constructor() { }

  generateBeats(): void{

    if(this.listHeartBeatAtual == undefined)
        this.listHeartBeatAtual = [];
        
      const max = 80;
      const min = 40;
      let randomFrequency = Math.floor(Math.random() * (80 - 40 + 1) + 40);
      this.listHeartBeatAtual.push(randomFrequency);
      console.log(this.listHeartBeatAtual);
  }


  ngOnInit(): void {
    setInterval(this.generateBeats, 10000);
  }
  

}
