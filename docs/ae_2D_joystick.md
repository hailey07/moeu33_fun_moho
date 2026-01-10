This tool will select objects that have any keys selected in relevant timeline channels. Zero or more timeline keys can be selected. If no relevant keys are selected all the objects will be deselected.

This version works only on Points in vector layers and Bones in bone type layers (i.e. Bone and Switch layers).
It will run on Moho 12 and later.


For points the following animation channels are checked:
- Position
- Width
- Curvature
- Point colour
- Point colour strength
Additionally for Moho 14.3 (and later)
- Point colour drift 
- Point opacity


For bones the following animation channels are checked:
- Position
- Angle
- Scale
- Parent
- Target Bone
- Flip Horizontal
- Flip Vertical
- IK Global Angle
- IK Lock
- IK Parent Target
- Physics Motor Speed

An object will be selected if it has any key selected and will be de-selected if it has no keys selected.


Notes
=====

The timeline cursor can be anywhere in the timeline.
The key at frame 0 is ignored.


What’s changed in this version?
==========================
1.01 added support for bones in switch layers (28 December 2017)
[Versions 1.00 and 1.01 were created before this script repository.]

1.04 added support for the new point colour features in Moho 14.3


Known Issues
============

None, but enhancement requests or error reports are always welcomed.

2 March 2025

---

![Image](https://i.postimg.cc/XYbqkJGy/image.png)

![Image](https://i.postimg.cc/5yHRkbrh/image.png)