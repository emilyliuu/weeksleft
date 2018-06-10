USE_TEST_DATA = true;

testData = function () {

    var intentions = [];

    for (var i = 0 ; i < 1317; i++) {
        intentions[i] = "";
    }

    intentions[0] = "be born";
    intentions[100] = "eat food";
    intentions[1000] = "contemplate purple";
    intentions[1314] = "live in the moment";

    return {
        startDate: new Date("03/25/1993"),
        numYears: 100,
        intentions: intentions
    };

}();

function saveData (appState) {
    return JSON.stringify(appState);
}

function loadData (jsonString) {
    return JSON.parse(jsonString);
}

function displayIntentionForWeek(intention) {
    if (intention.length > 0) {
        alert(intention);
    }
}

function submit() {
    var bday = document.getElementById('input-birthdate').value;
    var numYears = document.getElementById('input-deathAge').value;

    var bdayDate = new Date(parseDate(bday));

    document.getElementById("initial-input").remove();
    document.getElementById("main_grid").style.display="inline-block";

    if (USE_TEST_DATA) {
        renderLoop(testData);
        return;
    }

    // TODO make intentions equal num weeks
    renderLoop({
        startDate: bdayDate,
        numYears: numYears,
        intentions: intentions
    });
}

function parseDate(str) {
    var mdy = str.split('/'); return new Date(mdy[2], mdy[0]-1, mdy[1]); 
}

function numWeeks(dateA, dateB) {
    return (dateB - dateA) / (1000 * 3600 * 24 * 7)
}

// Returns HTML for squares based on the number of weeks passed in
function renderSquares(bdayDate, numYears, intentions, currentTime) {
    var deathDate = new Date(bdayDate);
    deathDate.setFullYear(deathDate.getFullYear() + parseInt(numYears));
        
    var weeksLeft = Math.ceil((deathDate - bdayDate) / (1000 * 3600 * 24 * 7));

    var totalWeeks = numWeeks(bdayDate, deathDate);
    var weeksToNow = numWeeks(bdayDate, currentTime);

    // TODO compute color
    // TODO optimize by only generating and updated the ones we need to
    // TODO click events for goal creation

    var html = $('<div/>');
    for (var year = 0; year < numYears; year++) {
        rowDiv = $('<div class="row">' + '<div class="rowElement yearNum">' + (year + 1) + '</div>');
        for (var week = 0; week < 52; week++) {
            var weekIndex = week + (year * 52);
            var weekDiff = weeksToNow - (weekIndex + 1); // 1 - 52, 53 - 104 etc...
            var weekSqureFillPercentage = Math.min(Math.max(0, weekDiff), 1); // Clamp to [0, 1]

            weekSquareDiv = $('<div class="rowElement weekSquare"/>');

            var hasIntention = weekIndex < intentions.length && intentions[weekIndex].length > 0;

            if (hasIntention) {
                weekSquareDiv.click(function (index) {
                    return function () {
                        displayIntentionForWeek(intentions[index]);
                    };
                }(weekIndex));
            }

            weekSquareFillDiv = $('<div class="weekSquareFill" style="width:' + (weekSqureFillPercentage * 100) + '%"' + '></div>');
            
            weekSquareFillDiv.toggleClass("intention", hasIntention);

            weekSquareDiv.append(weekSquareFillDiv);
            rowDiv.append(weekSquareDiv);
        }
        html.append(rowDiv);
    }

    return html;
}

function renderLoop (appState) {
    var squares = renderSquares(appState.startDate, appState.numYears, appState.intentions, new Date());
    $("#main_grid").html(squares);

    setTimeout(renderLoop.bind(this, appState), 10000);
}

//checks to add
// if (bday == null || bday == "") {
//     bday = "User cancelled the prompt.";
// }
// else
// {
//     bdayDate = parseDate(bday);
// }

// if (death == null || death == "") {
//     death = "User cancelled the prompt.";
// }
// =======
// function numWeeks(dateA, dateB) {
//     return (dateB - dateA) / (1000 * 3600 * 24 * 7)
// }

// // Returns HTML for squares based on the number of weeks passed in
// function renderSquares(bdayDate, deathDate, currentTime) {
//     var totalWeeks = numWeeks(bdayDate, deathDate);
//     var weeksToNow = numWeeks(bdayDate, currentTime);
//     var numYears = (totalWeeks / 52);

//     // TODO compute color
//     // TODO optimize by only generating and updated the ones we need to
//     // TODO click events for goal creation

//     var html = '';
//     for (var year = 0; year < numYears; year++) {
//         html += '<div class="row">' + '<div class="rowElement yearNum">' + (year + 1) + '</div>';
//         for (var week = 0; week < 52; week++) {
//             var weekDiff = weeksToNow - (week + ((year + 1) * 52) + 1); // 1 - 52, 53 - 104 etc...
//             var weekSqureFillPercentage = Math.min(Math.max(0, weekDiff), 1); // Clamp to [0, 1]

//             html +=
//                 '<div class="rowElement weekSquare">' +
//                     //(week + 1) +
//                     '<div class="weekSquareFill" style="width:' + (weekSqureFillPercentage * 100) + '%"' + '></div>' +
//                 '</div>'
//             ;
//         }
//         html += '</div>'
//     }

//     return html;
// }

// function renderLoop (bdayDate, deathDate) {
//     var squaresHTML = renderSquares(bdayDate, deathDate, new Date());
//     document.getElementById("main_grid").innerHTML = squaresHTML;

//     window.requestAnimationFrame(renderLoop.bind(this, bdayDate, deathDate));
// }

// function run() {
//     function parseDate(str) {
//         var mdy = str.split('/'); return new Date(mdy[2], mdy[0]-1, mdy[1]); 
//     }

//     function weekDiff(first, second) {
//         return Math.round((second-first));
//     }

//     var bday = prompt("Enter birthday", "mm/dd/yyyy");

//     if (bday == null || bday == "") {
//         bday = "User cancelled the prompt.";
//     }
//     else
//     {
//         bdayDate = parseDate(bday);
//     }

//     var death = prompt("What age will you die?", "100");

//     if (death == null || death == "") {
//         death = "User cancelled the prompt.";
//     }

//     var deathDate = new Date(bdayDate);
//     deathDate.setFullYear(deathDate.getFullYear() + parseInt(death));

//     renderLoop(bdayDate, deathDate);
// }
// >>>>>>> 3d0975a2b386c5b45fc1f40be550f8be7d0ab55a
