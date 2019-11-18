import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
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
  { path: 'comparar/:id', loadChildren: './list/comparar/comparar.module#CompararPageModule' },
  { path: 'detalhes', loadChildren: './produtos/detalhes/detalhes.module#DetalhesPageModule', canActivate: [AuthGuard] },
  { path: 'detalhes/:id', loadChildren: './produtos/detalhes/detalhes.module#DetalhesPageModule', canActivate: [AuthGuard] },
  { path: 'carrinho', loadChildren: './produtos/carrinho/carrinho.module#CarrinhoPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
