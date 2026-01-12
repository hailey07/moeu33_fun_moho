[SS_AE_Camera_Export.zip](AE%E7%9B%B8%E6%9C%BA%E5%AF%BC%E5%87%BA%E5%B7%A5%E5%85%B7/SS_AE_Camera_Export.zip)

---

将相机属性和关键帧数据导出到剪贴板，准备粘贴到 After Effects。
SimplSam 的 **AE相机导出工具** 允许您将相机属性和关键帧数据导出到**剪贴板**，准备好直接粘贴到 Adobe After Effects。

![Untitled](AE%E7%9B%B8%E6%9C%BA%E5%AF%BC%E5%87%BA%E5%B7%A5%E5%85%B7/Untitled.png)

## 它是早期优秀的 **DS Camera to AE** 工具的升级

- 由 [David F. Sandberg（又名：ponysmasher）](https://www.dauid.com)创建
- 论坛地址：[https://lostmarble.com/forum/viewtopic.php?f=12&t=18091](https://lostmarble.com/forum/viewtopic.php?f=12&t=18091)

## ...并用这些新的和替代的功能来补充它：

- 立即将相机数据保存到剪贴板（而不是文件）； 准备粘贴
- 可以作为按钮或菜单工具运行
- 通过消除冗余关键帧来减少数据大小（如果属性只有一个值，则不烘焙多个关键帧）
- 具有模块化代码重构

![Untitled](AE%E7%9B%B8%E6%9C%BA%E5%AF%BC%E5%87%BA%E5%B7%A5%E5%85%B7/Untitled%201.png)

## 那么...为什么需要 AE Camera Export？

该工具允许从 Moho 到 After Effects 高效共享相机配置和关键帧定位信息，这在您的动画工作流程（定稿、SFXing 或合成）包括从 Moho -> Ae 的一次或多次旅行时非常有帮助。 从而允许相机移动和属性轻松同步（单向）。

![Untitled](AE%E7%9B%B8%E6%9C%BA%E5%AF%BC%E5%87%BA%E5%B7%A5%E5%85%B7/Untitled%202.png)

## 我该如何设置？

使用：

- 从工具调色板或菜单位置运行 AE Camera Export+ 工具
- 如果您需要在传递给 AE 之前查看/修改数据，您可以粘贴到 Excel/电子表格或文本编辑器中

## 选项和功能

* 目前没有选项

## 注意事项和限制：

AS11 中似乎存在一个错误，它将传递到剪贴板的文本大小限制为 4096 字节。 因此 AS11 与此工具不完全兼容。

因为“DS Camera to AE”工具完全烘焙了相机运动（写入每个可能的关键帧），它总是会覆盖所有以前的设置。 此工具针对关键帧数据进行了优化，仅写入所需的关键帧。 因此，您可能偶尔需要在使用前清除旧关键帧（取消选择秒表或删除关键帧）。

## 补充笔记：

- 与 MH12+ 兼容/测试
- 针对 MH12+ 进行了优化

## 特别感谢：

- David F. Sandberg (ponysmasher) -- [https://www.dauid.com](https://www.dauid.com/)
- Stan（和团队）：MOHO 脚本——[https://mohoscripting.com](https://mohoscripting.com/)
- 友善的面孔@Lost Marble Moho 论坛 -- [https://www.lostmarble.com/forum/](https://www.lostmarble.com/forum/)