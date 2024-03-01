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
const{ data: { users }, error } = await this.supbase.getAllUser();
this.allUsers.push(users);
console.log(users);
console.log(error);
  }

  allUsers: any[] = [
    { username: 'User 1',avatar_url :'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200', website: '', id: ''},
    { username: 'User 2',avatar_url :'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200', website: '', id: ''},
    { username: 'User 3',avatar_url :'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200', website: '', id: ''}
];

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
