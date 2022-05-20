import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VMComponent } from 'src/app/common/base/vm.component';
import { TestViewModel } from './test.view-model';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent
  extends VMComponent<TestViewModel>
  implements OnDestroy
{
  constructor(
    private item: TestViewModel,
    private route: ActivatedRoute,
  ) {
    super(item);
  }
  ngOnDestroy(): void {
    this.vm.destroy();
  }

  ngOnInit() {
    /** 切換路徑 */
    this.route.paramMap.subscribe((param) => {
      const paramId = param.get('id') as string;
      console.log(paramId);
      this.vm.paramId = paramId;
      this.vm.updateProcessContent(paramId);
    });
    this.vm.init();
  }
}
