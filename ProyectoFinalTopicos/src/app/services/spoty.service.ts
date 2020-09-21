import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SpotyService {
 
  constructor(private http: HttpClient,private db:AngularFirestore) { 
  }

  getQuery( query: string ) {
    const url = `https://api.spotify.com/v1/${ query }`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQDK-EOOsmfxqEGabp6nl08GwF6qT6-zQZRGMptXA9uxPLXYk9W1jdq1y1I-XQpEq-H-941bhkm3qKCyyhI'
    });
    return this.http.get(url, { headers });
  }

  getNewRelease(){
    return this.getQuery('browse/new-releases?limit=20')
              .pipe( map( data => data['albums'].items ));
  }

  getArtista( termino: string, idusuario: string ,lati:number,longi:number,direcci:string,pai:string) {
    this.db.collection("busqueda").doc(this.db.createId()).set({
      uidusuario: idusuario,
      busqueda: termino,
      latitude:lati,
      longitud:longi,
      direccion:direcci,
      pais:pai
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });

    return this.getQuery(`search?q=${ termino }&type=track&limit=15`)
                .pipe( map( data => data['tracks'].items));
  }
}
