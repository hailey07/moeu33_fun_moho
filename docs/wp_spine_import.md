

从 Spine JSON 导入资源（可从 Affinity、Krita、Spine、Photoshop、AfterEffects、Gimp 等软件导入）

**从 AFFINITY DESIGNER 或 PHOTO 导入**

![](https://i.ibb.co/LpqTv7T/import-from-spine-json-moho-script.jpg)

关于如何使用脚本将 Affinity (Photo/Designer) 图层作为图像图层导入 Moho 的教程视频（包含裁剪图像）：

## **从 KRITA 导入**

关于如何使用脚本将 Krita 图层作为图像图层导入 Moho 的教程视频（包含裁剪图像）：

## **从 SPINE 导入**

关于如何使用脚本从 Spine 导入区域附件（图像）及其初始姿势变换到 Moho 14 图层的简短教程视频：

## **从 PHOTOSHOP、AFTEREFFECTS、GIMP 等导入**

许多程序都有 Spine JSON 导出脚本。Esoteric Software（Spine 的创建者）为 Photoshop、AfterEffects、Gimp 等软件制作的导出脚本可在此处找到：

[https://github.com/EsotericSoftware/spine-scripts](https://github.com/EsotericSoftware/spine-scripts)

## **免责声明**

我已尽最大努力使这个插件尽可能稳定和实用。但请注意：我分享这个脚本（我为自己的动画工作创建的）是为了免费让其他人使用，因为我认为这可能对他人有帮助。但该脚本/插件按"原样"提供。将来可能会有更新，但这不能保证，也没有主动支持。也没有任何保证（请务必先备份！）。话虽如此，我希望你能喜欢它，它能帮助你完成动画工作！

## **版本历史**

### **1.1.3 [当前版本]**

- 更改：与新版工具文件兼容

### **1.1.2**

- 更改：与新版工具文件兼容
- 新增：视网膜图标

### **1.1.1**

- 修复：拼写错误

### **1.1.0**

- 新增：如果有骨骼数据，现在会导入骨骼并在 Moho 中创建相同的骨架，包括平移、旋转和缩放变换*。但会忽略骨骼剪切。*：不支持 X 和 Y 的不同缩放。如果骨骼的 x 和 y 缩放值不同，则将使用 x 值作为 Moho 中的缩放值。
- 更改：改进警告输出
- 更改：不支持骨骼中不同的 scaleX 和 scaleY 值。现在已相应调整从骨骼树计算图像变换的路径，以保持图像变换与骨骼变换一致。

### **1.0.0**

- 初始发布。导入和变换图像。

## **关于当前版本**

### **为什么我创建这个脚本？**

**1. 使从 Affinity 导出图层更简单快捷**

我开始制作这个脚本是因为 Affinity（主要是 Photo 和 Designer）（Affinity 网站）提供了一个很好的方法，可以将所有图层导出为磁盘上的单独裁剪图像，同时生成包含所有图层数据（如所有图像位置）的 spine.json 文件。

这使得将所有图层和图像直接导入 Spine 变得非常简单和快速。然而，Moho 目前无法打开这些 spine.json 文件。因此，将所有这些单独的图像导入到 moho 图层并将所有这些图层放在正确的位置需要很长时间。通过使用这个脚本，现在在 Moho 中和在 Spine 中一样简单，现在可以通过 spine.json 文件一键导入和定位所有图像/图层，这样我们就不必花费大量时间导入图像，可以直接开始绑定骨骼。

**2. 使从 Krita 导出图层更简单快捷**

还有一个非常有用的 Krita（Krita 网站）脚本可以将 Krita 图层导出为 spine.json。虽然我还没有测试过用该脚本输出的 spine.json，但应该也能正常工作。你可以在这里找到它：

[Krita-to-spine 脚本下载](https://github.com/DanStout/KritaToSpine)

上面的教程视频中没有显示，因为我不确定在 Spine 中是否有用，但甚至可以为 Krita 组图层添加特殊命名，导出脚本会识别这些命名并自动创建骨骼等。有关更多信息，请参阅 krita-to-spine 脚本的自述文件（点击下载链接）。

**3. 是否也可以从 spine.json 导入图像？**

在让 Affinity 生成的 spine.json 文件导入工作正常后，我想知道我能在多大程度上导入 Spine 本身（Esoteric Software/Spine 网站）生成的 spine.json 文件。这些文件更复杂，因为 Spine 也有一个完整的骨架系统，就像 Moho 的骨骼一样，spine 文件中的图像与骨骼有层次树结构。而且所有骨骼都可以有平移/偏移、旋转、缩放和剪切值。甚至绑定到骨骼的图像也可以应用这些变换。它们都通过父子关系相互影响。

除此之外，在 Spine 中可以给图像添加色调，这在 Moho 中目前是不可能的。

Spine 有更多功能，如一个文件中的多个骨架、每个骨架的多个皮肤、网格、除图像和变换之外的其他几种附件类型。但这些目前不受此脚本支持（还是说以后会？），这远远超出了脚本的原始用例，即从 Affinity 导入所有图层作为图像。

所有图像现在都已导入，并在 Moho 中获得正确的变换（除了剪切），就像在 Spine 中一样。当在 spine.json 文件中发现带色调的图像/插槽时，它会在 Moho 中生成额外的参考色调图层以获得类似的效果。目前这些效果与原始效果/混合并不完全相同，所以以后可能会进行调整。但至少它可以导入。我认为这是一个不会被很多人使用的功能。

**4. 从其他软件（Photoshop、After Effects、Gimp 等）导入？**

Photoshop、Gimp 和其他软件也有 Spine JSON 导出器。所以基本上任何你拥有的软件，只要有导出到 Spine JSON 文件格式的导出脚本，现在都可以通过这个脚本导出到 Moho。Esoteric Software（Spine 的创建者）在这里有一个包含多个程序导出脚本的代码库：

[https://github.com/EsotericSoftware/spine-scripts](https://github.com/EsotericSoftware/spine-scripts)

![](https://i.ibb.co/s2k0LMh/aftereffects-photoshop-gimp-etc.jpg)

### **脚本功能是什么？**

这个第一版本会生成一个包含图像图层的组。该组在 Moho 中会转换为骨骼图层，但目前还不包含骨骼。如果 spine.json 包含骨骼数据，后续版本可能会添加加载骨骼的选项。

spine.json 中的骨骼数据目前用于确定图像的变换，以在 Moho 中正确定位/旋转/缩放它们。

### **如何使用脚本？**

这是一个新脚本！为了安全起见，使用前请备份您的 Moho 文件。

点击工具按钮，浏览选择 spine.json 文件（仅支持 json 文件）

### **如何将 Affinity、Krita 图层或 Spine 内容导出为 spine.json？**

请参考上面的教程视频！

### **支持的 Moho 版本**

在 Moho 14.x 中测试通过。

### **关于 spine.json 功能支持**

从 Affinity 生成的文件可以完整导入

关于 Spine 生成的更高级功能：

- 目前仅支持默认皮肤（名为"default"的皮肤）将被导入。不支持多皮肤。

- 导入区域附件（= 没有网格的图像）。带网格的图像将不会被导入。
- 与 Spine 一样，支持的图像文件格式为 png、jpg 和 jpeg（将按此顺序搜索这些格式，与 Spine 相同）。
- 图像和骨骼的位置、旋转和缩放*通过骨骼层级结构计算到其最终位置。
- *）不支持骨骼在 X 和 Y 轴上的不同/单独缩放。如果骨骼的 scaleX 和 scaleY 值不相等，则将使用 scaleX 值作为该骨骼在 Moho 中的缩放值。
- 目前不支持骨骼剪切。
- 不支持约束。