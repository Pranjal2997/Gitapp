import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Component1Service {

  public username: string;
  private access_token = '94f7adf5ca34b874b36a78180a901228ca929ff8';
  public fav_repos = [];
  public currentrepo;

  @Output() public $repodetails = new EventEmitter();
  
  constructor(private http:HttpClient) { 
    console.log("service is ready now");
    this.username = 'Pranjal2997';
  }

  getProfileInfo() {
    return this.http.get("https://api.github.com/users/"+ this.username + "?access_token=" + this.access_token);
    //.pipe(map(res=> res.json());
  }

  getProfileRepos() {
    return this.http.get("https://api.github.com/users/"+ this.username + "/repos" + "?access_token=" + this.access_token); 
  }

  updateProfile(username:string) {
    this.username = username;
  }

  repodetails(reponame) {
    this.$repodetails.emit(reponame);
    this.currentrepo = reponame;
    console.log("Hi-2", reponame);
  }

}
