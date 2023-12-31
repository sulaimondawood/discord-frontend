import { myFont } from "@/assets/fonts/font";
import { nitroPlans } from "@/utils/data";
import { SiBoost } from "react-icons/si";

const Nitro = () => {
  return (
    <main className="bg-gray-ish h-screen overflow-auto ml-[330px] w-[calc(100vw-330px)]">
      <header className="p-3">
        <div className="flex items-center gap-3">
          <p className="text-white-4 text-xl">
            <SiBoost />
          </p>
          <p className="text-white-1">Nitro</p>
        </div>
      </header>
      <div className="text-white bg-gradient-to-bl from-blue-600 to-purple-500 ">
        <h1
          className={`  text-4xl capitalize text-center pt-14 pb-6 w-full max-w-md mx-auto  font-semibold`}
        >
          Unleash more fun with nitro
        </h1>
        <p className="text-center text-lg">
          Plans start at only $2.99/month. Cancel anytime
        </p>
        <div className="flex justify-center items-center gap-4 mt-7">
          <button className="bg-white rounded text-blue-600 px-8 py-[10px] flex items-center gap-2">
            <span className="text-purple-700">
              <SiBoost />
            </span>
            <p className="text-purple-700 text-sm">Subscribe</p>
          </button>
          <button className="border px-8 py-2 rounded border-white text-white flex gap-2 items-center">
            <span>
              <SiBoost />
            </span>
            <p>Gift Nitro</p>
          </button>
        </div>
        <div className="flex justify-center mt-24 gap-10 items-start">
          {nitroPlans.map((item: any, index: number) => {
            return (
              <div key={index} className={`${item.bgColor} p-5 rounded-md`}>
                <img src={item.name} alt="" />
                <p>{item.price}</p>
                <div className="">
                  {item.packages.map((item: any, index: number) => {
                    return (
                      <div key={index} className="flex gap-2 items-center">
                        {/* <img src={item.image} alt="" /> */}
                        <p>{item.image}</p>
                        <p>{item.info}</p>
                      </div>
                    );
                  })}
                </div>
                <button className="bg-white text-purple-600 mt-14 text-center">
                  {item.subscribe}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Nitro;
