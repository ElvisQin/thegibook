import clsx from 'clsx';
import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import SectionLayout from '../components/SectionLayout';

import HeroSectionFull from '../components/HeroSectionFull';
import HomepageFeatures from '../components/HomepageFeatures';
import Authors from '../components/Authors';
import News from '../components/News';

import Heading from '@theme/Heading';
import styles from './index.module.css';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="全局光照技术：从离线到实时渲染"
      description="Description will go into a meta tag in <head />">

      <main>
        <HeroSectionFull
          title="TheGIBook"
          image='/img/cover.jpg'
          buttons={[
            {
              title: "开始阅读...",
              href: '/',
              className: 'button--primary',
            },
          ]}
        >
          <p>
            《全局光照技术：从离线到实时渲染》是一本聚焦于渲染领域的计算机图形学图书，它同时包含了离线和实时渲染的内容，探讨了渲染中最常用的约十种全局光照技术的概念、原理以及相互之间的联系，并以这些全局光照技术为线索介绍了大量计算机图形学相关的基础知识，全书约1000页左右的篇幅，是国内该领域较少的专著之一。
          </p>
          <br></br>

          <p>本书已经全部开源，可以从本站阅读全部内容，也可以<a href='#'> 从这里下载</a> 本书的PDF电子版。</p>
          <p>如果您感兴趣，也欢迎参与本书的 <a href='#'>开源贡献</a>。</p>
          <p>如果您更喜欢纸质图书，本书还有少量存量的纸质图书，本次销售完之后将不再印刷纸质图书，喜欢的读者可以点击前往 <a href='#'>这里购买</a>。 </p>

          <p>本书作者录制了大约260分钟的总体视频讲解，欢迎 <a href='https://space.bilibili.com/343962235/channel/seriesdetail?sid=1624842'>前往B站观看</a>。</p>

        </HeroSectionFull>
        <News />
        <br/>
        <Authors
          title="关于作者"
          image="/img/qcl.jpg"
          imgWidth='200px'
          imgHeight='200px'
          direction="left"
        >
          <p>秦春林，自大学开始自学编程，先后从事过工作流软件，云计算，Web等相关的工作。2011年开始进入游戏开发领域，主持并移植了Cocos2d-x-for-XNA项目。喜欢技术分享，发起并组织了北京快乐技术沙龙，多次作为讲师参与微软，CSDN，51CTO以及9RIA等组织的各类技术培训和讲座。参与了手游项目《天降》的开发，目前主要的兴趣方向是计算机图形学和游戏引擎架构，致力于用软件技术丰富游戏世界的表现及品质。</p>
        </Authors>
      </main>
    </Layout >
  );
}
