import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public authStatus = false;
  private authListenerSub: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authListenerSub = this.authService.getAuthStatus().subscribe(isAuthenticated => {
      this.authStatus = isAuthenticated;
    });
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

}
