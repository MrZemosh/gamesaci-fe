import { FC, useEffect, useState } from 'react';
import './App.css';

/* Scraping Modules */
import { tiscaliModule } from './modules/tiscali.module';
import { konzolisteModule } from './modules/konzoliste.module';
import { igamersModule } from './modules/igamers.module';

const App: FC = (): JSX.Element => {
  const [scrapedData, setScrapedData] = useState<any>([]);

  useEffect(() => {
    const T = async () => {
      const igamersResponse = await igamersModule();
      const tiscaliResponse = await tiscaliModule();
      const konzolisteResponse = await konzolisteModule();
      setScrapedData([...konzolisteResponse, ...igamersResponse, ...tiscaliResponse]);
    };
    T();
  }, []);

  return (
    <div className="w-full h-full border-indigo-900">
      <div className="flex justify-center gap-4">
        <div className="block items-center justify-center text-center mt-10 mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-purple-700">
            Gamesáci.eu
          </h1>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:grid-cols-2">
          {scrapedData.map((item: any, index: number) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center w-80 h-44 rounded-md text-white backdrop-brightness-90`}
              style={{
                background: `url(${item.imageURL})`,
              }}
              onClick={() => window.open(item.link, '_BLANK')}
            >
              <div className="flex flex-col items-start justify-between w-full h-full bg-black/60 hover:bg-black/40 duration-150 p-4 cursor-pointer rounded-md">
                <span className="flex items-center justify-center bg-black/60 px-2 py-1 text-xs rounded-md">{item.date}</span>
                <h1 className="text-lg font-bold">{item.name}</h1>
                {item.creator}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
