import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/domain/interface/profile-model';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit{
constructor(private supbase: SupabaseService){}
  async ngOnInit(): Promise<void> {
const{ data, error } = await this.supbase.getAllUser();
this.allUsers = data;
console.log(data);
console.log(error);
  }

  allUsers: any[] = [];

editUser(user: Profile) {
    // Implement edit functionality
    console.log('Editing user:', user);
}

removeUser(user: Profile) {
    // Implement remove functionality
    const index = this.allUsers.indexOf(user);
    if (index !== -1) {
        this.allUsers.splice(index, 1);
        console.log('User removed:', user);
    }
}
}
