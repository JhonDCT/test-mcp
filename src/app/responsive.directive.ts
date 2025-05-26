import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Directive, HostListener, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[appResponsive]',
  standalone: true
})
export class ResponsiveDirective implements OnInit, OnDestroy {
  @Input({ required: true }) size!: 'xsm' | 'sm' | 'md' | 'lg' | 'xlg';

  destroyed = new Subject<void>();

  displayNameMap = new Map([
    [Breakpoints.XSmall, 'xsm'],
    [Breakpoints.Small, 'sm'],
    [Breakpoints.Medium, 'md'],
    [Breakpoints.Large, 'lg'],
    [Breakpoints.XLarge, 'xlg'],
  ]);

  constructor(
    private templateReference: TemplateRef<unknown>,
    private viewContainerRef: ViewContainerRef,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            const currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';

            if (currentScreenSize === this.size) {
              this.viewContainerRef.createEmbeddedView(this.templateReference);
            } else {
              this.viewContainerRef.clear();
            }
          }
        }
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
