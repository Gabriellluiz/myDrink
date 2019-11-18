import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
var CompararPage = /** @class */ (function () {
    function CompararPage(menu) {
        this.menu = menu;
    }
    CompararPage.prototype.ngOnInit = function () {
    };
    CompararPage.prototype.ionViewWillEnter = function () { this.menu.isOpen('end'); };
    CompararPage = tslib_1.__decorate([
        Component({
            selector: 'app-comparar',
            templateUrl: './comparar.page.html',
            styleUrls: ['./comparar.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [MenuController])
    ], CompararPage);
    return CompararPage;
}());
export { CompararPage };
//# sourceMappingURL=comparar.page.js.map