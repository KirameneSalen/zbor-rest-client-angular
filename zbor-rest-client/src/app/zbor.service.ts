import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import SockJS from 'sockjs-client';
import { Client, IMessage, Frame } from '@stomp/stompjs';

export interface Zbor {
  id: number;
  destinatie: string;
  dataPlecarii: string;
  oraPlecarii: string;
  aeroport: string;
  nrLocuriDisponibile: number;
}

@Injectable({ providedIn: 'root' })
export class ZborService {
  private baseUrl = 'http://localhost:8080/companie/zbor-requests';
  private stompClient: Client;
  private zborSubject = new Subject<Zbor>();

  constructor(private http: HttpClient) {
    this.stompClient = new Client({
      // use SockJS for fallback
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      onConnect: this.onConnected.bind(this),
      onStompError: (frame: any) => console.error('STOMP error', frame),
      debug: (str: any) => console.log('STOMP:', str)
    });
    this.stompClient.activate();
  }

  private onConnected(frame: Frame) {
    console.log('STOMP connected:', frame.headers)
    // subscribe to topic
    this.stompClient.subscribe('/topic/zbor-created', (message: IMessage) => {
      const zbor: Zbor = JSON.parse(message.body);
      console.log('Received new zbor via STOMP:', zbor);
      this.zborSubject.next(zbor);
    });
  }

  getAll(): Observable<Zbor[]> {
    return this.http.get<Zbor[]>(this.baseUrl);
  }

  filter(destinatie: string, dataPlecarii: string): Observable<Zbor[]> {
    let params = new HttpParams();
    if (destinatie) params = params.set('destinatie', destinatie);
    if (dataPlecarii) params = params.set('dataPlecarii', dataPlecarii);
    return this.http.get<Zbor[]>(this.baseUrl, { params });
  }

  getById(id: number): Observable<Zbor> {
    return this.http.get<Zbor>(`${this.baseUrl}/${id}`);
  }

  create(zbor: Partial<Zbor>): Observable<Zbor> {
    return this.http.post<Zbor>(this.baseUrl, zbor);
  }

  subscribeNewZbor(): Observable<Zbor> {
    return this.zborSubject.asObservable();
  }
}
