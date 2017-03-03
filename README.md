# timeSlider.js

timeSlider.js is a plugin for elearn.js


## Documentation

At first, add required *.css* and *.js* files to your *.html*-Document.

1. `<link rel="stylesheet" type="text/css" href="assets/css/timeslider.css">`
2. `<script type="text/javascript" src="assets/js/moment.js"></script>`
3. `<script type="text/javascript" src="assets/js/timeslider.js"></script>`

Important: `timeslider.sass` is only needed, if you want to change styling options in a comfortable way. Otherwise you need not to copy it into production!


### Code-Snippet

Replace variables with your content:

1. $DATE (Date)  
   Following *(German)* formats are allowed (bold = required)
  * 01\. Januar **2016** n.Chr.
  * 01\. Januar **2016** v.Chr.
  * Januar **2016** n.Chr.
  * **2016** v.Chr.
  * 01\. Januar **2016** n.Chr. - 02. Januar **2016** n.Chr.
  * ...
2. $TITLE (Your title of this event)

Furthermore, this plugin supports adjusting interval and zoom modes. Interval can be changed while setting `data-interval` either to `year`, `month` or `day`. To configure the zoom level simply set `data-zoom` to a value greater than zero.


```html
<div class="timeslider" data-interval="year" data-zoom="1" lang="de">
    <div>
        <h3><span>$DATE</span> $TITLE</h3>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
        <p>At vero eos et accusam et justo duo dolores et ea rebum.</p>
    </div>
    <div>
        <h3><span>$DATE</span> $TITLE</h3>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
        <p>At vero eos et accusam et justo duo dolores et ea rebum.</p>
    </div>
</div>
```


## License

timeSlider.js was developed from [eLearning-Büro MIN](https://www.min.uni-hamburg.de/studium/elearning.html) of Universität Hamburg.

This software is licensed under [MIT-License](http://opensource.org/licenses/mit-license.php).

Copyright (c) 2016 Michael Heinecke, eLearning-Büro MIN, Universität Hamburg
