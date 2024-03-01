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
    previewFile(file: any) {
      // Assuming file.url contains the URL from which the file can be downloaded
      if (file.type === 'image' || file.type === 'pdf') {
          file.previewUrl = file.url; // Assuming file.url is the URL to the file
      }
      // You can add more conditions for different file types
  }
  // public download() {
  //   if (this.isCropImage) {
  //     let canvas = this.cropper.getCroppedCanvas();
  //     this.getCanvasToDownload(canvas)
  //   } else {
  //     html2canvas(document.querySelector(".pdf-container") as HTMLElement).then((canvas: any) => {
  //       this.getCanvasToDownload(canvas)
  //     })
  //   }
  // }

  // private getCanvasToDownload(canvas:any){
  //   let ctx = canvas.getContext('2d');
  //   ctx.scale(3, 3);
  //   let image = canvas.toDataURL("image/png").replace("image/png", "image/png");
  //   var link = document.createElement('a');
  //   link.download = "my-image.png";
  //   link.href = image;
  //   link.click();
  // }
async  downloadFile(file: any) {
      // Assuming file.url contains the URL from which the file can be downloaded
      const { data, error } = await this.supabase.downloadFile(file.name);
console.log(data);
    }
  
}
