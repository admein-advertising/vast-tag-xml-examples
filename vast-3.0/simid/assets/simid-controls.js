(function () {
  'use strict';

  /**
   * UI controller for SIMID creative playback controls.
   */
  class SimidControls {
    /**
     * @param {!Object} creative The creative instance to control.
     */
    constructor(creative) {
      this.creative_ = creative;
      this.playToggleButton_ = null;
      this.statusEl_ = document.querySelector('[data-status]');
      this.rootEl_ = document.querySelector('[data-controls]');
      this.bindControls_();
    }

    /**
     * Connects UI controls to SIMID requests and status updates.
     */
    bindControls_() {
      var rootEl = this.rootEl_ || document;
      var buttons = rootEl.querySelectorAll('[data-action]');
      if (!buttons || buttons.length === 0) {
        return;
      }

      buttons.forEach(function (button) {
        var action = button.getAttribute('data-action');
        if (action !== 'toggle-play') {
          return;
        }

        this.playToggleButton_ = button;
        this.setPlayState(false);

        button.addEventListener('click', function () {
          if (this.isPlaying_()) {
            this.updateStatus_('Request pause');
            this.handleRequest_(
              this.creative_.requestPause(),
              'Pause resolved',
              'Pause rejected',
              false
            );
          } else {
            this.updateStatus_('Request play');
            this.handleRequest_(
              this.creative_.requestPlay(),
              'Play resolved',
              'Play rejected',
              true
            );
          }
        }.bind(this));
      }.bind(this));
    }

    /**
     * Returns true when the UI believes playback is active.
     * @return {boolean}
     */
    isPlaying_() {
      return this.playToggleButton_ && this.playToggleButton_.getAttribute('data-state') === 'playing';
    }

    /**
     * Updates the play/pause button icon and accessibility label.
     * @param {boolean} isPlaying
     */
    setPlayState(isPlaying) {
      if (!this.playToggleButton_) {
        return;
      }

      if (isPlaying) {
        this.playToggleButton_.setAttribute('data-state', 'playing');
        this.playToggleButton_.classList.add('is-playing');
        this.playToggleButton_.setAttribute('aria-label', 'Pause');
      } else {
        this.playToggleButton_.setAttribute('data-state', 'paused');
        this.playToggleButton_.classList.remove('is-playing');
        this.playToggleButton_.setAttribute('aria-label', 'Play');
      }
    }

    /**
     * Updates the status text in the creative UI.
     * @param {string} text
     */
    updateStatus_(text) {
      if (this.statusEl_) {
        this.statusEl_.textContent = text;
      }
    }

    /**
     * Handles SIMID promises and maps result to status text/UI state.
     * @param {?Promise} promise
     * @param {string} successText
     * @param {string} errorText
     * @param {?boolean} nextIsPlaying
     * @param {?string} timeoutText
     */
    handleRequest_(promise, successText, errorText, nextIsPlaying, timeoutText) {
      if (!promise || typeof promise.then !== 'function') {
        this.updateStatus_(errorText);
        return;
      }

      var timeoutId = null;
      if (timeoutText) {
        timeoutId = window.setTimeout(function () {
          this.updateStatus_(timeoutText);
        }.bind(this), 1500);
      }

      promise.then(function () {
        if (timeoutId) {
          window.clearTimeout(timeoutId);
        }
        this.updateStatus_(successText);
        if (typeof nextIsPlaying === 'boolean') {
          this.setPlayState(nextIsPlaying);
        }
      }.bind(this)).catch(function (error) {
        if (timeoutId) {
          window.clearTimeout(timeoutId);
        }
        this.updateStatus_(errorText);
        if (typeof console !== 'undefined' && console.warn) {
          console.warn('[SIMID Controls] Request failed', error);
        }
      }.bind(this));
    }
  }

  window.SimidControls = SimidControls;
})();
