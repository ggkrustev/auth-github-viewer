import { Component, Input } from '@angular/core';
import { Converter } from 'showdown';

@Component({
  selector: 'app-md-viewer',
  template: `
    <h3>{{ title }}</h3>
    <div class='md-frame' [innerHTML]='converter.makeHtml(content)'></div>
  `,
  styles: [
    `
      .md-frame {
        margin: 0.5rem 0;
        padding: 0.5rem;
        max-height: 15rem;
        border: 1px solid #ccc;
        overflow: auto;
      }
    `
  ]
})
export class MarkDownViewerComponent {
  public converter = new Converter();
  @Input() public content: string;
  @Input() public title: string;
}
