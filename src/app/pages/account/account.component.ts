import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { AuthSession } from '@supabase/supabase-js'
import { Profile } from 'src/app/domain/interface/profile-model'
import { SupabaseService } from 'src/app/supabase.service'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  loading = false
  profile!: Profile
  updateProfileForm! : FormGroup;


  

  constructor(
    private readonly supabase: SupabaseService,
    private formBuilder: FormBuilder
  ) {}

   ngOnInit(): void {
     this.getProfile()
    this.updateProfileForm  = this.formBuilder.group({
      username: '',
      website: '',
      avatar_url: '',
    })
    const { username, website, avatar_url } = this.profile
    this.updateProfileForm.patchValue({
      username,
      website,
      avatar_url,
    })
  }

  async getProfile() {
    try {
      this.loading = true
      // const { user } = this.supabase.session?.user;
      const { data, error }  = await this.supabase.getProfile(this.supabase.session?.user.id!);
      console.log(data[0]);
      this.profile = data[0];
    } catch (error) {
      if (error instanceof Error) {
        // alert(error.message)
      }
    } finally {
      this.loading = false
    }
  }

  async updateProfile(): Promise<void> {
    try {
      this.loading = true

      const username = this.updateProfileForm.value.username as string
      const website = this.updateProfileForm.value.website as string
      const avatar_url = this.updateProfileForm.value.avatar_url as string

      const { error } = await this.supabase.updateProfile({
        id: this.supabase.session?.user.id,
        username,
        website,
        avatar_url,
        email: this.supabase.session?.user.email ?? '',
      }, this.supabase.session?.user.id!)
      if (error) throw error
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.loading = false
    }
  }

  async signOut() {
    await this.supabase.signOut()
  }
}