/**
 * @file This is the purgatory JS file written for CMPT276 asn2
 * written on Jun 3rd 2024
 * handles the deletion of DT entries
 * @copyright ShiYu Feng 2024
 */
// Creates a form and send a post request to deleta a single element
function purge(index) {
    let msgr = document.createElement("form");
    msgr.method = "post";
    msgr.action = "db-purgeOne"
    let msg = document.createElement("input");
    msg.name = "sinner";
    msg.value = index;
    msgr.appendChild(msg);
    document.body.appendChild(msgr);
    msgr.submit();
}

// Creates a list of Rectangles to delete
let naughtyList = []
function condemn(index) {
    if (document.getElementById("mark-"+index).checked) {
        naughtyList.push(index);
    } else {
        naughtyList.splice(naughtyList.indexOf(index),1);
    }
}

// Purge all if no rectangles are selected(default), otherwise purge selected
document.getElementById("purge").addEventListener('click', function (evt){
    if (naughtyList.length > 0) {
        evt.preventDefault();
        let msgr = document.getElementById("purge-form");
        msgr.method = "post";
        msgr.action = "db-purgeSelected";
        for (let i=0; i<naughtyList.length; i++) {
            let msg = document.createElement("input");
            msg.name = naughtyList[i];
            msg.value = document.getElementById("rid-"+naughtyList[i]).innerText;
            msgr.appendChild(msg);
        }
        document.body.appendChild(msgr);
        msgr.submit();
    }
})