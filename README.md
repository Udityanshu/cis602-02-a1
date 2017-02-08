# Data Visualization (DSC 530/602-02) Assignment 1

## Details:

### 1. Info (HTML & CSS): 10 points

Create an HTML web page with the title "Assignment 1". It should contain the following text:

+ Your name
+ Your student id
+ The course title ("Data Visualization (DSC 530/602-02)"), and
+ The assignment title ("Assignment 1")
+ The text "This assignment is all my own work. I did not copy or rewrite the code from any other source except the code given in the assignment."

All of these lines except the last should be [heading elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements). The first line (your name) should be larger than the others. **Do not put anything except the header tags (with `id` and `class` attributes only) and the text in HTML**. The final line should be a [paragraph element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p).

Style the text using [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) so that your name and student id are displayed in green, the course title is in italics **only** (it should not be bold), and the assignment name is red. **You must do this using CSS; do not use any HTML attributes except id and class!**

![Example Solution for Part 1](http://www.cis.umassd.edu/~dkoop/dsc530-2017sp/a1/solution-part1.png)
*Example Solution for Part 1*

Hints:

+ Certain elements may render in bold by default so you may need to override that.
+ For the most efficient solution, use a `class` attribute for some of the elements.

### 2. Initials (SVG): 20 points

In the same web page, create an [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG) graphic that displays your three initials using SVG. For example, consider the name "John Adam Smith": its initials are "JAS". You do not need to draw periods after each letter. If you have more than three names, use only one of your middle names. If you do not have a middle name, use the second letter of your first name.

You may only use SVG lines, polylines, rectangles, or paths. You do not need to use curves; you may use straight lines to render letters. (See [this font](http://www.dafont.com/ds-digital.font) for ideas on how to draw letters without curves.) **Do not draw your initials using SVG or HTML text elements**. You will receive no credit if you use SVG or HTML text elements.

You should draw all content in a single SVG element that has dimensions 250x150, e.g.

    <svg id="initials" width="250" height="150">
       <!-- YOUR SVG HERE -->
    </svg>

![Example Solution for Part 2] (http://www.cis.umassd.edu/~dkoop/dsc530-2017sp/a1/solution-part2.png)

*Example Solution for Part 2*

Hints:

+ Remember that SVG coordinates start from the top-left part of the element.
+ Investigate the SVG [fill and stroke attributes](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Fills_and_Strokes) to style your initials.
+ You can style SVG elements with CSS in a similar manner to HTML elements.

### 3. US Refugee Visualization (JavaScript & SVG): 65 points

For Part 3, we will create a visualization using data from the [U.S. Refugee Processing Center](http://www.wrapsnet.org/). The original data on historical arrivals may be found is linked from their Reports. I have processed this data (retrieved Feb. 1, 2017) into a JavaScript array. By adding the following line to your web page, you will have a variable `refugees` that contains an array of objects.

    <script src="http://www.cis.umassd.edu/~dkoop/dsc530-2017sp/a1/us-refugees.js" type="text/javascript"></script>

You should add this line before any other JavaScript code. Each object has eight properties: `Year`, `Africa`, `Asia`, `Europe`, `Former Soviet Union`,  `Kosovo`, `Latin America/Caribbean`, `Near East/South Asia`.

#### a. Data Processing (JavaScript): 20 points

In the same web page, write a *JavaScript function* `getTotals` **(without loops)** that takes the array of refugee data as described above and returns a new array with the sum of all the values except `Year` for each item in the array. You may not use loops, but should instead use Array's `map`, `filter`, `reduce`, and `forEach` methods.

The results for `getTotals(refugees)` should match the following:

    [146158, 27206, 19946, 36507, 111363, 207116, 159252, 98096, 61218, 70393, 67704, 62146, 64528, 76483, 107070, 122066, 113389, 132531, 119448, 112981, 99974, 76403, 70488, 77080, 85525, 73147, 69886, 27131, 28403, 52873, 53813, 41223, 48282, 60191, 74654, 73311, 56424, 58238, 69926, 69987, 69933, 84995]

Hints:

+ Make sure your JavaScript occurs **after** the HTML elements are defined. HTML is processed sequentially. You may also use an [`onload` function](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers.onload).
+ You can nest `map`/`reduce`/`filter`/`forEach` functions.

#### b. Bar Chart (JavaScript + SVG): 30 points

In the same web page, write JavaScript code to create a [bar chart](https://en.wikipedia.org/wiki/Bar_chart) that shows the totals by year using the data you created in part a. The bar chart should be vertical, meaning that bars grow from the bottom to the top of the canvas. Add axes labels to indicate the starting and ending years as well as range of values.

Start with an empty `div` element and programmatically create an `svg` element with width `600px` and height `400px`. Then, add `svg` elements to create the bars and labels. The visualization must accurately represent the data, but you should experiment with the design of the chart (thickness of lines, number of labels, spacing, axes scales, colors) to find a visualization that communicates the data well.

    <div id="barchart">
       <!-- NOTHING GOES HERE, USE JAVASCRIPT -->
    </div>
The following helper function that we discussed in class (or a variant) should be useful (you may copy this directly to your solution):

    function makeElt(name, attrs, appendTo)
    {
        var element =     document.createElementNS("http://www.w3.org/2000/svg",     name);
        if (attrs === undefined) attrs = {};
        for (var key in attrs) {
            element.setAttributeNS(null, key, attrs[key]);
        }
        if (appendTo) {
            appendTo.appendChild(element);
        }
        return element;
    }
![Example Solution for Part 3b](http://www.cis.umassd.edu/~dkoop/dsc530-2017sp/a1/solution-part3.png)

*Example Solution for Part 3b*

Hints:

+ In SVG, (0,0) is at the upper-left of the figure.
+ Remember that the x,y coordinates of a rectangle are also the upper-left so subtraction to determine the y-coordinate (or a transform) will be required.
+ Use JavaScript's [`document.getElementById`](https://developer.mozilla.org/en-US/docs/Web/API/document.getElementById) or [`document.querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) function to get a reference to the `div` element.
+ Leave some space for labels!
+ It will be easiest to use SVG text elements to add labels. Text elements require a child text node with the text to be displayed. Given the extra complexity, a new function designed to create text elements may be useful.
+ Try to use a functional method instead of loops here, too.
+ If you are unable to complete part a, use the provided results to do part b.

#### c. Highlighting: 15 pts

Now, write a function that will highlight a specific bar by year. Specifically, write a function `highlightYear` that given a year (e.g. 2002) will change the appearance of that bar to stand out from the others. This should be static; e.g. **do not update the highlighted bar based on where the mouse is**.

Hints

+ Update the code in part b to assign an id attribute to each bar
+ You can change the class attribute of an element
+ **Extra credit**: link this to a text field so that when you change the text in the field to a different year, the corresponding bar is highlighted.

## Author

[Tu Luong] (http://tuluong.com/)
