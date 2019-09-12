import { Component, OnInit } from '@angular/core';
import { Component1Service } from '../component1.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  constructor(private profileService: Component1Service, private http: HttpClient) { }

  public repos:any;
  public del_url;
  
  RemoveFromFav(repo) {
    this.del_url="http://localhost:3000/posts/"+repo.id;
    this.http.delete(this.del_url).subscribe(s => {
      console.log(s);
      this.ngOnInit();
    });
    // this.http.get("http://localhost:3000/posts").subscribe(x => {
    //   //this.repos= x;
    //   console.log(this.repos);
    // });
  }
  
  ngOnInit() {
    //console.log("Hi");
    //this.repos = this.profileService.fav_repos;
    this.http.get("http://localhost:3000/posts").subscribe(x => {
      this.repos= x;  
      console.log(this.repos);
    });
  }

}
