import { BaseComponent } from './base.component';
import { BaseViewModel } from './base.view-model';

export class VMComponent<T extends BaseViewModel> extends BaseComponent {
  public vm: T;
  constructor(private viewModel: T) {
    super(viewModel);
    this.vm = viewModel;
  }
}
