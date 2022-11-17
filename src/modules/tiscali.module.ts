import axios from 'axios';
const cheerio = require('cheerio');

export const tiscaliModule = async () => {
  const completeData: any = [];

  const { data } = await axios.get('https://gamesaci-be.herokuapp.com/https://games.tiscali.cz/');
  const $ = cheerio.load(data);

  $('.media-article').each(function (index: any, item: any) {
    let finalData = {
      name: '',
      date: '',
      imageURL: '',
      link: '',
      creator: '',
    };

    finalData.name = $(item).find('.article-title').text().trim();
    finalData.date = $(item).find('.article-info > span').text().trim().slice(0, -10).replace(' ', '').replace(' ', '');
    finalData.link = $(item).find('.article-title').children('a').attr('href');
    finalData.imageURL = $(item).find('.image-wrapper picture').children('img').attr('data-src');
    finalData.creator = 'Games.tiscali.cz';

    completeData.push(finalData);
  });

  return completeData;
};
