import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-json-viewer',
  template: `
    <h3>{{ title }}</h3>
    <pre>
      {{ content }}
    </pre
    >
  `
})
export class JsonViewerComponent {
  @Input() public content: string;
  @Input() public title: string;
}
