import { PostServiceService } from './../post-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  AddUserName!:FormGroup ;
  constructor(private router: Router,private dialogRef:MatDialog,private fb:FormBuilder,private api:PostServiceService) { }
  

  ngOnInit(): void {
  this.createForm()
    
  }
  createForm(){
    this.AddUserName=this.fb.group({
      UserName:new FormControl(
        '',Validators.required
      )
    })
  }
  onSubmit(){
this.api.Subject.next(this.AddUserName.value)
localStorage.setItem('user',this.AddUserName.value.UserName)
    console.log("hello",this.AddUserName);
    // this.router.navigateByUrl('post/index');

    
  }
 

}
