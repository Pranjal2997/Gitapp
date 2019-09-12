import { Component, OnInit } from '@angular/core';
import { Component1Service } from '../component1.service';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.css']
})
export class Component1Component implements OnInit {
  [x: string]: any;

  profile;
  repos;
  deleted_repo;
  username: string = "Pranjal2997";
  my_repo_prop;
  enable_del;
  access_token = "485e56dd58e6ae43705255c924d4baef03409c76";
  //public favourites:any;

  url_for_db = "http://localhost:3000/posts";

  constructor(private profileSerive: Component1Service, private http: HttpClient) {
    
  }
  
  findProfile() {
    
    this.profileSerive.updateProfile(this.username);  
    this.profileSerive.getProfileInfo().subscribe(profile => {
      console.log(profile);
      this.profile = profile;
    });

    this.profileSerive.getProfileRepos().subscribe(repos => {
      console.log(repos);
      this.repos = repos;
    });

    this.enable_del = this.username;
  }

  url = "https://api.github.com/user/repos";
  creatrepo(reponame:string) {
    this.my_repo_prop = {
      "name": reponame,
      "auto_init": true,
      "private": false,
      "gitignore_template": "nanoc"
    };
  

  let options = {
    headers: new HttpHeaders({ 'Authorization': 'token 485e56dd58e6ae43705255c924d4baef03409c76' })
  }
  this.http.post(this.url, this.my_repo_prop, options).subscribe(s => this.repos.push(s));
  }

  deleterepo(reponame) {
    //this.http.delete("https://api.github.com/repos" + this.username + "/" + reponame).subscribe(deleted_repo=>{console.log(deleted_repo)});
    //console.log(reponame);
    // let options = {
    //   headers: new HttpHeaders({ 'Authorization': 'token 2daa7f4202a03501763ddcc3a4139655ef1082fc' })
    // }
    this.http.delete("https://api.github.com/repos/" + reponame.full_name + "?access_token=" + this.access_token).subscribe(s => {
      console.log(s);
    this.repos = this.repos.filter(item => item.name !== reponame.name);
      //this.repos.pop(s);
    });
    console.log(this.repos);
    console.log(reponame);
  }
  
  addToFav(reponame) {
    this.http.post(this.url_for_db,reponame).subscribe(response_received => {
      console.log(response_received);
      //this.favourites.push(response_received);
      this.profileSerive.fav_repos.push(reponame);
      //console.log(this.favourites);
    });
  }
  // toDisplay() {
  //   return this.username != 'ChakshuMoar' ? true : false;
  // }

  captureRepo(reponame) {
    this.profileSerive.repodetails(reponame);
    console.log("Hi-1", reponame);
  }

  ngOnInit() {
    this.username = "Pranjal2997"
    this.findProfile();
    this.username="";
  }

}
