---
title: 3.2.1 延迟光照计算
---
虽然延迟着色将着色计算与深度测试分离开来，使得着色计算仅针对屏幕空间中的像素点进行，从而大大节省计算资源，但我们仍然面临光源循环导致的帧缓存数据重复读取的计算资源浪费，于是我们想要进一步从着色计算中抽离出仅与光源相关的部分，这样就可以节省出光源循环中对帧缓存数据的重复读取。

渲染方程通常拆分成漫反射和高光反射，所以第3.1节式（2）可以写成如下的形式：

$$
	L_o(\mathbf{v})=\sum^{n}_{k=1}\bigg(\mathbf{c}_{\rm diff}\otimes f_{\rm diff}(E_{L_k},\mathbf{l}_k,\mathbf{n})+\mathbf{c}_{\rm spec}\otimes f_{\rm spec}(E_{L_k},\mathbf{l}_k,\mathbf{n},\mathbf{v},m)\bigg)
$$
<Eq num="1"/>

考虑到物体表面的反射率是由材质提供的常数，所以上式可以进一步写成：

$$
	L_o(\mathbf{v})=\mathbf{c}_{\rm diff}\otimes\sum^{n}_{k=1}f_{\rm diff}(E_{L_k},\mathbf{l}_k,\mathbf{n})+\mathbf{c}_{\rm spec}\otimes \sum^{n}_{k=1}f_{\rm spec}(E_{L_k},\mathbf{l}_k,\mathbf{n},\mathbf{v},m)
$$
<Eq num="2" id="eq:shade-deferred-lighting"/>

分析上式，我们可以将漫反射率和高光反射率从着色方程中抽离出来，使得与光源相关的计算部分只剩下法线和高光扩展系数，而光源入射方向是可以从法线方向计算出来的。因此，按照这样的拆分，我们可以只需要在G-buffer中存储法线和高光扩展系数，法线是一个RGB颜色值，高光扩散系数通常是一个很小的整数，因此整个G-buffer只需要一个32位的颜色缓存（即是光照计算的延迟着色器中只需要读写一个32位而不是128位甚至更多的数据）即可，这种情况下甚至不需要硬件支持多目标渲染（MRT）。

不过此时我们需要两个累积缓存来分别保存漫反射和高光反射部分“辐射照度”的值，它们分别是：

$$
\begin{aligned}
	g_{\rm diff}&=\sum^{n}_{k=1}f_{\rm diff}(E_{L_k},\mathbf{l}_k,\mathbf{n})\\
	g_{\rm spec}&=\sum^{n}_{k=1}f_{\rm spec}(E_{L_k},\mathbf{l}_k,\mathbf{n},\mathbf{v},m)
\end{aligned}
$$
<Eq num="3"/>

当光照计算阶段完成之后，我们再对场景使用渲染管线执行第二次渲染，但是此时的着色计算仅需要从上述两个累积存储中取出辐射照度的数据，然后依照下式进行计算即是最终的着色颜色值：

$$
	L_o{\mathbf{v}}=\mathbf{c}_{\rm diff}\otimes g_{\rm diff}+\mathbf{c}_{\rm spec}\otimes g_{\rm spec}
$$
<Eq num="4"/>

如果硬件支持MRT，我们同样可以直接将法线以外的材质数据保存在G-buffer中，所以第二次几何通道不需要重新渲染整个场景，而仅对屏幕空间执行一次渲染即可。延迟光照计算的渲染过程如图（1）所示。

<Figure num="1" id="f:shade-deferred-lighting" caption="延迟光照计算中的各个阶段，首先光照计算需要的表面属性被写入到一个法线缓存中，然后光照计算读取法线缓存中的数据将计算出的辐射“辐射照度”信息写入到光照累积缓存中，最后在对场景执行一次光栅化，并直接读取光照累积缓存中的数据对像素点进行最终着色计算">
    <img src="/img/figures/shade/deferred-lighting.svg" width="100%"/>
</Figure>

由上述内容可知，延迟光照计算的过程可以简述如下：

1. 渲染场景中所有不透明的几何体，并将法线矢量$\mathbf{n}$和高光扩展系数$m$写入到帧缓存中，由于法线矢量占据三个分量，而高光扩展系数是一个很小的整数，所以它们可以被合进一个“n/m缓存”，这只需要一个4分量的颜色缓存即可，所以可以不需要MRT的支持。此过程称为第一个几何通道。
2. 和延迟着色一样，该阶段逐个渲染每个光源包围盒所在的几何体，并对该光源覆盖的每个屏幕像素点进行光照计算；和延迟着色不一样的是，它只计算“辐射照度”而不是辐射亮度，并且最终输出的漫反射和高光反射的辐射照度被写入到两个累积缓存中。此阶段为延迟光照计算阶段。
3. 重新渲染所有不透明几何体，但是此时并不需要对表面进行光照计算，它仅仅需要从前一阶段的两个颜色累积缓存中读取值执行式（2）的计算即可。并将最终的着色结果写入到帧缓存中。此阶段为第二次几何通道。
4. 绘制所有半透明的物体。

延迟光照计算方法被大量使用于游戏引擎中，其中对其进行优化的地方主要集中于延迟光照计算阶段输出的两个辐射照度量的存储表述。每个颜色值分别包含RGB三个通道，所以需要两个各自具有3通道的颜色缓存对象来存储，在Crytek的CryEngine3[a:AbitmoreDeferred-CryEngine3]引擎中，他们使用一个4通道的颜色缓存（A16R16G16B16f或A8R8G8B8）来同时记录漫反射和高光反射的辐射照度，其中前3个通道表示漫反射值diffuse，第4个通道表示高光的强度strength，所以高光的颜色值可以由diffuse*strength计算得出，它的效果如图（2）所示。

<Figure num="2" id="f:shade-deferred-lighting-crytek" caption="Crytek在CryEngine3中使用一个4通道的颜色缓存来同时记录漫反射和高光反射（图片来自Crytek）">
    <img src="/img/figures/shade/tea0.png" alt="原始6通道" width="49%"/>
    <img src="/img/figures/shade/tea1.png" alt="4通道" width="49%"/>
</Figure>

Crytek并没有说明他们使用何种方法来编码高光反射的值，但是从图（2）可以看出，其中茶壶同时被一个红色光源和一个绿色光源照亮，图（2）(a)的原始6通道的颜色缓存能够准确反应反射物体的颜色，它的边沿上呈现红绿两种高光，而4通道的方案失去了反射环境的颜色，所以它仅仅保留了高光的亮度（luminance），而丢弃了高光的色度（chrominance）。因为人眼对于高光的亮度感应较色度更为明显，所以一般情况下没有太大问题。Pavlos Mavridis等[a:TheCompactYCoCgFrameBuffer]提出了一种帧缓存的压缩方法可以用一个4分量的颜色缓存更精确地存储两个颜色值，它的效果如图（3）(c)所示。

<Figure num="3" id="f:shade-deferred-lighting-1" caption="使用YCoCg压缩帧缓存用一个4通道的颜色缓存可以准确存储高光的色度和亮度，(b)中的方案直接丢弃色度而仅保留亮度，所以在高光部分看不出光源的颜色">
    <img src="/img/figures/shade/deferred-lighting-1.jpg" alt="原始6通道" width="33%"/>
    <img src="/img/figures/shade/deferred-lighting-2.jpg" alt="4通道" width="33%"/>
    <img src="/img/figures/shade/deferred-lighting-3.jpg" alt="压缩帧缓存" width="33%"/>
</Figure>