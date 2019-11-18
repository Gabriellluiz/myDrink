import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TelaBarPage } from './tela-bar.page';
var routes = [
    {
        path: '',
        component: TelaBarPage
    }
];
var TelaBarPageModule = /** @class */ (function () {
    function TelaBarPageModule() {
    }
    TelaBarPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [TelaBarPage]
        })
    ], TelaBarPageModule);
    return TelaBarPageModule;
}());
export { TelaBarPageModule };
//# sourceMappingURL=tela-bar.module.js.map