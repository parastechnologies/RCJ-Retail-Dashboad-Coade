
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../providers/firebase';
import { ModalDialogService } from 'ngx-modal-dialog';

@Component({
  templateUrl: 'posts.component.html'
})
export class PostsComponent implements OnInit {

  trashItem;
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
  posts;

  constructor(
    private firebaseService: FirebaseService,
    public modalService: ModalDialogService, public viewRef: ViewContainerRef
  ) {

    this.firebaseService.getPosts()
      .subscribe((res) => {
        this.posts = res;
        this.loading = false;
        console.log(this.posts)
      })
  }



  trash(user) {
    console.log(user)
    this.trashItem = user
    this.modalService.openDialog(this.viewRef, {
      title: 'Confirmar ação',
      actionButtons: [
        { text: 'Cancelar' },
        {
          text: 'Confimar exclusão', onAction: () => {
            this.firebaseService.removePost(this.trashItem)
              .then(() => {
                console.log('ação concluída com sucesso');
                //location.reload()
                this.viewRef.clear();
              })
          }
        }
      ],

    });
  }

  ngOnInit() {

  }
}
