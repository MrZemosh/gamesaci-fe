import axios from 'axios';
import { stringDateToDate } from '../services/stringDateToDate';
const cheerio = require('cheerio');

export const replayModule = async () => {
  const completeData: any = [];

  const { data } = await axios.get('https://gamesaci-be.herokuapp.com/https://www.replaytv.cz/');
  const $ = cheerio.load(data);

  $('.cs-posts-area__outer > .cs-posts-area__main > article').each(function (index: any, item: any) {
    let finalData = {
      name: '',
      date: '',
      imageURL: '',
      link: '',
      creator: '',
    };

    finalData.name = $(item).find('.cs-entry__title').text().trim();
    finalData.date = $(item).find('.cs-meta-date').text().trim();
    finalData.link = $(item).find('.cs-entry__title').children('a').attr('href');
    finalData.imageURL = $(item).find('.cs-overlay-background').children('img').attr('src');
    finalData.creator = 'ReplayTV.cz';

    completeData.push(finalData);
  });
  console.log(completeData);
  return completeData;
};
