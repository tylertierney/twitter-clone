import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal/modal.service';
import { CommonModule } from '@angular/common';
import { SubmitButtonComponent } from '../submit-button/submit-button.component';
import { RxPush } from '@rx-angular/template/push';

@Component({
  standalone: true,
  imports: [CommonModule, SubmitButtonComponent, RxPush],
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  constructor(public modalService: ModalService) {}
}
