
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../providers/firebase';
import { ModalDialogService } from 'ngx-modal-dialog';
import swal from 'sweetalert2';

@Component({
  templateUrl: 'events.component.html'
})
export class EventsComponent implements OnInit {
  trashItem;
  events;
  loading: boolean = true;
  editEvent: boolean = false;
  showMessage: boolean = false;
  data: any = {};
  distribuitors: any;
  areas: any;
  loggedinuser: any;
  constructor(
    private firebaseService: FirebaseService,
    public modalService: ModalDialogService, public viewRef: ViewContainerRef
  ) {
    this.loggedinuser = JSON.parse(localStorage.getItem('currentuser'));
    this.firebaseService.getEvents().subscribe((res) => {
      this.loading = false;
      this.events = res;
      console.log(this.events)

    })

    this.firebaseService.getDist()
      .then((res) => {
        this.distribuitors = res;
        this.areas = this.filterAreas()
      })
  }

  getevents() {
    this.firebaseService.getEvents().subscribe((res) => {
      this.loading = false;
      this.events = res;
      console.log(this.events)
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

  edit(event) {
    console.log(event);
    console.log(event.data);
    this.editEvent = true;
    this.data = event;
    this.data.date = event.data;

  }

  save() {
    console.log(this.data);
    if (this.editEvent == true) {
      if (this.data.id) {
        console.log('if part')
        if (this.data.location == undefined) {
          this.data.location = '';
        }
        this.loading = true;
        this.firebaseService.updateEvent(this.data).then(res => {
          console.log(res);
          this.loading = false;
          this.data = {};
          this.getevents();
        })
      } else {
        swal.fire("Event not found", "error");
      }

    } else {
      console.log('else part')
      this.loading = true;
      this.data.id = this.loggedinuser.uid;
      this.data.title = this.data.name;
      this.data.createdAt = new Date();
      this.firebaseService.addEvent(this.data).then(res => {
        console.log(res);
        this.loading = false;
        this.data = {};
        this.getevents();

      })
    }


  }

  cancel() {
    this.editEvent = !this.editEvent;
    this.data = '';
  }
  removeEvent(user) {
    console.log(user)
    this.trashItem = user
    this.modalService.openDialog(this.viewRef, {
      title: 'Confirmar ação',
      actionButtons: [
        { text: 'Cancelar' },
        {
          text: 'Confimar exclusão', onAction: () => {
            this.firebaseService.removeEvent(this.trashItem)
              .then(() => {
                console.log('ação concluída com sucesso');
                //location.reload();
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
