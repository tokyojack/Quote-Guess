class Question(object):

    def __init__(self, quote, author, about_url):
        self.quote = quote.replace('“', '').replace('”', '')
        self.author = author
        self.about_url = about_url

    def json(self):
        return {
            "quote": self.quote,
            "author": self.author,
            "about_url": self.about_url
        }
