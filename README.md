# timeSlider.js

timeSlider.js is a plugin for elearn.js


## Link additional files

At first, add required *.css* and *.js* files to your *.html*-Document.

1. `<link rel="stylesheet" type="text/css" href="assets/css/timeslider.css">`
2. `<script type="text/javascript" src="assets/js/moment.js"></script>`
3. `<script type="text/javascript" src="assets/js/timeslider.js"></script>`

Important: `timeslider.sass` and `Makefile` is only needed, if you want to change
styling options in a comfortable way. Otherwise you need not to copy it into production!


## An event

Each event consists of a time entry and a title. A time entry is composed of different parts,
several of these parts are optional in some combination.

Following combination of blocks are allowed:

```
$DATE
$TIME
$DATE $TIME
$DATE - $DATE
$TIME - $TIME
$DATE $TIME - $DATE $TIME
```

There are two block types: `$DATE` and `$TIME`.  Each of them requires a specific pattern
and can visualize a time range.


### $DATE

**The month name has to be written in German, yet!**

Each date must contain a year, which can be annotated by *n.Chr.* or *n.Chr.*.
Additionally, a month or a day in combination with a month can be appended.

Following examples show you some valid dates:

* 2016 v.Chr.
* April 2016
* 01. Januar 2016 n.Chr.


### $TIME

To add a time information to an event, it is required to set an hour and a minute.
Furthermore, seconds and milliseconds can be added.

Following examples show you some valid times:

* 00:01
* 12:00:01
* 13:56:09.734


### Options

There are three options you can set, which individualize the projection of the time slider.

1) Interval: year, month, day, hour, minute, second or millisecond
2) Mode: date, time, datetime
3) Zoom: $n >= 1$, e.g. 1, 5 or 10


## Code-Snippet

```html
<div class="timeslider" data-interval="year" data-mode="date" data-zoom="1" lang="de">
    <div>
        <h3><span>$DATE</span> $TITLE</h3>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
        <p>At vero eos et accusam et justo duo dolores et ea rebum.</p>
    </div>
    <div>
        <h3><span>$DATE - $DATE</span> $TITLE</h3>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
        <p>At vero eos et accusam et justo duo dolores et ea rebum.</p>
    </div>
</div>
```


## License

timeSlider.js was developed from [eLearning-Büro MIN](https://www.min.uni-hamburg.de/studium/elearning.html) of Universität Hamburg.

This software is licensed under [MIT-License](http://opensource.org/licenses/mit-license.php).

Copyright (c) 2016 Michael Heinecke, eLearning-Büro MIN, Universität Hamburg