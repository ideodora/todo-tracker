import { differenceInSeconds } from "date-fns";

export class TimeTracker {
    entry: TrackerEntry | null = null;
    trackedSeconds = 0;

    start() {
        if (!this.entry) {
            this.entry = new TrackerEntry();
            return;
        }

        if (!this.entry.isRunning()) {
            this.entry = new TrackerEntry();
        }
    }

    stop() {
        if (this.entry === null) return;

        if (this.entry?.isRunning()) {
            this.entry?.stop();
            this.trackedSeconds = this.trackedSeconds + this.entry.durationInSeconds();
        }
    }

    isRunning() {
        if (this.entry === null) return false;
        return this.entry.isRunning();
    }

    durationInSeconds() {
        if (this.entry === null) return 0;
        if (this.entry.isRunning()) {
            return this.trackedSeconds + this.entry.durationInSeconds();
        }
        return this.trackedSeconds;
    }
}

export class TrackerEntry {
    created = new Date();
    stoppedAt: Date | null = null;

    stop() {
        if (!this.stoppedAt) {
            this.stoppedAt = new Date();
        }
    }

    durationInSeconds() {
        const now = new Date();
        if (this.isRunning()) {
            return differenceInSeconds(now, this.created);
        }
        if (this.stoppedAt === null) throw new Error();
        return differenceInSeconds(this.stoppedAt, this.created);
    }

    isRunning() {
        return this.stoppedAt === null;
    }
}
