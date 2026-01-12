# BETA 4 （ 性能版 + ）发布说明：
Lost Scripts 的 _Shapes Window_ **BETA 4** **( 性能版+ )**正式发布，新增了一些功能/改进并修复了一些错误……
![](docs/ls_shapes/pic_beta4.jpg)
<br>

## 更新内容：

### 功能与改进：
- 整合了 RGB/HSV 颜色模型逻辑（现在可通过按钮切换）和统一的重新着色模式
- 引入了基于因子的 UI 缩放系统，使按钮和菜单大小能够适应 Windows/Moho 字体和显示缩放。
- 主菜单内容现在是动态的，因此条目可以反映状态或根据其他设置而更改。
- 样式项现在用星号 (* ) 表示在项目中的使用情况。
- 基于样式的选择：根据形状使用的样式选择形状。
- 形状列表显示项目是否应用了 1 种（·）、2 种（.）或两种（:）样式。
- 现在可以通过重新创建点群来实现“向上/向下”排序，并支持此功能。
- 现在可以创建堆叠形状，并带有相应的警告和撤销功能

### 改进之处：
- 修复和调整了多个用户界面尺寸/位置问题（应用和 HSB 按钮、信息栏、菜单、窗口宽度、光标）
- 由于使用了零宽度连接符 (ZWJ)，某些图标/符号现在显示效果更好了。
- 调试模式和新手模式改进

### 错误修复：
- 在创建/更新点组后，选择将被保留。
- 复制信息栏现在可以检索完整文本（对于复制 UUID 特别有用）
- 所有控件在帧切换时都不会再闪烁；同时修复了一些启用/禁用方面的不一致问题。
- 按下“模式”按钮进入样式模式，但没有选中该项目。
- 修复了其他与信息栏拼接相关的错误
- **v0.4.2-beta4a** ：修复了将 `LM.ColorOps:Ls_SetRgb` 拼写错误为 `LS` 问题，该错误会导致在未启用此功能的环境中出现错误。
- **v0.4.2-beta4b** ：Moho 首选项加载后进行严格验证，以防止在打开时出现 _macOS_ Lua 控制台错误

### 已知问题：
- 在极少数情况下，当打开多个项目时（尤其是图层 UUID 相同的重复项目），窗口可能会无响应或“卡住”在另一个项目的图层上，直到重启 Moho 为止。此错误可能并非此版本特有，目前正在调查中……

> ⚠️ **重要提示** ：这是一个**测试版** ，对脚本核心进行了深度修改。虽然已经过广泛测试，但其稳定性可能仍不如以往。如果您发现任何**未**在 [“已知问题”](https://github.com/lost-scripts/ls_shapes/releases/tag/v0.4.2-beta4b#known-issues) 部分列出的异常行为，请提交报告。

---

# LS 形状窗口 - 说明书：
持久化形状面板及辅助工具，可更好地管理 Moho® 矢量图形（尤其是 *液态形状*）。此脚本提供直观易用的界面，让您轻松执行复杂的形状操作。

## 图库
<div class="gallery-row" style="display:flex; justify-content: left; align-items:start;">
<img src="docs/ls_shapes/index_gallery_mode_1.png" style="width: 150px;">
<img src="docs/ls_shapes/index_gallery_mode_2.png" style="width: 150px;">
<img src="docs/ls_shapes/index_gallery_mode_3.png" style="width: 150px;">
</div>
<div class="gallery-row" style="display:flex; justify-content: left; align-items:start;">
<img src="docs/ls_shapes/index_gallery_tweak_menu.png" style="width: 150px;">
<img src="docs/ls_shapes/index_gallery_view_swatches.gif" style="width: 150px;">
<img src="docs/ls_shapes/index_gallery_window_compact.png" style="width: 150px;">
</div>
<br>

## 功能
- 一目了然地查看图层形状关系。
- 借助改进的管理，充分利用*液态形状*。
- 轻松重命名、重新排序、隐藏/显示一个或多个形状。
- 独立于所选工具创建形状的新方法。
- 形状选择辅助工具：全选、反向、相似、相同……
- 改进的*样式*管理、拾取和修改。
- 改进了点组管理、重新排序和修改功能。
- 提供多种交互式“实时”色板（您也可以轻松创建自己的色板）。
- 提供重新着色功能及其他辅助工具。
- 提供多种窗口显示模式，以满足您的不同需求。
- 以及更多精彩功能！

## 使用方法
1. **打开**：从 Moho 的“工具”面板或通过“脚本”菜单中的相应条目打开“形状窗口”。
2. **操作**：现在您可以使其保持打开状态，以执行各种形状操作。
3. **自定义设置**：展开窗口主菜单：🔽（位于窗口左上角）可访问不同的设置和操作。
4. **工具提示**：如果勾选了“新手模式”，将光标悬停在不同元素上即可查看其功能提示……

## 协作与支持
建议和错误报告可以在 [Github iIssues](https://github.com/lost-scripts/ls_shapes/issues) 或 [Lost Marble 论坛](https://www.lostmarble.com/forum/viewforum.php?f=12) 的相应主题下提交。

## 致谢
衷心感谢……
- **Stanislav Zuliy**（Stan），感谢他的所有贡献和慷慨。
- **Lukas Krepel**，感谢他为我开辟了*无模*之路🙂
- **Mike Kelley**，感谢他允许我使用他出色的*Adjust Colors*脚本的核心功能。
- **Wes** (synthsin75)、**Paul** (hayasidist) 和 **Sam** (SimplSam)，感谢他们在 [LM论坛](https://www.lostmarble.com/forum)上的支持。
- **Copilot** 和 **ChatGPT**，感谢你们……嗯……为什么不呢？🤷‍♂️

当然，还要感谢**Lost Marble**和才华横溢的Moho®团队，感谢他们的辛勤付出，让这一切再次成为可能。

## 其他...
- <a href="https://lost-scripts.github.io/scripts/ls_shapes" data-alt-href="https://github.com/lost-scripts/ls_shapes" data-alt-textContent="形状窗口存储库" data-alt-title="前往形状窗口存储库...">形状窗口网页</a>
- [Lost Marble 论坛主题](https://www.lostmarble.com/forum/viewtopic.php?t=36508 "前往 Lost Marble 论坛主题...")
