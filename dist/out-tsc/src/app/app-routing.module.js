import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
var routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard]
    },
    {
        path: 'list',
        loadChildren: './list/list.module#ListPageModule'
    },
    { path: 'login', loadChildren: './login/login.module#LoginPageModule', canActivate: [LoginGuard] },
    { path: 'cadastro', loadChildren: './login/cadastro/cadastro.module#CadastroPageModule', canActivate: [LoginGuard] },
    { path: 'tela-bar', loadChildren: './list/tela-bar/tela-bar.module#TelaBarPageModule' },
    { path: 'tela-bar/:idBar', loadChildren: './list/tela-bar/tela-bar.module#TelaBarPageModule' },
    { path: 'comparar', loadChildren: './list/comparar/comparar.module#CompararPageModule' },
    { path: 'detalhes', loadChildren: './produtos/detalhes/detalhes.module#DetalhesPageModule', canActivate: [AuthGuard] },
    { path: 'detalhes/:id', loadChildren: './produtos/detalhes/detalhes.module#DetalhesPageModule', canActivate: [AuthGuard] },
    { path: 'carrinho', loadChildren: './produtos/carrinho/carrinho.module#CarrinhoPageModule' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map