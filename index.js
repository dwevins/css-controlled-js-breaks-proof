const bpMonitor = document.querySelector('.breakpoint-monitor');
const el = document.querySelector('p.text-field');

bpMonitor.addEventListener('animationstart', () => {
    const currentBreakpoint = window.getComputedStyle(bpMonitor, ':after').content;
    el.innerText = currentBreakpoint;
})

