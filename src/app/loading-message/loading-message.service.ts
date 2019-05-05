import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/** Used to determine if an AJAX request is in flight or not */
@Injectable({
    providedIn: 'root'
})
export class LoadingMessageService {

    private loadingSubject = new Subject<boolean>();

    /**
     * Observable containing indicating if something is loading
     */
    isLoading = this.loadingSubject.asObservable();

    /**
     * When called, this will notifiy subscribers
     * that something is loading.
     */
    startLoading() {
        this.loadingSubject.next(true);
    }

    /**
     * When called, this will notifiy subscribers
     * that nothing is loading
     */
    stopLoading() {
        this.loadingSubject.next(false);
    }
}
