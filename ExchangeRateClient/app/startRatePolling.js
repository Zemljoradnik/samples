export default function startRatePolling(endpoint, interval) {
    window.setInterval(() => {
        // this is a quick and simple solution that doesn't work in older browsers;
        // normally, I would use a library (for example "redux-api-middleware" with React/Redux),
        // or a custom wrapper around fetch with a polyfill
        window.fetch(endpoint).then(res => {
            res.json().then(body => {
                const rates = body.rates;
                const organisedRates = {};

                for (let rate in rates) {
                    let currencies = rate.split('/');
                    let cur1 = currencies[0];
                    let cur2 = currencies[1];

                    if (!organisedRates.hasOwnProperty(cur1)) {
                        organisedRates[cur1] = [];
                    }
                    if (!organisedRates.hasOwnProperty(cur2)) {
                        organisedRates[cur2] = [];
                    }
                    
                    organisedRates[cur1].push({
                        currency: cur2,
                        rate: rates[rate]
                    });
                    organisedRates[cur2].push({
                        currency: cur1,
                        rate: rates[rate]
                    });
                }

                // this is the most performant way of adding complex HTML to DOM using vanilla JS
                // although the readability is not perfect;
                // normaly I would use React for view, but it doesn't make much sense to import
                // a huge library for such a small task
                var fragment = '';
                for (let currency in organisedRates) {
                    let currencyTable = `<table><tr><th></th><th>${currency}</th></tr>`;

                    currencyTable += organisedRates[currency].map(value => 
                        `<tr><td>${value.currency}</td><td>${value.rate}</td></tr>`
                    ).join('');

                    currencyTable += '</table>';

                    fragment += currencyTable;
                }

                const element = document.getElementById('random-ticker');
                element.innerHTML = fragment;
            });
        });
    }, interval);
}
