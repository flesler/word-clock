var DOT = '·';
var COLORS = ['228DFF', 'FF00DE', 'FF1177', 'FF9900', 'FFDD1B', 'B6FF00'];

var langs = {};
var state = {color:0, lang:'', fx: 1, dots: 1};
var timeoutId;

var body = document.body;
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

function readHash() {
	location.hash.slice(1).split('&').forEach(function(str) {
		var p = str.split('=');
		if (p[0] in state) {
			state[p[0]] = /^\d+$/.test(p[1]) ? parseInt(p[1]) : p[1];
		}
	});
}

function updateHash() {
	var hash = [];
	for (var key in state) {
		hash.push(key + '=' + state[key]);
	}
	location.hash = hash.join('&');
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
}

function percent(items) {
	return (100 / items).toFixed(1) + '%';
}

var OFFSET = 5 * 60 * 1e3;
var fixedTime = null;

function getTime() {
	return fixedTime || Date.now();
}

function updateTime(sign) {
	fixedTime = sign && getTime() + OFFSET * sign;
	updateChars();
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
		// Word not found, also to avoid failing when dots=0
		if (index === -1) return;
		each(word, function (chr) {
			nodes[index++].classList.add('on');
		});
		index++;
	});
}

function scheduleUpdate() {
	clearTimeout(timeoutId);
	var elapsed = Date.now() % 1000;
	timeoutId = setTimeout(scheduleUpdate, 1000 - elapsed);
	updateChars();
}

// Multi language support

function toggleLang() {
	var list = Object.keys(langs);
	state.lang = list[(list.indexOf(state.lang) + 1) % list.length];
	generateChars();
	updateHash();
}

function getLang() {
	return langs[state.lang];
}

function detectLang() {
	var userPref = navigator.language || navigator.userLanguage || '';
	var pref = userPref.slice(0, 2).toLowerCase();
	state.lang = (pref in langs ? pref : 'en');
}

function addDots() {
	for (var key in langs) {
		var cols = langs[key].columns;
		langs[key].chars +=	repeat(' ', (cols - 4) / 2) + repeat(DOT, 4);
	}
}

// Theming

function changeTheme(delta) {
	state.color = (state.color + delta) % 6;
	overlay.style.backgroundColor = '#' + COLORS[state.color];
	overlay.style.display = 'block';
	updateHash();
}

var hammer = new Hammer(body);
hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

hammer.on('doubletap', function () { screenfull.toggle(); } );
hammer.on('swipeleft', function () { updateTime(-1); });
hammer.on('swiperight', function () { updateTime(1); });
hammer.on('press', function () {	updateTime(null); });
hammer.on('swipeup', function() { toggleLang(); });
hammer.on('swipedown', function() { changeTheme(1); });

Hammer.on(window, 'load', function () {
	readHash();
	if (state.dots) {
		addDots();
	}
	if (!state.lang) {
		detectLang();
	}
	if (!state.fx) {
		body.classList.add('no-transitions');
	}
	generateChars();
	scheduleUpdate();
	changeTheme(0);
});
