export async function getTickets(jwt,_callback) {
    let response = fetch('https://scandb.tcket.co.uk:8011/scan-count', { 
        method: 'get', 
        headers: new Headers({
          'authorization': 'Bearer '  + jwt, 
        }),
      });
    let data = await (await response).json();
    let tickets = 0;
    // run through all the scanners in the data and add up the scanned tickets
    for (let scanner in data.totals) {
        if(data.totals[scanner].tt == process.env.NEXT_PUBLIC_SCANNER_1 || data.totals[scanner].tt == process.env.NEXT_PUBLIC_SCANNER_2) {
        tickets += data.totals[scanner].scanned;
        }
    }
    _callback(tickets);
}
export async function getJWT(_callback) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: process.env.NEXT_PUBLIC_UID, password: process.env.NEXT_PUBLIC_AUTH_PASSWORD })
};
  let response = fetch('https://scandb.tcket.co.uk:8011/auth', requestOptions);
    let data = await (await response).json();
    _callback(data.token);

}