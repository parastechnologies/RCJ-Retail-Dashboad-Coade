import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../providers/firebase';
import { ModalDialogService } from 'ngx-modal-dialog';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  templateUrl: 'usuarios.component.html',
})
export class UsuariosComponent implements OnInit {

  usuarios;
  newUser:any = {
    email: '',
    firstName: '',
    lastName: '',
    fullName: '',
    cpf: '',
    office: '',
    region: '',
    distributorName: '',
    createdAt: new Date()
  };
  showMessage = false;
  message = 'Usuario';
  loading = true;
  editUser = false;
  trashUser;
  distribuitors;
  areas;
  distributor: any;
  p: number = 1;
  userslist: any;
  query: any;
  itemsPerPage: any = 10;
  endpoint = 'https://firebasestorage.googleapis.com/v0/b/universidade-do-varejo-c6604.appspot.com/o/users.json?alt=media&token=d84badc1-1cbf-4f20-b5ae-0477327c46fe';
  constructor(
    private firebaseService: FirebaseService,public modalService: ModalDialogService, 
    public viewRef: ViewContainerRef, public http:Http,
  ) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    let httpOptions = new RequestOptions({ headers: headers });
    this.http.get(this.endpoint,httpOptions).subscribe(res=>{
      console.log(res)
    })

    this.firebaseService.getUsers()
      .then((res) => {
        this.userslist = res;
        this.usuarios = res;
        this.loading = false;
        //console.log(JSON.stringify(this.usuarios));
      })

    this.firebaseService.getDist()
      .then((res) => {
        this.distribuitors = res;
        this.areas = this.filterAreas();
        // console.log(this.areas);
        // console.log(this.distribuitors)
      })

  }
  filterAreas() {
    let unique_array = []
    for (let i = 0; i < this.distribuitors.length; i++) {
      if (unique_array.indexOf(this.distribuitors[i].area) == -1) {
        unique_array.push(this.distribuitors[i].area)
      }
    }
    return unique_array
  }

  selectedArea(event) {
    console.log(event);
    this.distributor = this.distribuitors.filter((item: any) => {
      return (item.area.toLowerCase().indexOf(event.toLowerCase()) > -1);
    })
    console.log(this.distributor);
  }

  changeRole(user) {
    this.firebaseService.updateUser(user)
  }

  createUser() {
    this.loading = true;
    this.newUser.createdAt = new Date();
    this.newUser.fullName = this.newUser.firstName + " " + this.newUser.lastName;
    this.firebaseService.create(this.newUser)
      .then(() => {
        this.firebaseService.getUsers()
          .then((res) => {
            this.usuarios = res;
            this.loading = false;
            this.newUser = {};
          })

        //Clear
        this.newUser.email = '';
        this.newUser.firstName = '';
        this.newUser.fullName = '';
        this.newUser.lastName = '';
        this.newUser.cpf = '';
      })
      .catch((err) => {
        this.loading = false;
        this.showMessage = true;
        this.message = 'Usuário já cadastrado';

        setTimeout(() => {
          this.showMessage = false;
        }, 2000)
      })
  }

  cancelEdit() {
    this.editUser = !this.editUser;

    //Clear
    // this.newUser.email = '';
    // this.newUser.firstName = '';
    // this.newUser.fullName = '';
    // this.newUser.lastName = '';
    // this.newUser.cpf = '';
  }

  saveUser() {
    this.loading = true;
    this.newUser.fullName = this.newUser.firstName + " " + this.newUser.lastName;
    this.newUser['updatedAt'] = new Date();
    this.firebaseService.updateProfileWithoutPass(this.newUser)
      .then(() => {
        this.firebaseService.getUsers()
          .then((res) => {
            this.newUser = {};
            this.usuarios = res;
            this.loading = false;
          })
      })
  }

  edit(user) {
    //Clear
    this.newUser.email = '';
    this.newUser.firstName = '';
    this.newUser.fullName = '';
    this.newUser.lastName = '';
    this.newUser.cpf = '';

    window.scrollTo(0, 0)
    this.editUser = true;
    this.newUser = user;
    if (!user.email) {
      this.newUser.email = this.newUser.cpf + "@scj.com";
    }
  }

  trash(user) {
    this.trashUser = user
    this.modalService.openDialog(this.viewRef, {
      title: 'Confirmar ação',
      actionButtons: [
        { text: 'Cancelar' },
        {
          text: 'Confimar exclusão de ' + this.trashUser.fullName, onAction: () => {
            this.firebaseService.removeUser(this.trashUser)
              .then(() => {
                console.log('ação concluída com sucesso');
                location.reload()
              })
          }
        }
      ],

    });
  }

  ngOnInit() {

  }
  search(event) {
    let q = event.target.value;
    console.log(typeof (event.target.value))
    console.log(q)
    if (q && q.trim() != '') {
      var d = this.userslist.filter((item: any) => {
        return (item.fullName.toLowerCase().indexOf(q.toLowerCase()) > -1);
      })
      console.log(d)
      if (d.length == 0)
        this.usuarios = d;
    } else {
      //this.users = [];
      this.usuarios = this.userslist;
    }
  }
}
