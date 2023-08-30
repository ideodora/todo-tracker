import { Duration } from './duration';

describe('Duration', () => {
	describe('fullWidth', () => {
		it('value 0 to 00:00:00', () => {
			const sut = new Duration(0);
			const result = sut.fullWidth();
			expect(result).toBe('00:00:00');
		});

		it('value 55 to 00:00:55', () => {
			const sut = new Duration(55);
			const result = sut.fullWidth();
			expect(result).toBe('00:00:55');
		});

		it('value 65 to 00:01:05', () => {
			const sut = new Duration(65);
			const result = sut.fullWidth();
			expect(result).toBe('00:01:05');
		});

		it('value 3665 to 01:01:05', () => {
			const sut = new Duration(3665);
			const result = sut.fullWidth();
			expect(result).toBe('01:01:05');
		});

		it('value 25hours to 25:00:00', () => {
			const sut = new Duration(3600 * 24 + 3600);
			const result = sut.fullWidth();
			expect(result).toBe('25:00:00');
		});
	});
});
