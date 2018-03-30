import random

import requests
from bs4 import BeautifulSoup
from flask import Flask, jsonify

app = Flask(__name__, static_url_path='/static')


@app.route('/quote', methods=['GET'])
def ajax_request():
    request = requests.get("http://quotes.toscrape.com/");
    content = request.content

    soup = BeautifulSoup(content, "html.parser")
    quotes = soup.find_all("div", {"class": "quote"})

    random_quote = random.choice(quotes)

    quote_text = random_quote.find("span", {"class": "text"}).text
    author = random_quote.find("small", {"class": "author"}).text
    about_url = random_quote.select_one("a[href*=author]")['href']

    quote = {
        "quote": quote_text,
        "author": author,
        "about_url": about_url
    }

    return jsonify(quote)


if __name__ == '__main__':
    app.run()

# <span id="priceblock_ourprice" class="a-size-medium a-color-price">CDN$ 308.34</span>
