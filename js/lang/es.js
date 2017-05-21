langs.es = {
	_hours: [ 'DOCE', 'UNA', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE', 'DIEZ', 'ONCE' ],
	_minutes: { '15': 'CUARTO', '20': 'VEINTE', '25': 'VEINTICINCO', '30': 'MEDIA' },

	timeToWords: function (hour, mins) {
		var list = [];
		var over = mins > 30;

		if (over) {
			mins = 60 - mins;
			hour = (hour + 1) % 12;
		}

		if (hour === 1) {
			list.push('ES', 'LA');
		} else {
			list.push('SON', 'LAS');
		}

		list.push(this._hours[hour]);

		if (!mins) {
			list.push('EN', 'PUNTO');
		} else {
			if (over) {
				list.push('MENOS');
			} else {
				list.push('Y');
			}

			list.push(this._hours[mins] || this._minutes[mins]);
		}

		return list;
	},
	chars: 'ESTLAISONMLASEDOCEUNADOSTRESANDCUATROCINCOSEISSIETEDOCHONUEVEDIEZONCEAYMENOSTETCINCODIEZIMEACUARTOVEINTEMEDIANDDAVEINTICINCOTETIMEANENDPUNTO',
	columns: 14
};
