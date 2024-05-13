import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from 'src/app/supabase.service';
import { FileModel } from 'src/app/domain/interface/file-model'
import WebViewer, { WebViewerInstance } from '@pdftron/webviewer';
// import{webViewer} from 'src/assets/pdfjs/web/viewer.js';   

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss']
})
export class ConvertComponent implements AfterViewInit {
  constructor(private supabase: SupabaseService) { }
  title: string = 'File Upload & Image Preview';
  fileName = '';
  url = '';
  file!: File;
  page = 0;
  @ViewChild('viewer') viewerRef!: ElementRef;
  instance!: WebViewerInstance;
  allFiles?: any[] | null;

  ngAfterViewInit(): void {
   if(this.page == 1){ WebViewer({
      licenseKey: 'demo:1715442307860:7fcce03e0300000000e8f38189ec9207606c14867c06f652196cc3a3d0',
      path: '../assets/lib',
      enableOfficeEditing: true,
      enableFilePicker: true,
      
      // initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf',
    }, this.viewerRef.nativeElement).then(instance => {
      this.instance = instance;
      // this.instance.UI.loadDocument('https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf');
    })}
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

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      if (event.target.files) {
        this.file = event.target.files[0];
        const { data, error } = await this.supabase.uploadFile(this.file);
        alert(data ? 'Success: File has been uploaded!' : error.message);
        this.getFiles();
      }
    }
  }

  async getFiles() {
    const { data, error } = await this.supabase.getFiles();
    if (data) {
      this.allFiles = data;
      console.log(this.allFiles);
    } else if (error) {
      console.log(error);
      alert(error.message);
    }
  }
  async previewFile(file: string) {
    // Assuming file.url contains the URL from which the file can be downloaded
    const data = await this.supabase.getFileUrl(file);
    // alert(data.publicUrl);
this.page = 1;
this.title = file;
    this.ngAfterViewInit();
    this.instance.UI.loadDocument(data.publicUrl);

  }

  async downloadFile(name: string) {
    const data = await this.supabase.downloadFile(name);
    window.open(data.publicUrl);
    console.log(data);
  }
  async deleteFile(arg0: string) {
    const { data, error } = await this.supabase.deleteFile(arg0);
    alert(data ? 'Success' : error.message);
  }
}
