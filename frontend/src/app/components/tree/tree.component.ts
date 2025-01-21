import { Component, EventEmitter, HostListener, inject, Input, OnInit, TemplateRef } from '@angular/core';
import { TailwindService } from '../../services/tailwind.service';
import { TreeDefinition } from './tree.models';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { TreeNodeComponent } from "./tree-node/tree-node.component";
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matChevronLeft, matChevronRight } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'Tree',
  imports: [NgTemplateOutlet,
            CommonModule,
            CdkOverlayOrigin,
            CdkConnectedOverlay,
            TreeNodeComponent,
            NgIcon],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss',
  viewProviders: [provideIcons({ matChevronLeft })]
})
export class TreeComponent implements OnInit {
  readonly _treeHostId = Math.random().toString(36).substring(2);
  readonly _elementId = Math.random().toString(36).substring(2);

  readonly tailwindService = inject(TailwindService);
 
  
  @Input() className: string = '';
  @Input({ required: true }) tree!: TreeDefinition;
  @Input({ required: true }) treeNodeView!: TemplateRef<any>;
  @Input({ required: true }) closeEventEmmiter!: EventEmitter<void>;
  
  isOpen: boolean = false;
  
  ngOnInit(): void {
    if (this.closeEventEmmiter) {
      this.closeEventEmmiter.subscribe(() => this.toggle());
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  close() {
    this.isOpen = false;
  }
}
