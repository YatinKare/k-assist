<script>
  import Globe from "@lucide/svelte/icons/globe";
  import UserRound from "@lucide/svelte/icons/user-round";
  import Check from "@lucide/svelte/icons/check";
  import CalendarDays from "@lucide/svelte/icons/calendar-days";
  import CreditCard from "@lucide/svelte/icons/credit-card";
  import MapPin from "@lucide/svelte/icons/map-pin";
  import Video from "@lucide/svelte/icons/video";
  import MessageCircle from "@lucide/svelte/icons/message-circle";
</script>

<section id="how" class="journey" aria-labelledby="journey-title">
  <div class="wrap">
    <h2 id="journey-title">From “I need help”<br />to “we’ve got this.”</h2>
    <div class="journey-grid">
      <article>
        <div class="diagram people-diagram" aria-hidden="true">
          <span class="country-chip"><Globe size={17} /> Your country</span>
          <div class="profile-stack">
            <div class="mini-profile back-one">
              <span class="avatar"><UserRound size={28} /></span><span
                class="placeholder-lines"
              >
                <i></i><i></i>
              </span>
            </div>
            <div class="mini-profile back-two">
              <span class="avatar"><UserRound size={28} /></span><span
                class="placeholder-lines"
              >
                <i></i><i></i>
              </span>
            </div>
            <div class="mini-profile selected">
              <span class="avatar"><UserRound size={30} /></span><span
                class="profile-label"
              >
                Your kind<br />of person
              </span><span class="check"><Check size={15} /></span>
            </div>
          </div>
          <div class="detail-pills">
            <span>Language</span><span>Services</span>
          </div>
        </div>
        <h3>Find your person</h3>
        <p>Someone from your country who knows Korea.</p>
      </article>
      <article>
        <div class="diagram calendar-diagram" aria-hidden="true">
          <div class="calendar">
            <div class="calendar-top">
              <CalendarDays size={18} /><span>A time that works</span><span
                class="calendar-dot"
              ></span>
            </div>
            <div class="calendar-days">
              {#each ["M", "T", "W", "T", "F", "S", "S"] as day}<span>
                  {day}
                </span>{/each}
            </div>
            <div class="calendar-grid">
              {#each Array(21) as _, i}<span
                  class:chosen={i === 10}
                  class:muted={i < 2 || i > 18}
                >
                  {i + 1}
                </span>{/each}
            </div>
          </div>
          <span class="payment-chip">
            <CreditCard size={18} /> Book & pay in the app <Check size={16} />
          </span>
        </div>
        <h3>Make a plan</h3>
        <p>Choose your helper, book a time, and pay in the app.</p>
      </article>
      <article>
        <div class="diagram meeting-diagram" aria-hidden="true">
          <div class="meeting-orbit"></div>
          <span class="conversation">
            <MessageCircle size={28} /><span class="conversation-dots">
              ···
            </span>
          </span>
          <div class="meeting-people">
            <span class="person person-one"><UserRound size={50} /></span><span
              class="person person-two"
            >
              <UserRound size={50} />
            </span><span class="meeting-check"><Check size={20} /></span>
          </div>
          <div class="meeting-options">
            <span><MapPin size={15} /> In person</span><span>
              <Video size={15} /> Online
            </span>
          </div>
        </div>
        <h3>Get help, together</h3>
        <p>Meet in person or connect online. You’ve got company.</p>
      </article>
    </div>
    <p class="availability">
      A preview of how booking will work. Demand testing starts in Busan;
      bookings aren’t open yet.
    </p>
  </div>
</section>

<style>
  .journey {
    background: #eaf0fb;
    padding: 100px 0 80px;
    scroll-margin-top: 35px;
  }
  .wrap {
    max-width: 1280px;
    margin: auto;
    padding: 0 48px;
  }
  h2 {
    font-size: clamp(36px, 4vw, 56px);
    letter-spacing: -2.6px;
    line-height: 1.15;
    margin: 0 0 58px;
    font-weight: 650;
    color: #173361;
  }
  .journey-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 36px;
    position: relative;
  }
  .journey-grid::before {
    content: "";
    position: absolute;
    left: 12%;
    right: 12%;
    top: 150px;
    border-top: 2px dashed #9fb6e6;
  }
  article {
    position: relative;
    min-width: 0;
  }
  .diagram {
    height: 300px;
    position: relative;
    background: #f9fbff;
    border: 1px solid #fff;
    border-radius: 28px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 14px 25px #2858a307;
  }
  .diagram::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(#2355b413 0.7px, transparent 0.8px);
    background-size: 5px 5px;
    pointer-events: none;
  }
  h3 {
    font-size: 24px;
    letter-spacing: -0.8px;
    margin: 27px 0 10px;
    font-weight: 650;
  }
  article > p {
    font-size: 16px;
    line-height: 1.7;
    margin: 0;
    max-width: 300px;
    color: #4f6180;
    font-weight: 500;
  }
  .country-chip {
    position: absolute;
    top: 28px;
    display: flex;
    gap: 9px;
    align-items: center;
    font-size: 13px;
    color: #244eac;
    font-weight: 650;
    background: #edf3ff;
    padding: 10px 15px;
    border-radius: 30px;
  }
  .profile-stack {
    width: 222px;
    height: 116px;
    position: relative;
    margin-top: 15px;
  }
  .mini-profile {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 17px;
    width: 218px;
    height: 82px;
    padding: 16px;
    background: white;
    border: 1px solid #dae4f9;
    border-radius: 16px;
    box-shadow: 0 8px 22px #244ca817;
    inset: 0;
  }
  .back-one {
    transform: translateY(-15px) rotate(-8deg);
    opacity: 0.65;
  }
  .back-two {
    transform: translateY(17px) rotate(7deg);
    opacity: 0.8;
  }
  .selected {
    transform: rotate(-2deg);
    border-color: #5080e1;
    box-shadow: 0 10px 30px #244ca826;
  }
  .avatar {
    display: grid;
    place-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #dce8ff;
    color: #3564c2;
    flex-shrink: 0;
  }
  .profile-label {
    font-size: 14px;
    line-height: 1.45;
    font-weight: 650;
    color: #24487f;
  }
  .check {
    position: absolute;
    right: -8px;
    top: -8px;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #2f63da;
    color: white;
    display: grid;
    place-items: center;
    border: 3px solid #f9fbff;
  }
  .placeholder-lines {
    display: grid;
    gap: 8px;
    flex: 1;
  }
  .placeholder-lines i {
    height: 5px;
    width: 80px;
    border-radius: 5px;
    background: #d5dff1;
  }
  .placeholder-lines i:last-child {
    width: 50px;
  }
  .detail-pills {
    position: absolute;
    bottom: 28px;
    display: flex;
    gap: 8px;
  }
  .detail-pills span {
    border: 1px solid #d8e2f5;
    border-radius: 25px;
    padding: 7px 14px;
    font-size: 11px;
    color: #59719b;
    background: white;
  }
  .calendar {
    position: absolute;
    top: 26px;
    width: 225px;
    background: white;
    border: 1px solid #d9e4f7;
    padding: 16px;
    border-radius: 16px;
    transform: rotate(-3deg);
    box-shadow: 0 10px 26px #2858a312;
  }
  .calendar-top {
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: 11px;
    font-weight: 650;
    color: #34558e;
    padding-bottom: 16px;
    border-bottom: 1px solid #e6ecf8;
  }
  .calendar-dot {
    margin-left: auto;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #9bb2dc;
  }
  .calendar-days,
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-size: 10px;
    color: #8391ae;
    gap: 5px;
    margin-top: 12px;
  }
  .calendar-grid {
    color: #526b98;
    font-weight: 600;
    row-gap: 8px;
  }
  .calendar-grid span {
    width: 22px;
    height: 22px;
    display: grid;
    place-items: center;
  }
  .calendar-grid .chosen {
    background: #3268e0;
    border-radius: 50%;
    color: white;
    box-shadow: 0 2px 8px #2858a333;
  }
  .calendar-grid .muted {
    opacity: 0.3;
  }
  .payment-chip {
    position: absolute;
    bottom: 25px;
    background: #244eac;
    color: white;
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 14px 16px;
    border-radius: 14px;
    font-size: 11px;
    box-shadow: 0 7px 18px #2858a328;
    transform: rotate(2deg);
  }
  .meeting-orbit {
    position: absolute;
    width: 235px;
    height: 235px;
    border: 1px dashed #c5d5f3;
    border-radius: 50%;
  }
  .conversation {
    position: absolute;
    top: 37px;
    left: calc(50% - 22px);
    color: #567ed1;
    transform: rotate(9deg);
  }
  .conversation-dots {
    position: absolute;
    top: -5px;
    left: 7px;
    font-size: 20px;
    font-weight: 700;
  }
  .meeting-people {
    position: relative;
    display: flex;
    gap: 15px;
    align-items: center;
    justify-content: center;
    width: 220px;
    margin-top: -8px;
  }
  .person {
    width: 90px;
    height: 95px;
    border-radius: 45px 45px 25px 25px;
    display: grid;
    place-items: center;
    border: 5px solid white;
    box-shadow: 0 8px 25px #2858a312;
  }
  .person-one {
    background: #dfeaff;
    color: #3866bd;
    transform: rotate(-9deg);
  }
  .person-two {
    background: #f5e4c8;
    color: #b18043;
    transform: rotate(9deg);
  }
  .meeting-check {
    position: absolute;
    bottom: -9px;
    width: 34px;
    height: 34px;
    display: grid;
    place-items: center;
    background: #3268e0;
    color: white;
    border-radius: 50%;
    border: 4px solid white;
  }
  .meeting-options {
    position: absolute;
    bottom: 31px;
    display: flex;
    gap: 8px;
  }
  .meeting-options > span {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 8px 12px;
    border: 1px solid #d5e1f7;
    background: white;
    border-radius: 25px;
    font-size: 11px;
    color: #526b98;
  }
  .availability {
    color: #5b6e90;
    font-size: 13px;
    line-height: 1.7;
    margin: 42px 0 0;
    max-width: 650px;
  }
  @media (max-width: 1050px) {
    .journey-grid {
      gap: 20px;
    }
    .wrap {
      padding: 0 28px;
    }
    .diagram {
      height: 290px;
    }
    .profile-stack {
      transform: scale(0.9);
    }
    .calendar {
      width: 210px;
    }
    .meeting-people {
      transform: scale(0.9);
    }
    .payment-chip {
      font-size: 10px;
      gap: 7px;
      padding: 13px 12px;
    }
  }
  @media (max-width: 760px) {
    .journey {
      padding: 65px 0;
    }
    .wrap {
      padding: 0 23px;
    }
    h2 {
      font-size: 36px;
      letter-spacing: -1.7px;
      margin-bottom: 35px;
    }
    .journey-grid {
      grid-template-columns: 1fr;
      gap: 35px;
    }
    .journey-grid::before {
      display: none;
    }
    .diagram {
      height: 285px;
      max-width: 430px;
      margin: auto;
    }
    .profile-stack {
      transform: scale(1);
    }
    .calendar {
      width: 225px;
    }
    .meeting-people {
      transform: scale(1);
    }
    h3 {
      font-size: 23px;
      margin-top: 20px;
    }
    article > p {
      font-size: 16px;
      max-width: 100%;
    }
    .availability {
      font-size: 12px;
      margin-top: 30px;
    }
  }
</style>
