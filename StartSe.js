module.exports = class {

  constructor($, url) {
    this.$ = $;
    this.url = url;
  }

  getTitle() {
    const fullTitle = this.$('.title-single__title__name').text();
    return fullTitle;
  }

  getAuthor() {
    const author = this.$('.title-single__info__author__about__name > a').text();
    return author;
  }

  getType() {
    return 'article';
  }

  getUrl() {
    return this.url;
  }

  getBody() {
    let fullText = this.$('.content-single__sidebar-content__content > p > span').text();
    fullText = fullText.replace(/"/gi, "'");
    fullText = fullText.replace('*Foto: Eduardo Viana', '');
    return fullText;
  }

  getSite() {
    return 'startse';
  }
}

