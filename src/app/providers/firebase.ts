import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { AngularFireAuth } from "angularfire2/auth";
import 'rxjs/Rx';
import * as firebase from 'firebase';
// import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { combineLatest } from 'rxjs';

@Injectable()
export class FirebaseService {
    public myPhotosRef: any;

    constructor(
        private afs: AngularFirestore,
        private afAuth: AngularFireAuth
    ) {
        //Firestore config
        // afs.firestore.settings({
        //   timestampsInSnapshots: true,
        // });
    }

    login(data) {
        return new Promise((resolve, reject) => {
            //Buscar usuario
            this.afs.firestore.collection('users')
                .where('cpf', '==', data.user)
                .get()
                .then((docs) => {
                    let users = [];
                    docs.forEach(doc => {
                        let da = doc.data()
                        da.uid = doc.id;
                        users.push(da);
                    });
                    if (users.length > 0) {
                        let email = users[0].email;
                        this.afAuth.auth.signInWithEmailAndPassword(email, data.password)
                            .then(() => {
                                resolve(users[0]);
                            })
                            .catch(() => {
                                reject()
                            })
                    }
                    else {
                        reject()
                    }
                })
        })
    }
    create(data) {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.cpf)
                .then(() => {
                    this.afs.firestore.collection('users').add(data)
                        .then((result) => {
                            resolve();
                        })
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    //IMAGE
    uploadPhoto(myPhoto) {
        let im = firebase.storage().ref('Images/');
        console.log(myPhoto)
        return im.child('/' + new Date())
            .putString(myPhoto, 'base64', { contentType: 'image/jpeg' })
    }

    //USERS
    updateUser(data) {
        return new Promise((resolve, reject) => {
            this.afs.firestore.collection('users').doc(data.id).update(data)
                .then((res) => {
                    resolve()
                })
        });
    }
    getProfile() {
        return new Promise((resolve, reject) => {
            this.afs.firestore.collection('users').doc(localStorage.getItem('id_usuario'))
                .get()
                .then((res) => {
                    resolve(res.data())
                })
        })
    }
    updateProfileWithPass(data, newPass) {
        return new Promise((resolve, reject) => {
            var user = this.afAuth.auth.currentUser;
            user.updatePassword(newPass).then((res) => {
                console.log('sucess', res)
                this.afs.firestore.collection('users').doc(localStorage.getItem('id_usuario')).update(data)
                    .then(() => {
                        resolve()
                    })
            }).catch(() => {
            });
        });
    }
    updateProfileWithoutPass(data) {
        return new Promise((resolve, reject) => {
            this.afs.firestore.collection('users').doc(data.id).update(data)
                .then(() => {
                    resolve()
                })
        });
    }
    getUsers() {
        return new Promise((resolve, reject) => {
            this.afs.firestore.collection('users')
                .orderBy('createdAt', 'desc')
                .get()
                .then((res) => {
                    let items = [];
                    res.forEach((doc) => {
                        let i = doc.data();
                        i.id = doc.id
                        items.push(i)
                    })
                    resolve(items)
                })
        })
    }

    getDist() {
        return new Promise((resolve, reject) => {
            this.afs.firestore.collection('distributors')
                .get()
                .then((res) => {
                    let items = [];
                    res.forEach((doc) => {
                        let i = doc.data();
                        i.id = doc.id
                        items.push(i)
                    })
                    resolve(items)
                })
        })
    }

    //NOTIFICATION
    newNotification(data) {
        return this.afs.collection('notifications').add(data)
    }
    getNotifications() {
        return new Promise((resolve, reject) => {
            this.afs.firestore.collection('notifications')
                .orderBy('createdAt', 'desc')
                .get()
                .then((res) => {
                    let items = [];
                    res.forEach((doc) => {
                        let i = doc.data();
                        i.id = doc.id
                        items.push(i)
                    })
                    resolve(items)
                })
        })
    }

    //POSTS
    newPost(message) {
        const data = {
            userId: localStorage.getItem('id_usuario'),
            type: 'status',
            message: message,
            createdAt: new Date()
        };

        return this.afs.firestore.collection('posts').add(data)
    }

    //New quiz score
    newQuizScore() {
        let data = {
            type: "quiz",
            value: 1,
            userId: localStorage.getItem('id_usuario')
        }
        return this.afs.firestore.collection('scores').add(data)
    }



    newPostWithPhoto(message, photo) {
        const data = {
            userId: localStorage.getItem('id_usuario'),
            type: 'photo',
            photoUrl: photo,
            message: message,
            createdAt: new Date()
        };

        return this.afs.firestore.collection('posts').add(data)
    }
    getPosts() {
        const collection = this.afs.collection('posts', ref => ref
            .orderBy('createdAt', 'desc'));
        return collection.snapshotChanges().map(changes => {
            return changes.map(result => {
                let res = <any>{};
                let data = <any>{};
                data = result.payload.doc.data();
                data.postId = result.payload.doc.id;
                //Get reference to other document
                const id = data.userId;
                //Get related document
                return this.afs.collection('users').doc(id).snapshotChanges().take(1).map(actions => {
                    return actions.payload.data();
                }).map((user: any) => {
                    res = data;
                    res.data = new Date(data.createdAt.seconds * 1000)
                    if (user != undefined) {
                        res.name = user.fullName;
                        res.location = user.city;
                    }


                    return res
                });
            })
        }).flatMap(feeds =>
            combineLatest(feeds)
        );
    }
    removePost(post) {
        return this.afs.firestore.collection('posts').doc(post.postId).delete()
    }
    removeUser(user) {
        return this.afs.firestore.collection('users').doc(user.id).delete()
    }
    removeCourse(course) {
        return this.afs.firestore.collection('courses').doc(course.courseId).delete()
    }
    removeTrilha(trilha, curso) {
        return this.afs.firestore.collection('courses').doc(curso).collection('modules').doc(trilha.id).delete()
    }
    updateItem(col, data) {
        console.log(col, data)
        return this.afs.firestore.collection(col).doc(data.id).update(data)
    }
    updateCourse(data) {
        return this.afs.firestore.collection('courses').doc(data.courseId).update(data)
    }

    newTrilha(curso, trilha) {
        return this.afs.firestore.collection('courses').doc(curso).collection('modules').add(trilha)
    }

    getLessonsByCourse(id) {
        console.log('course', id)
        return new Promise((resolve, reject) => {

            this.afs.firestore.collection('courses').doc(id).collection('modules')
                .orderBy('order', 'asc')
                .get()
                .then((res) => {
                    const promises = [];
                    let items = [];

                    res.forEach((doc) => {
                        let actual = doc.data();
                        items.push({ id: doc.id, lesson: actual.lessonId, ordem: actual.order })

                        promises.push(
                            this.afs.firestore.collection('lessons').doc(actual.lessonId).get()

                        );
                    });


                    Promise.all(promises).then((res) => {
                        let array = [];
                        console.log(items)
                        let i = 0;
                        for (i; i < res.length; i++) {

                            // let lesson = res[i];
                            // let item = lesson.data();
                            // console.log(lesson.data())
                            // // item['id'] = items[o].id
                            // // console.log('item', item.id)
                            // array.push(item)

                            let o = 0;
                            for (o; o < items.length; o++) {

                                if (items[o].lesson === res[i].id) {
                                    let lesson = res[i];
                                    let item = lesson.data();
                                    console.log(lesson.data())
                                    item['id'] = items[o].id
                                    item['order2'] = items[o].ordem
                                    // console.log('item', item.id)
                                    array.push(item)
                                }
                            };

                        }

                        resolve(array)
                    })
                })
        })
    }

    //Like
    likePost(postId) {
        let data = {
            postId: postId,
            userId: localStorage.getItem('id_usuario'),
            createdAt: new Date()
        }
        return this.afs.firestore.collection('likes').add(data)
    }
    deleteLike(likeId) {
        return this.afs.firestore.collection('likes').doc(likeId).delete()
    }
    verifyLike(postId) {
        return new Promise((resolve, reject) => {
            this.afs.firestore.collection('likes')
                .where('userId', '==', localStorage.getItem('id_usuario'))
                .where('postId', '==', postId)
                .get()
                .then((res) => {
                    let items = [];
                    res.forEach((doc) => {
                        let i = doc.data();
                        i.id = doc.id
                        items.push(i)
                    })
                    if (items.length > 0) {
                        let data = {
                            type: true,
                            obj: items[0]
                        }
                        resolve(data)
                    }
                    else {
                        let data = {
                            type: false,
                            obj: {}
                        }
                        resolve(data)
                    }
                })
        })
    }
    getLikes(id) {
        const collection = this.afs.collection('likes', ref => ref
            .where('postId', '==', id));
        return collection.snapshotChanges().map(changes => {
            return changes.map(result => {
                let data = <any>{};
                return data = result.payload.doc.data();
            })
        })
    }

    //Comments
    getComments(postId) {
        // const collection: AngularFirestoreCollection<any> = this.afs.collection('comments', ref => ref
        //     .where('postId', '==', postId)
        //     .orderBy('createdAt')
        // )
        // const collection$: Observable<any> = collection.snapshotChanges()
        //     .map(actions => {
        //         return actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }));
        //     });
        // return collection$;
        const collection = this.afs.collection('comments', ref => ref
            .where('postId', '==', postId)
            .orderBy('createdAt', 'desc')
        );
        return collection.snapshotChanges().map(changes => {
            return changes.map(result => {
                let data = <any>{};
                data = result.payload.doc.data();
                data.postId = result.payload.doc.id;
                //Get reference to other document
                const id = data.userId;
                //Get related document
                return this.afs.collection('users').doc(id).snapshotChanges().take(1).map(actions => {
                    return actions.payload.data();
                }).map(user => {
                    let res = <any>{};
                    res = data;
                    res.name = user['fullName'];
                    return res
                });
            })
        }).flatMap(feeds =>
            Observable.combineLatest(feeds)
        );
    }
    addComment(postId, message) {
        let data = {
            postId: postId,
            message: message,
            userId: localStorage.getItem('id_usuario'),
            createdAt: new Date()
        }

        return this.afs.firestore.collection('comments').add(data)
    }

    //COURSES
    getCourseById(id) {
        return new Promise((resolve, reject) => {
            this.afs.firestore.collection('courses')
                .where('id', '==', id)
                .get()
                .then((res) => {
                    let courses = [];
                    res.forEach((doc) => {
                        courses.push(doc.data())
                    })
                    resolve(courses[0])
                })
        })
    }
    getCursos() {
        return new Promise((resolve, reject) => {
            this.afs.firestore.collection('courses')
                // .where('id', '==', id)
                .get()
                .then((res) => {
                    let courses = [];
                    res.forEach((doc) => {
                        let item = doc.data();
                        item.courseId = doc.id
                        courses.push(item)
                    })
                    resolve(courses)
                })
        })
    }
    newCourse(obj) {
        return this.afs.firestore.doc('courses/' + obj.id).set(obj)
    }

    newLesson(obj) {
        return this.afs.firestore.doc('lessons/' + obj.id).set(obj)
    }


    getLessons() {
        return new Promise((resolve, reject) => {
            this.afs.firestore.collection('lessons')
                .get()
                .then((res) => {
                    let l = [];
                    res.forEach((doc) => {
                        let actual = doc.data();
                        actual.id = doc.id
                        l.push(actual)
                    })
                    resolve(l)
                })
        })
    }

    newQuiz(aula, quiz) {
        return this.afs.firestore.collection('lessons').doc(aula).collection('quizzes').add(quiz)
    }

    getQuizzesByLessonId(id) {
        const collection: AngularFirestoreCollection<any> = this.afs.collection('lessons').doc(id).collection('quizzes', ref => ref
        )
        const collection$: Observable<any> = collection.snapshotChanges()
            .map(actions => {
                return actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }));
            });
        return collection$;
        // return new Promise((resolve, reject) => {
        //     this.afs.firestore.collection('lessons').doc(id).collection('quizzes')
        //         .get()
        //         .then((res) => {
        //             let lista = [];
        //             res.forEach((doc) => {
        //                 // let actual = doc.data();
        //                 // actual.id = doc.id
        //                 lista.push(doc.data())
        //             })
        //             resolve(lista)
        //         })
        // })
    }


    getEvents() {
        //alert('here')
        const collection = this.afs.collection('events', ref => ref
            .orderBy('createdAt', 'desc'));
        return collection.snapshotChanges().map(changes => {
            return changes.map(result => {
                console.log(result)
                let res = <any>{};
                let data = <any>{};
                data = result.payload.doc.data();
                console.log(data)
               // data.id = result.payload.doc.id;
                return this.afs.collection('users').doc(data.id).snapshotChanges().take(1).map(actions => {
                    return actions.payload.data();
                }).map((user: any) => {
                    console.log(user)
                    if (user) {
                        res = data;
                        res.data = new Date(data.createdAt.seconds * 1000)
                        res.name = user.firstName+' '+user.lastName;
                        res.location = user.city;
                        return res
                    }
                });
            })
        }).flatMap(feeds =>
            combineLatest(feeds)
        );
    }

    removeEvent(event) {
        return this.afs.firestore.collection('events').doc(event.id).delete()
    }
    updateEvent(event) {
        console.log(event)
        return this.afs.firestore.collection('events').doc(event.id).update(event);
    }
    addEvent(event) {
        console.log(event)
        return this.afs.firestore.collection('events').add(event)
    }
}