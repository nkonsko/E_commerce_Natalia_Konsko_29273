import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor() {
  }
  @Injectable({
    providedIn: 'root'
  })
  productsRequest = { // obiekt z kryteriami, na podstawie których będziemy szukać produktów
    action: 'getProducts',
    name: '',
    category: ''
  };
  products: any; // Tutaj wyląduje obiekt z produktami - odpowiedź API i bazy danych na naszą prośbę
  apiPath = 'http://jakubadamus.cba.pl/xhr.php?'; // Ścieżka do naszego api

  cart : any[] = [];

  getProducts(productsRequest: { action: string; name: string; category: string; }) { //  Pobiera produkty poprzez API
    const s = new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      const SQL = ('object=' + encodeURIComponent(JSON.stringify(productsRequest)));
      console.log(this.apiPath + SQL);
      xhttp.open('GET', this.apiPath + SQL, true);
      xhttp.send();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          const resultObject = JSON.parse(xhttp.responseText);

          if (resultObject !== null) {
            resolve(resultObject);
          } else {
            reject('Failed');
          }
        }
      };
    });
    s.then((onmessage: any) => {
      this.products = onmessage;
      console.log(this.products);
    }).catch((onmessage) => {
      console.log('Coś poszło nie tak podczas wczytywania produktów!');
    });
  }
  addProduct(newProduct: any) {
    const s = new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      let request = { action: 'addProduct', newProduct: newProduct }
      const SQL = ('object=' + encodeURIComponent(JSON.stringify(request)));
      console.log(this.apiPath + SQL);
      xhttp.open('GET', this.apiPath + SQL, true);
      xhttp.send();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          const resultObject = JSON.parse(xhttp.responseText);

          if (resultObject !== null) {
            resolve(resultObject);
          } else {
            reject('Failed');
          }
        }
      };
    });
    s.then((onmessage: any) => {
      console.log('Pomyślnie dodano nowy produkt!');
    }).catch((onmessage) => {
      console.log('Coś poszło nie tak podczas dodawania nowego produktu!');
    });
  }
  removeProduct(id: any) {
    const s = new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      let request = { action: 'removeProduct', id: id }
      const SQL = ('object=' + encodeURIComponent(JSON.stringify(request)));
      console.log(this.apiPath + SQL);
      xhttp.open('GET', this.apiPath + SQL, true);
      xhttp.send();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          const resultObject = JSON.parse(xhttp.responseText);

          if (resultObject !== null) {
            resolve(resultObject);
          } else {
            reject('Failed');
          }
        }
      };
    });
    s.then((onmessage: any) => {
      console.log('Pomyślnie usunięto produkt!');
    }).catch((onmessage) => {
      console.log('Coś poszło nie tak podczas usuwania produktu!');
    });
  }
}


