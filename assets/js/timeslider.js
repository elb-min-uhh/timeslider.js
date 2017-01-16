/*
 * timeslider.js
 *
 * Author:  Lars Thoms <lars.thoms@spacecafe.org>
 * Version: 2016-06-27
 *
 * This script is part of the timeslider.js-addon of eLearn.js
 * timeslider.js used vanilla javascript and moment.js to calculate dates
 *
 */


/* ====[ Configuration ]===================================================== */

/* Namespace */
var timesliderJS = timesliderJS || {};


/* ====[ Code ]============================================================== */

timesliderJS.MonthDE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

/*
 * shortMonth()
 *
 * Param:  string
 * Return: string
 *
 * Show specific page and hide other
 *
 */
timesliderJS.shortMonth = function(month)
{
    return (month.length > 4 ? month.substring(0,3) + '.' : month);
};


/*
 * parseDate()
 *
 * Param:  string, object
 * Return: array(moment)
 *
 * Parse given date(-ranges)
 * Valid German date format:
 *   DD. MMMM YYYY (eg. 01. Januar 2016)
 *       MMMM YYYY (eg. Januar 2016)
 *            YYYY (eg. 2016)
 *   DD. MMMM YYYY n.Chr. (eg. 01. Januar 2016 n.Chr.)
 *   DD. MMMM YYYY v.Chr. (eg. 01. Januar 2016 v.Chr.)
 *   ...
 *
 */

timesliderJS.parseDate = function(date, info)
{
    let tmp_date = date.split(' - ');
    let tmp_range = [];
    let regex = /^(?:(\d{1,2})\. )?(?:(\w+) )?(\d{1,4})(?: (n\.Chr\.|v\.Chr\.))?$/;
    for(let i = 0; i < tmp_date.length; i++)
    {
        let match = regex.exec(tmp_date[i]);
        let month = timesliderJS.MonthDE.indexOf(match[2]);

        tmp_range.push(moment({
                year:         (match[4] == 'v.Chr.' ? -1 : 1) * match[3],
                month:        (month > 0 ? month : 0),
                date:         (match[1] ? match[1] : 1),
                hour:         0,
                minute:       0,
                seconds:      0,
                milliseconds: 0
            }));
        info.first = (info.first === undefined ? tmp_range[i] : moment.min(info.first, tmp_range[i]));
        info.last = (info.last === undefined ? tmp_range[i] : moment.max(info.last, tmp_range[i]));
    }
    return tmp_range;
}


/*
 * showPage()
 *
 * Param:  Node, int
 * Return: void
 *
 * Show specific page and hide other
 *
 */

timesliderJS.showPage = function(parentNode, n)
{

    /* Get all »div« */
    let nodes = Array.prototype.filter.call(parentNode.children, function(node)
        {
            return node.matches('div');
        });

    for(let i = 0; i < nodes.length; i++)
    {
        if(i == n)
        {
            nodes[i].classList.remove('hidden');
        }
        else
        {
            nodes[i].classList.add('hidden');
        }
    }

    /* Get pagination */
    let pagination_buttons = parentNode.parentNode.getElementsByClassName('pagination')[0].getElementsByClassName('button');

    pagination_buttons[0].classList.add('active');
    pagination_buttons[1].classList.add('active');
    pagination_buttons[0].onclick = function(){ timesliderJS.showPage(parentNode, (n - 1)); };
    pagination_buttons[1].onclick = function(){ timesliderJS.showPage(parentNode, (n + 1)); };

    if(n < 1)
    {
        pagination_buttons[0].classList.remove('active');
        pagination_buttons[0].onclick = "";
    }
    if(n >= (nodes.length - 1))
    {
        pagination_buttons[1].classList.remove('active');
        pagination_buttons[1].onclick = "";
    }


    
};


/*
 * createtimesliderBox()
 *
 * Param:  Node
 * Return: void
 *
 * Build visual timeslider at the beginning
 *
 */

timesliderJS.createtimesliderBox = function(parentNode)
{
    /* Move content of timeslider to infobox */
    let tmp_infobox = parentNode.innerHTML;
    parentNode.innerHTML = '';
    parentNode.insertAdjacentHTML('afterbegin', '<div class="hints"><i aria-hidden="true">1</i><span>Bewegen Sie die Zeitleiste nach links und rechts</span><i aria-hidden="true">1</i></div><div class="timesliderbox"><table></table></div><div class="infobox">' + tmp_infobox + '</div><div class="pagination active"><div class="button"><i>b</i>Voherige</div><div>Zeitleiste</div><div class="button">Nächste<i class="after">n</i></div></div>');

    /* Get all dates and titles */
    let hints = parentNode.getElementsByClassName('hints')[0].getElementsByTagName('i');
    let timeslider_infobox = parentNode.getElementsByClassName('infobox')[0];
    let timeslider_headlines = timeslider_infobox.getElementsByTagName('h3');
    let timeslider_content = [];
    let timeslider_info = {first: undefined, last: undefined, current: undefined, n_cols: 0};

    /* Validate interval mode */
    timeslider_info.interval = (/^(year|month|day)$/.test(parentNode.dataset.interval) ? parentNode.dataset.interval : 'year');

    for(let i = 0; i < timeslider_headlines.length; i++)
    {
        let tmp_date = timeslider_headlines[i].getElementsByTagName('span')[0].textContent;
        timeslider_content.push({date: timesliderJS.parseDate(tmp_date, timeslider_info),
                               title: timeslider_headlines[i].innerHTML.trim(),
                               n: i});
    }

    /* Get timesliderBox */
    let timeslider_box = parentNode.getElementsByClassName('timesliderbox')[0].childNodes[0];

    /* Set first date as current */
    timeslider_info.current = timeslider_info.first.clone();

    /* Create date interval */
    let row = document.createElement('tr');
    do
    {
        let col = document.createElement('th');
        let col_text;
        switch(timeslider_info.interval)
        {
            case 'year':
                col_text = document.createTextNode(timeslider_info.current.year());
                break;
            case 'month':
                col_text = document.createTextNode(timesliderJS.shortMonth(timesliderJS.MonthDE[timeslider_info.current.month()]) + ' ' + timeslider_info.current.year());
                break;
            case 'day':
                col_text = document.createTextNode(timeslider_info.current.date() + '. ' + timesliderJS.shortMonth(timesliderJS.MonthDE[timeslider_info.current.month()]) + ' ' + timeslider_info.current.year());
                break;
        }

        /* Set current to next interval */
        timeslider_info.current.add(1, timeslider_info.interval);

        /* Increase column counter */
        timeslider_info.n_cols++;

        /* Add col to row */
        col.appendChild(col_text);
        row.appendChild(col);
    }
    while(timeslider_info.current.isSameOrBefore(timeslider_info.last));

    /* Add row to timeslider */
    timeslider_box.appendChild(row);

    timeslider_box.style.width = (timeslider_info.n_cols * ((-4 * timeslider_info.n_cols) / (timeslider_info.n_cols + 20) + 9) + 4) + "em";
    timeslider_box.parentNode.onmouseover = function(){hints[0].classList.add('active');hints[1].classList.add('active');};
    timeslider_box.parentNode.onmouseout = function(){hints[0].classList.remove('active');hints[1].classList.remove('active');};

    /* Variables to store values for next round */
    let tmp_timeslider_content = [];


    while(timeslider_content.length > 0)
    {
        /* Init new row */
        let row = document.createElement('tr');
        for(let i = 0; i < timeslider_info.n_cols; i++)
        {
            row.appendChild(document.createElement('td'));
        }
        timeslider_box.insertBefore(row, timeslider_box.childNodes[0]);

        /* Iterate through content-array */
        while(timeslider_content.length > 0)
        {
            let current_content = timeslider_content.shift();
            let current_begin = current_content.date[0].diff(timeslider_info.first, timeslider_info.interval);
            let current_end = (current_content.date[1] !== undefined ? current_content.date[1].diff(timeslider_info.first, timeslider_info.interval) : current_begin);
            let range_empty = 0;

            /* Check if cells empty */
            for(let i = 0; i <= current_end; i++)
            {
                if(timeslider_box.childNodes[0].childElementCount <= i)
                {
                    range_empty++
                    break;
                }

                current_begin -= timeslider_box.childNodes[0].childNodes[i].colSpan - 1;
                current_end -= timeslider_box.childNodes[0].childNodes[i].colSpan - 1;

                if((timeslider_box.childNodes[0].childNodes[i].hasChildNodes()) && (i >= current_begin))
                {
                    range_empty++;
                    break;
                }
            }

            if(range_empty > 0)
            {

                /* Push for next round */
                tmp_timeslider_content.push(current_content);
            }
            else
            {
                let pointer_begin = current_begin;
                let pointer_end = current_end;
                let event_text = true;
                for(let i = current_begin; i <= current_end; i++)
                {
                    if((i - current_begin) % 1000 == 0)
                    {
                        if(i != current_begin)
                        {
                            pointer_begin++;
                        }

                        /* Add content to cell(s) */
                        if(event_text)
                        {
                            timeslider_box.childNodes[0].childNodes[pointer_begin].innerHTML = current_content.title;
                            event_text = false;
                        }
                        timeslider_box.childNodes[0].childNodes[pointer_begin].onclick = function(){timesliderJS.showPage(timeslider_infobox, current_content.n);};
                        timeslider_box.childNodes[0].childNodes[pointer_begin].classList.add("color" + (current_content.n % 5 + 1));
                        if((pointer_end - pointer_begin) > 0)
                        {
                            timeslider_box.childNodes[0].childNodes[pointer_begin].colSpan = ((pointer_end - pointer_begin + 1) > 1000 ? 1000 : (pointer_end - pointer_begin + 1));
                        }
                    }
                    else if((pointer_end - pointer_begin) > 0)
                    {
                        timeslider_box.childNodes[0].removeChild(timeslider_box.childNodes[0].childNodes[(pointer_begin + 1)]);
                        pointer_end--;
                    }
                }
            }
        }

        while(tmp_timeslider_content.length > 0)
        {
            timeslider_content.push(tmp_timeslider_content.shift());
        }
    }

    /* Place hints */
    let hints_height = (hints[0].parentNode.offsetHeight + (timeslider_box.parentNode.offsetHeight) / 2);
    hints[0].style.top = hints_height + "px";
    hints[1].style.top = hints_height + "px";

}


/*
 * ready()
 *
 * Param:  void
 * Return: void
 *
 * This function executes init() if DOM is ready
 *
 */

timesliderJS.ready = function()
{
    /* Test content of »readyState« until 5 of 5 stages completed */
    /complete/.test(document.readyState) ? timesliderJS.init() : setTimeout('timesliderJS.ready()', 10)
};

/* Call this function */
timesliderJS.ready();


/*
 * init()
 *
 * Param:  void
 * Return: void
 *
 * Initialize timeslider
 *
 */

timesliderJS.init = function()
{
    /* Get all timesliders and iterate through them */
    let timesliders = document.getElementsByClassName('timeslider');
    for(let i = 0; i < timesliders.length; i++)
    {
        timesliderJS.createtimesliderBox(timesliders[i]);
        timesliderJS.showPage(timesliders[i].getElementsByClassName('infobox')[0], 0);
    }
}