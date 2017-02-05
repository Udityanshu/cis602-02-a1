function getTotals(refugees) {
    var totals = [];
    refugees.forEach(function(o) {
        /* convert javascript object to an array */
        var array = Object.keys(o).map(function(key) {
            return o[key];
        });
        /* get sum of refugees for each year */
        var sum = array.reduce(function(s, e) {
            return s + e;
        }) - array[0];
        /* push to array */
        totals.push(sum);
    });

    return totals;
}

function getYear() {
	var years = [];
	refugees.forEach(function(o) { years.push(o["Year"]) });
	return years;
}

function addEltToSVG(svg, name, attrs) {
    var element = document.createElementNS("http://www.w3.org/2000/svg", name);
    if (attrs === undefined) attrs = {};
    for (var key in attrs) {
        element.setAttributeNS(null, key, attrs[key]);
    }
    svg.appendChild(element);
}

var width = 600,
    height = 400;

var s = document.createElementNS("http://www.w3.org/2000/svg", "svg");

s.setAttribute("width", width);
s.setAttribute("height", height);

var main = document.getElementById("chart");
main.appendChild(s);

var totals = getTotals(refugees);
var years = getYear();

totals.forEach(function(value, index) {
    var dispVal = value / 1000;
    var x = index * (width / totals.length);
    var barWidth = (width / totals.length);
    var rect = addEltToSVG(s, "rect", {
        "x": x,
        "y": height - dispVal,
        "width": barWidth,
        "height": dispVal,
        "id": "year-" + years[index],
        "fill": "red",
        "stroke": "black",
        "stroke-width": 1
    });
});

var newText = document.createElementNS("http://www.w3.org/2000/svg", "text");
newText.setAttributeNS(null, "x", (width - 290) / 2);
newText.setAttributeNS(null, "y", 20);
newText.setAttributeNS(null, "font-size", "20");

var textNode = document.createTextNode("US Refugees Bar Chart 1975 - 2016");
newText.appendChild(textNode);
s.appendChild(newText);

function highlightYear() {
	var inputYear = document.getElementById('inputYear').value;
	var chart = document.getElementById("year-" + inputYear);

	if (chart) {
		years.forEach(function(year) {
			var chart = document.getElementById("year-" + year);
			chart.setAttribute("fill", "red");
		});
		chart.setAttribute("fill", "blue");
	} else {
		alert("Year Not Found");
	}
}

function clearHighlight() {
	years.forEach(function(year) {
		var chart = document.getElementById("year-" + year);
		chart.setAttribute("fill", "red");
	});
}

var inputYear = document.getElementById('inputYear');
var clearHighlightBtn = document.getElementById('clearHighlight');
inputYear.onchange = function() {
	highlightYear();
};
clearHighlightBtn.onclick = function() {
	clearHighlight();
	inputYear.value = "";
}
