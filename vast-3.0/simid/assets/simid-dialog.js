(function () {
  'use strict';

  /**
   * Dialog controller for SIMID creatives.
   */
  class SimidDialog {
    /**
     * @param {!Object} creative The creative instance to control.
     */
    constructor(creative) {
      this.creative_ = creative;
      this.dialogEl_ = document.querySelector('[data-dialog]');
      this.learnMoreButton_ = document.querySelector('[data-action="learn-more"]');
      this.closeButton_ = document.querySelector('[data-dialog-close]');
      this.bindDialog_();
    }

    /**
     * Wires dialog open/close behavior.
     */
    bindDialog_() {
      if (this.learnMoreButton_) {
        this.learnMoreButton_.addEventListener('click', function () {
          this.requestPause_();
          this.open();
        }.bind(this));
      }

      if (this.closeButton_) {
        this.closeButton_.addEventListener('click', function () {
          this.close();
        }.bind(this));
      }

      document.addEventListener('click', function (event) {
        var openTrigger = event.target.closest('[data-action="learn-more"]');
        if (openTrigger) {
          this.requestPause_();
          this.open();
          return;
        }

        var closeTrigger = event.target.closest('[data-dialog-close]');
        if (closeTrigger) {
          this.close();
        }
      }.bind(this));

      if (this.dialogEl_) {
        this.dialogEl_.addEventListener('click', function (event) {
          if (event.target === this.dialogEl_) {
            this.close();
          }
        }.bind(this));
      }
    }

    /**
     * Opens the dialog.
     */
    open() {
      if (!this.dialogEl_) {
        return;
      }

      this.dialogEl_.classList.add('is-open');
    }

    /**
     * Closes the dialog.
     */
    close() {
      if (!this.dialogEl_) {
        return;
      }

      this.dialogEl_.classList.remove('is-open');
      this.requestPlay_();
    }

    /**
     * Requests a pause from the player before showing the dialog.
     */
    requestPause_() {
      if (!this.creative_ || typeof this.creative_.requestPause !== 'function') {
        return;
      }

      this.creative_.requestPause();
    }

    /**
     * Requests playback resume after dialog closes.
     */
    requestPlay_() {
      if (!this.creative_ || typeof this.creative_.requestPlay !== 'function') {
        return;
      }

      this.creative_.requestPlay();
    }
  }

  window.SimidDialog = SimidDialog;
})();
