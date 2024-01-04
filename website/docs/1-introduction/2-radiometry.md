---
title: 1.2 辐射度量学
---

光学中关于光的测量这一分支，称为辐射度量学（radiometry）。[cite a:TheRenderingEquation ]首次将辐射度量学引入到计算机图形学中，用于测量和计算计算机图形学中光的传播，并由此推导出渲染方程（the rendering equation）和能量守恒（energy conservation），现代图形学理论基于渲染方程提出了大量的模型用于简化和加速渲染方程的计算，在这两个基本物理特征的保障下，这些模型能够达到非常真实的图形品质。

辐射度量学定义了一组基本的物理量用来测量光辐射，因此这些度量也成为计算机图形学中最重要的基本概念，这几个度量的名称及单位如表1所示。

| 中文名称 | 英文名称 | 单位 | 符号|
|------|------|----|---|
| 辐射能量 |radiant energy     | $J$               | $Q$   |
| 辐射通量 |radiant flux       | $W$               | $\Phi$|
| 辐射照度 |irradiance         | $W/m^2$           | $E$   |
| 辐射强度 |radiant intensity  | $W/sr$            | $I$   |
| 辐射亮度 |radiance           | $W/(m^2\cdot sr)$ | $L$   |

<p  id="t:radiometric-quantities">表1: 辐射度量学中的基本度量，这些度量也成为渲染方程的基本度量</p>


在开始讨论这些度量之前，必须首先了解立体角（solid angle）的概念，如图1所示。在几何学中，立体角是2D角度的概念在3D空间的延伸，它表示在3D空间，从某个点观察，另外一个物体有多“大”。立体角的数学符号通常用$\Omega$表示，其单位为$sr$，它是球面度（steradians）的缩写。立体角也可以理解为3D空间中以某一点为起点的多个方向的集合。

<div>
    <div align="center" id="f:intro-solid-angle">
        <img src="/img/figures/intro/solid-angle.png" width="300" />
    </div>
    <p align="left"><b>图1：</b>立体角的概念，它表示单位球体上一块区域对应的球面部分的面积。根据立体角的定义，如果球面上任意一块区域的面积等于球半径的平方，当从球心观察时，该区域面积就是$1sr$"</p>
</div>

正如在2D中，使用单位圆上的一段弧线的长度来表示其对应“角度”的大小，在3D中，使用单位球体上一块区域面积的大小来表示其对应的“立体角”的大小。所以一个物体相对于某一点的立体角的大小，等于这个物体投影到以该点为球心的单位球体上的面积。

根据上述立体角的定义，如果球面上任意一块区域的面积等于球半径的平方，当从球心观察时，该区域面积就是$1sr$。

在球面坐标系中，单位球体上任意一块区域$A$的面积可以简单地表示为：

$$
	\Omega= {\rm \iint}_A \sin\theta {\rm d}\theta {\rm d}\varphi
$$
<Eq num="1"/>

其中，$\theta$表示纬度，$\varphi$表示经度，所以整个球面的立体角为$4\pi$，对于一个正方体的一个面，从该正方体的中心点测量的立体角为$ \cfrac{2}{3}\pi$。




### 辐射能量
在辐射度量学中，最基本的单位是辐射能量（radiant energy），表示为$Q$，单位为J(焦耳)，辐射能量$Q$是以辐射的形式发射，传播或接收的能量。每个光子都携带一定的能量，这个能量正比于它的频率$v$，即：

$$
	Q=hv
$$
<Eq num="2"/>

其中，$h=6.62620\times 10^{-34} J\cdot s$为普朗克常数（Planck constant）。光子的频率（或者说能量）影响着光子与物体表面的交互，更重要的是，它影响着光与感应器（例如人眼中的视锥细胞和视杆细胞）之间的作用，使不同频率的光被察觉为不同的颜色。在可见光谱（visible spectrum）中，更“蓝”的光子具有更高的能量，而更“红”的光子具有更低的能量。 




### 辐射通量
辐射通量（radiant flux）记为$\Phi$，表示光源每秒钟发射的功率（${\rm d}Q/{\rm d}t$），其单位为瓦特（watt）$W$，例如一个灯泡可能发射100瓦特的辐射通量。在辐射测量中，都是基于这个辐射通量来测试能量，而不是使用总的能量$Q$，所以以下这些度量都是在单位时间（每秒）下发生的。



### 辐射亮度
在辐射度量学中，基本上考虑的是从面$A$的一部分射出的光能量。这个面可能是虚构的，也可能就是光源的真实的辐射面，或固体的一个受照面。如果固体是不透明的，则考虑的是反射光；如果固体是透明或半透明的（这时有一部分光被吸收或散射），通常测量的是透射光。

<Figure num="2" caption="辐射亮度表示的是某个点在某个方向上的亮度，在计算机图形学中它是一束光的亮度，是渲染方程最终要计算的量">
  <img src="/img/figures/intro/radiance.png" width="500" />
</Figure>

设$P(\xi,\eta)$是$A$面上的一个点，以面上任意一组方便的曲线为参考坐标。现在在$P$点取一面元${\rm d}A$ ，并围绕极角$(\alpha,\beta)$方向取一立体角${\rm d}\omega$，另外设${\rm d}\omega$方向与${\rm d}A$ 法线的夹角为$\theta$，如图2所示，则在单位时间内由面元${\rm d}A$ 发射到${\rm d}\omega$内的能量（时间平均）值${\rm d}\Phi$可以表示为：


<p id="eq:intro-energy"></p>
$$ 
	{\rm d}\Phi=L\overline{\cos}\theta {\rm d}A {\rm d}\omega 
$$
<Eq num="3"/>

其中，$L$是一个因子，一般与位置$(\xi,\eta)$和方向$(\alpha,\beta)$有关，即：

$$
	L=L(\xi,\eta;\alpha,\beta)
$$
<Eq num="4"/>

式中引入因子$\cos\theta$，是因为物理上有意义的量是${\rm d}A$在垂直于$(\alpha,\beta)$方向的平面上的投影，而非${\rm d}A$本身。$\overline{\cos}$表示$\cos\theta$的最小值为$0$，这是因为光不能向该面的背面发射。$L$称作点$(\xi,\eta)$处方向$(\alpha,\beta)$上的辐射亮度（radiance），其单位为$W/(m^2\cdot sr)$。

辐射亮度测试的是单束光的度量，它也正是感应器（例如人的眼睛，或者场景中的虚拟摄像机）测量的度量，所以它在光照计算中特别重要。计算渲染方程的目标就是计算出表面上的点到摄像机所在方向上的辐射亮度。另外值得注意的是，$L$的值不随距离发射点距离的变化而变化。

通常用两种不同的方式把${\rm d}\Phi$分解为两个量的乘积，以表示它对${\rm d}\omega$和${\rm d} A$的显式关系：

<p id="eq:intro-energy-1"></p>
$$
	{\rm d}\Phi={\rm d}I {\rm d}\omega={\rm d}E {\rm d}A 
$$
<Eq num="5"/>

在接下来的两小节将分别讲述这两个新的度量$I$和$E$。





### 辐射强度
比较方程3 和5两式，可以得出：

$$
	{\rm d}I= \cfrac{{\rm d}\Phi}{{\rm d}\omega}=L\overline{\cos}\theta {\rm d}A
$$
<Eq num="6"/>

对一个面$A$的区域求积分得到：

<p id="eq:intro-radiant-intensity"></p>
$$
	I(\alpha,\beta)={\rm \int} L\overline{\cos}\theta {\rm d}A
$$
<Eq num="7"/>

$I$称为面积$A$在方向$(\alpha,\beta)$上的辐射强度（radiance intensity），其单位为$W/sr$。$I$也是一个与距离无关的量，但它是与发射面$A$的面积有关的，由于光源通常具有一定的形状和面积，所以图形学中常常使用$I$来表示一个光源的辐射强度分布，这个分布是方向的函数，如图3表示一个点光源，这个点光源的辐射通量为100瓦特，但是它在不同的方向上具有不同辐射强度。

<Figure num="3" caption="一个灯泡在不同的方向上可能具有不同的辐射强度，辐射强度也是计算机图形学中表示各种光源光照的度量">
   <img src="/img/figures/intro/radiant-intensity.png" width="250" />
</Figure>

当发生反射时，$L$随方向的变化取决于这个面的性质，特别取决于它是粗糙的还是光滑的，它是自发光还是反射或透射别的光。常常允许假设，在很好的近似下，$L$与方向无关，这时辐射称为是各向同性的（isotropic）。如果辐射是各向同性的，并且辐射面是平面，则方程7简化为：

<p id="eq:intro-radiant-intensity-1"></p>
$$
	I(\alpha,\beta)=I_0 \overline{\cos}\theta 
$$
<Eq num="8"/>

其中

$$
	I_0={\rm \int} L{\rm d}A
$$
<Eq num="9"/>

这时，任何方向上的辐射强度随该方向与面法线间夹角的余弦的变化而变化。公式8通常称为朗伯余弦定理（Lambert's cosine law），如图[ref f:intro-lambert-cosine-law]所示。此时，如果是发射面，则称为漫发射；如果是反射面，则称为漫反射。如果一个辐射源其表面辐射亮度不随方向变化，则称为朗伯体。

<Figure num="4" caption="在一个漫反（发）射面，法线方向和非法线方向的每秒光子发射情况。每个楔形区域内光子的发射量正比于它们的面积">
   <img src="/img/figures/intro/Lambert_Cosine_Law.svg" width="400" />
</Figure>





### 辐射照度{#sec-irradiance}
同理，比较方程3和5两式，可以得出：

$$
	{\rm d}E= \cfrac{{\rm d}\Phi}{{\rm d}A}=L\overline{\cos}\theta {\rm d}\omega
$$
<Eq num="10"/>

而对某一立体角取积分得：

$$
	E(\xi,\eta)={\rm \int} L\overline{\cos}\theta {\rm d}\omega
$$
<Eq num="11"/>

$E$称为点$(\xi,\eta)$的辐射照度（irradiance），其单位为$W/m^2$，它是点$(\xi,\eta)$沿各个方向对辐射亮度$L$的积分，如图5所示。值得注意的是，前面提到过，在辐射度量学中，基本上考虑的是从面的一部分射出或者接收能量，所以辐射照度虽然表述的是面上一个点的度量，但它实际上是通过该点所在的单位面积来测量的，因为辐射亮度$L$也是通过单位面积来测量的。

<Figure id="f:intro-irradiance" num="5" caption="一个面上某点接收来自各个方向的辐射亮度形成辐射照度">
   <img src="/img/figures/intro/irradiance.jpg" width="350" />
</Figure>

由于辐射照度表示一个点接收的来自各个方向的辐射亮度，所以在计算机图形学中，它被用来表述表面的一个点接收的所有光照。而渲染方程所要处理的正是通过反射定律及后面要讲述的其他理论，计算出沿某个观察方向的出射亮度$L_o$，通常$L_o$是与入射方向有关的，但是对于漫反射表面，它沿各个方向反射的光照是相同的，所有入射光照的积分就可以被单独计算出来，因此辐射照度是漫反射表面的重要度量，实际上光照贴图（light map）中存储的正是辐射照度值，这方面的知识将在第[ref chp:prt]章介绍。

辐射照度被用来测量光进入一个表面（更确切地讲一个单位面积）的强度，它也可以表示光离开一个表面的强度，称为出射度，用$M$表示，其也称为辐射度（radiosity）或者辐射出射度(radiant exitance），例如表示一个光源的出射度，或者在辐射度理论（第[ref chp:rad]章）中首先将整个场景栅格化为多个面片，将每个面片视作一个光源，然后计算出每个面片的出射度。通常用辐射通量密度（radiant flux density）来统称一个表面出射或者入射的强度。

在图6所示的平行光中，光源的辐射强度是不随表面到光源的距离发生变化的。但是现实世界中大多数光源（例如本章后面将要讨论的点光源和聚光灯等）都不是平行光，那么一般光源的辐射强度是怎样分布的呢？

<Figure id="f:intro-directional-irradiance" num="6" caption="平行光源的出射度不随表面到光源的距离变化而变化">
   <img src="/img/figures/intro/directional-irradiance.png" width="600" />
</Figure>

如图ref f:intro-inverse-square-law所示，设${\rm d}A$是点$P$处的面元，$QP=r$,又设$\theta$是$QP$与${\rm d}A$的法线夹角，则光源在单位时间内射过${\rm d}A$的能量是$I{\rm d}\omega$，其中$I$是光源沿$QP$方向的辐射强度，${\rm d}\omega$是对$Q$所张的立体角。由几何基础学：

$$
	\cos\theta {\rm d}A=r^{2}{\rm d}\omega
$$
<Eq num="12"/>



由此，利用公式5 即可得出：

<p id="eq:intro-inverse-square-law"></p>
$$
	E= \cfrac{I\cos\theta}{r^{2}}
$$
<Eq num="13"/>

公式13就是辐射度量学的基本方程，它表达了所谓的照度余弦定律（$E$与$\cos\theta$成正比），以及平方反比定律 （$E$与$r^{2}$成反比）。

<Figure id="f:intro-directional-irradiance" num="7" caption="点光源产生的辐射照度">
   <img src="/img/figures/intro/inverse-square-law.svg" width="40%" />
</Figure>

由于$E$表示的是一个表面接收周围所有光源（包括直接光源和间接光源）的辐射照度，所以根据平方反比定律可以看出，一个光源距离该表面越远，则其光照贡献越小。