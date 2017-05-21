var DOT = '·';
var COLORS = ['228DFF', 'FF00DE', 'FF1177', 'FF9900', 'FFDD1B', 'B6FF00'];

var langs = {};

var grid = document.getElementById('grid');
var overlay = document.getElementById('overlay');

function each(list, cb) {
	for (var i = 0; i < list.length; i++) {
		cb(list[i], i);
	}
}

function repeat(str, count) {
	return Array(count+1).join(str);
}

function generateChars() {
	grid.innerHTML = '';
	var cols = getLang().columns;
	var chars = getLang().chars;
	var rows = chars.length / cols;
	each(chars, function (chr, i) {
		var li = document.createElement('li');
		li.innerHTML = chr;
		li.style.width = percent(cols);
		li.style.height = percent(rows);
		if (chr === DOT) {
			li.classList.add('dot');
		}
		if (i && i % cols === 0) {
			li.classList.add('break');
		}
		grid.appendChild(li);
	});
	updateChars();
}

function percent(items) {
	return (100 / items).toFixed(1) + '%';
}

var fixedTime = null;

function getTime() {
	return fixedTime || Date.now();
}

function getWords() {
	var now = new Date(getTime());
	var hour = now.getHours() % 12;
	var mins = now.getMinutes();
	var rest = mins % 5;
	var dots = repeat(DOT, rest);
	return getLang().timeToWords(hour, mins - rest).concat(dots);
}

function resetChars(nodes) {
	each(nodes, function (node) {
		node.classList.remove('on');
	});
}

function updateChars() {
	var nodes = grid.getElementsByTagName('li');
	var words = getWords();
	var index = 0;

	resetChars(nodes);
	each(words, function (word) {
		index = getLang().chars.indexOf(word, index);
		each(word, function (chr) {
			nodes[index++].classList.add('on');
		});
		index++;
	});
}

var OFFSET = 5 * 60 * 1e3;

function checkKey(code) {
	switch (code) {
		// Left
		case 37: fixedTime = getTime() - OFFSET; break;
		// Right
		case 39: fixedTime = getTime() + OFFSET; break;
		// ESC
		case 27: fixedTime = null; break;
		// Up
		case 38: toggleLang(); break;
		// Down
		case 40: changeTheme(1); break;
	}
}

// Multi language support

function toggleLang() {
	var list = Object.keys(langs);
	localStorage.lang = list[(list.indexOf(localStorage.lang) + 1) % list.length];
	generateChars();
}

function getLang() {
	return langs[localStorage.lang];
}

function detectLang() {
	if (!localStorage.lang) {
		var userPref = navigator.language || navigator.userLanguage || '';
		var pref = userPref.slice(0, 2).toLowerCase();
		localStorage.lang = (pref in langs ? pref : 'en');
	}
}

function addDots() {
	for (var key in langs) {
		var cols = langs[key].columns;
		langs[key].chars +=	repeat(' ', (cols - 4) / 2) + repeat(DOT, 4);
	}
}

// Theming

function changeTheme(delta) {
	var theme = parseInt(localStorage.theme) || 0;
	localStorage.theme = theme = (theme + delta) % 6;
	overlay.style.backgroundColor = '#' + COLORS[theme];
	overlay.style.display = 'block';
}

window.onload = function () {
	addDots();
	detectLang();
	generateChars();
	// TODO: Improve it, detect how much is missing for next step
	setInterval(updateChars, 10e3);
	changeTheme(0);

	document.body.onkeydown = function (e) {
		checkKey(e.keyCode);
		updateChars();
	};
};
