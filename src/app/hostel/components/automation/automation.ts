import { Component, OnInit } from '@angular/core';
import { AutomationService } from '../../services/automation';

@Component({
  selector: 'app-automation',
  template: `<h2>Running automation...</h2>`
})
export class AutomationComponent implements OnInit {

  constructor(private service: AutomationService) {}

  ngOnInit(): void {

    this.service.runAutomation().subscribe({

      next: (res) => {
        console.log(res);
      },

      error: (err) => {
        console.error(err);
      }

    });
  }
}
