Mixin functions define behaviours that can be applied to entities.

Mixins create an inheritance chain meaning that mixins can add methods to a prototype but also benefit from being able to call functions defined further down the inheritance chain.

The utils/mixin function is where the magic composition occurs.

As the composer function works through the list of supplied functions, the first
function can effectively operate as a regular extend (albeit the class needs to be thunkified to return the class method), whilst the extra arguments all provide regular mixin functions that create classes using the argument supplied to them (in this case the other composer functions) as a base

Take this inheritance tree

Ship
  |
PhysicalEntity
  |
Entity

This can be set up with regular classes and extends

Trying to set up this is impossible

                Ship  
         /        |       \
ThrustMod  PhysicalEntity  DebugMod
                  |
               Entity

However, with functional composition it is possible.

By using a function that returns a regular PhysicalEntity class (which extends from Entity) the composer is free to make the assumption that PhysicalEntity will form the bottom of the trunk of the inheritance tree (it doesnt matter that PhysicalEntity itself inherits another class) so it is the only instance which does not inherit from other modules in the mixin arguments.

With PhysicalEntity set as a base it is passed to the composer function of the other modules in the argument list as a base, whereby the resultant class extends from that base and the subsequent class inherits from that class i.e. ThrustMod would inherit from PhysicalEntity, and ThrustMod is passed to the composer function for DebugMod with the end goal that DebugMod inherits from ThrustMod.

The resultant inheritance tree, given these params, is

physicalEntityMixin, ThrustMod, DebugMod

Ship
  |
DebugMod
  |
ThrustMod
  |
PhysicalEntity
  |
Entity

In this way the first argument passed to the mixin function forms the trunk of the inheritance tree whilst the subsequent arguments form the branches with the resultant class at the top, this resultant class (in this case Ship) can also be used as a trunk for another round of mixins.

Mixin order is important if one mixin relies on another, this gets complicated and resolving this is no small matter. React ES6 class style does not yet support mixins in favour of higher-order components—the system outlined here is the same form of functional composition whereby one class is used as a wrapper for another one.

The upshoot of all this is simple:

Inherit a class trunk using a thunk, and apply additional modules to get a final class with all the functions and properties it needs to operate.
