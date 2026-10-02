import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpDemoResponse } from '../models/demo.models';

@Injectable({
  providedIn: 'root',
})
export class HttpDemoService {
  private readonly http = inject(HttpClient);

  loadDemo(): Observable<HttpDemoResponse> {
    return this.http.get<HttpDemoResponse>('/api/showcase');
  }
}
