export class Duration {
	sourceSeconds: number;

	constructor(seconds: number = 0) {
		this.sourceSeconds = seconds;
	}

	fullWidth() {
		return `${this._zeroHours()}:${this._zeroMinutes()}:${this._zeroSeconds()}`;
	}

	_hours() {
		return Math.floor(this.sourceSeconds / (60 * 60));
	}

	_zeroHours() {
		const hours = this._hours();
		return this._zeroPadding(hours);
	}

	_minutes() {
		const subHours = this.sourceSeconds - this._hours() * 60 * 60;
		return Math.floor(subHours / 60);
	}

	_zeroMinutes() {
		const minutes = this._minutes();
		return this._zeroPadding(minutes);
	}

	_seconds() {
		return this.sourceSeconds - this._hours() * 60 * 60 - this._minutes() * 60;
	}

	_zeroSeconds() {
		return this._zeroPadding(this._seconds());
	}

	_zeroPadding(value: number, num: number = 2) {
		return String(value).padStart(num, '0');
	}
}
