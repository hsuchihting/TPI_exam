import { EventEmitter } from '@angular/core';
import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  forwardRef,
  Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { ExamService } from 'src/app/modules/main/exam/exam.service';
export const EDITOR_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EditorComponent),
  multi: true,
};

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [EDITOR_VALUE_ACCESSOR],
})
export class EditorComponent
  implements OnInit, AfterViewInit, ControlValueAccessor {
  @Input() maxWordLimit: Number = 2000;
  @Input() height: Number = 300;
  @Input() maxUploadMbSize: Number = 3;
  @Input() maxUploadMbSize2: Number = 1;
  @Input() imgEtTypeCode!: "H" | 'M' | 'E';
  @Output() addImageUrl = new EventEmitter<string[]>();
  _content: string = '';
  _imgUrl: string = '';
  _addImageUrl: string[] = [];

  get content() {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
    this.propagateOnChange(this._content);
    this.propagateOnTouched(this._content);
  }
  disabled: boolean = false;
  init: any;
  constructor(
    private examService: ExamService,
  ) {
    this.init = {};
  }
  writeValue(obj: any): void {
    this._content = obj || '';
  }
  registerOnChange(fn: any) {
    this.propagateOnChange = fn;
  }

  registerOnTouched(fn: any) {
    this.propagateOnTouched = fn;
  }

  ngOnInit(): void {
    this.init = {
      setup : (editor: any) => {
        editor.on("KeyDown", (e: any) => {
          const backspaceKey = 8;
          const deleteKey = 46;
          if ((e.keyCode == backspaceKey || e.keyCode == deleteKey) && editor.selection){
            const getImages = (content: string) => {
              const imgRex = /<img.*?src="(.*?)"[^>]+>/g;
              const images = [];
                let img;
                while ((img = imgRex.exec(content))) {
                  // "http://elite-erp-ttp.10.20.30.226.nip.io/img/email/M/06e2f6353ab44f479e0f3d35d83b3be8.jpg"
                  let urlLength = img[1].split('/').length;
                  images.push(img[1].split('/')[urlLength - 1]);
                }
              return images;
            }
            console.log(this._content);
            const imageInContent = getImages(this._content);
            const afterFilter = this._addImageUrl.filter(imageURL => imageInContent.includes(imageURL))
            this._addImageUrl = afterFilter;
            this.addImageUrl.emit(this._addImageUrl);
          }
        });
      },
      images_upload_handler: async (
        blobInfo: any,
        success: any,
        failure: any
      ) => {
        const formData = new FormData();
        formData.append('img', blobInfo.blob());

        const image_file: File = blobInfo.blob();
        const image_size = blobInfo.blob().size / 1024 / 1024; //mb;

        if (image_size > this.maxUploadMbSize2) {
          // failure('超過檔案上傳上限3MB');
          failure('超過檔案上傳上限1MB');
        } else {
          //todo call api get img url
          console.log('blob',image_file);
          this.examService.uploadAddEmailTemplateImg({
            etTypeCode: this.imgEtTypeCode,
            file: image_file
          }).subscribe(
            res => {
              console.log(res);
              this._imgUrl = res.body?.imgUrl as string;
              success(this._imgUrl);
              const addImage = this._imgUrl.split('/');
              let urlLength = addImage.length;
              // "elite-erp-ttp.10.20.30.226.nip.io/img/email/M/06e2f6353ab44f479e0f3d35d83b3be8.jpg"
              this._addImageUrl = this._addImageUrl.concat([addImage[urlLength - 1]]);
              this.addImageUrl.emit(this._addImageUrl);
            }
          )
        }
      },
      /** url是否要自動轉化為相對路徑 */
      convert_urls: false,
      branding: false,
      elementpath: false,
      statusbar: false,
      menubar: false,
      height: this.height + 'px',
      language: 'zh_TW',
      plugins: [
        'anchor charmap image code image link  preview table lists advlist paste wordcount code',
      ],
      toolbar:
        `anchor | formatselect | bold italic underline | fontsizeselect fontselect fontselect | forecolor backcolor | link image jbimages |
        alignleft aligncenter alignright alignjustify | table tabledelete | bullist numlist outdent indent | charmap | preview | code`,
      font_formats:
        'Arial=arial,helvetica,sans-serif;' +
        '微軟正黑體=微軟正黑體;' +
        '新細明體=新細明體,serif;' +
        '標楷體=標楷體,DFKai-sb;' +
        '思源體=Noto Sans TC;' +
        '仿宋體=cwTeXFangSong,serif;' +
        '明體=cwTeXMing, serif;' +
        '圓體=cwTeXYen, sans-serif;' +
        'Andale Mono=andale mono,monospace;' +
        'Arial Black=arial black,sans-serif;' +
        'Book Antiqua=book antiqua,palatino,serif;' +
        'Comic Sans MS=comic sans ms,sans-serif;' +
        'Courier New=courier new,courier,monospace;' +
        'Georgia=georgia,palatino,serif;' +
        'Helvetica=helvetica,arial,sans-serif;' +
        'Impact=impact,sans-serif;' +
        'Symbol=symbol;' +
        'Tahoma=tahoma,arial,helvetica,sans-serif;' +
        'Terminal=terminal,monaco,monospace;' +
        'Times New Roman=times new roman,times,serif;' +
        'Trebuchet MS=trebuchet ms,geneva,sans-serif;' +
        'Verdana=verdana,geneva,sans-serif;' +
        'Webdings=webdings;' +
        'Wingdings=wingdings,zapf dingbats',
    };
  }



  /** 取得tinymce實體 */
  get tinymce() {
    const w = typeof window !== 'undefined' ? (window as any) : undefined;
    return w && w.tinymce ? w.tinymce : null;
  }

  /** 取得內容字元數 */
  get contentWordCount() {
    if (!this.tinymce) return 0;

    if (!this.tinymce.activeEditor) return 0;

    const wordcountPlugins = this.tinymce.activeEditor.plugins.wordcount;
    if (!wordcountPlugins) return 0;
    return wordcountPlugins.getCount();
  }

  propagateOnChange: (value: any) => void = (_: any) => {};
  propagateOnTouched: (value: any) => void = (_: any) => {};

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngAfterViewInit() {}

  onChange(newValue: any) {
    this.content = newValue;
  }

  public SetContent(inserContent: string) {
    this.tinymce.activeEditor.execCommand(
      'mceInsertContent',
      false,
      inserContent
    );
  }
}
