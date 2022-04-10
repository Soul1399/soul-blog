import { Component, OnDestroy } from "@angular/core";
import { Observable, Subject, takeUntil } from "rxjs";

@Component({
    template: ''
})
export class BaseComponent implements OnDestroy {
    private unsubscribeAlert = new Subject<boolean>();
    protected pipeUntilDestory<T>(observable: Observable<T>) {
        return observable.pipe(takeUntil(this.unsubscribeAlert));
    }

    ngOnDestroy(): void {
        this.unsubscribeAlert.next(true);
    }
}
