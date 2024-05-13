import { Injectable, OnInit } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js'

import { environment } from 'src/environments/environment'
import { Profile } from './domain/interface/profile-model';
import { LocalStorageService } from './services/localStorageService.service';
@Injectable({
  providedIn: 'root'
})
export class SupabaseService implements OnInit {
  userId: string = '';
  private supabase: SupabaseClient
  _session: AuthSession | null = null

  constructor(private lss: LocalStorageService) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }
  ngOnInit(): void {
    this.userId = this.lss.userData.userId || '';
    console.log(`${this.userId} here is the user id`);
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session
      this.userId = data.session?.user?.id || ''
      console.log("this.userId", this.userId);
    })
    return this._session
  }
  magicLinkLogin(email: string) {
    return this.supabase.auth.signInWithOtp({ email })
  }

  signUpWithOtp(email: string) {
    return this.supabase.auth.signInWithOtp({ email })
  }
  async getAllUser() {
    return await this.supabase.rpc('get_all_users');
  }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single()
  }
  async getProfile(id: string) {
  const { data, error } =  await this.supabase.rpc('get_user',{id: this.userId ?? id} );
return {data,error};
}
  async uploadFile(file: File) {

    return await this.supabase.storage.from(`pdf/${this.userId}`).upload(file.name, file, {
      cacheControl: '3600',
      upsert: false,
    })
  }
  getFileUrl(path: string) {
    const { data } = this.supabase
      .storage
      .from(`pdf`)
      .getPublicUrl(`${this.userId}/${path}`)
    return data;
  }
  async downloadFile(path: string) {
    // we are using the getPublicUrl method to download files because the files are in a public bucket.
    // If you want to download files from a private bucket, you need to use the download method.
    console.log(`${this.userId}/${path} this is what im sending`);
    const { data } = this.supabase
      .storage
      .from(`pdf`)
      .getPublicUrl(`${this.userId}/${path}`, { download: true })
    return data;

  }
  deleteFile(path: string) {
    console.log(`${this.userId}/${path} this is what im sending`);
    return this.supabase.storage.from(`pdf`).remove([`${this.userId}/${path}`])
  }

  async getFiles() {
    return await this.supabase
      .storage
      .from(`pdf`)
      .list(`${this.userId}/`, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },

      });
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }

  signIn(email: string) {
    return this.supabase.auth.signInWithOtp({ email })
  }

  //this is for login
  signInWithPass(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password })
  }
  //this is for registration
  signUp(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password })
  }
  forgotPassword(email: string) {
    return this.supabase.auth.resetPasswordForEmail(email);
  }
  resetPassword(token: string, password: string, confirmPassword: string) {
    throw new Error('Method not implemented.');
  }


  signOut() {
    return this.supabase.auth.signOut()
  }

  async updateProfile(profile: Profile,id:string) {
    const update = {
      ...profile,
      updated_at: new Date(),
    }

    const {data,error} = await this.supabase.from('profiles').update(update).eq('id',id ??  this.userId ?? this.lss.userData.userId );
    return {data,error};
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path)
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file)

  }
  async signinwithgoogle() {
    return await this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
  }
}
