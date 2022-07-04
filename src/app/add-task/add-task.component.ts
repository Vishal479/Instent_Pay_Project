import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PostServiceService } from '../post-service.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
taskArray:any=[];
  // constructor() { }
  task!:FormGroup ;
  constructor(private router: Router,private dialogRef:MatDialog,private fb:FormBuilder,private api:PostServiceService) { }
 

  ngOnInit(): void {
    this.createForm()
  }
  createForm(){
    this.task=this.fb.group({
      AddTask:new FormControl(
        '',Validators.required
      )
    })
  }
  onSubmit(){
    console.log("close",this.task.value);
    this.taskArray.push(this.task.value.AddTask)
    localStorage.setItem('task',this.taskArray)
    
this.dialogRef.closeAll()

  }
}
