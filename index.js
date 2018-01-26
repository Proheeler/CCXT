var ccxt = require ('ccxt');


// console.log (ccxt.exchanges) // print all available exchanges

// JavaScript
(async () => {

            while (true) {
				exchanges=['yobit','kraken','bitfinex'] //list of all exchanges that you want to listen to
				var index, len;
				for (index = 0, len = exchanges.length; index < len; ++index) {
				
			   var exname=exchanges[index];
			   // console.log(exname);
			   const enableRateLimit = true
				// const exchange = new ccxt.yobit({ enableRateLimit })
				var exchange = new ccxt[exname]({ enableRateLimit })
				const symbol = 'BTC/USD'
                let text = []

                try {

                    const ticker = await exchange.fetchTicker (symbol)

                    text = [
                        exchange.id,
                        symbol,
                        JSON.stringify (exchange.omit (ticker, 'info'), undefined, '\t')
                    ]

                } catch (e) {

                    text = [
                        e.constructor.name,
                        e.message,
                    ]
                }
				
				var pair=text[2].slice(14,21),
			    high=JSON.parse(text[2]).high,
				time=JSON.parse(text[2]).datetime,
				low=JSON.parse(text[2]).low,
				bid=JSON.parse(text[2]).bid,
				ask=JSON.parse(text[2]).ask
				middle_bid_ask=(parseFloat(bid)+parseFloat(ask))/2
				middle_high_low=(parseFloat(high)+parseFloat(low))/2
				

				console.log('Exchange:'+text[0]+'\nPair:'+pair+'\ntime:'+time+'\nhigh:'+high+
				'\nlow:'+low+'\nbid:'+bid+'\nask:'+ask+'\nmiddle_bid_ask:'+middle_bid_ask+
				'\nmiddle_high_low:'+middle_high_low+'\n')
				
				
				//if you want get full info about pair
                // console.log(text.join (' '))

            
				}}

})()