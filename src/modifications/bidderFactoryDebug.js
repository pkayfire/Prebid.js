export function useFakeGeneratedBids() {
  return window && window.location && window.location.href && window.location.href.includes('sbly_use_fake_bids');
}

export function fakeBidResponsesForBidRequest(bidRequest) {
  return bidRequest.bids.map(bid => {
    return generateFakeBid(bidRequest, bid)
  })
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function generateFakeBid(bidRequest, bid) {
  const adId = uuidv4();
  const cpm = Math.random() * 3;
  const creativeId = parseFloat((Math.random() * 10000000).toFixed(0));

  return {
     "bidderCode": bidRequest.bidderCode,
     "width":320,
     "height":50,
     "statusMessage":"Bid available",
     "adId": adId,
     "requestId": bid.bidId,
     "mediaType":"banner",
     "source":"client", 
     "cpm":cpm,
     "creativeId":creativeId,
     "currency":"USD",
     "netRevenue":true,
     "ttl":300,
     "adUnitCode": bid.adUnitCode || bidRequest.placementCode,
     "ad":`<!-- Creative TEST_ID served by Member TEST_TEST -->
          <div style="display:flex; justify-content: center; align-items:center; height: 100%">
            <div style="text-align: center">
              <div>THIS IS A TEST AD.</div>
              <div>CPM: ${cpm}</div>
              <div>Bidder: ${bid.bidder}.</div>
              <div>Ad Unit Code: ${bid.adUnitCode}.</div>
            </div>
          </div>`,
     "originalCpm": cpm,
     "originalCurrency":"USD",
     "auctionId": bid.auctionId,
     "responseTimestamp":1583267901766,
     "requestTimestamp":1583267901315,
     "bidder": bid.bidder,
     "timeToRespond":451,
     "pbLg":"20.00",
     "pbMg":"20.00",
     "pbHg":"20.00",
     "pbAg":"20.00",
     "pbDg":"20.00",
     "pbCg":"",
     "size":"320x50",
     "adserverTargeting":{
        "hb_bidder": bid.bidder,
        "hb_adid": adId,
        "hb_pb":"20.00",
        "hb_size":"320x50",
        "ox_pb_won":"false"
     },
     "params": bid.params
  }
}