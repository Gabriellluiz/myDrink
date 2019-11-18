import { Injectable } from '@angular/core';
import { AngularFireAuth } from '../../../node_modules/@angular/fire/auth';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth) { }

  login(user: User){
    return this.afa.auth.signInWithEmailAndPassword(user.usuario, user.senha);
  }

  resetSenha(user: User){
    return this.afa.auth.sendPasswordResetEmail(user.usuario);
  }

  register(user: User){
    return this.afa.auth.createUserWithEmailAndPassword(user.usuario, user.senha);
  }

  logout(){
    return this.afa.auth.signOut();
  }

  getAuth(){
    return this.afa.auth;
  }
}
