import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private translate: TranslateService) { 
    this.translate.setDefaultLang('en');
  }

  switchLanguage(language: string){
    this.translate.use(language)
  }
}
