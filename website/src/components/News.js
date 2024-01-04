import clsx from 'clsx';
import Heading from '@theme/Heading';

const FeatureList = [
    {
        data: '2024.01.01',
        description: '开始制作在线阅读版，预计近期完成'
    },
    {
        data: '2022.09.06',
        description: '《全局光照技术》渲染永久开源免费，并提供书稿源码及电子书下载'
    },
    {
        data: '2018.06.10',
        description: '《全局光照技术》正式开始发货'
    },
    {
        data: '2018.04.10',
        description: (
            <>
                在摩点网发起<a href="https://zhongchou.modian.com/item/12335.html"> 《全局光照技术》线下技术巡讲暨众筹预订</a>，陆续在全国成都、杭州、厦门、深圳、广州、北京、上海等7个城市发起约10场<a href="https://space.bilibili.com/343962235/channel/seriesdetail?sid=1624842"> 技术演讲</a>，参与人数累积超过1500人
            </>)
    },
    {
        data: '2017.11.30',
        description: (<>在摩点网发起<a href="https://zhongchou.modian.com/item/9055.html"> 正式版图书众筹</a></>)
    },
    {
        data: '2017.11.11',
        description: (<>在<a href="https://hardimage.pro/episodes/56"> 《硬影像》</a>与罗登导演聊渲染技术</>)
    },
    {
        data: '2017.03.21',
        description: (<>在摩点网发起<a href="https://zhongchou.modian.com/item/8493.html"> 众筹 </a>，在这次众筹期间读者可以购买前半本书（约400页）的纸质书稿</>)
    },
    {
        data: '2014.08',
        description: '从北京魂世界辞职，开始准备写作本书'
    },
];

function Feature({ data, description }) {
    return (
        <div className="text--left padding-horiz--md">
            <p><b>{data}:</b> {description}</p>
        </div>
    );
}

export default function HomepageFeatures() {
    return (
        <section>
            <div className="container">
                <h2>最新动态</h2>
                {FeatureList.map((props, idx) => (
                    <Feature key={idx} {...props} />
                ))}
            </div>
        </section>
    );
}
