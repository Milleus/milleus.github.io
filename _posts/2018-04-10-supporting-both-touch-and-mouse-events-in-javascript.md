---
layout: post
title: "Supporting both touch and mouse events in Javascript"
date: 2018-04-10
---

### Given
The following code,
```
// HTML
<button id="some-button">click</button>

// JS
const button = document.querySelector('#some-button');

button.addEventListener('touchend', triggerSomething);
button.addEventListener('click', triggerSomething);

function triggerSomething(e) {
  console.log('event called: ', e.type);
}
```

### When
Users taps on the button on mobile devices.

### Then
Both event listeners will be triggered, even though we expect only touchend to trigger.

### Reason
Touch interfaces typically tries to emulate mouse clicks. This is because touch interfaces need to work on applications that have only interacted with mosue events before. The natural order of events are as follows:
1. touchstart
2. touchmove
3. touchend
4. mouseover
5. mousemove
6. mousedown
7. mouseup
8. click

### Solution
To fix this issue, we can use `e.preventDefault()` inside touch event handlers to prevent default mouse-emulation handling.