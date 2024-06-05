function fetchXmrPrice() {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=usd')
        .then(response => response.json())
        .then(data => {
            const xmrPrice = data.monero.usd;
            document.getElementById('xmr-price').innerText = `XMR Price: $${xmrPrice}`;
        })
        .catch(error => {
            console.error('Error fetching XMR price:', error);
        });
}
