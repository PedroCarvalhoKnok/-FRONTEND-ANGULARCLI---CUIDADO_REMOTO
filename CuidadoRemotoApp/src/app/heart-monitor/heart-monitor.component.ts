import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-heart-monitor',
  templateUrl: './heart-monitor.component.html',
  styleUrls: ['./heart-monitor.component.scss']
})
export class HeartMonitorComponent implements OnInit {

  listHeartBeatAtual!: any[];

  actualBeat: number = 0;
  averageBeats: number = 0;
  maxBeats: number = 0;
  minBeats: number = 0;

  //intervalId = setInterval(this.generateBeats(), 10000);


  constructor() { }

  generateBeats(): void{

    if(this.listHeartBeatAtual == undefined)
        this.listHeartBeatAtual = [];
        
      const max = 80;
      const min = 40;
      let randomFrequency = Math.floor(Math.random() * (80 - 40 + 1) + 40);
      this.actualBeat = randomFrequency;
      this.listHeartBeatAtual.push(randomFrequency);
      this.averageBeats = Math.floor(this.listHeartBeatAtual.reduce((a,b) => a + b, 0) / this.listHeartBeatAtual.length); //equals variable
      this.minBeats = this.listHeartBeatAtual.reduce(function(x,y){return (x < y) ? x: y});
      this.maxBeats = this.listHeartBeatAtual.reduce(function(x,y){return (x > y) ? x: y});

      (<HTMLInputElement>document.getElementById(`actual-heart`)).value = `${randomFrequency} BPM`;
      (<HTMLInputElement>document.getElementById(`average-heart`)).value = `${this.averageBeats} BPM`;
      (<HTMLInputElement>document.getElementById(`max-heart`)).value = `${this.maxBeats} BPM`;
      (<HTMLInputElement>document.getElementById(`min-heart`)).value = `${this.minBeats} BPM`;

      console.log(this.averageBeats);
      console.log(this.maxBeats);
      console.log(this.minBeats);
      
  }
  

  ngOnInit(): void {
    setInterval(this.generateBeats, 10000);
  }
  

}
