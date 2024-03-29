import axios from 'axios';
const cheerio = require('cheerio');

export const konzolisteModule = async () => {
  const completeData: any = [];

  const { data } = await axios.get('https://gamesaci-be.herokuapp.com/https://www.konzoliste.cz/herni-zpravodaj/');
  const $ = cheerio.load(data);

  $('.news-item').each(function (index: any, item: any) {
    let finalData = {
      name: '',
      date: '',
      imageURL: '',
      link: '',
      creator: '',
    };

    finalData.name = $(item).find('.title').text().trim();
    finalData.date = $(item).find('time').text().trim();
    finalData.link = 'https://www.konzoliste.cz' + $(item).find('.text').children('a').attr('href');
    finalData.imageURL = $(item).find('.image').children('a').children('img').attr('src');
    finalData.creator = 'Konzoliště';

    completeData.push(finalData);
  });

  return completeData;
};
