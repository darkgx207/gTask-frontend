import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { TodoApiService } from '../../services/todo-api.service';
import { Task } from '../../model/Task';
import { faGear,faGears } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Group } from '../../model/Group';
import { ModalComponent } from '../modal/modal.component';
import { GreenComponent } from '../buttons/green/green.component';


@Component({
  selector: 'app-app1',
  standalone: true,
  imports: [CommonModule,FormsModule,FontAwesomeModule,ModalComponent,GreenComponent],
  templateUrl: './app1.component.html',
  styleUrl: './app1.component.scss'
})
export class App1Component {

  public taskModal:Task = new Task()
  public tasks: Task[] = []
  public groups : Group[] = []
  public selectedTask!: Task 
  public icons = {gear:faGear,gears:faGears}
  public showModal :boolean = false
  public selectedGroup!: Group
  
  constructor( public api : TodoApiService ) {}

  async ngOnInit() {
    this.refreshTasks()
    this.refreshGroups()
  }

  async refreshTasks() {
    this.selectedTask = new Task('','',false,new Group(0));
    this.selectedTask.id = 0;
    (await this.api.getAlltasks()).subscribe( tasks => this.tasks = tasks );
  }
  async refreshGroups() {
    (await this.api.getAllGroups()).subscribe(groups => this.groups = groups);
  }
  
  public async setDoneUndone() {
    if(this.selectedTask.id != 0) {
      const task = this.selectedTask;
      task.done = !task.done;
      (await this.api.saveTask(task)).subscribe(
        res => {
          if(res.status == 200) {
            this.refreshTasks()
          }
      })
    }
  }

  public async addGroup (name:HTMLInputElement,m:ModalComponent) {
    (await this.api.saveGroup(new Group(0,name.value))).subscribe(
      res => {
        if(res.status == 200) {
          name.value = ''
          m.btnShowModal()
          this.refreshGroups()
        }
    })
  }

  async deleteTask() {
    (await this.api.deleteTask(this.selectedTask)).subscribe(
      res => {
        if (res.status == 200) {
          this.refreshTasks()
        }else {
          alert('Error')
        }
      })
  }

  public async addTask() {
    if (this.taskModal.name != '' && this.selectedGroup != null) {
      this.taskModal.group = this.selectedGroup;

      (await this.api.saveTask(this.taskModal)).subscribe(
       res => {
          if(res.status == 200) {
            this.taskModal = new Task()
            this.showModal = false
            this.refreshTasks()
          }
      })
    } else {
      alert('Verifique se os dados estão corretos e preenchidos corretamente!')
    }
    // this.tasks.push(task)
  }

  public btnShowModalTask() { this.showModal = !this.showModal }


  //SELECTIONS 
  public selectTask(task:Task) { this.selectedTask = task ; }
  public selectGroup(group:Group) { this.selectedGroup = group ;}


}
