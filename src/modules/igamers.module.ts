import axios from 'axios';
const cheerio = require('cheerio');

export const igamersModule = async () => {
  const completeData: any = [];

  const { data } = await axios.get('https://gamesaci-be.herokuapp.com/https://igamers.cz/');
  const $ = cheerio.load(data);

  $('.list-card .list-card-wrap').each(function (index: any, item: any) {
    let finalData = {
      name: '',
      date: '',
      imageURL: '',
      link: '',
      creator: '',
    };

    finalData.name = $(item).find('.list-card-title').text().trim();
    finalData.date = $(item).find('.list-card-date').text().trim();
    finalData.link = $(item).find('.list-card-title').children('a').attr('href');
    finalData.imageURL = $(item).find('.list-card-image').attr('style').substring(22).slice(0, -3);
    finalData.creator = 'IGamers.cz';

    completeData.push(finalData);
  });

  return completeData;
};
