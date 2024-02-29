import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit{
constructor(private supbase: SupabaseService){}
  async ngOnInit(): Promise<void> {
const {data, error} = await this.supbase.getAllUser();
console.log(data);
  }
}
