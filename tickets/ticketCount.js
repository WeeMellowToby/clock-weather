export async function getTickets(_callback) {
    let response = fetch('https://scandb.tcket.co.uk:8011/scan-count', { 
        method: 'get', 
        headers: new Headers({
          'authorization': 'Bearer '  + process.env.NEXT_PUBLIC_SCANNING_KEY, 
        }),
      });
    let data = await (await response).json();
    let tickets = 0;
    // run through all the scanners in the data and add up the scanned tickets
    for (let scanner in data.totals) {
        tickets += data.totals[scanner].scanned;
        
        
    }
    _callback(tickets);
}
