langs.fr = {
	_hours: [ 'MINUIT', 'UNE', 'DEUX', 'TROIS', 'QUATRE', 'CINQ', 'SIX', 'SEPT', 'HUIT', 'NEUF', 'DIX', 'ONZE'],
	_minutes: { '5' : 'CINQ', '10' : 'DIX', '15': 'QUART', '20': 'VINGT', '25': 'VINGT-CINQ', '30': 'DEMI' },

	timeToWords: function (hour, mins) {
		var list = ['IL', 'EST'];
		var over = mins > 30;
		var night = (hour < 6 || hour > 18);

		hour = hour % 12;

		if (over) {
			mins = 60 - mins;
			hour = (hour + 1) % 12;
		}

		if (night == 0 && hour == 0) {
			list.push("MIDI");
		} else {
			list.push(this._hours[hour]);
		}

		if (hour!=0 && hour!=12) {
			list.push('HEURES');
		}

		if (over) {
			list.push('MOINS');
			if(this._minutes[mins] == 'QUART') {
				list.push('LE');
			}
		} else if(this._minutes[mins] == 'QUART' || this._minutes[mins] == 'DEMI'){
			list.push('ET');
		}

		list.push(this._minutes[mins]);

		return list;
	},
	chars: "ILNESTODEUXQUATRETROISNEUFUNESEPTHUITSIXCINQMIDIXMINUITONZERHEURESMOINSOLEDIXETRQUARTPMDVINGT-CINQUETSDEMIEPAM",
	columns: 11
};
