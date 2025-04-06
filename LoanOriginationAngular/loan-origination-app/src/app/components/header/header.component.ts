import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/services/translation/translate.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router:Router, private translationService: TranslationService) {
  }
  onLogout() {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      
  }

  switchLanguage(language: string) {
    this.translationService.switchLanguage(language);
  }
  selectedOption: string = 'English';
  flags: { [key: string]: string } = {
    English: '../../../assets/images/english1.png',
    French: '../../../assets/images/french.jpg',
    Spanish: '../../../assets/images/spanish.jpg'
  };
  selectOption(option: string) {
    this.selectedOption =  option;
  }

  getFlag(option: string): string {
    // Check if the flag for the given option exists
    if (this.flags[option]) {
      return this.flags[option];
    } else {
      console.warn(`Flag not found for option: ${option}`);
      return '../../../assets/images/english1.png'; // Fallback for unknown options
    }
  }
}
