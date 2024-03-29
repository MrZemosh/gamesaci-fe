import { FC, useEffect, useState } from 'react';
import './App.css';

/* Components */
import { Filter } from './components/Filter';
import { Footer } from './components/Footer';

/* Scraping Modules */
import { tiscaliModule } from './modules/tiscali.module';
import { konzolisteModule } from './modules/konzoliste.module';
import { igamersModule } from './modules/igamers.module';
import { vortexModule } from './modules/vortex.module';
import useDeviceDetect from './hooks/useDeviceDetect';
//import { replayModule } from './modules/replay.module';

const App: FC = (): JSX.Element => {
  const [scrapedData, setScrapedData] = useState<any[]>([]);
  const [scrapedDataFiltered, setScrapedDataFiltered] = useState<any[]>([]);
  const [isLoaded, setLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [height, setHeight] = useState(0);
  const { isMobile } = useDeviceDetect();

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
    return () => window.removeEventListener('scroll', listenToScroll);
  }, []);

  const listenToScroll = () => {
    let heightToHideFrom = 200;
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    setHeight(winScroll);

    if (winScroll > heightToHideFrom) {
      isVisible && setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    const T = async () => {
      setLoaded(false);
      //const replayResponse = await replayModule();
      const igamersResponse = await igamersModule();
      const tiscaliResponse = await tiscaliModule();
      const konzolisteResponse = await konzolisteModule();
      const vortexResponse = await vortexModule();
      setScrapedData([...igamersResponse, ...tiscaliResponse, ...konzolisteResponse, ...vortexResponse]);
      setScrapedDataFiltered([...igamersResponse, ...tiscaliResponse, ...konzolisteResponse, ...vortexResponse]);
      setLoaded(true);
    };
    T();
  }, []);

  return (
    <div className="w-full h-full min-h-screen bg-black/95">
      <div className="tl-fade"></div>
      <div className="br-fade"></div>
      <div className="fixed flex justify-center items-center w-full pt-6 semi-md:px-28 lg:px-[21rem]  pb-6 shadow-xl backdrop-blur-2xl z-50">
        <div className="flex flex-col semi-md:flex-row w-full items-center justify-center gap-4 semi-md:gap-10">
          {isMobile && isVisible ? (
            <h1 className="text-4xl w-full text-center semi-md:text-start semi-md:w-1/2 my-3 md:my-0 font-bold uppercase text-white">
              Gamesáci
            </h1>
          ) : (
            <h1 className="text-4xl w-full text-center semi-md:text-start semi-md:w-1/2 my-3 md:my-0 font-bold uppercase text-white">
              Gamesáci
            </h1>
          )}
          <Filter
            onChange={(items: any[]) => {
              if (items.length === 0) return setScrapedDataFiltered(scrapedData);
              setScrapedDataFiltered(scrapedData.filter((item: any) => items.includes(item.creator)));
            }}
          />
        </div>
      </div>
      <div className="flex justify-center">
        {!isLoaded && (
          <div className="flex justify-center items-center text-center w-full h-full min-h-screen text-white">
            Načítám články...
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:grid-cols-2 mt-48 md:mt-32">
          {scrapedDataFiltered
            .sort((a: any, b: any) => {
              const fixedA = a.date.split('.');
              const fixedB = b.date.split('.');

              return (
                new Date(`${fixedB[1]}.${fixedB[0]}.${fixedB[2]}`).getTime() -
                new Date(`${fixedA[1]}.${fixedA[0]}.${fixedA[2]}`).getTime()
              );
            })
            .map((item: any, index: number) => (
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
                  <h1 className="text-lg font-bold line-clamp-2">{item.name}</h1>
                  {item.creator}
                </div>
              </div>
            ))}
        </div>
      </div>
      {isLoaded && <Footer />}
    </div>
  );
};

export default App;
