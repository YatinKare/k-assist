<script>
  import { onMount } from "svelte";
  import HandHelping from "@lucide/svelte/icons/hand-helping";
  import UserRoundPlus from "@lucide/svelte/icons/user-round-plus";
  let { onAssistance, onHelper } = $props();
  let dock;
  let displacement = $state("");
  let useRefraction = $state(false);

  onMount(() => {
    // SVG backdrop filters are a Chromium enhancement. Other browsers keep the CSS blur.
    const chromium = navigator.userAgentData?.brands?.some(
      ({ brand }) => brand === "Chromium",
    );
    if (
      !chromium ||
      !CSS.supports("backdrop-filter", 'url("#dock-refraction")')
    )
      return;
    const transparency = matchMedia("(prefers-reduced-transparency: reduce)");
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      useRefraction = !transparency.matches && !motion.matches;
    };
    updatePreference();
    transparency.addEventListener("change", updatePreference);
    motion.addEventListener("change", updatePreference);
    const observer = new ResizeObserver(([entry]) => {
      const width = Math.round(entry.contentRect.width);
      const height = Math.round(entry.contentRect.height);
      if (!width || !height) return;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (!context) return;
      const pixels = context.createImageData(width, height);
      const radius = height / 2;
      const rim = 17;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const px = x - width / 2,
            py = y - height / 2;
          const dx = Math.max(Math.abs(px) - (width / 2 - radius), 0);
          const dy = Math.abs(py);
          const length = Math.hypot(dx, dy) || 1;
          const depth = radius - length;
          const strength =
            depth > 0 && depth < rim
              ? Math.sin((Math.PI * depth) / rim) * 0.8
              : 0;
          const index = (y * width + x) * 4;
          pixels.data[index] =
            128 + ((Math.sign(px) * dx) / length) * strength * 127;
          pixels.data[index + 1] =
            128 + ((Math.sign(py) * dy) / length) * strength * 127;
          pixels.data[index + 2] = 128;
          pixels.data[index + 3] = 255;
        }
      }
      context.putImageData(pixels, 0, 0);
      displacement = canvas.toDataURL();
    });
    observer.observe(dock);
    return () => {
      observer.disconnect();
      transparency.removeEventListener("change", updatePreference);
      motion.removeEventListener("change", updatePreference);
    };
  });

  function highlight(event) {
    if (
      event.pointerType === "touch" ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const bounds = dock.getBoundingClientRect();
    dock.style.setProperty("--shine-x", `${event.clientX - bounds.left}px`);
  }
</script>

<svg class="filter-definitions" aria-hidden="true" focusable="false">
  <defs>
    <filter
      id="dock-refraction"
      x="0"
      y="0"
      width="100%"
      height="100%"
      color-interpolation-filters="sRGB"
    >
      <feImage
        href={displacement || undefined}
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        result="rim"
      /><feDisplacementMap
        in="SourceGraphic"
        in2="rim"
        scale="24"
        xChannelSelector="R"
        yChannelSelector="G"
      /><feGaussianBlur stdDeviation="1.2" />
    </filter>
  </defs>
</svg>
<nav
  class="glass-dock"
  class:refractive={useRefraction && displacement}
  aria-label="Get started with K-Assist"
  bind:this={dock}
  onpointermove={highlight}
  onpointerleave={() => dock.style.removeProperty("--shine-x")}
>
  <span class="dock-optics" aria-hidden="true"></span>
  <button class="assistance" onclick={onAssistance}>
    <HandHelping size={20} stroke-width={1.8} aria-hidden="true" /><span>
      Get Assistance
    </span>
  </button>
  <button class="helper" onclick={onHelper}>
    <UserRoundPlus size={20} stroke-width={1.8} aria-hidden="true" /><span>
      Become A Helper
    </span>
  </button>
</nav>

<style>
  .filter-definitions {
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
    pointer-events: none;
  }
  .glass-dock {
    position: fixed;
    left: 50%;
    bottom: max(20px, env(safe-area-inset-bottom));
    transform: translateX(-50%);
    z-index: 40;
    display: flex;
    gap: 7px;
    padding: 9px;
    width: 480px;
    max-width: calc(100% - 28px);
    height: 76px;
    border-radius: 999px;
    border: 1px solid #ffffffdb;
    box-shadow:
      0 12px 40px #122c5d2e,
      inset 0 1px 0 white,
      inset 0 -1px 1px #40629e2b;
    isolation: isolate;
  }
  .dock-optics {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    z-index: -1;
    background: #eaf0faed;
    pointer-events: none;
  }
  .glass-dock::after {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    pointer-events: none;
    background:
      radial-gradient(100px 45px at var(--shine-x, 70px) 0, #fff9, transparent),
      linear-gradient(
        145deg,
        #ffffff66,
        transparent 30%,
        transparent 75%,
        #ffffff55
      );
    box-shadow:
      inset 1px 1px 0 #fff9,
      inset -1px -1px 0 #fff6;
    z-index: 2;
  }
  .glass-dock button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    flex: 1;
    min-width: 0;
    border-radius: 999px;
    border: 1px solid #ffffffa6;
    font: inherit;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    white-space: nowrap;
    transition:
      background 0.2s,
      transform 0.2s;
    box-shadow:
      inset 0 1px 1px #fff9,
      0 2px 6px #193e7510;
    padding: 0 12px;
  }
  .assistance {
    background: #2254c7e8;
    color: #fff;
    text-shadow: 0 1px 2px #12377b55;
  }
  .helper {
    background: #ffffffa8;
    color: #183568;
  }
  .glass-dock .assistance:hover {
    background: #1643ae;
  }
  .glass-dock .helper:hover {
    background: #fff;
  }
  .glass-dock button:active {
    transform: scale(0.97);
  }
  .glass-dock button:focus-visible {
    outline: 3px solid #f0bc5c;
    outline-offset: 3px;
    z-index: 3;
  }
  @supports (
    (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))
  ) {
    .dock-optics {
      background: #e8f0ff6b;
      -webkit-backdrop-filter: blur(18px) saturate(1.5);
      backdrop-filter: blur(18px) saturate(1.5);
    }
    .refractive .dock-optics {
      backdrop-filter: url("#dock-refraction") saturate(1.5);
    }
  }
  @media (max-width: 540px) {
    .glass-dock {
      height: 70px;
      padding: 7px;
      gap: 5px;
      bottom: max(14px, env(safe-area-inset-bottom));
    }
    .glass-dock button {
      font-size: 12px;
      gap: 7px;
      padding: 0 8px;
    }
    .glass-dock :global(svg:not(.filter-definitions)) {
      width: 18px;
      height: 18px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .glass-dock button {
      transition: none;
    }
    .glass-dock button:active {
      transform: none;
    }
    .refractive .dock-optics {
      backdrop-filter: blur(18px) saturate(1.3);
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .glass-dock .dock-optics {
      background: #edf2fc;
      -webkit-backdrop-filter: none;
      backdrop-filter: none;
    }
    .glass-dock .assistance {
      background: #2254c7;
    }
    .glass-dock .helper {
      background: #fff;
    }
    .glass-dock::after {
      background: none;
    }
  }
  @media (forced-colors: active) {
    .glass-dock {
      background: Canvas;
      border: 1px solid ButtonText;
    }
    .glass-dock button {
      border: 1px solid ButtonText;
      color: ButtonText;
      background: ButtonFace;
    }
    .dock-optics,
    .glass-dock::after {
      display: none;
    }
  }
</style>
