import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../providers/firebase';
import { ModalDialogService } from 'ngx-modal-dialog';

@Component({
  templateUrl: 'trilhas.component.html'
})
export class TrilhasComponent implements OnInit {

  cursos;
  curso = {
    name: '',
    description: '',
    id: 0,
    enable: true,
    createdAt: new Date()
  };
  showMessage = false;
  message = 'Usuario';
  loading = true;
  editCurso = false;
  trashItem;
  cursoId;
  lessons;
  trilha = {
    order: 0,
    lessonId: ''
  }

  constructor(
    private firebaseService: FirebaseService,
    public modalService: ModalDialogService, public viewRef: ViewContainerRef
  ) {
    this.cursoId = localStorage.getItem('trilhas');


    this.firebaseService.getLessons().then((lessons) => {
      console.log('lessons', lessons)
      this.lessons = lessons
    })


    this.firebaseService.getLessonsByCourse(this.cursoId).then((res) => {
      this.cursos = res
      this.loading = false
      console.log(res)
    })
  }

  novaTrilha() {
    if (this.trilha.lessonId != '') {
      this.loading = true
      this.firebaseService.newTrilha(this.cursoId, this.trilha).then(() => {
        this.firebaseService.getLessonsByCourse(this.cursoId).then((res) => {
          this.cursos = res
          this.loading = false
          console.log(res)
        })
      })
    }
  }

  cancel() {
    this.editCurso = !this.editCurso;

    // //Clear
    // this.curso.name = '';
    // this.curso.description = '';
  }


  newCourse() {
    this.curso.createdAt = new Date();
    this.curso.id = this.cursos.length + 1;

    if (
      (this.curso.name != '') &&
      (this.curso.description != '')
    ) {
      this.loading = true
      this.firebaseService.newCourse(this.curso).then(() => {
        this.firebaseService.getCursos()
          .then((res) => {
            this.cursos = res;
            this.loading = false;

            this.curso.name = '';
            this.curso.description = '';
          })
      })

    }
  }


  save() {
    this.loading = true;
    this.firebaseService.updateCourse(this.curso)
      .then(() => {

        this.firebaseService.getCursos()
          .then((res) => {
            this.cursos = res;
            this.loading = false;
          })
      })
  }


  edit(c) {
    //Clear
    this.curso.name = '';
    this.curso.description = '';

    window.scrollTo(0, 0)
    this.editCurso = true;
    this.curso = c;
  }

  trash(user) {
    this.trashItem = user
    console.log(user)
    this.modalService.openDialog(this.viewRef, {
      title: 'Confirmar ação',
      actionButtons: [
        { text: 'Cancelar' },
        {
          text: 'Confimar exclusão', onAction: () => {
            this.firebaseService.removeTrilha(this.trashItem, this.cursoId)
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
