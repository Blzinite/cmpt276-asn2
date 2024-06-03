/**
 * @file This is the purgatory JS file written for CMPT276 asn2
 * written on Jun 3rd 2024
 * handles the deletion of DT entries
 * @copyright ShiYu Feng 2024
 */

function post(path, params, method='post') {

  // The rest of this code assumes you are not using a library.
  // It can be made less verbose if you use one.
  const form = document.createElement('form');
  form.method = method;
  form.action = path;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = key;
      hiddenField.value = params[key];

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}

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