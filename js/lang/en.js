langs.en = {
	_hours: [ 'TWELVE', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'ELEVEN' ],
	_minutes: { '15': 'QUARTER', '20': 'TWENTY', '25': 'TWENTY FIVE', '30': 'HALF' },
	timeToWords: function (hour, mins) {
		var list = ['IT', 'IS'];
		hour = hour % 12;

		if (mins) {
			var over = mins > 30;
			if (over) {
				mins = 60 - mins;
				hour = (hour + 1) % 12;
			}

			list.push(this._hours[mins] || this._minutes[mins]);

			if (over) {
				list.push('TO');
			} else {
				list.push('PAST');
			}
		}

		list.push(this._hours[hour]);

		if (!mins) {
			list.push("O'CLOCK");
		}

		return list.join(' ').split(' ');
	},
	chars: "ITTISITWENTYQUARTERHALFMTENFIVEEPASTTOATWELVEONETWOTHREEFOURFIVESIXSEVENEIGHTNINETENNELEVENDDATEO'CLOCKTIMEA",
	columns: 12
};
