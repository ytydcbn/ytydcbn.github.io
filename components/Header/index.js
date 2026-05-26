import { Popover } from "@headlessui/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import data from "../../data/portfolio.json";

const Header = ({
  handleXhsScroll,
  handleWorkScroll,
  handleResearchScroll,
  handleAdvantageScroll,
  handleAboutScroll,
  handleContactScroll,
  isBlog,
}) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { name } = data;

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <>
      <Popover className="block tablet:hidden mt-5">
        {({ open }) => (
          <>
            <div className="flex items-center justify-between p-2 laptop:p-0">
              <h1 onClick={scrollToTop} className="font-bold p-2 laptop:p-0 link cursor-pointer text-accent-dark">
                {name}
              </h1>
              <div className="flex items-center">
                {data.darkMode && (
                  <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    <img
                      className="h-6"
                      alt="切换主题"
                      src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
                    />
                  </Button>
                )}
                <Popover.Button>
                  <img
                    className="h-5"
                    alt="菜单"
                    src={`/images/${
                      !open
                        ? theme === "dark"
                          ? "menu-white.svg"
                          : "menu.svg"
                        : theme === "light"
                        ? "cancel.svg"
                        : "cancel-white.svg"
                    }`}
                  />
                </Popover.Button>
              </div>
            </div>
            <Popover.Panel
              className={`absolute right-0 z-10 w-11/12 p-4 ${
                theme === "dark" ? "bg-slate-800" : "bg-white"
              } shadow-md rounded-md`}
            >
              <div className="grid grid-cols-1">
                <Button onClick={handleXhsScroll}>小红书</Button>
                <Button onClick={handleWorkScroll}>其他项目</Button>
                <Button onClick={handleResearchScroll}>研究作品</Button>
                <Button onClick={handleAdvantageScroll}>我的优势</Button>
                <Button onClick={handleAboutScroll}>关于我</Button>
                <Button onClick={handleContactScroll}>联系我</Button>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
      <div
        className={`mt-10 hidden flex-row items-center justify-between sticky ${
          theme === "light" && "bg-white"
        } dark:text-white top-0 z-10 tablet:flex`}
      >
        <h1 onClick={scrollToTop} className="font-bold cursor-pointer mob:p-2 laptop:p-0 text-accent-dark">
          {name}
        </h1>
        <div className="flex">
          <Button onClick={handleXhsScroll}>小红书</Button>
          <Button onClick={handleWorkScroll}>其他项目</Button>
          <Button onClick={handleResearchScroll}>研究作品</Button>
          <Button onClick={handleAdvantageScroll}>我的优势</Button>
          <Button onClick={handleAboutScroll}>关于我</Button>
          <Button onClick={handleContactScroll}>联系我</Button>
          {mounted && theme && data.darkMode && (
            <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <img
                className="h-6"
                alt="切换主题"
                src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
              />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
