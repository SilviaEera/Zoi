/*--------------- Header Script ---------------*/

var lastKnownScrollY = 0;

var currentScrollY = 0;

var gaClientId;

var ticking = false;

var idOfHeader = 'header';

var eleHeader = null;

const classes = {
  pinned: 'header-pin',

  unpinned: 'header-unpin',
};

function onScroll() {
  currentScrollY = window.pageYOffset;

  requestTick();
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(update);
  }

  ticking = true;
}

function update() {
  if (currentScrollY < lastKnownScrollY) {
    pin();
  } else if (currentScrollY > lastKnownScrollY) {
    unpin();
  }

  lastKnownScrollY = currentScrollY;

  ticking = false;
}

function pin() {
  if (eleHeader.classList.contains(classes.unpinned)) {
    eleHeader.classList.remove(classes.unpinned);

    eleHeader.classList.add(classes.pinned);
  }
}

function unpin() {
  if (
    eleHeader.classList.contains(classes.pinned) ||
    !eleHeader.classList.contains(classes.unpinned)
  ) {
    eleHeader.classList.remove(classes.pinned);

    eleHeader.classList.add(classes.unpinned);
  }
}

window.onload = function () {
  eleHeader = document.getElementById(idOfHeader);

  document.addEventListener('scroll', onScroll, false);
};

/*--------------- Popup Script ---------------*/

const modalOpen = document.querySelectorAll('.js-popup-open');

const popup = document.getElementById('popup');

const popupLayout = document.querySelector('.popup__layout');

const modalOpenMobile = document.querySelectorAll('.js-popup-open-mobile');

const popupMobile = document.getElementById('popup-mobile');

const popupLayoutMobile = document.querySelector('.popup__layout-mobile');

const htmlLock = document.querySelector('html');

modalOpen.forEach((el) => {
  el.addEventListener('click', (e) => {
    popup.classList.add('open');

    htmlLock.classList.add('fixed');
  });
});

popupLayout.addEventListener('click', () => {
  popup.classList.remove('open');

  htmlLock.classList.remove('fixed');
});

modalOpenMobile.forEach((el) => {
  el.addEventListener('click', (e) => {
    popupMobile.classList.add('open');

    htmlLock.classList.add('fixed');
  });
});

popupLayoutMobile.addEventListener('click', () => {
  popupMobile.classList.remove('open');

  htmlLock.classList.remove('fixed');
});

/*--------------- smoothScroll Script ---------------*/

(function () {
  const smoothScroll = function (targetEl, duration) {
    const headerElHeight = document.querySelector('.header').clientHeight;

    let target = document.querySelector(targetEl);

    let targetPosition = target.getBoundingClientRect().top - headerElHeight;

    let startPosition = window.pageYOffset;

    let startTime = null;

    const ease = function (t, b, c, d) {
      t /= d / 2;

      if (t < 1) return (c / 2) * t * t + b;

      t--;

      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animation = function (currentTime) {
      if (startTime === null) startTime = currentTime;

      const timeElapsed = currentTime - startTime;

      const run = ease(timeElapsed, startPosition, targetPosition, duration);

      window.scrollTo(0, run);

      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  };

  const scrollTo = function () {
    const links = document.querySelectorAll('.js-scroll');

    links.forEach((each) => {
      each.addEventListener('click', function () {
        const currentTarget = this.getAttribute('href');

        smoothScroll(currentTarget, 1000);
      });
    });
  };

  scrollTo();
})();

/*--------------- Swiper Script ---------------*/

new Swiper('.swiper-container', {
  slidesPerView: 1,

  spaceBetween: 10,

  autoHeight: true,

  navigation: {
    nextEl: '.swiper-button-next',

    prevEl: '.swiper-button-prev',
  },
});

/*--------------- Burger Script ---------------*/

const burgerTrigger = document.getElementById('burger');

const headerWrapper = document.getElementById('header-mobile');

burgerTrigger.addEventListener('click', () => {
  headerWrapper.classList.toggle('active');
});

/*--------------- Form Step Script ---------------*/

const email_regexp =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const inputMail = document.getElementById('inputMail');

function validateEmail(value) {
  return email_regexp.test(value);
}

function updateInput() {
  if (validateEmail(inputMail.value)) {
    inputMail.style.border = `2px solid #30E333`;
  } else {
    inputMail.style.border = `2px solid #FF6440`;
  }
}

inputMail.addEventListener('input', updateInput);

const password = document.getElementById('password');

const username = document.getElementById('username');

const pattern = {
  charLength: function () {
    if (password.value.length >= 8) {
      return true;
    }
  },
};

const pattern2 = {
  charLength: function () {
    if (username.value.length >= 2) {
      return true;
    }
  },
};

password.addEventListener('keyup', function () {
  patternTest(pattern.charLength());
});

username.addEventListener('keyup', function () {
  patternTest2(pattern2.charLength());
});

function patternTest2(pattern2, response) {
  if (pattern2) {
    username.style.border = `2px solid #30E333`;
  } else {
    username.style.border = `2px solid #FF6440`;
  }
}

function patternTest(pattern, response) {
  if (pattern) {
    password.style.border = `2px solid #30E333`;
  } else {
    password.style.border = `2px solid #FF6440`;
  }
}

const formStepTrigger = document.querySelector('.btn-next');

const formStep = document.querySelectorAll('.popup__step, .popup__thx');

const mesLog = document.getElementById('messenger_login');

const mesType = document.getElementById('messengers');

const goMail = document.getElementById('btn-mail');

for (let x = 0; x < formStep.length; x++) {
  const element = formStep[x];

  formStepTrigger.addEventListener('click', () => {
    console.log(mesLog.value.trim().length)
    if (
      validateEmail(inputMail.value) &&
      username.value.length >= 2 &&
      password.value.length >= 8 &&
      mesLog.value.trim().length >= 1
    ) {
      const formData = {
        email: inputMail.value.trim(),
        password: password.value.trim(),
        username: username.value.trim(),
      };
      if (mesLog.value.trim().length && mesType.value.trim()) {
        formData[mesType.value.trim()] = mesLog.value.trim();
        goMail.href = 'http://' + inputMail.value.split('@').pop();
      }
      console.log(formData)
      RegistrationStep1({ formData });
    } else {
      alert('Заполните все поля');
    }
  });
}

function thx() {
  const thxWrapper = document.querySelector('.popup__thx');

  const formStep = document.querySelectorAll('.popup__step');

  formStep.classList.remove('show');

  thxWrapper.classList.add('show');
}

/*--------------- Form Mobile Step Script ---------------*/

const email_regexpMobile =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const inputMailMobile = document.getElementById('inputMail-mobile');

function validateEmailMobile(value) {
  return email_regexpMobile.test(value);
}

function updateInputMobile() {
  if (validateEmailMobile(inputMailMobile.value)) {
    inputMailMobile.style.border = `2px solid #30E333`;
  } else {
    inputMailMobile.style.border = `2px solid #FF6440`;
  }
}

inputMailMobile.addEventListener('input', updateInputMobile);

const passwordMobile = document.getElementById('password-mobile');

const usernameMobile = document.getElementById('username-mobile');

const pattern3 = {
  charLength: function () {
    if (passwordMobile.value.length >= 8) {
      return true;
    }
  },
};

const pattern4 = {
  charLength: function () {
    if (usernameMobile.value.length >= 2) {
      return true;
    }
  },
};

passwordMobile.addEventListener('keyup', function () {
  patternTest3(pattern3.charLength());
});

usernameMobile.addEventListener('keyup', function () {
  patternTest4(pattern4.charLength());
});

function patternTest4(pattern4, response) {
  if (pattern4) {
    usernameMobile.style.border = `2px solid #30E333`;
  } else {
    usernameMobile.style.border = `2px solid #FF6440`;
  }
}

function patternTest3(pattern3, response) {
  if (pattern3) {
    passwordMobile.style.border = `2px solid #30E333`;
  } else {
    passwordMobile.style.border = `2px solid #FF6440`;
  }
}

const formStepTriggerMobile = document.querySelector('.btn-next-mobile');

const formStepMobile = document.querySelectorAll(
  '.popup__step-mobile, .popup__thx-mobile'
);

const mesLogMobile = document.getElementById('messenger_login-mobile');

const mesTypeMobile = document.getElementById('messengers-mobile');

const goMailMobile = document.getElementById('btn-mail-mobile');

for (let x = 0; x < formStepMobile.length; x++) {
  const elementMobile = formStepMobile[x];

  formStepTriggerMobile.addEventListener('click', () => {
    if (
      validateEmailMobile(inputMailMobile.value) &&
      usernameMobile.value.length >= 2 &&
      passwordMobile.value.length >= 8 &&
      mesLogMobile.value.trim().length >= 1
    ) {
      const formData = {
        email: inputMailMobile.value.trim(),
        password: passwordMobile.value.trim(),
        username: usernameMobile.value.trim(),
      };
      console.log('mobile check')
      formData[mesTypeMobile.value.trim().toLowerCase()] = mesLogMobile.value.trim();
      goMailMobile.href = 'http://' + inputMailMobile.value.split('@').pop();
      console.log(formData);
      RegistrationStep1({
        formData,
      });
    } else {
      alert('Заполните все поля!');
    }
  });
}

function thx() {
  const thxWrapperMobile = document.querySelector('.popup__thx-mobile');

  const formStepMobile = document.querySelectorAll('.popup__step-mobile');

  formStepMobile.classList.remove('show');

  thxWrapperMobile.classList.add('show');
}

function check_ga() {
  if (typeof ga === 'function') {
    if (typeof ga.getAll === 'function' && ga.getAll().length) {
      ga.getAll().forEach((tracker) => {
        gaClientId = tracker.get('clientId');
      });
    } else {
      setTimeout(check_ga, 500);
    }
  } else {
    setTimeout(check_ga, 500);
  }
}

check_ga();

let isRequestDisabled = false;

const RegistrationStep1 = ({
  formData,

  x,
}) => {
  if (isRequestDisabled === true) return false;

  const utm_source = 'PSW_v1';

  const utm_medium = window.localStorage.getItem('utm_medium');

  const utm_campaign = window.localStorage.getItem('utm_campaign');

  const utm_content = window.localStorage.getItem('utm_content');

  const utm_term = window.localStorage.getItem('utm_term');

  const asRuLanguages = ['ru', 'uk', 'uz', 'tg', 'hy', 'kk', 'az', 'ka'];

  const userLang = navigator.language || navigator.userLanguage;

  let langForRegistration = 'en';

  for (var i = 0; i < asRuLanguages.length; i++) {
    var re = new RegExp('^' + asRuLanguages[i] + '.*');

    if (re.test(userLang)) {
      langForRegistration = 'ru';
    }
  }

  formData.lang = langForRegistration;

  var queryString = location.search.substring(1);

  var obj = {};

  var pairs = queryString.split('&');

  for (i in pairs) {
    var split = pairs[i].split('=');

    obj[decodeURIComponent(split[0])] = decodeURIComponent(split[1]);
  }

  formData['utm_source'] = 'PSW_v1';

  if (utm_medium !== undefined) {
    formData['utm_medium'] = utm_medium;
  }

  if (utm_campaign !== undefined) {
    formData['utm_campaign'] = utm_campaign;
  }

  if (utm_content !== undefined) {
    formData['utm_content'] = utm_content;
  }

  if (utm_term !== undefined) {
    formData['utm_term'] = utm_term;
  }

  if (gaClientId) {
    formData['ga_id'] = gaClientId;
  }

  formData.password_repeat = formData.password;

  formData.user_agent = window.navigator.userAgent;

  isRequestDisabled = true;

  grecaptcha
    .execute('6Ld_qZMUAAAAAE0mLqU8OdTvyvnkTfwDMuYvw0vW', {
      action: 'signup',
    })
    .then(function (token) {
      formData.grecaptcha = token;

      $.ajax({
        url: 'https://drcash.io/v1/signup',

        data: JSON.stringify(formData),

        type: 'POST',

        contentType: 'application/json',

        dataType: 'json',

        processData: false,

        success: function (response) {
          if (response.status === 'OK') {
            // document.querySelector('.popup__input-container.verification .popup__placeholder-text').textContent = `Verification code from ${formData.email}`;

            formStep[0].classList.toggle('show');

            formStep[1].classList.toggle('show');

            formStepMobile[0].classList.toggle('show');

            formStepMobile[1].classList.toggle('show');

            // Event snippet for Submit lead form conversion page
            gtag('event', 'conversion', {
              send_to: 'AW-11037036085/rr03CPfProkYELWc744p',
            });

            dataLayer.push({
              event: '_lead',
            });

            fbq('track', 'Lead', {currency: "USD", value: 1.00});
          } else {
            alert('Email is already exist');
          }

          isRequestDisabled = false;
        },

        error: function (response) {
          isRequestDisabled = false;
        },
      });
    });
};

var getUTM = function () {
  var queryString = location.search.substring(1);

  var obj = {};

  var pairs = queryString.split('&');

  for (i in pairs) {
    var split = pairs[i].split('=');

    obj[decodeURIComponent(split[0])] = decodeURIComponent(split[1]);
  }

  if (obj['utm_source'] !== undefined && obj['utm_source'] !== 'undefined') {
    window.localStorage.setItem('utm_source', obj['utm_source']);
  }

  if (obj['utm_medium'] !== undefined && obj['utm_medium'] !== 'undefined') {
    window.localStorage.setItem('utm_medium', obj['utm_medium']);
  }

  if (
    obj['utm_campaign'] !== undefined &&
    obj['utm_campaign'] !== 'undefined'
  ) {
    window.localStorage.setItem('utm_campaign', obj['utm_campaign']);
  }

  if (obj['utm_content'] !== undefined && obj['utm_content'] !== 'undefined') {
    window.localStorage.setItem('utm_content', obj['utm_content']);
  }

  if (obj['utm_term'] !== undefined && obj['utm_term'] !== 'undefined') {
    window.localStorage.setItem('utm_term', obj['utm_term']);
  }
};

getUTM();

var gaClientId;

function check_ga() {
  if (typeof ga === 'function') {
    if (typeof ga.getAll === 'function' && ga.getAll().length) {
      ga.getAll().forEach((tracker) => {
        gaClientId = tracker.get('clientId');
      });
    } else {
      setTimeout(check_ga, 500);
    }
  } else {
    setTimeout(check_ga, 500);
  }
}

check_ga();
