import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { FabButtonComponent } from "./fab-button/fab-button.component";
import { HeaderComponent } from "./header/header.component";

@NgModule({
    declarations : [
        HeaderComponent,
        FabButtonComponent
    ],
    imports : [
        CommonModule,
        IonicModule,
        RouterModule
    ],
    exports : [
        HeaderComponent,
        FabButtonComponent
    ]
})

export class ComponentsModule {}