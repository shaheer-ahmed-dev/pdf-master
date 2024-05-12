import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from 'src/app/supabase.service';
import { FileModel } from 'src/app/domain/interface/file-model'
import WebViewer from '@pdftron/webviewer';
// import{webViewer} from 'src/assets/pdfjs/web/viewer.js';   

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss']
})
export class ConvertComponent implements AfterViewInit{
  constructor(private supabase: SupabaseService) {}

  fileName = '';
  url = '';
  file!: File;
  @ViewChild('viewer') viewerRef!: ElementRef;
  ngAfterViewInit(): void {
    WebViewer({
      path: '../assets/lib',
      initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf',
    }, this.viewerRef.nativeElement).then(instance =>{
      instance.UI.loadDocument('https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf');
    })
    //  document.getElementById('webViewer')).then((instance) => {
    //   // Call APIs here
    //   const { docViewer, Annotations } = instance;
    //   const annotManager = docViewer.getAnnotationManager();
    //   const rectangleAnnot = new Annotations.RectangleAnnotation();
    //   rectangleAnnot.PageNumber = 1;
    //   rectangleAnnot.X = 100;
    //   rectangleAnnot.Y = 150;
    //   rectangleAnnot.Width = 200;
    //   rectangleAnnot.Height = 50;
    //   rectangleAnnot.Author = annotManager.getCurrentUser();
    //   annotManager.addAnnotation(rectangleAnnot);
    //   annotManager.redrawAnnotation(rectangleAnnot);
    // });
  }
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
