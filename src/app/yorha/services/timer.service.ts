import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class TimerService {
    private timers: { [key: string]: BehaviorSubject<number | null> } = {};

    setTimer(key: string, countdown: number) {
        if (!this.timers[key]) {
            this.timers[key] = new BehaviorSubject<number | null>(countdown);
        }
        this.timers[key].next(countdown);
    }

    getTimer(key: string): Observable<number | null> {
        if (!this.timers[key]) {
            this.timers[key] = new BehaviorSubject<number | null>(null);
        }
        return this.timers[key].asObservable();
    }

    startTimer(key: string) {
        console.log(`Starting timer for key: ${key}`);

        timer(1000, 1000)
            .pipe(
                takeWhile(() => {
                    const currentValue = this.timers[key].value;
                    return currentValue != null && currentValue > 0;
                })
            )
            .subscribe(() => {
                const currentValue = this.timers[key].value;
                if (currentValue != null && currentValue > 0) {
                    this.timers[key].next(currentValue - 1);
                }
            });
    }
}
