import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ResponseContainerData} from "../models/response-container.data";
import {Uniobject} from "../models/uniobject.data";

@Injectable({
  providedIn: 'root'
})
export class UniobjectService {
  entityId = 0;
  updatedEntityClass = "Uniobject";
  isUpdated = false;
  private uniobjectsUrl = 'http://localhost:8080/api/uniobjects';
  uniobjects: Uniobject[] = [];

  findAll(): Observable<Uniobject[]> {
    return this.http.get<ResponseContainerData<Uniobject[]>>(this.uniobjectsUrl)
      .pipe(
        map(container => container.data)
      );
  }

  findAllWhereMajorIsNull(): Observable<Uniobject[]> {
    return this.http.get<ResponseContainerData<Uniobject[]>>(this.uniobjectsUrl + '/independent').pipe(
      map(container => container.data),
    )
  }

  findRelatedById(id: number): Observable<Uniobject[]> {
    return this.http.get<ResponseContainerData<Uniobject[]>>(this.uniobjectsUrl + `/${id}/related`).pipe(
      map(container => container.data)
    );
  }

  findById(id: number): Observable<any> {
    return this.http.get<ResponseContainerData<any>>(this.uniobjectsUrl + `/${id}`)
      .pipe(
      map(res => res.data)
    );
  }

  findAllRelatedClasses(id: number): Observable<string[]> {
    return this.http.get<ResponseContainerData<string[]>>(this.uniobjectsUrl + `/${id}/classes`).pipe(
      map(res => res.data),
    )
  }

  update(id: number, request: any): Observable<any> {
    return this.http.put(`${this.uniobjectsUrl}/${id}`, request);
  }

  updateMajor(id: number, parentId: number): Observable<any> {
    return this.http.patch(`${this.uniobjectsUrl}/${id}/attach-to/${parentId}`, null);
  }


  constructor(private http: HttpClient) {}
}
