import { useRef, useState } from "react";
import Header from "../components/Header";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import ImageSlider from "../components/ImageSlider";
import Footer from "../components/Footer";
import Head from "next/head";
import Cursor from "../components/Cursor";
import data from "../data/portfolio.json";

export default function Home() {
  const workRef = useRef();
  const researchRef = useRef();
  const advantageRef = useRef();
  const aboutRef = useRef();
  const contactRef = useRef();
  const xhsRef = useRef();

  const handleXhsScroll = () => {
    window.scrollTo({ top: xhsRef.current.offsetTop - 80, left: 0, behavior: "smooth" });
  };
  const handleWorkScroll = () => {
    window.scrollTo({ top: workRef.current.offsetTop - 80, left: 0, behavior: "smooth" });
  };
  const handleResearchScroll = () => {
    window.scrollTo({ top: researchRef.current.offsetTop - 80, left: 0, behavior: "smooth" });
  };
  const handleAdvantageScroll = () => {
    window.scrollTo({ top: advantageRef.current.offsetTop - 80, left: 0, behavior: "smooth" });
  };
  const handleAboutScroll = () => {
    window.scrollTo({ top: aboutRef.current.offsetTop - 80, left: 0, behavior: "smooth" });
  };
  const handleContactScroll = () => {
    window.scrollTo({ top: contactRef.current.offsetTop - 80, left: 0, behavior: "smooth" });
  };

  const xhsProject = data.projects.find((p) => p.id === "1");
  const otherProjects = data.projects.filter((p) => p.id !== "1");

  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      {data.showCursor && <Cursor />}
      <Head>
        <title>{data.name}</title>
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10 px-3 mob:px-4 laptop:px-0">
        <Header
          handleXhsScroll={handleXhsScroll}
          handleWorkScroll={handleWorkScroll}
          handleResearchScroll={handleResearchScroll}
          handleAdvantageScroll={handleAdvantageScroll}
          handleAboutScroll={handleAboutScroll}
          handleContactScroll={handleContactScroll}
        />

        {/* ===== Hero ===== */}
        <div className="mt-16 laptop:mt-30 flex flex-col items-center">
          <div className="w-32 h-32 mob:w-40 mob:h-40 laptop:w-56 laptop:h-56 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 mb-6 ring-4 ring-accent">
            {data.heroPhoto ? (
              <img
                src={data.heroPhoto}
                alt={data.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-sm opacity-30">上传照片</span>
              </div>
            )}
          </div>
          <h1 className="text-3xl mob:text-4xl laptop:text-7xl font-bold tracking-wide">
            {data.name}
          </h1>
          <Socials className="mt-6" />
        </div>

        {/* ===== 小红书 ===== */}
        {xhsProject && xhsProject.galleries && (
          <div className="mt-16 laptop:mt-40" ref={xhsRef}>
            <h1 className="text-xl mob:text-2xl font-bold text-accent-dark">{xhsProject.title}</h1>
            <p className="mt-1 text-sm opacity-50">{xhsProject.subtitle}</p>
            <p className="mt-3 text-sm laptop:text-base leading-relaxed laptop:w-3/5">
              {xhsProject.description}
            </p>

            {xhsProject.galleries.map((gallery, gIdx) => (
              <div key={gIdx} className="mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <h2 className="text-base laptop:text-lg font-semibold text-accent-mid">{gallery.title}</h2>
                  <span className="text-xs opacity-40">{gallery.images.length}张</span>
                </div>
                <div className="grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-2 laptop:gap-3">
                  {gallery.images.map((src, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 group relative"
                    >
                      <img
                        src={src}
                        alt={`${gallery.title} - ${idx + 1}`}
                        className="w-full h-80 mob:h-96 laptop:h-[32rem] object-contain hover:scale-105 transition-all duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== 其他项目 ===== */}
        <div className="mt-16 laptop:mt-40" ref={workRef}>
          <h1 className="text-xl mob:text-2xl font-bold text-accent-dark">其他项目</h1>
          <div className="mt-5 laptop:mt-10 grid grid-cols-1 tablet:grid-cols-2 gap-6">
            {otherProjects.map((project) => (
              <WorkCard
                key={project.id}
                images={project.images}
                name={project.title}
                description={project.subtitle}
                highlights={project.highlights}
                fullDescription={project.description}
                url={project.url}
              >
                {project.baiduPanLink && (
                  <CopyLink url={project.baiduPanLink} label="剪辑作品与AI创作作品展示" />
                )}
              </WorkCard>
            ))}
          </div>
        </div>

        {/* ===== 定性研究作品 ===== */}
        {data.research && data.research.length > 0 && (
          <div className="mt-16 laptop:mt-40" ref={researchRef}>
            <h1 className="text-xl mob:text-2xl font-bold text-accent-dark">定性研究作品</h1>
            <div className="mt-5 laptop:mt-10 space-y-10">
              {data.research.map((item) => (
                <div key={item.id}>
                  <div className="grid grid-cols-1 laptop:grid-cols-2 gap-6 laptop:gap-8">
                    <div>
                      <ImageSlider images={item.images} height="h-64 laptop:h-80" objectFit="object-contain" />
                    </div>
                    <div>
                      <h2 className="text-lg laptop:text-xl font-semibold">{item.title}</h2>
                      <p className="mt-1 text-sm opacity-50">{item.subtitle}</p>
                      <p className="mt-3 text-sm laptop:text-base leading-relaxed">{item.description}</p>
                      {item.highlights && item.highlights.length > 0 && (
                        <ul className="mt-3 space-y-1.5">
                          {item.highlights.map((h, i) => (
                            <li key={i} className="text-sm opacity-70 flex items-start gap-2">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-dark flex-shrink-0"></span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  {item.id !== String(data.research.length) && (
                    <hr className="mt-10 border-gray-200 dark:border-gray-700" />
                  )}
                </div>
              ))}
            </div>
            {/* 研究作品百度网盘链接 */}
            {data.researchPanLink && (
              <div className="mt-10">
                <CopyLink url={data.researchPanLink} label="相关报告展示" />
              </div>
            )}
          </div>
        )}

        {/* ===== 我的优势 ===== */}
        <div className="mt-16 laptop:mt-40" ref={advantageRef}>
          <h1 className="text-xl mob:text-2xl font-bold text-accent-dark">我的优势</h1>
          <div className="mt-5 laptop:mt-10 grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-3 gap-4 laptop:gap-6">
            {data.advantages.map((adv) => (
              <div
                key={adv.id}
                className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-accent dark:hover:border-accent transition-all duration-300"
              >
                <ImageSlider images={adv.images} height="h-48 laptop:h-56" objectFit="object-contain" />
                <div className="p-4 laptop:p-5">
                  <h2 className="text-base laptop:text-lg font-semibold mb-2 text-accent-dark">{adv.title}</h2>
                  <p className="text-sm opacity-70 leading-relaxed">
                    {adv.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== 技能 ===== */}
        <div className="mt-16 laptop:mt-40">
          <h1 className="text-xl mob:text-2xl font-bold text-accent-dark">技能</h1>
          <div className="mt-5 laptop:mt-10 grid grid-cols-2 tablet:grid-cols-2 laptop:grid-cols-4 gap-4 laptop:gap-6">
            {data.skills.map((group, idx) => (
              <div key={idx}>
                <h3 className="text-sm laptop:text-base font-semibold mb-2 text-accent-mid">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs laptop:text-sm rounded-full bg-accent-light/40 dark:bg-accent-dark/20 text-accent-dark dark:text-accent"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== 关于我 ===== */}
        <div className="mt-16 laptop:mt-40" ref={aboutRef}>
          <h1 className="text-xl mob:text-2xl font-bold text-accent-dark mb-8 laptop:mb-12">关于我</h1>
          <div className="grid grid-cols-1 laptop:grid-cols-2 gap-8 laptop:gap-12 items-center">
            {/* 文字 */}
            <div>
              <p className="text-base mob:text-lg laptop:text-2xl leading-loose laptop:leading-relaxed tracking-wide text-justify">
                {data.aboutpara}
              </p>
            </div>
            {/* 照片 + 渐变消失 */}
            <div className="relative">
              {data.aboutPhoto ? (
                <>
                  <img
                    src={data.aboutPhoto}
                    alt="关于我"
                    className="w-full rounded-2xl object-cover h-64 mob:h-80 laptop:h-96"
                  />
                  <div className="absolute inset-y-0 left-0 w-1/3 laptop:w-1/2 bg-gradient-to-r from-white dark:from-black to-transparent rounded-l-2xl"></div>
                </>
              ) : (
                <div className="w-full h-64 mob:h-80 laptop:h-96 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                  <span className="text-sm opacity-30">放一张横屏照片</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ===== 联系我 ===== */}
        <div className="mt-16 laptop:mt-40" ref={contactRef}>
          <h1 className="text-xl mob:text-2xl font-bold text-accent-dark">联系我</h1>
          <div className="mt-6 laptop:mt-10 grid grid-cols-1 laptop:grid-cols-2 gap-8 laptop:gap-10">
            <div>
              <div className="space-y-3 text-sm laptop:text-base">
                <p><span className="opacity-50">邮箱：</span>{data.contact.email}</p>
                <p><span className="opacity-50">微信：</span>{data.contact.wechat}</p>
                <p><span className="opacity-50">电话：</span>{data.contact.phone}</p>
              </div>
              <div className="mt-6">
                <Socials />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                {data.contact.qrXiaohongshu ? (
                  <img
                    src={data.contact.qrXiaohongshu}
                    alt="小红书二维码"
                    className="w-full aspect-square object-contain rounded-xl bg-gray-50 dark:bg-gray-800 mb-2"
                  />
                ) : (
                  <div className="w-full aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center mb-2">
                    <span className="text-xs opacity-50">小红书二维码</span>
                  </div>
                )}
                <p className="text-xs opacity-50">扫码关注小红书</p>
              </div>
              <div className="text-center">
                {data.contact.qrDouyin ? (
                  <img
                    src={data.contact.qrDouyin}
                    alt="抖音二维码"
                    className="w-full aspect-square object-contain rounded-xl bg-gray-50 dark:bg-gray-800 mb-2"
                  />
                ) : (
                  <div className="w-full aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center mb-2">
                    <span className="text-xs opacity-50">抖音二维码</span>
                  </div>
                )}
                <p className="text-xs opacity-50">扫码关注抖音</p>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

function CopyLink({ url, label }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex flex-col mob:flex-row items-start mob:items-center gap-2 mob:gap-3 p-3 rounded-xl bg-accent-light/20 dark:bg-accent-dark/10 border border-accent/30">
      <span className="text-xs mob:text-sm font-medium text-accent-dark flex-shrink-0">{label}</span>
      <code className="text-xs mob:text-sm text-accent-mid truncate flex-1 min-w-0 w-full mob:w-auto">
        {url}
      </code>
      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={handleCopy}
          className="px-3 py-1 text-xs mob:text-sm rounded-lg bg-accent text-white hover:bg-accent-dark transition-colors"
        >
          {copied ? "已复制 ✓" : "复制链接"}
        </button>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="px-3 py-1 text-xs mob:text-sm rounded-lg border border-accent text-accent-dark hover:bg-accent-light/30 transition-colors"
        >
          打开
        </a>
      </div>
    </div>
  );
}
