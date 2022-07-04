import { AddTaskComponent } from './../add-task/add-task.component';
import { PostServiceService } from './../post-service.service';
import { ModalComponent } from './../modal/modal.component';
import { Component, DoCheck, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
showData:any=[];
  user:any;
  name:any;
  taskArray:any=[];
  newUaser:any;


  constructor(private dialogRef:MatDialog,private api:PostServiceService,) {

   }
// ngDoCheck(): void {
//   this.api.Subject$.subscribe((data:any)=>{
//     // console.log(data);
//     this.name= data.UserName
    
//   })
// }
  ngOnInit(): void {

    let user1={name:"vishal",task:["go to marcket","go to park"]};
    let user2={name:"Sagar",task:["go to marcket","go to park"]};

    this.showData.push(user1)
    this.showData.push(user2)
    console.log(this.showData);
    
  }
  addUser(){
      let a = this.dialogRef.open(ModalComponent,{
          data:{
            width:500,
            height:500
    
          },
        disableClose:true
      });
      a.afterClosed().subscribe((data:any)=>{
       let obj={name:'',task:[]}
      
        this.newUaser=localStorage.getItem('user')
        obj.name=this.newUaser
        this.showData.push(obj)

        console.log("hello Data :",this.showData);
      })

  }
  close(){
    console.log("close");
    
    this.dialogRef.closeAll()
  }
  addTask(value:any,i:any){
   let a= this.dialogRef.open(AddTaskComponent,{
      data:{
        width : 500,
        height:200
      },
      disableClose:true
    })
    console.log(value);
    
    a.afterClosed().subscribe((newvalue:any)=>{
      console.log(value);
      this.taskArray=localStorage.getItem('task')
      // console.log(this.taskArray);
      // console.log("value data :",value);
      // console.log( "error",this.showData[value.path[1].id]);
      // console.log("value path:",value.path);
      // console.log("Value path[0]:",value.path[0]);
      this.showData[value.path[1].id].task.push(this.taskArray)

    
      // 
    })

  }
  deleteUserBoard(i:any){

    console.log("dlete",i);
    let a = this.dialogRef.open(ConfirmComponent,{
      data:{
        width:500,
        height:500

      },
      disableClose:true
    })
    a.afterClosed().subscribe((d:any)=>{
      this.api.Subject$.subscribe((v:any)=>{
        console.log(v);
        if(v===true){
           this.showData.splice(i,1)
        }

      })
    })


  }
  drag_drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


}
@Component({
  selector: 'app-boards',
  templateUrl: 'confirm.html',
})

export class ConfirmComponent implements OnInit{
  Delete:boolean=false;
  constructor(private dialogRef:MatDialog,private api:PostServiceService){
  }
  ngOnInit(){}
  delete(){
    this.Delete=true
    this.api.Subject.next(this.Delete)
    this.dialogRef.closeAll()
    

  }
  no(){
    this.Delete=false
    this.dialogRef.closeAll()
  }
}


