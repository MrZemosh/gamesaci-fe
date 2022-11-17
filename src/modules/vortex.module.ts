import axios from 'axios';
import { stringDateToDate } from '../services/stringDateToDate';
const cheerio = require('cheerio');

export const vortexModule = async () => {
  const completeData: any = [];

  const { data } = await axios.get('https://gamesaci-be.herokuapp.com/https://www.vortex.cz/rubrika/clanky/');
  const $ = cheerio.load(data);

  $('.articles .cell').each(function (index: any, item: any) {
    let finalData = {
      name: '',
      date: '',
      imageURL: '',
      link: '',
      creator: '',
    };

    finalData.imageURL = $(item).find('.attachment-thumbnail.size-thumbnail').attr('data-src');
    finalData.name = $(item).find('.content > h2').children('a').text().trim();
    finalData.date = stringDateToDate($(item).find('.status > .date').text().trim());
    finalData.link = $(item).find('.content > h2').children('a').attr('href');
    finalData.creator = 'Vortex.cz';

    console.log(finalData.name);
    console.log(finalData.date);
    console.log(finalData.link);
    console.log(finalData.imageURL);
    completeData.push(finalData);
  });

  return completeData;
};
