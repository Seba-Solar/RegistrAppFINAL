import { Component, OnInit } from '@angular/core';
import { MindicatorService } from 'src/app/services/mindicator.service';
import { AlertController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-convertor',
  templateUrl: './coversor.page.html',
  styleUrls: ['./coversor.page.scss'],
})
export class CoversorPage implements OnInit {

  pageTitle = 'Conversor de Monedas';
  isNotHome = true;
  listadoMindicador: any=[];
  listaMonedas;
  valorMoneda;
  valorMoneda2;
  cantMoneda;
  tipoMoneda;
  tipoMoneda2;
  valorPesos2 = 0;

  constructor(private mindicatorService: MindicatorService,
    public navController: NavController,
    private alertController: AlertController,) {
      this.dolareuro();
    }

    dolareuro() {
      this.mindicatorService.getPosts()
      .then(respuesta => {
        console.log(respuesta);

        if (this.tipoMoneda === 'dolar' && this.tipoMoneda2 ==='clp'){
          this.valorMoneda = respuesta.dolar.valor;
          this.valorPesos2 = this.valorMoneda * this.cantMoneda;
        }
        else if (this.tipoMoneda === 'euro' && this.tipoMoneda2 === 'clp') {
          this.valorMoneda = respuesta.euro.valor;
          this.valorPesos2 = this.valorMoneda * this.cantMoneda;
        }
        else if (this.tipoMoneda === 'clp' && this.tipoMoneda2 === 'euro') {
          this.valorMoneda = respuesta.euro.valor;
          this.valorPesos2 = this.cantMoneda / this.valorMoneda;
        }
        else if (this.tipoMoneda === 'clp' && this.tipoMoneda2 === 'dolar') {
          this.valorMoneda = respuesta.dolar.valor;
          this.valorPesos2 = this.cantMoneda / this.valorMoneda;
        }
        else if (this.tipoMoneda === 'euro' && this.tipoMoneda2 === 'dolar') {
          this.valorMoneda = this.cantMoneda * respuesta.euro.valor;
          this.valorPesos2 = this.valorMoneda / respuesta.dolar.valor;
        }
        else if (this.tipoMoneda === 'dolar' && this.tipoMoneda2 === 'euro') {
          this.valorMoneda = this.cantMoneda * respuesta.dolar.valor;
          this.valorPesos2 = this.valorMoneda / respuesta.euro.valor;
        }
        else if ((this.tipoMoneda === 'dolar' && this.tipoMoneda2 === 'dolar')||
                (this.tipoMoneda === 'euro' && this.tipoMoneda2 === 'euro') ||
                (this.tipoMoneda === 'clp' && this.tipoMoneda2 === 'clp')){
          this.valorPesos2 = -1;
          this.mostrarAlertaMonedas();
        }

      },
      (error) => {
        console.error(error);
      }
     );
     };

     async mostrarAlertaMonedas() {
      const alert = await this.alertController.create({
        header: 'Monedas Iguales',
        message : 'No tiene sentido convertir dos monedas iguales',
        buttons : [
          {
            text: 'OK',
            role: 'cancel',
            cssClass: 'danger',
          },
        ]
      });
      await alert.present();
    };

    async mostrarDatosVacios() {
      if (this.cantMoneda === undefined ) {
        const alert = await this.alertController.create({
          header: 'Faltan Datos por completar',
          message : 'Debes ingresar un número valido',
          buttons : [
            {
              text: 'OK',
              role: 'cancel',
              cssClass: 'danger',
            },
          ]
        });
        await alert.present();
      };
    };

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
