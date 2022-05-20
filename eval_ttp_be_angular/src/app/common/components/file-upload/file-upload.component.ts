import {
  FileUploadModel,
  UpdateErrorModel,
} from './../../../models/Exam/testPaper/file-upload';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { ApplicationRef } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @Output() updateError = new EventEmitter<UpdateErrorModel>();
  @Output() change = new EventEmitter<FileUploadModel>();
  constructor(private cd: ApplicationRef) {}

  ngOnInit(): void {}

  onFileChange(event: any) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        console.log(e);

        const mb = file.size / 1024 / 1024;

        var image = new Image();
        image.onload = () => {
          if (image.width > 800 || image.height > 800) {
            // console.log('width:', image.width);
            // console.log('height:', image.height);
            this.updateError.emit({ size: true });
          }
        };
        const src: string = reader.result as string;
        image.src = src;

        if (mb > 2) {
          this.updateError.emit({ mb: true });
        }
        this.change.emit({
          file: src,
          name: file.name,
          fileDetail: file.size,
          uploadFiles: file,
        });
        console.log(file);

        // this.formGroup.patchValue({
        //   file: reader.result,
        //   name: file.name,
        // });
        // need to run CD since file load runs outside of zone
        this.cd.tick();
      };
    }
  }

  inputClick() {
    this.fileInput.nativeElement.click();
  }
}
