<script>
  import "@fontsource-variable/manrope/wght.css";
  import { asset } from "$app/paths";
  import Landmark from "@lucide/svelte/icons/landmark";
  import Smartphone from "@lucide/svelte/icons/smartphone";
  import FileText from "@lucide/svelte/icons/file-text";
  import House from "@lucide/svelte/icons/house";
  import GraduationCap from "@lucide/svelte/icons/graduation-cap";
  import Luggage from "@lucide/svelte/icons/luggage";
  import X from "@lucide/svelte/icons/x";
  import GlassDock from "../lib/GlassDock.svelte";
  import BookingJourney from "../lib/BookingJourney.svelte";

  let role = $state("");
  let email = $state("");
  let complete = $state(false);
  let dialog;
  let activeService = $state(0);
  let serviceButtons = [];
  const services = [
    {
      title: "Bank visits",
      detail: "A familiar face for the unfamiliar paperwork.",
      icon: Landmark,
      position: "0% 0%",
      alt: "A cream bank building floating among cobalt-blue clouds",
    },
    {
      title: "Phone setup",
      detail: "Get connected, with someone who knows the process.",
      icon: Smartphone,
      position: "100% 0%",
      alt: "An illustrated smartphone and SIM card floating in the clouds",
    },
    {
      title: "Government forms",
      detail: "Work through forms and appointments together.",
      icon: FileText,
      position: "0% 50%",
      alt: "An illustrated document and stamp among white clouds",
    },
    {
      title: "Housing appointments",
      detail: "Bring someone along to your next viewing.",
      icon: House,
      position: "100% 50%",
      alt: "A small illustrated apartment building with a golden key in the sky",
    },
    {
      title: "University admin",
      detail: "A helping hand with campus life and administration.",
      icon: GraduationCap,
      position: "0% 100%",
      alt: "An illustrated university, graduation cap and book on a cloud",
    },
    {
      title: "Shopping & reservations",
      detail: "Help with shopping, travel plans and reservations.",
      icon: Luggage,
      position: "100% 100%",
      alt: "An illustrated suitcase, shopping bag and ticket in a cobalt sky",
    },
  ];

  function interest(value) {
    role = value;
    complete = false;
    email = "";
    dialog.showModal();
  }

  function navigateServices(event, index) {
    let next;
    if (event.key === "ArrowDown" || event.key === "ArrowRight")
      next = (index + 1) % services.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft")
      next = (index - 1 + services.length) % services.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = services.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      activeService = next;
      serviceButtons[next]?.focus();
    }
  }
</script>

<svelte:head>
  <title>K-Assist — Someone from your country. By your side.</title>
  <meta
    name="description"
    content="Find practical help in Korea from someone from your own country who already lives here and knows the ropes. Starting in Busan."
  />
</svelte:head>

<div class="site" id="top">
  <header class="wrap">
    <a class="brand" href="#top" aria-label="K-Assist home">
      <span class="brand-mark" aria-hidden="true">K</span>K-Assist.
    </a>
    <nav class="main-nav" aria-label="Main navigation">
      <a href="#help">The help</a><a href="#how">The process</a><a
        href="#helpers"
      >
        For helpers
      </a>
    </nav>
  </header>
  <main>
    <section class="hero" aria-labelledby="hero-title">
      <img
        class="sky-image"
        src={asset("/sky-handshake.webp")}
        alt="Two illustrated hands meeting in front of a globe among white clouds in a cobalt-blue sky"
        fetchpriority="high"
        width="1536"
        height="1024"
      />
      <div class="sky-shade" aria-hidden="true"></div>
      <div class="grain" aria-hidden="true"></div>
      <div class="hero-inner wrap">
        <div class="hero-copy">
          <h1 id="hero-title">Someone from<br /><em>your country.</em></h1>
          <p>
            Find someone from your country who already lives in Korea and knows
            the ropes. Practical help, online or by your side.
          </p>
        </div>
      </div>
    </section>

    <section id="help" class="services wrap" aria-labelledby="services-title">
      <h2 id="services-title">
        For the things a translation<br class="desktop" /> app can’t do with you.
      </h2>
      <div class="service-layout">
        <div
          class="service-list"
          role="tablist"
          aria-label="Types of assistance"
          aria-orientation="vertical"
        >
          {#each services as service, i}
            <button
              class="service-tab"
              class:active={activeService === i}
              role="tab"
              id={`service-tab-${i}`}
              aria-controls="service-preview"
              aria-selected={activeService === i}
              tabindex={activeService === i ? 0 : -1}
              bind:this={serviceButtons[i]}
              onmouseenter={() => (activeService = i)}
              onfocus={() => (activeService = i)}
              onclick={() => (activeService = i)}
              onkeydown={(event) => navigateServices(event, i)}
            >
              <service.icon size={24} stroke-width={1.7} aria-hidden="true" />
              <span class="service-name">{service.title}</span><span
                class="selection-dot"
                aria-hidden="true"
              ></span>
            </button>
          {/each}
        </div>
        <div
          id="service-preview"
          class="service-preview"
          role="tabpanel"
          aria-labelledby={`service-tab-${activeService}`}
          tabindex="0"
        >
          {#key activeService}<div
              class="service-scene"
              style:background-image={`url('${asset("/service-worlds.webp")}')`}
              style:background-position={services[activeService].position}
              role="img"
              aria-label={services[activeService].alt}
            ></div>{/key}
          <div class="grain" aria-hidden="true"></div>
        </div>
      </div>
    </section>

    <BookingJourney />

    <section
      id="helpers"
      class="helper-section wrap"
      aria-labelledby="helper-title"
    >
      <div class="helper-visual">
        <img
          src={asset("/cloud-path.webp")}
          alt="Two welcoming doorways on cloud islands connected by a path, with a globe floating between them"
          loading="lazy"
          width="1024"
          height="1024"
        />
        <div class="grain" aria-hidden="true"></div>
      </div>
      <div class="helper-copy">
        <h2 id="helper-title">
          Help someone<br />from home<br /><span class="animated-phrase">
            feel at home here.
          </span>
        </h2>
        <p>
          Already living in Korea and know the ropes? Help someone from your
          country navigate the everyday, from their first appointment to getting
          settled.
        </p>
      </div>
    </section>
  </main>

  <footer>
    <div class="footer-main wrap">
      <div class="footer-brand">
        <a class="brand" href="#top">
          <span class="brand-mark" aria-hidden="true">K</span>K-Assist.
        </a>
        <p>A helping hand from your country.<br />For life in Korea.</p>
      </div>
      <nav class="footer-nav" aria-label="Footer navigation">
        <h3>Explore</h3>
        <a href="#help">What we help with</a><a href="#how">How it works</a><a
          href="#helpers"
        >
          For helpers
        </a>
      </nav>
      <div class="footer-status">
        <h3>Starting in Busan</h3>
        <p>
          We’re developing K-Assist and exploring interest. Bookings aren’t open
          yet.
        </p>
        <details>
          <summary>Privacy & this preview</summary>
          <p>The interest form is a demo. Your email is never saved or sent.</p>
        </details>
      </div>
    </div>
    <div class="footer-bottom wrap">
      <span>© {new Date().getFullYear()} K-Assist</span><a href="#top">
        Back to top
      </a><span>Built for a little more belonging.</span>
    </div>
  </footer>
  <GlassDock
    onAssistance={() => interest("assistance")}
    onHelper={() => interest("helper")}
  />
</div>

<dialog
  bind:this={dialog}
  onclick={(event) => {
    if (event.target === dialog) dialog.close();
  }}
  onkeydown={(event) => {
    if (event.key === "Escape") dialog.close();
  }}
>
  <button
    class="dialog-close"
    aria-label="Close interest form"
    onclick={() => dialog.close()}
  >
    <X size={22} />
  </button>
  <h2>
    {complete
      ? "Thanks for trying it."
      : role === "helper"
        ? "Lend a little local know-how."
        : "A helping hand from home."}
  </h2>
  {#if complete}
    <p>
      This is a preview. Your email hasn’t been saved or sent. We’re still
      getting K-Assist ready.
    </p>
    <button class="form-button" onclick={() => dialog.close()}>
      Back to the page
    </button>
  {:else}
    <p>
      {role === "helper"
        ? "Interested in helping someone from your country settle into life in Korea?"
        : "Interested in practical help from someone from your country who already lives in Korea?"}
      We’re exploring interest before opening bookings.
    </p>
    <form
      onsubmit={(event) => {
        event.preventDefault();
        complete = true;
      }}
    >
      <label for="email">Email address</label><input
        id="email"
        type="email"
        bind:value={email}
        autocomplete="email"
        placeholder="you@example.com"
        required
      /><button class="form-button" type="submit">
        Preview interest sign-up
      </button>
      <p class="form-note">
        Demo only. This form does not save or send your email.
      </p>
    </form>
  {/if}
</dialog>

<style>
  :global(*) {
    box-sizing: border-box;
  }
  :global(html) {
    scroll-behavior: smooth;
    scroll-padding-top: 32px;
    scroll-padding-bottom: 120px;
  }
  :global(body) {
    margin: 0;
    background: #f8f9fc;
    color: #18315b;
    font-family: "Manrope Variable", Manrope, Arial, sans-serif;
    font-weight: 500;
    -webkit-font-smoothing: antialiased;
  }
  :global(button),
  :global(input) {
    font: inherit;
  }
  :global(button),
  :global(a) {
    -webkit-tap-highlight-color: transparent;
  }
  :global(button) {
    cursor: pointer;
  }
  :global(a) {
    color: inherit;
    text-decoration: none;
  }
  :global(button:focus-visible),
  :global(a:focus-visible),
  :global(input:focus-visible),
  :global([tabindex]:focus-visible),
  :global(summary:focus-visible) {
    outline: 3px solid #4678da;
    outline-offset: 5px;
    scroll-margin-bottom: 130px;
  }
  :global(section) {
    scroll-margin-top: 35px;
  }
  .wrap {
    max-width: 1328px;
    margin: 0 auto;
    padding-left: 48px;
    padding-right: 48px;
  }
  .brand {
    display: inline-flex;
    align-items: center;
    gap: 11px;
    font-size: 25px;
    letter-spacing: -1px;
    font-weight: 800;
    white-space: nowrap;
  }
  .brand-mark {
    display: grid;
    place-items: center;
    width: 35px;
    height: 38px;
    background: white;
    color: #2457c8;
    border-radius: 10px;
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -2px;
    padding-right: 2px;
  }
  header {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    z-index: 5;
  }
  .main-nav {
    display: flex;
    gap: 27px;
    padding: 17px 25px;
    border-radius: 30px;
    background: #173b8ddd;
    border: 1px solid #ffffff66;
    backdrop-filter: blur(12px);
    font-size: 13px;
    font-weight: 650;
  }
  .main-nav a:hover {
    color: #d3e4ff;
  }
  .hero {
    height: 100svh;
    min-height: 760px;
    max-height: 1100px;
    position: relative;
    isolation: isolate;
    overflow: hidden;
    background: #2f63e8;
    color: white;
  }
  .sky-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 65% center;
    z-index: -3;
  }
  .sky-shade {
    position: absolute;
    inset: 0;
    z-index: -2;
    background: linear-gradient(
      90deg,
      #103a9e80,
      #1c49b838 39%,
      transparent 65%
    );
  }
  .grain {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(#0c2d78 0.6px, transparent 0.9px);
    background-size: 3px 3px;
    opacity: 0.09;
    mix-blend-mode: multiply;
  }
  .hero > .grain {
    z-index: -1;
  }
  .hero-inner {
    height: 100%;
    display: flex;
    align-items: center;
    padding-top: 90px;
    padding-bottom: 130px;
  }
  .hero-copy {
    width: 53%;
    animation: arrive 0.7s ease-out;
  }
  h1 {
    font-size: clamp(54px, 5.7vw, 82px);
    line-height: 1.1;
    letter-spacing: -4.5px;
    font-weight: 650;
    margin: 0 0 32px;
  }
  h1 em {
    font-style: normal;
    font-weight: 650;
    color: #ddecff;
  }
  .hero-copy > p {
    font-size: 18px;
    line-height: 1.8;
    max-width: 405px;
    margin: 0;
    color: white;
    text-wrap: pretty;
  }
  h2 {
    text-wrap: balance;
    font-size: clamp(36px, 4vw, 54px);
    letter-spacing: -2.5px;
    line-height: 1.15;
    font-weight: 650;
    margin: 0;
  }
  p {
    text-wrap: pretty;
  }
  .services {
    padding-top: 110px;
    padding-bottom: 110px;
  }
  .services > h2 {
    margin-bottom: 55px;
    max-width: 800px;
  }
  .service-layout {
    display: grid;
    grid-template-columns: 1fr 1.15fr;
    gap: 75px;
    align-items: center;
  }
  .service-list {
    display: flex;
    flex-direction: column;
  }
  .service-tab {
    display: flex;
    align-items: center;
    gap: 22px;
    text-align: left;
    border: 0;
    border-bottom: 1px solid #dce3f0;
    padding: 23px 8px;
    color: #657795;
    background: transparent;
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -0.6px;
    min-height: 80px;
    transition: color 0.2s;
  }
  .service-tab:first-child {
    border-top: 1px solid #dce3f0;
  }
  .service-tab :global(svg) {
    flex-shrink: 0;
  }
  .service-tab.active {
    color: #225bcd;
  }
  .service-tab .selection-dot {
    margin-left: auto;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0;
    flex-shrink: 0;
  }
  .service-tab.active .selection-dot {
    opacity: 1;
  }
  .service-preview {
    height: 540px;
    position: relative;
    border-radius: 28px;
    overflow: hidden;
    background: #2f63e8;
    isolation: isolate;
  }
  .service-scene {
    position: absolute;
    inset: 0;
    background-size: 200% 300%;
    background-repeat: no-repeat;
    animation: scene-in 0.35s ease-out;
  }

  .helper-section {
    display: grid;
    grid-template-columns: 1.05fr 1fr;
    gap: 90px;
    align-items: center;
    padding-top: 120px;
    padding-bottom: 120px;
  }
  .helper-visual {
    aspect-ratio: 1;
    position: relative;
    overflow: hidden;
    border-radius: 50% 50% 28px 28px;
    background: #2f63e8;
  }
  .helper-visual img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .helper-copy h2 {
    text-wrap: balance;
    font-size: clamp(34px, 3.6vw, 48px);
    line-height: 1.22;
  }
  .animated-phrase {
    position: relative;
    display: inline-block;
    color: #3269d4;
    animation: gentle-lift 6s ease-in-out infinite;
  }
  .animated-phrase::after {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 100%;
    height: 2px;
    transform-origin: left;
    background: linear-gradient(90deg, #3270df, #9fbfff, transparent);
    animation: underline-breathe 6s ease-in-out infinite;
  }
  .helper-copy > p {
    font-size: 17px;
    line-height: 1.85;
    color: #536785;
    max-width: 440px;
    margin-top: 30px;
    margin-bottom: 0;
  }
  footer {
    background: #12294e;
    color: #e2ebfa;
    padding-top: 70px;
    padding-bottom: calc(145px + env(safe-area-inset-bottom));
    position: relative;
  }
  footer::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(#ffffff 0.5px, transparent 0.8px);
    background-size: 5px 5px;
    opacity: 0.04;
  }
  .footer-main {
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr;
    gap: 70px;
    position: relative;
  }
  .footer-brand > p {
    font-size: 15px;
    line-height: 1.8;
    color: #afc0db;
    margin: 23px 0;
  }
  .footer-nav {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    font-size: 14px;
  }
  .footer-main h3 {
    font-size: 13px;
    letter-spacing: 0.2px;
    font-weight: 700;
    color: white;
    margin: 7px 0 8px;
  }
  .footer-nav a {
    color: #b8c8e2;
  }
  .footer-nav a:hover,
  .footer-bottom a:hover {
    color: white;
  }
  .footer-status p {
    font-size: 13px;
    line-height: 1.8;
    color: #b8c8e2;
    max-width: 270px;
    margin-top: 14px;
  }
  .footer-status details {
    margin-top: 22px;
    font-size: 12px;
    color: #c0cfe7;
  }
  .footer-status summary {
    cursor: pointer;
    padding: 5px 0;
    list-style: none;
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  .footer-status summary::-webkit-details-marker {
    display: none;
  }
  .footer-status details p {
    font-size: 12px;
  }
  .footer-bottom {
    border-top: 1px solid #42577566;
    display: flex;
    gap: 30px;
    align-items: center;
    font-size: 11px;
    color: #9db1cf;
    margin-top: 48px;
    padding-top: 25px;
    position: relative;
  }
  .footer-bottom > span:last-child {
    margin-left: auto;
  }
  dialog {
    background: #f8faff;
    color: #18315b;
    border: 1px solid #d3dff2;
    border-radius: 24px;
    max-width: 490px;
    width: calc(100% - 32px);
    max-height: calc(100svh - 48px);
    overflow: auto;
    padding: 46px 36px;
    box-shadow: 0 25px 100px #0d28594d;
  }
  dialog:modal {
    overscroll-behavior: contain;
  }
  dialog::backdrop {
    overflow: hidden;
    overscroll-behavior: contain;
    background: #102449a8;
    backdrop-filter: blur(7px);
  }
  dialog h2 {
    text-wrap: balance;
    font-size: 32px;
    letter-spacing: -1.3px;
    line-height: 1.2;
    margin: 10px 0 22px;
  }
  dialog > p {
    font-size: 15px;
    line-height: 1.8;
    color: #566b8b;
  }
  .dialog-close {
    position: absolute;
    right: 15px;
    top: 15px;
    border: 0;
    background: transparent;
    width: 44px;
    height: 44px;
    display: grid;
    place-items: center;
    color: #4d6489;
    border-radius: 50%;
  }
  .dialog-close:hover {
    background: #e7eefb;
  }
  form {
    margin-top: 25px;
  }
  label {
    font-size: 13px;
    font-weight: 650;
    display: block;
    margin-bottom: 10px;
  }
  input {
    border: 1px solid #bacbe5;
    border-radius: 10px;
    background: white;
    color: #18315b;
    width: 100%;
    padding: 15px;
    font-size: 16px;
    margin-bottom: 15px;
  }
  .form-button {
    width: 100%;
    border: 0;
    border-radius: 12px;
    padding: 16px;
    background: #265bca;
    color: white;
    font-weight: 700;
    font-size: 14px;
  }
  .form-button:hover {
    background: #1649b3;
  }
  .form-note {
    font-size: 11px;
    line-height: 1.7;
    color: #5d7398;
    margin-top: 16px;
  }
  @keyframes arrive {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
  @keyframes scene-in {
    from {
      opacity: 0.45;
      transform: scale(1.015);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  @keyframes gentle-lift {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-3px);
    }
  }
  @keyframes underline-breathe {
    0%,
    100% {
      opacity: 0.45;
      transform: scaleX(0.85);
    }
    50% {
      opacity: 1;
      transform: scaleX(1);
    }
  }
  @media (max-width: 1100px) {
    .wrap {
      padding-left: 30px;
      padding-right: 30px;
    }
    .hero-copy {
      width: 58%;
    }
    h1 {
      font-size: clamp(54px, 6.1vw, 76px);
      letter-spacing: -3.6px;
    }
    .hero-copy > p {
      max-width: 330px;
      font-size: 17px;
    }
    .service-layout {
      gap: 40px;
      grid-template-columns: 1fr 1fr;
    }
    .service-tab {
      font-size: 20px;
      gap: 17px;
    }
    .service-preview {
      height: 500px;
    }
    .helper-section {
      gap: 50px;
    }
    .footer-main {
      gap: 35px;
    }
    .helper-copy h2 {
      text-wrap: balance;
      font-size: 37px;
    }
  }
  @media (max-width: 760px) {
    .wrap {
      padding-left: 23px;
      padding-right: 23px;
    }
    header {
      height: 90px;
    }
    .brand {
      font-size: 23px;
      gap: 9px;
    }
    .brand-mark {
      width: 31px;
      height: 34px;
      font-size: 25px;
    }
    .main-nav {
      gap: 18px;
      padding: 12px 17px;
      font-size: 11px;
    }
    .main-nav a:last-child {
      display: none;
    }
    .hero {
      height: auto;
      min-height: 850px;
      max-height: none;
    }
    .hero-inner {
      align-items: flex-start;
      padding-top: 165px;
      padding-bottom: 560px;
    }
    .hero-copy {
      width: 100%;
    }
    h1 {
      font-size: clamp(44px, 10.4vw, 65px);
      letter-spacing: -2.8px;
      line-height: 1.13;
      margin-bottom: 25px;
    }
    .hero-copy > p {
      font-size: 17px;
      line-height: 1.75;
      max-width: 335px;
    }
    .sky-image {
      inset: auto -45px 0 auto;
      width: 900px;
      max-width: none;
      height: 600px;
      object-fit: cover;
      object-position: right bottom;
      mask-image: linear-gradient(to bottom, transparent, black 24%);
    }
    .sky-shade {
      background: linear-gradient(
        180deg,
        #163d9f60 0%,
        #163d9f60 42%,
        transparent 65%
      );
    }
    .hero-inner {
      padding-bottom: 560px;
    }
    .services {
      padding-top: 70px;
      padding-bottom: 70px;
    }
    h2 {
      text-wrap: balance;
      font-size: 35px;
      letter-spacing: -1.5px;
      line-height: 1.18;
    }
    .desktop {
      display: none;
    }
    .services > h2 {
      margin-bottom: 30px;
    }
    .service-layout {
      grid-template-columns: 1fr;
      gap: 30px;
    }
    .service-tab {
      min-height: 68px;
      padding: 18px 4px;
      font-size: 19px;
      gap: 20px;
    }
    .service-preview {
      height: auto;
      aspect-ratio: 1.2;
      order: -1;
      position: sticky;
      top: 12px;
      z-index: 2;
      align-self: start;
      box-shadow: 0 10px 25px #12366a15;
    }

    .helper-section {
      grid-template-columns: 1fr;
      gap: 38px;
      padding-top: 70px;
      padding-bottom: 80px;
    }
    .helper-visual {
      max-width: 450px;
      width: 100%;
      margin: auto;
    }
    .helper-copy h2 {
      text-wrap: balance;
      font-size: 36px;
      line-height: 1.25;
      letter-spacing: -1.7px;
    }
    .helper-copy > p {
      font-size: 16px;
      line-height: 1.8;
      margin-top: 28px;
      max-width: 100%;
    }
    footer {
      padding-top: 50px;
      padding-bottom: calc(130px + env(safe-area-inset-bottom));
    }
    .footer-main {
      grid-template-columns: 1fr 1fr;
      gap: 30px;
    }
    .footer-brand {
      grid-column: 1/-1;
    }
    .footer-brand > p {
      margin: 18px 0 5px;
    }
    .footer-main h3 {
      font-size: 12px;
    }
    .footer-nav {
      gap: 16px;
      font-size: 12px;
    }
    .footer-status p {
      font-size: 12px;
    }
    .footer-status details {
      font-size: 11px;
    }
    .footer-bottom {
      margin-top: 30px;
      gap: 17px;
      font-size: 10px;
      flex-wrap: wrap;
    }
    .footer-bottom > span:last-child {
      width: 100%;
      margin-left: 0;
    }
    dialog {
      padding: 40px 25px;
    }
    dialog h2 {
      text-wrap: balance;
      font-size: 29px;
    }
  }
  @media (max-width: 380px) {
    .main-nav {
      padding: 11px 13px;
      gap: 12px;
      font-size: 10px;
    }
    .brand {
      font-size: 21px;
      gap: 7px;
    }
    .brand-mark {
      width: 28px;
      height: 31px;
      font-size: 23px;
    }
    .hero-inner {
      padding-top: 145px;
    }
    h1 {
      font-size: 41px;
      letter-spacing: -2.6px;
    }
    .hero-copy > p {
      font-size: 16px;
    }
    .helper-copy h2 {
      text-wrap: balance;
      font-size: 31px;
    }
    .service-tab {
      font-size: 17px;
    }
  }
  @media (pointer: coarse) {
    .main-nav a,
    .footer-nav a {
      min-height: 44px;
      display: inline-flex;
      align-items: center;
    }
    .main-nav {
      padding-top: 0;
      padding-bottom: 0;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    :global(html) {
      scroll-behavior: auto;
    }
    :global(*),
    :global(*::before),
    :global(*::after) {
      animation: none !important;
      transition: none !important;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .main-nav {
      background: #183d8e;
      backdrop-filter: none;
    }

    dialog::backdrop {
      backdrop-filter: none;
    }
  }
</style>
