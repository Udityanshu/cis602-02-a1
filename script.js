/* return totals of refugees for each year */
var getTotals = function(refugees) {
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
var getYear = function() {
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
	fontSize = 12,
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
    var data = addEltToSVG(s, "text", {
    	"x": x + (marginX / 2) + 5,
    	"y": height - dispVal - marginY + (fontSize - 2),
    	"font-size": fontSize - 1,
    	"content": value,
    	"transform": "rotate(-90 " + (x + (marginX / 2)) + " " + (height - dispVal - marginY) + ")"
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
	        "x": (marginX / 2) - 1 - 2,
	        "y": height - marginY - (unitHeight * index),
	        "width": 2,
	        "height": 1,
	        "fill": "black",
	    });
	    /* Y axis numbers */
	    var text = addEltToSVG(s, "text", {
	    	"x": 0,
	    	"y": height - marginY - (unitHeight * index) + (fontSize / 2),
	    	"font-size": fontSize,
	    	"content": unit * index
	    });
    }
    if (unit * index > max && unit * index < max + unit) {
    	var text = addEltToSVG(s, "text", {
    		"x": 0,
    		"y": height - marginY - (unitHeight * index) + (fontSize / 2),
    		"font-size": fontSize + 2,
    		"content": "# Refs."
    	});
    }
    /* year label */
    var midIndex = Math.round(years.length / 2) - 1;
    if (index == midIndex) {
    	var text = addEltToSVG(s, "text", {
    		"x": x + (marginX / 2),
    		"y": height - fontSize,
    		"font-size": fontSize + 2,
    		"content": "Year"
    	});
    }
    if (index == 0 || index == years.length - 1) {
    	var text = addEltToSVG(s, "text", {
    		"x": x + (marginX / 2),
    		"y": height - fontSize,
    		"font-size": fontSize,
    		"content": years[index]
    	});
    }
});

/* function clearHighlight() clears highlighted bar */
var clearHighlight = function() {
	years.forEach(function(year) {
		var chart = document.getElementById("year-" + year);
		chart.setAttribute("fill", "red");
	});
}

/* function highlightYear() takes data from input */
var highlightYear = function(year) {
	var chart = document.getElementById("year-" + year);
	if (chart) {
		clearHighlight();
		chart.setAttribute("fill", "blue");
	} else {
		alert("Year not found");
	}
}
