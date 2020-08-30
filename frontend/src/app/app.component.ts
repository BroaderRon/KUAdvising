import { Component } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

const issuer = 'https://dev-855821.okta.com/oauth2/default';//NEED TO CHAMGE IF DIFFERENT OKTA ACCOUNT
const redirectUri = 'https://kuadvfrontend.herokuapp.com/logged_out';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAuthenticated: boolean;
  constructor(public oktaAuth: OktaAuthService) {
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
  }
  title = 'frontend';
  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  async logout() {
    // Read idToken before local session is cleared
    const idToken = await this.oktaAuth.getIdToken();

    // Clear local session
    await this.oktaAuth.logout('/');

    // Clear remote session
    window.location.href = `${issuer}/v1/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${redirectUri}`;
  }
  login() {
    this.oktaAuth.loginRedirect('/');
  }
  
}

