/**
 * @file This is the purgatory JS file written for CMPT276 asn2
 * written on Jun 3rd 2024
 * handles the deletion of DT entries
 * @copyright ShiYu Feng 2024
 */
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

let naughtyList = []
function condemn(index) {
    naughtyList.push(index);
}

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