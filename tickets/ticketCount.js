export async function getTickets(_callback) {
    let response = fetch('https://scandb.tcket.co.uk:8011/scan-count', { 
        method: 'get', 
        headers: new Headers({
          'authorization': 'Bearer '  + process.env.NEXT_PUBLIC_SCANNING_KEY, 
        }),
      });
    let data = await response;
    _callback(data);
}
