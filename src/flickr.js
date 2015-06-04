import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

@inject(HttpClient)
export class Flickr{
  heading = 'Flickr';
  images = [];
  searchText = '';
  url = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=mountain&tagmode=any&format=json';

  constructor(http){
    this.http = http;
  }

  activate(){
    return this.http.jsonp(this.url).then(response => {
      this.images = response.content.items;
    });
  }

  get filteredImages(){
    console.log('here1');
    if ( this.searchText === '' ) return this.images;

    return this.images.filter(item => {
        return item.title.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1;
    });
  }

}
