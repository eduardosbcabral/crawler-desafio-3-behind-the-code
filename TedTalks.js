module.exports = class {

  constructor($, url) {
    this.$ = $;
    this.url = url;
  }

  getTitle() {
    const fullTitle = this.$('title').text();

    const firstParse = fullTitle.split(':')[1];

    const firstParseWithoutEmptySpace = this.removeCharacter(firstParse, 0);

    const secondParse = firstParseWithoutEmptySpace.split('|')[0];

    const secondParseWithoutEmptySpace = this.removeCharacter(secondParse, secondParse.length);

    return secondParseWithoutEmptySpace;
  }

  getAuthor($) {
    const author = this.$('title').text();

    const parse = author.split(':')[0];

    const parseWithoutEmptySpace = this.removeCharacter(parse, parse.length);

    return parseWithoutEmptySpace;
  }

  getType() {
    return 'video';
  }

  getUrl() {
    return this.url;
  }

  getBody() {

    const list = [];
    this.$('.Grid .Grid--with-gutter')
    .find('p').contents().each((index, element) => {
      list.push(element.data);
    });

    let fullText = '';

    list.forEach((item, index) => {
      let newLine = this.removeNewlines(item);
      newLine = newLine.replace('(Risos)', '');
      newLine = newLine.replace('(Aplausos)', '');
      newLine = newLine.replace('(Vivas)', '');
      newLine = newLine.replace('(A plateia responde)', '');
      newLine = newLine.replace('(A plateia responde)', '');
      fullText += ' ' + newLine;
    })

    fullText = fullText.replace(/"/gi, "'");
    return fullText;
  }

  removeCharacter(str, char_pos) {
    const part1 = str.substring(0, char_pos);
    const part2 = str.substring(char_pos + 1, str.length);
    return (part1 + part2);
  }

  removeNewlines(str) {
    str = str.replace(/^\n/, "");
    str = str.replace(/((?!\.|\,) [\n])/gi, " ");
    str = str.replace(/((?!\.|\,)[\n])/gi, " ");
    str = str.replace(/(\n)+/gi, "");
    str = str.replace(/(\t)+/gi, "");
    str = str.replace(/\w[ ]{2,}\w/gi, " ");
    str = str.replace(/[^\s]([ ]{2,})[^\s]/gi, " ");
 
    return str;
  }

  getSite() {
    return 'tedtalks';
  }
}

