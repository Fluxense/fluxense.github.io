var $ = document.querySelector.bind(document),
  $$ = document.querySelectorAll.bind(document)

/**
 * 
 * @param {Element} e Element for DOM modification 
 * @param {boolean} visible Self-explanatory. true = visible, false = hidden
 * @param {boolean} useAttr Using visibility attribute will prevent smooth navbar transition 
 */
function setVisibility(e, visible, useAttr = true) {
  if (visible) {
    e.style.visibility = "visible"
    if (useAttr) {
      e.removeAttribute("hidden")
    }
  } else {
    e.style.visibility = "hidden"
    if (useAttr) {
      e.setAttribute("hidden", true)
    }
  }
  e.classList.add(visible ? 'show' : 'hide')
  e.classList.remove(visible ? 'hide' : 'show')
}

function onLogoClick() { }

;
/**
 * termynal.js
 * A lightweight, modern and extensible animated terminal window, using
 * async/await.
 * 
 * Attention: Contains modifications for osprey-light to make it even more lightweight!
 * 
 * @author Ines Montani <ines@ines.io>
 * @version 0.0.1
 * @license MIT
 */

'use strict';

/** Generate a terminal widget. */
class Termynal {
    /**
     * Construct the widget's settings.
     * @param {(string|Node)=} container - Query selector or container element.
     * @param {Object=} options - Custom settings.
     * @param {string} options.prefix - Prefix to use for data attributes.
     * @param {number} options.startDelay - Delay before animation, in ms.
     * @param {number} options.typeDelay - Delay between each typed character, in ms.
     * @param {number} options.lineDelay - Delay between each line, in ms.
     * @param {number} options.progressLength - Number of characters displayed as progress bar.
     * @param {string} options.progressChar – Character to use for progress bar, defaults to █.
	 * @param {number} options.progressPercent - Max percent of progress.
     * @param {string} options.cursor – Character to use for cursor, defaults to ▋.
     * @param {Object[]} lineData - Dynamically loaded line data objects.
     * @param {boolean} options.noInit - Don't initialise the animation.
     */
    constructor(container = '#termynal', options = {}) {
        this.container = (typeof container === 'string') ? document.querySelector(container) : container;
        this.pfx = `data-${options.prefix || 'ty'}`;
        this.startDelay = options.startdelay || <no value>;
        this.typeDelay = options.typedelay || <no value>;
        this.lineDelay = options.linedelay || <no value>;
        this.progressLength = options.progresslength || <no value>;
        this.progressChar = options.progresschar || '<no value>';
        this.progressPercent = options.progressPercent || 100;
        this.showPercent = ("showpercent" in options && options.showpercent)
                           || (!"showpercent" in options && <no value>);
        this.onExitCommand = options.onExitCommand;
        this.cursor = options.cursor || '▋';
        if (!options.noInit) this.init()
    }

    /**
     * Initialise the widget, get lines, clear container and start animation.
     */
    init() {
        // Appends dynamically loaded lines to existing line elements.
        this.lines = [...this.container.querySelectorAll(`[${this.pfx}]`)].concat(this.lineData);

        /** 
         * Calculates width and height of Termynal container.
         * If container is empty and lines are dynamically loaded, defaults to browser `auto` or CSS.
         */ 
        const containerStyle = getComputedStyle(this.container);
        this.container.style.width = containerStyle.width !== '0px' ? 
            containerStyle.width : undefined;
        this.container.style.minHeight = containerStyle.height !== '0px' ? 
            containerStyle.height : undefined;

        this.container.setAttribute('data-termynal', '');
        this.container.innerHTML = '';
        this.start();
    }

    /**
     * Start the animation and rener the lines depending on their data attributes.
     */
    async start() {
        await this._wait(this.startDelay);

        for (let line of this.lines) {
            if (typeof line === 'undefined') { break }
            const type = line.getAttribute(this.pfx);
            const delay = line.getAttribute(`${this.pfx}-delay`) || this.lineDelay;

            if (type == 'input') {
                line.setAttribute(`${this.pfx}-cursor`, this.cursor);
                await this.type(line);
                await this._wait(delay);
                if (line.textContent === 'exit' && typeof this.onExitCommand !== 'undefined') {
                    this.onExitCommand()
                }
            }

            else if (type == 'progress') {
                await this.progress(line);
                await this._wait(delay);
            }

            else {
                this.container.appendChild(line);
                await this._wait(delay);
            }

            line.removeAttribute(`${this.pfx}-cursor`);
        }
    }

    /**
     * Animate a typed line.
     * @param {Node} line - The line element to render.
     */
    async type(line) {
        const chars = [...line.textContent];
        const delay = line.getAttribute(`${this.pfx}-typeDelay`) || this.typeDelay;
        line.textContent = '';
        this.container.appendChild(line);

        for (let char of chars) {
            await this._wait(delay);
            line.textContent += char;
        }


    }

    /**
     * Animate a progress bar.
     * @param {Node} line - The line element to render.
     */
    async progress(line) {
        const progressLength = line.getAttribute(`${this.pfx}-progressLength`)
            || this.progressLength;
        const progressChar = line.getAttribute(`${this.pfx}-progressChar`)
            || this.progressChar;
        const chars = progressChar.repeat(progressLength);
		const progressPercent = line.getAttribute(`${this.pfx}-progressPercent`)
            || this.progressPercent;
        line.textContent = '';
        this.container.appendChild(line);

        for (let i = 1; i < chars.length + 1; i++) {
            await this._wait(this.typeDelay);
            const percent = Math.round(i / chars.length * 100);
            line.textContent = `${chars.slice(0, i)}`;
            if (this.showPercent) {
                line.textContent += ` ${percent}%`
            }
			if (percent > progressPercent) {
				break;
			}
        }
    }

    /**
     * Helper function for animation delays, called with `await`.
     * @param {number} time - Timeout, in ms.
     */
    _wait(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
}

;
function handleNavBar(isMainPage) {
  menuActive = false
  var nav = $('nav')

  function setFixedNav(isFixed) {
    if (isFixed) {
      // Fixed to top
      nav.classList.add('nav-fixed')
      nav.classList.add('nav-shadow')

      $$('nav > .logo, nav > .nav-toggle').forEach(function (el) {
        setVisibility(el, true, false)
      })
    } else {
      // Not fixed, at bottom
      nav.classList.remove('nav-fixed')
      nav.classList.remove('nav-shadow')

      $$('nav > .logo, nav > .nav-toggle').forEach(function (el) {
        setVisibility(el, false, false)
      })
    }
  }

  if (isMainPage) {
    // Nav starts at bottom then is fixed to top
    // Logo and hamburger menus fade in and out
    // Scrollspy partly adapted from https://medium.com/p/-3131c114abdc
    document.addEventListener('DOMContentLoaded', function () {
      const ITEMS = [...$$(".nav-item")]
      const SECTIONS = [...$$("main > section")].reverse()
      const THRESHOLD = 340
      var oldIdx = -1

      window.addEventListener("scroll", () => {
        var scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop,
          windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
          navHeight = nav.clientHeight

        if (scrollPosition > windowHeight - navHeight) {
          setFixedNav(true)
        } else {
          setFixedNav(false)
        }
        const idx = SECTIONS.length - 1 - SECTIONS.findIndex(
          (sec) => scrollPosition > sec.offsetTop - THRESHOLD
        )
        if (idx != oldIdx) {
          ITEMS.forEach((itm) => itm.classList.remove("nav-item-active"))
          ITEMS[idx].classList.add("nav-item-active")
          oldIdx = idx
        }
      });
    }, false);
  } else {
    setFixedNav(true)
  }

  function toggle() {
    if (menuActive) {
      $('#open').classList.remove('icon-active')
      menuActive = false
    } else {
      $('#open').classList.add('icon-active')
      menuActive = true
    }
  }

  // Full screen nav open on click
  $('.nav-icon').addEventListener('click', function () {
    toggle()
    $$('.nav-full, main').forEach(function (el) {
      el.classList.toggle('active')
    })
  })

  // Full screen nav close on click
  $$('.nav-full a').forEach(function (links) {
    links.addEventListener('click', function () {
      toggle()
      $$('.nav-full, main').forEach(function (el) {
        el.classList.toggle('active')
      })
    })
  })

  // Fix logoBig drawing over nav when click on logoSmall while nav open
  $('.logo').addEventListener('click', function () {
    toggle()
    if ($('.nav-full').classList.contains('active')) {
      $$('.nav-full, main').forEach(function (el) {
        el.classList.toggle('active')
      })
    }
  })

  // Disable scroll when full screen nav is open
  $('body').addEventListener('click', function () {
    if ($('.nav-full').classList.contains('active')) {
      $('html').style.overflowY = 'hidden'
    } else {
      $('html').style.overflowY = 'scroll'
    }
  })

  // Mobile browsers viewport height bug fix
  // TODO(kdevo): Verify relevance
  function fullMobileViewport() {
    var element = this,
      viewportHeight = window.innerHeight,
      heightChangeTolerance = 100 // Approximate address bar height in Chrome

    $(window).resize(function () {
      if (Math.abs(viewportHeight - window.innerHeight) > heightChangeTolerance) {
        viewportHeight = window.innerHeight
        update()
      }
    })

    function update() {
      element.style.height = (viewportHeight + 'px')
    }

    update()
  }

  $$('header').forEach(function () {
    fullMobileViewport
  })
}

;
(function () {
  var realmsg = $('textarea[name=message2]')
  var honeypotmsg = $('textarea[name=message]')

  if (realmsg === null) {
    return;
  }
  setVisibility(realmsg, true)
  setVisibility(honeypotmsg, false)

  // For spam protection, we use "message" as a honeypot field:
  honeypotmsg.removeAttribute("required")

  $('#form-contact').addEventListener('submit', function (e) {
    e.preventDefault()

    // Store form field values
    var name = $('input[name=name]').value,
      email = $('input[name=email]').value,
      subject = $('input[name=_subject]').value,
      matter = $('select[name=matter]').value,
      message = realmsg.value,
      honeypot = honeypotmsg.value

    // AJAX request
    var request = new XMLHttpRequest(),
      data = {
        name: name,
        _replyto: email,
        email: email,
        _subject: subject,
        _matter: matter,
        message: message,
      }
    if (honeypot !== "") {
      data._anti_spam_honeypot = honeypot
    }

    var sending = $('#form-sending'),
      submit = $('#form-submit'),
      thanks = $('#form-thankyou'),
      error = $('#form-error')

    setVisibility(submit, false)
    setVisibility(sending, true)

    // Send to Basin
    request.open('POST', 'https://usebasin.com/f/1ed3733a7692', true)
    request.setRequestHeader('Content-Type', 'application/json')
    request.setRequestHeader('Accept', 'application/json')
    // Call function when the state changes
    request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          // Reset form
          $('#form-contact').reset()

          function thankYouFadeIn() {
            setVisibility(sending, false)
            setVisibility(thanks, true)

            setTimeout(thankYouFadeOut, 6000)
          };

          function thankYouFadeOut() {
            setVisibility(thanks, false)
            setVisibility(submit, true)
          };

          thankYouFadeIn()
        } else {
          // Reset form
          $('#form-contact').reset()

          setVisibility(error, true)
        }
      }
    }
    request.send(JSON.stringify(data))
  })
})()
