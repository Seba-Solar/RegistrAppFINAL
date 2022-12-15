import { Component, OnInit } from '@angular/core';
import { MindicatorService } from 'src/app/services/mindicator.service';

@Component({
  selector: 'app-convertor',
  templateUrl: './covertos.page.html',
  styleUrls: ['./covertos.page.scss'],
})
export class CoversorPage implements OnInit {

  pageTitle = 'Conversor de Monedas';
  isNotHome = true;
  listadoMindicador: any=[];

  constructor(private mindicatorService: MindicatorService) { }

  ngOnInit() {
    this.cargarApi();
  }

  cargarApi(){
    this.mindicatorService.getPosts()
    .then(respuesta => {
      this.listadoMindicador = respuesta;
      console.log(respuesta);
    },
    (err) => {
      console.log(err);
    });
  }
}