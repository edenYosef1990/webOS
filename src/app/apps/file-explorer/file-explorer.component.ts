import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FileItem {
  name: string;
  type: 'text' | 'image' | 'pdf';
}

@Component({
  selector: 'app-file-explorer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-explorer.component.html',
  styleUrl: './file-explorer.component.css'
})
export class FileExplorerComponent {
  @Output() closed = new EventEmitter<void>();

  files: FileItem[] = [
    { name: 'Document.txt', type: 'text' },
    { name: 'Photo.png', type: 'image' },
    { name: 'Report.pdf', type: 'pdf' }
  ];

  selectedFile: FileItem | null = null;

  getIcon(file: FileItem): string {
    switch (file.type) {
      case 'image':
        return 'image-file-icon.svg';
      case 'pdf':
        return 'pdf-file-icon.svg';
      default:
        return 'text-file-icon.svg';
    }
  }

  selectFile(file: FileItem | null) {
    this.selectedFile = file;
  }
}
