import { useState, useEffect } from 'react';

export const Filter = ({ onChange }: any) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [isShowed, setIsShowed] = useState<boolean>(false);

  const [items, setItems] = useState<string[]>(['IGamers.cz', 'Tiscali.cz', 'Konzoliště', 'Vortex.cz']);

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  return (
    <div className="flex flex-col items-start justify-center gap-1 w-auto">
      <div className="flex items-center justify-between w-[20rem] semi-md:w-[26rem] h-15 gap-2 bg-white/10 text-white/75 z-50 duration-75 rounded-lg px-8 py-4">
        <span>Vyberte zdroj informací</span>
        <span
          className="border-l border-solid border-white/10 pl-4 w-16 block text-white/50 hover:text-white duration-300 cursor-pointer"
          onClick={() => setIsShowed(!isShowed)}
        >
          {isShowed ? 'Zavřít' : 'Otevřít'}
        </span>
      </div>
      {isShowed && (
        <div className="absolute mt-44 grid shadow-2xl grid-cols-2 h-auto px-12 py-6 w-[20rem] semi-md:w-[26rem] bg-black/90 text-white/50 rounded-lg">
          {items.map((item: string, index: number) => (
            <span
              key={index}
              className="hover:text-white duration-75 cursor-pointer"
              onClick={() => {
                if (selected.find((value: string) => value === item)) {
                  const newList: any = selected.filter((value: string) => value !== item);
                  setSelected(newList);
                } else {
                  setSelected((prev: any) => [...prev, item]);
                }
              }}
            >
              {selected.find((value: string) => value === item) ? <span>✅ {item}</span> : <span>{item}</span>}
            </span>
          ))}

          <span
            className="hover:text-white duration-75 items-center justify-center cursor-pointer"
            onClick={() => {
              setSelected([]);
            }}
          >
            Vyčistit filtr
          </span>
        </div>
      )}
    </div>
  );
};
