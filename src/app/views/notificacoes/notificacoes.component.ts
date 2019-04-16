
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../providers/firebase';
@Component({
  templateUrl: 'notificacoes.component.html'
})
export class NotificacoesComponent implements OnInit {

  usuarios;
  not = {
    title: '',
    message: '',
    user: '',
    createdAt: new Date()
  };
  showMessage = false;
  message = 'Usuario';
  loading = true;
  notifications;

  constructor(
    private firebaseService: FirebaseService
  ) {
    this.firebaseService.getUsers()
      .then((res) => {
        this.usuarios = res;
      })
    this.firebaseService.getNotifications()
      .then((res) => {
        this.notifications = res;
        this.loading = false;
      })
  }

  changeRole(user) {
    this.firebaseService.updateUser(user)
  }


  send() {
    let id = this.not.user.split('*')[0]
    let fcm = this.not.user.split('*')[1]
    if (fcm != '') {
      if ((this.not.title != '') && (this.not.message != '')) {
        this.loading = true;
        this.not.createdAt = new Date()
        let obj = {
          title: this.not.title,
          message: this.not.message,
          token: fcm,
          userId: id,
          createdAt: this.not.createdAt,
          read: false
        };

        this.firebaseService.newNotification(obj)
          .then(() => {
            this.firebaseService.getNotifications()
              .then((res) => {
                this.notifications = res;
                this.loading = false;
                this.not.title = '';
                this.not.message = '';

              })

          })
      }

    }
    else {
      this.showMessage = true;
      this.message = 'Esse usuário não possui um token para receber notificações ainda.';

      setTimeout(() => {
        this.showMessage = false;
      }, 3000)
    }
  }

  // createUser() {
  //   this.loading = true;
  //   this.newUser.createdAt = new Date();
  //   this.newUser.fullName = this.newUser.firstName + " " + this.newUser.lastName;
  //   this.firebaseService.create(this.newUser)
  //     .then(() => {
  //       this.firebaseService.getUsers()
  //         .then((res) => {
  //           this.usuarios = res;
  //           this.loading = false;
  //         })

  //       //Clear
  //       this.newUser.email = '';
  //       this.newUser.firstName = '';
  //       this.newUser.fullName = '';
  //       this.newUser.lastName = '';
  //       this.newUser.cpf = '';
  //     })
  //     .catch((err) => {
  //       this.loading = false;
  //       this.showMessage = true;
  //       this.message = 'Usuário já cadastrado';

  //       setTimeout(() => {
  //         this.showMessage = false;
  //       }, 2000)
  //     })
  // }

  ngOnInit() {

  }
}
