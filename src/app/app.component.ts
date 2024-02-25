import { Component } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { LocalStorageService } from './services/localStorageService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pdf-master';
  session = this.supabase.session;

  constructor(private readonly supabase: SupabaseService, private lss: LocalStorageService) {}

  ngOnInit() {
    this.supabase.authChanges((_, session) => (this.session = session,
      console.log("this.session", this.session),
      this.lss.token = session?.access_token!
      ))
  }
}
