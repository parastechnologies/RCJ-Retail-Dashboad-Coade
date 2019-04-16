import { Component } from '@angular/core';
import { FirebaseService } from '../../providers/firebase';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  cpf;
  senha;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,public httpClient:HttpClient
  ) {
  //   this.httpClient.get('../../assets/data.txt').subscribe((res:any)=>{
  //     console.log('jshdjkf')
  //     //console.log(res);
  //     res.Planilha1.forEach(value => {
  //         console.log(value)
  //         this.firebaseService.create(value)
  //         .then((res) => {
  //           console.log(res)
  //         })
  //         .catch((err) => {
  //           console.log(err)
  //         })
  //     });
  // })
  }

  login() {
    let data = {
      user: this.cpf,
      password: this.senha
    }
    this.firebaseService.login(data)
      .then((res:any) => {
        console.log(res);
        if(res.role == "admin"){
          localStorage.setItem('currentuser',JSON.stringify(res));
          localStorage.setItem('logged_uv', 'true');
          this.router.navigate(['usuarios'])
        }else{
          Swal.fire(
            'Login',
            'Please enter valid credentials',
            'error'
          )
        }

      })
  }
}
