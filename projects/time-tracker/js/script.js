let rowHTML, tileHTML, rowID, rowSelector, rowPadding, renderHTML;
let dashSelector = document.getElementById('2aj-metrics');

async function getMetrics(timeframe) {
    let response = await fetch('./data.json');
    let data = await response.json();
    // set the background colours of tile highlights
    let hlCols = ["light-orange", "soft-blue", "light-red", "lime-green", "violet", "gold"]

    let title, time, currentTime, previousTime, bkgCol;
    let compPhrase = comparePhrase(timeframe);

    // Clear dashboard tiles -- allows them to be re-rendered
    dashSelector.innerHTML = '';

    // start rendering tiles
    for (let i = 0; i < data.length; i++) {
        title = data[i].title;
        time = data[i].timeframes[timeframe];
        currentTime = time.current;
        previousTime = time.previous;
        bkgCol = `${hlCols[i]}-bkg`;

        tileHTML = `
            <div class="col-sm-4">
                <div class="tile-wrap">
                    <div class="tile-highlight ${bkgCol}"></div>
                    <div class="tile-main metric-tile">
                        <div class="tile-top-row">
                            <div class="tile-title">
                                <p>${title}</p>
                            </div>
                            <div class="tile-menu">
                                <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/></svg>
                            </div>
                        </div>
                        <div class="numbers-wrap">
                            <div class="tile-hours">
                                <p>${currentTime}hrs</p>
                            </div>
                            <div class="tile-compare">
                                <p>${compPhrase} - ${previousTime}hrs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // add custom class for top row padding on desktop
        if (i == 0) {
            rowPadding = " dash-padding";
        } else {
            rowPadding = "";
        }

        // set ID for each row
        if (i < 3) {
            rowID = "2aj-row-1";
        } else {
            rowID = "2aj-row-2";
        }

        // set HTML for row
        rowHTML = `<div id="${rowID}" class="row${rowPadding}"></div>`;

        // render new row only on 1st and 4th
        if (i == 0 || i == 3) {
            renderHTML = rowHTML;
            dashSelector.innerHTML += `
                ${rowHTML}
            `;
        }
        
        // set target ID for tile to render in
        rowSelector = document.getElementById(rowID);

        // render tile in correct row
        rowSelector.innerHTML += `
                ${tileHTML}
        `;
    }
}

// Set the phrase to appear at bottom of tile -- "Last Week - 5hrs"
function comparePhrase(timeframe) {
    if (timeframe == 'daily') {
        return "Yesterday";
    } else if (timeframe == 'weekly') {
        return "Last Week";
    } else if (timeframe == 'monthly') {
        return "Last Month";
    } else {
        return;
    }
}

document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement,
        text = target.textContent || target.innerText;
        text = text.toLowerCase()
        if (text == 'daily' || text == 'weekly' || text == 'monthly') {
            getMetrics(text);
            // console.log(text);
        }
}, false);


// using jQuery to highlight and unhighlight timeframe filter
var $links = $('li.filter-item');
$links.click(function(){
   $links.removeClass('active');
   $(this).addClass('active');
});

getMetrics("weekly");