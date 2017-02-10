/* return totals of refugees for each year */
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

/* return an array of years */
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
    if (name == "text") {
		var textNode = document.createTextNode(attrs['content']);
		element.appendChild(textNode);
    }
    svg.appendChild(element);
}

var width = 600,
    height = 400;

var s = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
	chartID = "chart";

s.setAttribute("width", width);
s.setAttribute("height", height);

var main = document.getElementById(chartID);
main.appendChild(s);

var totals = getTotals(refugees),
	years = getYear(),
	max = Math.max.apply(null, totals),
	marginY = 30,
	marginX = 80,
	scale = 1 / 700,
	fontSize = 11,
	unit = 20000;

/* draw bar chart */
totals.forEach(function(value, index) {
    var dispVal = value * scale,
    	x = index * ((width - marginX) / totals.length),
    	barWidth = ((width - marginX) / totals.length);

    var rect = addEltToSVG(s, "rect", {
        "x": x + (marginX / 2),
        "y": height - dispVal - marginY,
        "width": barWidth,
        "height": dispVal,
        "id": "year-" + years[index],
        "fill": "red",
        "stroke": "black",
        "stroke-width": 1
    });
    /* draw Y axis */
	var unitHeight = unit * scale,
		yHeight = max * scale;
	if (index == 0) {
	    var rect = addEltToSVG(s, "rect", {
	        "x": x + (marginX / 2) - 1,
	        "y": height - yHeight - marginY,
	        "width": 1,
	        "height": yHeight,
	        "fill": "black",
	    });
	}
    /* draw Y axis ruler */
    if (unit * index < max) {
	    var rect = addEltToSVG(s, "rect", {
	        "x": (marginX / 2) - 1 - 3,
	        "y": height - marginY - (unitHeight * index),
	        "width": 3,
	        "height": 1,
	        "fill": "black",
	    });
	    var text = addEltToSVG(s, "text", {
	    	"x": 0,
	    	"y": height - marginY - (unitHeight * index) + (fontSize / 2),
	    	"font-size": fontSize,
	    	"content": unit * index
	    });
    }
    /* year label */
    if (index == 0 || index == years.length - 1) {
    	var text = addEltToSVG(s, "text", {
    		"x": x + (marginX / 2),
    		"y": height - fontSize,
    		"font-size": fontSize,
    		"content": years[index]
    	});
    }
});

/* function highlightYear() take data from input */
function highlightYear(year) {
	var chart = document.getElementById("year-" + year);

	if (chart) {
		years.forEach(function(year) {
			var chart = document.getElementById("year-" + year);
			chart.setAttribute("fill", "red");
		});
		chart.setAttribute("fill", "blue");
	} else {
		alert("Year not found");
	}
}

/* function clearHighlight() clears highlighted bar as well as input year */
function clearHighlight() {
	years.forEach(function(year) {
		var chart = document.getElementById("year-" + year);
		chart.setAttribute("fill", "red");
	});
}
