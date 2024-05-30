import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
    selector: 'app-coming-soon-page',
    templateUrl: './coming-soon-page.component.html',
    styleUrls: ['./coming-soon-page.component.scss']
})
export class ComingSoonPageComponent implements OnInit {

    private countdownSubscription: Subscription;
    public countdown: { days: number, hours: number, minutes: number, seconds: number };
    public targetDate: Date = new Date('2024-12-31T23:59:59'); // Set your target date here

    constructor() { }

    ngOnInit() {
        // Calculate initial countdown values
        this.calculateCountdown();

        // Update countdown every second
        this.countdownSubscription = interval(1000).subscribe(() => {
            this.calculateCountdown();
        });
    }

    ngOnDestroy() {
        // Unsubscribe to avoid memory leaks
        if (this.countdownSubscription) {
            this.countdownSubscription.unsubscribe();
        }
    }

    private calculateCountdown() {
        const now = new Date();
        const difference = this.targetDate.getTime() - now.getTime();

        if (difference > 0) {
            this.countdown = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
            };
        } else {
            // Countdown has reached zero, you can add logic here
            this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
            this.countdownSubscription.unsubscribe(); // Stop the countdown
        }
    }

}