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
	min = Math.min.apply(null, totals),
	marginY = 30,
	marginX = 80,
	ratio = 1 / 700,
	fontSize = 12;

/* draw bar chart */
totals.forEach(function(value, index) {
    var dispVal = value * ratio,
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
    if (index == 0) {
	    var rect = addEltToSVG(s, "rect", {
	        "x": x + (marginX / 2) - 1,
	        "y": height - (max * ratio) - marginY,
	        "width": 1,
	        "height": (max * ratio),
	        "fill": "black",
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
	/* refugees label */
    if (index == 0 || value == max || value == min) {
		if (index == 0) {
    		var text = addEltToSVG(s, "text", {
    			"x": 0,
    			"y": height - marginY,
    			"font-size": fontSize,
    			"content": 0
    		});
		} else {
    		var text = addEltToSVG(s, "text", {
    			"x": 0,
    			"y": height - dispVal - marginY,
    			"font-size": fontSize,
    			"content": value
    		});
		}
    }
});

/* function highlightYear() take data from input */
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

/* function clearHighlight() clears highlighted bar as well as input year */
function clearHighlight() {
	years.forEach(function(year) {
		var chart = document.getElementById("year-" + year);
		chart.setAttribute("fill", "red");
	});
}

/* map function to DOM elements */
var inputYear = document.getElementById('inputYear');
var clearHighlightBtn = document.getElementById('clearHighlight');
inputYear.onchange = function() {
	highlightYear();
};
clearHighlightBtn.onclick = function() {
	clearHighlight();
	inputYear.value = "";
}
