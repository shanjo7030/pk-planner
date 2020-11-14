import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChoosedService } from '../choosed.service';
import UserVote from '../user.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  isSelected:boolean = false;
  valueSelected:string;
  userSelected: UserVote = new UserVote();
  @ViewChild('ticketNumber') ticketNo:ElementRef ;
  userList:any;
  revealVotes:boolean = false;
  showOtherButtons:boolean = false;
  voted:boolean = false;
  ticketNoValue:number;
  isadmin:boolean = false; 


  constructor(private choosedService:ChoosedService) { }

  ngOnInit(): void {
    this.userSelected.username = localStorage.getItem('username');
    this.userSelected.reveal = false;
    console.log(this.choosedService.checkIsAdmin());
    this.choosedService.checkIsAdmin().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key })
        )
      )
    ).subscribe(data => {
      let username = localStorage.getItem('username');
      for(let i=0;i<data.length;i++) {
        if(data[i].key == username) {
          this.isadmin=true;
          break;
        }
      }
    });
  }

  onSelectItem(value:string) {
    this.valueSelected = value;
    this.isSelected = true;
    this.userSelected.value=value;
  }

  onSubmit() {
    if(this.ticketNo.nativeElement.value===null || this.ticketNo.nativeElement.value==='') {
      alert('Please add ticket number');
      return;
    }
    else if(this.isSelected==false) {
      alert('Please Select any Value');
      return;
    }
    this.ticketNoValue = this.ticketNo.nativeElement.value;
    this.choosedService.create(this.userSelected,this.ticketNo.nativeElement.value).then(() => {
      console.log('Inserted new value successfully!');
      this.voted=true;
    });
  }

  onSeeWhoVoted() {
    console.log(this.ticketNo.nativeElement.value);
    if(this.ticketNo.nativeElement.value===null || this.ticketNo.nativeElement.value==='') {
      alert('Please add ticket number');
      return;
    }

    this.choosedService.getAll(this.ticketNo.nativeElement.value).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {

      if(data.length==0){
        window.location.reload(); 
      }
      this.showOtherButtons= true;
      this.userList = data;
      for(let i=0;i<data.length;i++) {
        if (data[i].reveal==true) {
          this.revealVotes = true;
          break;
        }
      }
    });
  }

  onReveal() {
    this.ticketNoValue = this.ticketNo.nativeElement.value;
    this.userSelected.reveal = true;
    this.choosedService.create(this.userSelected,this.ticketNo.nativeElement.value).then(() => {
      console.log('Inserted new value successfully!');
      this.voted=true;
    });
  }

  onReVote() {
    if(this.userList) {
      this.choosedService.deleteAll(this.ticketNoValue);
    }
    window.location.reload(); 
  }
}
