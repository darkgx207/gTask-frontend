import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Task } from './model/Task';
import { App1Component } from './components/app1/app1.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,App1Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'painel';

  selectedTask!:Task 
}
