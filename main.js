function submit() {

    var bday = document.getElementById('input-birthdate').value;
    var ageOfDeath = document.getElementById('input-deathAge').value;

    document.getElementById("initial-input").remove();
    document.getElementById("main_grid").style.display="inline-block";

    //add checks ?
    var bdayDate = new Date(parseDate(bday));
    var deathDate = new Date(bday);
    deathDate.setFullYear(deathDate.getFullYear() + parseInt(ageOfDeath));
        
    var weeksLeft = Math.ceil((deathDate - bdayDate) / (1000 * 3600 * 24 * 7));

    // document.getElementById("main_grid").innerHTML;

    renderLoop(bdayDate, deathDate);
    }

    function parseDate(str) {
    var mdy = str.split('/'); return new Date(mdy[2], mdy[0]-1, mdy[1]); 
}

function numWeeks(dateA, dateB) {
    return (dateB - dateA) / (1000 * 3600 * 24 * 7)
}

// Returns HTML for squares based on the number of weeks passed in
function renderSquares(bdayDate, deathDate, currentTime) {
    var totalWeeks = numWeeks(bdayDate, deathDate);
    var weeksToNow = numWeeks(bdayDate, currentTime);
    var totalYears = (totalWeeks / 52);

    // TODO compute color
    // TODO optimize by only generating and updated the ones we need to
    // TODO click events for goal creation

    var html = '';
    for (var year = 0; year < totalYears; year++) {
        html += '<div class="row">' + '<div class="rowElement yearNum">' + (year + 1) + '</div>';
        for (var week = 0; week < 52; week++) {
            var weekDiff = weeksToNow - (week + ((year + 1) * 52) + 1); // 1 - 52, 53 - 104 etc...
            var weekSqureFillPercentage = Math.min(Math.max(0, weekDiff), 1); // Clamp to [0, 1]

            html +=
                '<div class="rowElement weekSquare">' +
                    //(week + 1) +
                    '<div class="weekSquareFill" style="width:' + (weekSqureFillPercentage * 100) + '%"' + '></div>' +
                '</div>'
            ;
        }
        html += '</div>'
    }

    return html;
}

function renderLoop (bdayDate, deathDate) {
    var squaresHTML = renderSquares(bdayDate, deathDate, new Date());
    document.getElementById("main_grid").innerHTML = squaresHTML;

    window.requestAnimationFrame(renderLoop.bind(this, bdayDate, deathDate));
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
//     var totalYears = (totalWeeks / 52);

//     // TODO compute color
//     // TODO optimize by only generating and updated the ones we need to
//     // TODO click events for goal creation

//     var html = '';
//     for (var year = 0; year < totalYears; year++) {
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
