---
layout: post
title: "Touch events triggering mouse events"
date: 2018-04-08
---

### Given
The following code,
```
// HTML
<button id="some-button">click</button>

// JS
const button = document.querySelector('#some-button');

button.addEventListener('touchend', function(e) {
  console.log('event called:', e.type);
});
button.addEventListener('click', function(e) {
  console.log('event called:', e.type);
});
```

### When
Users taps on the button on touch devices.

### Then
Both event listeners will be triggered, even though we expect only touchend to trigger.

### Reason
Touch devices typically tries to emulate mouse clicks. This is because touch devices need to work on applications that have only interacted with mosue events before. The natural order of events are as follows:
1. touchstart
2. touchmove
3. touchend
4. mouseover
5. mousemove
6. mousedown
7. mouseup
8. click

### Solution
Since touch events trigger click events anyway, one possible solution is to remove touch event listener. But let's just say you need touch event listeners for whatever reasons, we can fix this issue by adding `e.preventDefault()` into the touch event handlers. This will prevent default mouse-emulation handling.