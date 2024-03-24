import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/Task';
import { Group } from '../model/Group';

const API:string = "http://localhost:8080";


@Injectable({
  providedIn: 'root'
})

export class TodoApiService {
  constructor(
    public http : HttpClient
  ) { }

  
  // Tasks
  async getTask(id:number)   { return this.http.get<Task>(`${API}/task/${id}`) }
  async getAlltasks()        { return this.http.get<Task[]>(`${API}/task/`) }
  async saveTask(task :Task) { return this.http.post<Task>(`${API}/task/`,task, {observe : 'response'}) }
  async deleteTask(task :Task) { return this.http.post<Task>(`${API}/task/delete`,task,{observe : 'response'}) }

  //Groups
  async getGroup(id:number)    { return this.http.get<Group>(`${API}/group/${id}`) }
  async getAllGroups()         { return this.http.get<Group[]>(`${API}/group/`) }
  async saveGroup(group:Group) { return this.http.post<Group>(`${API}/group/`,group,{observe : 'response'}) }
}


