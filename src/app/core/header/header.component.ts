import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private Authentication$: AuthenticationService) { }

  ngOnInit(): void {
  }

  logout() {
      this.Authentication$.logout();
      window.location.reload();
  }
}
