import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../providers/firebase';
import { ModalDialogService } from 'ngx-modal-dialog';

@Component({
  templateUrl: 'aulas.component.html'
})
export class AulasComponent implements OnInit {

  aulas;
  cursos;
  aula = {
    name: '',
    description: '',
    id: 0,
    enable: true,
    createdAt: new Date(),
    video: '',
    courseId: 0
  };
  showMessage = false;
  message = 'Usuario';
  loading = true;
  editAula = false;
  trashItem;

  constructor(
    private firebaseService: FirebaseService,
    public modalService: ModalDialogService, public viewRef: ViewContainerRef,
    private router: Router,
  ) {
    this.firebaseService.getLessons()
      .then((res) => {
        this.aulas = res;
        this.loading = false;
      })
    this.firebaseService.getCursos()
      .then((res) => {
        this.cursos = res;
      })
  }

  quiz(a) {
    console.log(a)
    localStorage.setItem('quiz', a.id);
    this.router.navigate(['quiz'])
  }

  cancel() {
    this.editAula = !this.editAula;

    //Clear
    // this.aula.name = '';
    // this.aula.description = '';
  }

  save() {
    this.loading = true;
    this.firebaseService.updateItem('lessons', this.aula)
      .then(() => {

        this.firebaseService.getLessons()
          .then((res) => {
            this.aulas = res;
            this.loading = false;
          })
        this.firebaseService.getCursos()
          .then((res) => {
            this.cursos = res;
          })
      })
  }

  newCourse() {
    this.aula.createdAt = new Date();
    this.aula.id = this.aulas.length + 1;

    if (
      (this.aula.name != '') &&
      (this.aula.description != '')
    ) {
      this.loading = true
      // this.aula.courseId = parseInt(this.aula.course)
      this.firebaseService.newLesson(this.aula).then(() => {
        this.firebaseService.getLessons()
          .then((res) => {
            this.aulas = res;
            this.loading = false;

            this.aula.name = '';
            this.aula.description = '';
          })
      })

    }
  }

  edit(c) {
    //Clear
    this.aula.name = '';
    this.aula.description = '';

    window.scrollTo(0, 0)
    this.editAula = true;
    this.aula = c;
  }

  trash(user) {
    this.trashItem = user
    this.modalService.openDialog(this.viewRef, {
      title: 'Confirmar ação',
      actionButtons: [
        { text: 'Cancelar' },
        {
          text: 'Confimar exclusão', onAction: () => {
            this.firebaseService.removeCourse(this.trashItem)
              .then(() => {
                console.log('ação concluída com sucesso');
                location.reload()
              })
          }
        }
      ],

    });
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
