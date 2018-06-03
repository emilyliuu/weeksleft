function submit() {

    var bday = document.getElementById('input-birthdate').value;
    var ageOfDeath = document.getElementById('input-deathAge').value;

    document.getElementById("initial-input").remove();

    //add checks ?
    var bdayDate = new Date(parseDate(bday));
    var deathDate = new Date(bday);
    deathDate.setFullYear(deathDate.getFullYear() + parseInt(ageOfDeath));
        
    var weeksLeft = Math.ceil((deathDate - bdayDate) / (1000 * 3600 * 24 * 7));

    document.getElementById("wltl").innerHTML = weeksLeft;
    }

    function parseDate(str) {
    var mdy = str.split('/'); return new Date(mdy[2], mdy[0]-1, mdy[1]); 
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