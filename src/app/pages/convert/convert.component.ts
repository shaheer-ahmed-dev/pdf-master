import { Component, OnInit } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from 'src/app/supabase.service';
import { FileModel } from 'src/app/domain/interface/file-model'

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss']
})
export class ConvertComponent {
  fileName = '';
  url = '';
  file!: File;
    constructor(private supabase: SupabaseService) {}
 async ngOnInit() {
this.getFiles();  
}
allFiles?: any[] | null; 

    async onFileSelected(event :any) {

        const file:File = event.target.files[0];

        if (file) {

            this.fileName = file.name;

            const formData = new FormData();

            formData.append("thumbnail", file);
            console.log(formData);
            if (event.target.files) {
              this.file = event.target.files[0];
              const { data, error } = await this.supabase.uploadFile(this.file);
        
                // You can uncomment this console to check whether its successfully uploaded
                console.log(data ? 'Success' : error)

                this.getFiles();

              }

            // const upload$ = this.http.post("/api/thumbnail-upload", formData);

            // upload$.subscribe();
        }
    }

    async getFiles(){
      const {data, error} = await this.supabase.getFiles();
      try{
        this.allFiles = data;
        console.log(this.allFiles);
      }catch(error){
        console.log(error);
      }
    }
}
