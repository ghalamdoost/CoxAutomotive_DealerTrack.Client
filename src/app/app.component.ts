import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services//auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CoxAutomotive';
  logedin = false;
  currentUser: String='';
  
  constructor(private router: Router, private authenticationService: AuthService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }


  ngOnInit(): void {
    this.logout();
    this.currentUser='';
  }

    logout() {
      this.currentUser='';
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
