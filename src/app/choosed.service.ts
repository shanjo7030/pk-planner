import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import UserVote from './user.model';


@Injectable({
  providedIn: 'root'
})
export class ChoosedService {

  private dbPath = '/online';
  userVoteRef: AngularFireList<UserVote> = null;
  adminList:AngularFireList<string> = null;


  constructor(private db: AngularFireDatabase) {
    this.userVoteRef = db.list(this.dbPath);
  }

  getAll(ticketNo:number): AngularFireList<UserVote> {
    this.userVoteRef = this.db.list('/'+ticketNo); 
    return this.userVoteRef;
  }

  create(voteItem: UserVote,ticketNo:number): any {
    this.userVoteRef = this.db.list('/'+ticketNo); 
    return this.userVoteRef.set(voteItem.username,voteItem);
  }

  update(key: string, value: any): Promise<void> {
    return this.userVoteRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.userVoteRef.remove(key);
  }

  deleteAll(ticketNo:number): Promise<void> {
    this.userVoteRef = this.db.list('/'+ticketNo); 
    return this.userVoteRef.remove();
  }

  checkIsAdmin(): AngularFireList<string> {
    this.adminList = this.db.list('/admin'); 
    return this.adminList;
  }
}
