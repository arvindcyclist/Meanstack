import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Issue } from '../../issue.model'
import { MatTableDataSource } from '@angular/material'
import { IssueService } from '../../issue.service'
import { routerNgProbeToken } from '@angular/router/src/router_module';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  issues : Issue[]
  
  displayedColumns = ['title', 'responsible', 'severity', 'status', 'actions']

  constructor(private issueService : IssueService, private router : Router) { }

  ngOnInit() {
    this.fetchIssues()
    
  }

  // fetchIssues(){
  //   this.issueService.getIssues().subscribe((data : Issue[])=>{
  //     this.issues = data
  //     //Observable stream of data arrays named issues is used in template
  //     console.log('Data is displayed')
  //     console.log(this.issues)
  //   })
  //   //this.issues = [{id : '1', title: 'arvind', responsible : 'sunil', severity: 'critical', description:'done' ,status : 'Open'}]
  // }

  fetchIssues(){
    this.issueService.getIssues()
      .toPromise().then((data : Issue[])=>{
        this.issues = data
        console.log("then block"+data)
        
      }).catch()
  }

  editIssue(id){
    this.router.navigate([`/edit/${id}`])
  }

  deleteIssue(id){
    this.issueService.deleteIssue(id).subscribe(()=>{
      this.fetchIssues()
    })
  }

}
