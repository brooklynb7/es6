'use strict';

function setSectionBegin(text) {
	console.log('');
	console.log('------ ' + text + ' Start ------');
};

setSectionBegin('Warm Up');

var evens = [2, 4];
var odds = evens.map(v => v + 1);
var nums = evens.map((v, i) => v + i);
console.log(odds);
console.log(nums);


setSectionBegin('Iterators');

var myArray = [1, 2, 3, 4, 5];
myArray.name = 'brooklyn';

myArray[Symbol.iterator] = function() {
	console.log(myArray);
	console.log('myArray arrary length:' + this.length);
	this.index = -1;
	return this;
};
myArray.next = function() {
	++this.index;
	var nextObj = {};
	if (this.index < this.length) {
		nextObj.done = false;
		nextObj.value = "The value: " + this[this.index];
		console.log('Current index: ' + this.index);
	} else {
		nextObj = {
			done: true,
			value: undefined
		};
	}
	return nextObj;
};
for (var value of myArray) {
	console.log(value);
}
for (var chr of "😺😲") {
	console.log(chr);
}
for (var index in myArray) {
	console.log(typeof index + ' ' + index);
}

var words = ['a', 'b', 'c', 'a', 'b'];
var uniqueWords = new Set(words);
console.log(uniqueWords);
for (var value of uniqueWords) {
	console.log(value);
}

setSectionBegin('Genrators');

function* generatorsFn(name) {
	yield "hello " + name + "!";
	yield "i hope you are enjoying the blog posts";
	if (name.startsWith("X")) {
		yield "it's cool how your name starts with X, " + name;
	}
	yield "see you later!";
};

var iter = generatorsFn('brooklyn');
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
		var value = this.value;
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
for (var value of range(0, 3)) {
	console.log('Range: ' + value);
}

function* rangeGenrator(start, stop) {
	for (var i = start; i < stop; i++)
		yield i;
}
for (var value of rangeGenrator(0, 3)) {
	console.log('Range Genrators: ' + value);
}

// Divide the one-dimensional array 'icons'
// into arrays of length 'rowLength'.
function splitIntoRows(icons, rowLength) {
	var rows = [];
	for (var i = 0; i < icons.length; i += rowLength) {
		rows.push(icons.slice(i, i + rowLength));
	}
	return rows;
}
for (var value of splitIntoRows([1, 2, 3, 4, 5], 3)) {
	console.log('SplitIntoRows: ' + value);
}

function* splitIntoRowsGenerator(icons, rowLength) {
	for (var i = 0; i < icons.length; i += rowLength) {
		yield icons.slice(i, i + rowLength);
	}
}
for (var value of splitIntoRowsGenerator([1, 2, 3, 4, 5], 3)) {
	console.log('SplitIntoRows Genrators ' + value);
}


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
\`Test\` $\{Template} String 2: ${function(){return 'Function called'}()}.
\`Test\` $\{Template} String 2': ${function(){return 'Function called 2'}()}.
	`);
}

showTemplateString2();

function saferHTML(templateData) {
	console.log(templateData);
	var s = templateData[0];
	for (var i = 1; i < arguments.length; i++) {
		var arg = String(arguments[i]);

		// Escape special characters in the substitution.
		s += arg.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;");

		// Don't escape special characters in the template.
		s += templateData[i];
	}
	return s;
}

var user = {
	name: 'Hacker Steve <script>alert(\'xss\');</script>'
};

console.log(saferHTML `<p>Test tagged template: ${user.name}<p>`);