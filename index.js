'use strict';

function setSectionBegin(text) {
	console.log('');
	console.log('------ ' + text + ' Start ------');
}

(function WarmUp() {
	setSectionBegin('Warm Up');

	let evens = [2, 4];
	let odds = evens.map(v => v + 1);
	let nums = evens.map((v, i) => v + i);
	console.log(odds);
	console.log(nums);
}());


(function Iterators() {
	setSectionBegin('Iterators');

	let myArray = [1, 2, 3, 4, 5];
	myArray.name = 'brooklyn';

	myArray[Symbol.iterator] = function() {
		console.log(myArray);
		console.log('myArray arrary length:' + this.length);
		this.index = -1;
		return this;
	};
	myArray.next = function() {
		++this.index;
		let nextObj = {};
		if (this.index < this.length) {
			nextObj.done = false;
			nextObj.value = 'The value: ' + this[this.index];
			console.log('Current index: ' + this.index);
		} else {
			nextObj = {
				done: true,
				value: undefined
			};
		}
		return nextObj;
	};
	for (let value of myArray) {
		console.log(value);
	}
	for (let chr of '😺😲') {
		console.log(chr);
	}
	for (let index in myArray) {
		console.log(typeof index + ' ' + index);
	}

	let words = ['a', 'b', 'c', 'a', 'b'];
	let uniqueWords = new Set(words);
	console.log(uniqueWords);
	for (let value of uniqueWords) {
		console.log(value);
	}
}());

(function Genrators() {

	setSectionBegin('Genrators');

	function* generatorsFn(name) {
		yield 'hello ' + name + '!';
		yield 'i hope you are enjoying the blog posts';
		if (name.startsWith('X')) {
			yield 'it\'s cool how your name starts with X, ' + name;
		}
		yield 'see you later!';
	}

	let iter = generatorsFn('brooklyn');
	console.log(iter);
	console.log(iter.next());
	console.log(iter.next());
	console.log(iter.next());
	console.log(iter.next());

	class RangeIterator {
		constructor(start, stop) {
			this.value = start;
			this.stop = stop;
		}

		[Symbol.iterator]() {
			return this;
		}

		next() {
			let value = this.value;
			if (value < this.stop) {
				this.value++;
				return {
					done: false,
					value: value
				};
			} else {
				return {
					done: true,
					value: undefined
				};
			}
		}
	}

	function range(start, stop) {
		return new RangeIterator(start, stop);
	}
	for (let value of range(0, 3)) {
		console.log('Range: ' + value);
	}

	function* rangeGenrator(start, stop) {
		for (let i = start; i < stop; i++) {
			yield i;
		}
	}
	for (let value of rangeGenrator(0, 3)) {
		console.log('Range Genrators: ' + value);
	}

	// Divide the one-dimensional array 'icons'
	// into arrays of length 'rowLength'.
	function splitIntoRows(icons, rowLength) {
		let rows = [];
		for (let i = 0; i < icons.length; i += rowLength) {
			rows.push(icons.slice(i, i + rowLength));
		}
		return rows;
	}
	for (let value of splitIntoRows([1, 2, 3, 4, 5], 3)) {
		console.log('SplitIntoRows: ' + value);
	}

	function* splitIntoRowsGenerator(icons, rowLength) {
		for (let i = 0; i < icons.length; i += rowLength) {
			yield icons.slice(i, i + rowLength);
		}
	}
	for (let value of splitIntoRowsGenerator([1, 2, 3, 4, 5], 3)) {
		console.log('SplitIntoRows Genrators ' + value);
	}
}());

(function TemplateString() {
	// body...


	setSectionBegin('Template String');

	function showTemplateString(user) {
		console.log(`Test Template String: ${user.lastName}, ${user.firstName}.`);
	}

	showTemplateString({
		firstName: 'Brooklyn',
		lastName: 'Huang'
	});

	function showTemplateString2() {
		console.log(`
\`Test\` $\{Template} String 2: ${(function(){ return 'Function called'; }())}.
\`Test\` $\{Template} String 2': ${(function(){ return 'Function called 2'; }())}.
	`);
	}

	showTemplateString2();


	function saferHTML(templateData) {
		console.log(templateData);
		let s = templateData[0];
		for (let i = 1; i < arguments.length; i++) {
			let arg = String(arguments[i]);

			// Escape special characters in the substitution.
			s += arg.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;');

			// Don't escape special characters in the template.
			s += templateData[i];
		}
		return s;
	}

	const user = {
		name: 'Hacker Steve <script>alert(\'xss\');</script>'
	};

	console.log(saferHTML `<p>Test tagged template: ${user.name}<p>`);

}());

(function RestParameters() {
	setSectionBegin('Rest parameters');

	function containsAll(haystack) {
		for (let i = 1; i < arguments.length; i++) {
			let needle = arguments[i];
			if (haystack.indexOf(needle) === -1) {
				return false;
			}
		}
		return true;
	}

	console.log(`Normal parameters: ${containsAll('banana', 'b', 'nan')}`);

	function containsAllWithRestParameters(haystack, ...needles) {
		for (let needle of needles) {
			if (haystack.indexOf(needle) === -1) {
				return false;
			}
		}
		return true;
	}

	console.log(`Rest parameters: ${containsAllWithRestParameters('banana', 'b', 'nan')}`);

}());

(function DefaultParameters() {

	setSectionBegin('Default parameters');

	console.warn(`** Default parameters features support in Chrome 49 FF 15`);

	function animalSentence(animals2 = 'tigers', animals3 = 'bears') {
		return `Lions and ${animals2} and ${animals3}! Oh my!`;
	}

	console.log(`Default parameters: ${animalSentence()}`);

}());

(function Destructuring() {

	setSectionBegin('Destructuring');

	console.warn(`** Destructuring assignment features basic support in Chrome 49`);

	let someArray = [1, 2, 3];
	let [first, second, third] = someArray;
	console.log(`${first},${second},${third}`);

	let [foo, [
		[bar], baz
	]] = [1, [
		[2], 3
	]];
	console.log(foo);
	console.log(bar);
	console.log(baz);

	let [head, ...tail] = [1, 2, 3, 4];
	console.log('For rest parameters:');
	console.log(head);
	console.log(tail);

	let [missing] = [];
	console.log('For undefined:');
	console.log(missing);

	function* fibs() {
		let a = 0;
		let b = 1;
		while (true) {
			yield a;
			[a, b] = [b, a + b];
		}
	}
	let [first1, , , , , sixth6] = fibs();
	console.log(`For the iterable: ${first1},${sixth6}`);

	let robotA = {
		name: 'Bender'
	};
	let robotB = {
		name: 'Flexo'
	};

	let {
		name: nameA
	} = robotA;
	let {
		name: nameB
	} = robotB;
	console.log('For Destructuring Objects:');
	console.log(nameA);
	console.log(nameB);
	let {
		foo1, bar1
	} = {
		foo1: 'lorem',
		bar1: 'ipsum'
	};
	console.log(foo1);
	console.log(bar1);

	let {
		wtf
	} = 1;
	console.log(wtf);

	let [missing1 = true] = [];
	console.log(missing1);
	// true

	let {
		message: msg = 'Something went wrong'
	} = {};
	console.log(msg);
	// 'Something went wrong'

	let {
		x = 3
	} = {};
	console.log(x);

	function removeBreakpoint({
		url, line, column
	}) {
		console.log(`${url},${line},${column}`);
	}

	removeBreakpoint({
		url: 1,
		line: 2,
		column: 3
	});
	let map = new Map();
	map.set(window, 'the global');
	map.set(document, 'the document');

	for (let [key, value] of map) {
		console.log(`${key} is ${value}`);
	}
}());