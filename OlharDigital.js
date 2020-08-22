module.exports = class {

  constructor($, url) {
    this.$ = $;
    this.url = url;
  }

  getTitle() {
    const fullTitle = this.$('.mat-tit').text();
    return fullTitle;
  }

  getAuthor() {
    const author = this.$('.meta-item.meta-aut').text();
    return author;
  }

  getType() {
    return 'article';
  }

  getUrl() {
    return this.url;
  }

  getBody() {
    let fullText = this.$('.mat-txt > p').text();
    fullText = fullText.replace(/"/gi, "'");
    return fullText;
  }

  getSite() {
    return 'olhardigital';
  }
}

