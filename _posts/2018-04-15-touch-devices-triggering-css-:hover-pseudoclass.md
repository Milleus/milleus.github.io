---
layout: post
title: "Touch devices triggering CSS :hover pseudoclass"
date: 2018-04-15
---

### Given
The following code,
```
// HTML
<input type="checkbox" id="oc1">
<label for="oc1" class="option-label">Click Me</label>

// CSS
.option-label {
  background-color: #e7f3f9;
  border-radius: 4px;
  padding: 8px 17px;
  color: #1e6ba0;
  cursor: pointer;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
}

.option-label:hover {
  background-color: #237cba;
  box-shadow: 0px 6px 10px rgba(22, 78, 117, 0.3);
  color: #fff;
}

#oc1 {
  display: none;
}

#oc1:checked + .option-label {
  background-color: #164e75;
  box-shadow: 0px 6px 10px rgba(22, 78, 117, 0.3);
  color: #fff;
}
```

### When
Users taps on the label on touch devices AND taps again to uncheck option.

### Then
CSS :hover pseudoclass styling remains active on label element, even though we expect no :hover styling.

### Reason
Not exactly sure why this behaviour occurs, but online resources have indicated that touch devices in some cases can trigger CSS :hover pseudoclass. For example, tapping an element makes it :active while the finger is down, but element also acquires the :hover state.

### Solution
One very common solution is to write CSS media queries specific to certain device width and height to disable :hover. But the amount of media queries you'll have to write is stupid and it's totally unsustainable. Devices shouldn't be identified by their device width or height or pixel ratio, but rather it should be something common between devices.

Thus comes the second solution, which is to target touch devices through the use of [pointer adaptation](https://whatwebcando.today/pointer-adaptation.html){:target="_blank"}. `@media (hover)` queries the user's ability to hover over elements on the page with the primary pointing device. If `hover:none`, we're targeting all touch devices. The downside of this is that it is not supported by Firefox, Opera Mini or IE.
```
// CSS
@media (hover: none) {
  .option-label:hover {
    background-color: #e7f3f9;
    box-shadow: none;
    color: #1e6ba0;
  }
}
```

And finally, the usual alternative is to write your own hover class using Javascript or jQuery.
```
// HTML
<input type="checkbox" id="oc1">
<label for="oc1" class="option-label">Click Me</label>

// CSS
.hover-effect {
  background-color: #237cba;
  box-shadow: 0px 6px 10px rgba(22, 78, 117, 0.3);
  color: #fff;
}

// JS
const opt = document.querySelector('.option-label');

opt.addEventListener('mouseover', function(e) {
  this.classList.add('hover-effect');
});

opt.addEventListener('click', function(e) {
  this.classList.remove('hover-effect');  
});
```
