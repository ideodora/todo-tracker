import { vi } from "vitest";
import { TimeTracker, TrackerEntry } from "./time-tracker";

describe("TimeTracker", () => {
    describe("start", () => {
        it("makes tracker to be running", () => {
            const sut = new TimeTracker();

            expect(sut.isRunning()).toBe(false);

            sut.start();

            expect(sut.isRunning()).toEqual(true);
        });
    });

    describe("stop", () => {
        it("makes tracker to stop", () => {
            const sut = new TimeTracker();
            sut.start();

            expect(sut.isRunning()).toBe(true);

            sut.stop();

            expect(sut.isRunning()).toBe(false);
        });
    });

    describe("isRunning", () => {
        it("if tracking not start return false", () => {
            const sut = new TimeTracker();

            const result = sut.isRunning();

            expect(result).toBe(false);
        });

        it("if tracking start return true", () => {
            const sut = new TimeTracker();
            sut.start();

            const result = sut.isRunning();

            expect(result).toBe(true);
        });

        it("if tracking stop return false", () => {
            const sut = new TimeTracker();
            sut.start();
            sut.stop();

            const result = sut.isRunning();

            expect(result).toBe(false);
        });
    });

    describe('durationInSeconds', () => {
        beforeEach(() => {
            vi.useFakeTimers();
        });

        afterEach(() => {
            vi.useRealTimers();
        });

        it('returns 0 when created', () => {
            const sut = new TimeTracker();
            const result = sut.durationInSeconds();
            expect(result).toBe(0);
        });

        it('returns 0 when created wait 3sec without start then get', () => {
            const sut = new TimeTracker();

            setTimeout(() => {
                const result = sut.durationInSeconds();
                expect(result).toBe(0);
            }, 1000 * 3);
            vi.runAllTimers();
        });

        it('returns 3 when created, start and wait 3sec then get', () => {
            const sut = new TimeTracker();
            sut.start();

            setTimeout(() => {
                const result = sut.durationInSeconds();
                expect(result).toBe(3);
            }, 1000 * 3);
            vi.runAllTimers();
        });

        it('returns 3 when created, start, wait 3sec, and stop then get', () => {
            const sut = new TimeTracker();
            sut.start();

            setTimeout(() => {
                sut.stop();
                const result = sut.durationInSeconds();
                expect(result).toBe(3);
            }, 1000 * 3);
            vi.runAllTimers();
        });

        it('returns 3 when created, start, wait 3sec, stop, and wait another 3sec then get', () => {
            const sut = new TimeTracker();
            sut.start();

            setTimeout(() => {
                sut.stop();
            }, 1000 * 3);

            setTimeout(() => {
                const result = sut.durationInSeconds();
                expect(result).toBe(3);
            }, 1000 * 6);

            vi.runAllTimers();
        });

        it('returns 13 when created, start, wait 3sec, stop, wait 3sec, start again, and wait 10sec then get', () => {
            const sut = new TimeTracker();
            sut.start();

            setTimeout(() => {
                sut.stop();
            }, 1000 * 3);

            setTimeout(() => {
                const result = sut.durationInSeconds();
                expect(result).toBe(3);
                sut.start();
            }, 1000 * 3 + 1000 * 3);

            setTimeout(() => {
                const result = sut.durationInSeconds();
                expect(result).toBe(13);
            }, 1000 * 3 + 1000 * 3 + 1000 * 10);

            vi.runAllTimers();
        });

        it('returns 13 when created, start, wait 3sec, stop, wait 3sec, start again, wait 10sec, stop, and wait 3sec then get', () => {
            const sut = new TimeTracker();
            sut.start();

            setTimeout(() => {
                sut.stop();
            }, 1000 * 3);

            setTimeout(() => {
                const result = sut.durationInSeconds();
                expect(result).toBe(3);
                sut.start();
            }, 1000 * 3 + 1000 * 3);

            setTimeout(() => {
                sut.stop();
            }, 1000 * 3 + 1000 * 3 + 1000 * 10);

            setTimeout(() => {
                const result = sut.durationInSeconds();
                expect(result).toBe(13);
            }, 1000 * 3 + 1000 * 3 + 1000 * 10 + 1000 * 3);

            vi.runAllTimers();
        });
    });
});

describe("TrackerEntry", () => {
    describe("durationInSeconds", () => {
        beforeEach(() => {
            vi.useFakeTimers();
        });

        afterEach(() => {
            vi.useRealTimers();
        });

        it("return 3 after 3 seconds since its created", () => {
            const sut = new TrackerEntry();
            setTimeout(() => {
                const result = sut.durationInSeconds();
                expect(result).toBe(3);
            }, 1000 * 3);
            vi.runAllTimers();
        });

        it("return 6 after 6 seconds since its created", () => {
            const sut = new TrackerEntry();
            setTimeout(() => {
                const result = sut.durationInSeconds();
                expect(result).toBe(6);
            }, 1000 * 6);
            vi.runAllTimers();
        });
    });

    describe('stop', () => {
        beforeEach(() => {
            vi.useFakeTimers();
        });

        afterEach(() => {
            vi.useRealTimers();
        });
        it('stop increasing duration', () => {
            const sut = new TrackerEntry();
            setTimeout(() => {
                sut.stop();
                const result = sut.durationInSeconds();
                expect(result).toBe(6);
            }, 1000 * 6);

            setTimeout(() => {
                const result = sut.durationInSeconds();
                expect(result).toBe(6);
            }, 1000 * 12);

            vi.runAllTimers();
        })
    })

    describe('isRunning', () => {
        it('returns true at init', () => {
            const sut = new TrackerEntry();

            const result = sut.isRunning();

            expect(result).toBe(true);
        })
        it('returns false after stop', () => {
            const sut = new TrackerEntry();
            sut.stop();

            const result = sut.isRunning();

            expect(result).toBe(false);
        })
    })
});
