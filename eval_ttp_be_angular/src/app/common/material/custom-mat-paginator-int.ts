
import {MatPaginatorIntl} from '@angular/material/paginator';
import {Injectable} from '@angular/core';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  constructor() {
    super();  

    this.getAndInitTranslations();
  }

  getAndInitTranslations() {
   
      this.itemsPerPageLabel = "每頁總筆數";
      this.nextPageLabel = "";
      this.previousPageLabel = "";
      this.changes.next();
   
  }

 getRangeLabel = (page: number, pageSize: number, length: number) =>  {
    if (length === 0 || pageSize === 0) {
      return `1 / 1`;
    }
    /*length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} / ${length}`;*/
    const totalPages = Math.ceil(length / pageSize);
    return `${(page + 1)} / ${totalPages}`;

  }
}