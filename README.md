# Reading CSS-Controlled Breakpoints in JS
This repo shows a simple proof of concept for monitoring CSS breakpoints in JS.

I had this idea while working on a project that required certain JS functionalities to activate or deactivate at certain screen widths. Initially, this required making the JS aware of the breakpoints defined in the CSS, and either using `setInterval()` or the `window.onresize()` event listener to check that width.

This alternative instead listens to changes made by the CSS in order to achieve the same effect!

Here's how it works:

1. The HTML contains an invisible, inline element that can be changed by the CSS. For this example, I used `<span class="breakpoint-monitor" />` with no content.
2. For each breakpoint, the CSS defines ***separately named*** `@keyframes` that set `background-color: #fff`. Because these animations won't actually change anything on the page, having separately-named `@keyframes` forces the browser to not make any assumptions and skip running the animation.
3. Again, for each breakpoint, the CSS updates the `animation` style to run the appropriate animation for `0s`. It also updates the `content` style of `.breakpoint-monitor:after` to a string describing the current breakpoint- "desktop", "mobile", etc.
4. The JS finds the `breakpoint-monitor` element, and adds an `animationstart` event listener to it. I ran into issues using `animationend`, which I guess comes down to using a `0s` animation. 
5. Inside the event listener, the `content` style of `.breakpoint-monitor:after` is read, and is used to determine the current breakpoint. This requires using `window.getComputedStyle()`, as you need the most current style changes made by the CSS.

I'm not sure if this implementation is any more or less performant than the `setInterval()` or `window.onresize()` logic it would replace, but I found it made things easier to maintain and talk about. While the CSS and JS will have to share info here (the keywords stored in `.breakpoint-monitor:after`, specifically), I argue that it's much easier to remember "desktop" and "mobile" than "768px" and "500px". Additionally, this allows for the specific `px` values in the breakpoints to change, without needing to update those values again in the JS.
