import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';


@Component({
  selector: 'app-private-tasks',
  templateUrl: './private-tasks.component.html',
  styleUrls: ['./private-tasks.component.scss']
})
export class PrivateTasksComponent implements OnInit {

  pTasks = [];

  constructor(
    private taskService: TasksService
  ) { }

  ngOnInit() {
    this.taskService.getPrivateTasks()
        .subscribe(
          res => {
            console.log(res)
            this.pTasks = res;
          },
          err => console.log(err)
        )
  }

  getPrivateTasks(){

  }

}
