import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../issue.service'
import { FormBuilder, FormGroup, Form, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  
  public createForm : FormGroup

  constructor(private issueService : IssueService, private fb : FormBuilder, private router : Router) { }

  ngOnInit() {

    this.createForm = this.fb.group({
      title : ['', Validators.required],
      responsible : '',
      description : '',
      severity : ''
    })
  }

  addIssue(title, responsible, description, severity){
    this.issueService.addIssue(title, responsible, description, severity).subscribe(()=>{
      this.router.navigate(['/list'])
    })
  }

  updateTitle(){
    this.createForm.patchValue({'title' : 'admin'})
  }
  
  back(){
    this.router.navigate(['list'])
  }
  }
