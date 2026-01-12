[SVG导入工具_V1.12.zip](SVG%E5%AF%BC%E5%85%A5%E5%B7%A5%E5%85%B7/SVG%25E5%25AF%25BC%25E5%2585%25A5%25E5%25B7%25A5%25E5%2585%25B7_V1.12.zip)

改进的 SVG 图像导入工具：对 图层分组、遮罩、匹配颜色和 Adobe Illustrator 友好！(ver 1.10)

**SVG 导入**工具是一个 Moho 插件，  可让您可靠且忠实地将**可缩放矢量图形** (SVG) 资源导入 Moho - 为动画和演示做好准备。

![](https://i.ibb.co/dt3wYBS/svgs-in.gif)

该工具是作为对现有内置 SVG 导入过程的升级/替代而开发的，并提供了一系列增强功能以提高 3rd 方 SVG 应用程序的兼容性和最终用户的生产力：

## 增强功能

- **SVG 分组和元素**转换为 Moho**组、图层和形状**
- 允许您保留**命名和文件夹结构**
- 大大提高了**与 Adobe Illustrator**导出的 SVG 的兼容性
- 支持元素和组变换（平移、旋转、缩放、矩阵、skewX/Y）
- 处理 CSS 类、内联样式和演示属性样式 - 使用 Hex #000000 / #000、命名和 RGB/RGBA 颜色完全支持使用**ClipPath**和**Mask遮罩**进行遮罩   - 提供对**Arcs**、**圆角矩形**、**使用**（*引用*）的支持以及对内嵌嵌入式 SVG 的部分支持   - 类似点数和定位（*无多余点*）   - 多**图像大小**和**图层**导入期间的**合并选项**
- 完全支持使用**ClipPath**和**Mask遮罩**进行遮罩
- 提供对**Arcs**、**圆角矩形**、**使用**（*引用*）的支持以及对内嵌嵌入式 SVG 的部分支持  - 类似点数和定位（*无多余点*）
- 多**图像大小**和**图层**导入期间的**合并选项**
- 在 Moho 组、层和/或形状中保留 SVG 元素 ID
- 尊重/忽略 SVG 文件中的注释/注释块- 提供方便的**MRU功能，**用于重新加载**最近**使用的导入文件   - 确定导入工作流程：对话框 > 浏览 > 加载 - 或 - 浏览 > 对话框 > 加载 - 或 - 浏览 > 加载**...**

## 那么……为什么需要 SVG 导入工具？

该工具允许将更多基于矢量的角色、道具、风景和艺术品直接导入 Moho - 允许您忠实地复制、操作和合并来自 **Illustrator、Inkscape、Affinity Designer、CorelDraw** 和许多其他图形/设计师的艺术品 工具和 SVG 图像存储库。

内置工具的一些缺点是它无法完全支持分组、遮罩、CSS 样式、短十六进制颜色 (#000)、使用引用和弧。 其中许多功能经常在 SVG 图像中使用 - 以前可能导致艺术品毁容或变色 - 或导入的资产未能保留任何分组/层结构或元素命名。

---

**混搭示例：**使用默认工具导入的 car.svg 图像文件（*毕加索会很自豪*）。当使用新的 SVG 导入工具导入资产时，SVG 图像被忠实再现。

![](https://i.ibb.co/NTR4PgX/b4a-car.png)

---

**图层和命名示例：**使用默认工具导入的 monkey.svg 图像文件 - 看起来不错，但没有图层。当使用新的 SVG 导入工具导入资产时 - 保留了图层结构。

![](https://i.ibb.co/mqD5qMp/b4a-monkey.png)

---

**视频演示**

[https://youtu.be/Alsza8fNW1c](https://youtu.be/Alsza8fNW1c)

## **工具选项**

![Untitled](SVG%E5%AF%BC%E5%85%A5%E5%B7%A5%E5%85%B7/Untitled.png)

- 指定要导入的 **SVG 文件名**，或浏览 SVG 文件；
- 使用**最近使用** (MRU) 功能快速选择以前导入的文件名。删除按钮可用于从列表中删除选定的条目；
- 设置**缩放**以相对于画布屏幕大小或相对于资源的原始大小缩放导入的图像资源的大小（默认：50% 屏幕）；
- 使用 中心 将导入的图像对齐到画布的中间位置；
- 使用**合并**来缩小或减少在 Moho 中创建的组和层的数量（默认）；
    - 选择**矢量图层**将相邻矢量图层合并为一个（默认）
    - 选择**图层组**以折叠/取消组合组图层，而不是其中只有一个矢量图层 - 只产生一个矢量图层（默认）
    - 使用**只有未命名的**将避免合并命名元素（即具有 SVG ID 的元素）（默认）
    - **减少后期操作**将在初始导入后积极减少组和层。有利于获得绝对最少的层数（同时考虑掩蔽），但如果您正在计划角色类型的动画，通常会很糟糕。这个过程也可以很慢
- **展开组**将展开导入的图层组树以显示所有组和图层；
- 使用**重置**来恢复默认设置。OK加载和处理指定的 SVG 文件。Cancel以取消。

## **工具首选项**

还有一个额外的首选项设置菜单（右上角），可让您：

![Untitled](SVG%E5%AF%BC%E5%85%A5%E5%B7%A5%E5%85%B7/Untitled%201.png)

- 单击工具按钮时**首先浏览**文件。 更像是传统的文件打开体验。 文件浏览后将显示主对话框。
- 在导入过程中使用 调试信息 显示一些有限的进程和错误信息。
- 使用 **隐藏我*** 完全隐藏主对话框（在后续导入中）。 导入器的行为将更像传统的文件打开过程体验。
** 如果您的设置在大部分导入期间保持不变，通常会使用此选项。 您可以通过重新启动/重新加载 Moho 来取消 **隐藏我*** 模式。

## 版本

- version: 01.11 MH12.5+ #521102
- release: 1.11
- by Sam Cogheil (SimplSam)

## 更新日志

- 1.12 - 修复：剪贴板复制缓冲区
- 1.11 - 修复：多线段填充
- 1.10 - 添加：仿渐变色。 修复：矩阵缩放的线宽。减少未命名组的后期操作。 un-default 未命名选项。 +小错误。

## **注意和限制**

该工具旨在增强 Moho SVG 导入功能，同时支持最常见的 SVG 1.1 功能并尊重 SVG 分组。 该工具不是也永远不会 100% 兼容 SVG 1.1，因此有一些限制：

### **已知限制：**

- SVG 文档和视口尺寸被忽略
- 忽略测量单位（即 em、px、pt、cm、mm、in、%）。 全部视为像素 (px)
- 不支持渐变（脚本限制）、SVG <animate> 或滤镜效果
- 对“stroke-linecap”的有限支持。 不支持“stroke-linejoin”（平台限制）
- 不支持图像、文本、标记、符号、图案和“隐藏/隐藏”关键字
- 有限的 SVG 语法检查。 SVG 文件在尝试导入之前应该是有效的

### 补充说明：

- 该工具具有对 XML 2 Lua 解析器（纯 Lua）的外部依赖
- 兼容 MH12.5+
- 针对 MH13.5+ 进行了优化

## **特别感谢：**

- Stan (and the team): MOHO Scripting – [https://mohoscripting.com](https://mohoscripting.com/)
- The friendly faces @ Lost Marble Moho forum – [https://www.lostmarble.com/forum/](https://www.lostmarble.com/forum/)
- XML 2 Lua parser – [https://github.com/manoelcampos/xml2lua](https://github.com/manoelcampos/xml2lua) (Manoel Campos da Silva Filho / Paul Chakravarti)
- SVG documentation – [https://developer.mozilla.org/en-US/docs/Web/SVG/](https://developer.mozilla.org/en-US/docs/Web/SVG/) (Team Mozilla)
- SVG technical ref – [https://www.w3.org/TR/SVG11/](https://www.w3.org/TR/SVG11/) (SVG Working Group / W3C Team)
- Arc to Path – [https://github.com/BigBadaboom/androidsvg/…/utils/SVGAndroidRenderer.java](https://github.com/BigBadaboom/androidsvg/%E2%80%A6/utils/SVGAndroidRenderer.java) (Paul LeBeau)