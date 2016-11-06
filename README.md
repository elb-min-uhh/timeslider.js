# timeSlider.js

timeSlider.js is a plugin for elearn.js


## Documentation

At first add required *.css* and *.js* files to your *.html*-Document.

1. `<link rel="stylesheet" type="text/css" href="assets/css/timeslider.css">`
2. `<script type="text/javascript" src="assets/js/moment.js"></script>`
3. `<script type="text/javascript" src="assets/js/timeslider.js"></script>`

Important: `timeslider.sass` is only needed, if you want to change styling options in a comfortable way. Otherwise you needn't to copy it to production!


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

```html
<div class="timeslider" data-interval="year" lang="de">
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
