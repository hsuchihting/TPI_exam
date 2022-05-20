import { FormControl } from '@angular/forms';

export function checkImagePiece(c: FormControl){
  const _content = c.value;

  const getImages = (_content: string) => {
    const imgRex = /<img.*?src="(.*?)"[^>]+>/g;
    const images: string[] = [];
    let img;
    while ((img = imgRex.exec(_content))) {
      // "http://elite-erp-ttp.10.20.30.226.nip.io/img/email/M/06e2f6353ab44f479e0f3d35d83b3be8.jpg"
      let urlLength = img[1].split('/').length; //7
      images.push(img[1].split('/')[urlLength - 1]);
    }
    // images = ["06e2f6353ab44f479e0f3d35d83b3be8.jpg"]
    return images;
  }

  const imageInContent = getImages(_content);
  return imageInContent.length <= 3
    ? null
    : {
      imageMaxPiece: {
        valid: false,
      },
    }
}
