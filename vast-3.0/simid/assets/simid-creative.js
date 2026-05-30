(function () {
  'use strict';

  if (typeof BaseSimidCreative === 'undefined') {
    throw new Error('BaseSimidCreative is required before simid-creative.js');
  }

  class SimidCreative extends BaseSimidCreative {
    /**
     * Initializes the creative and binds UI controls.
     */
    constructor() {
      super();
      this.controls_ = typeof SimidControls !== 'undefined' ? new SimidControls(this) : null;
      this.dialog_ = typeof SimidDialog !== 'undefined' ? new SimidDialog(this) : null;
    }

    /**
     * Asks the player to start playback.
     * @return {!Promise}
     */
    requestPlay() {
      return this.simidProtocol.sendMessage(CreativeMessage.REQUEST_PLAY, {});
    }

    /**
     * Asks the player to pause playback.
     * @return {!Promise}
     */
    requestPause() {
      return this.simidProtocol.sendMessage(CreativeMessage.REQUEST_PAUSE, {});
    }

    /**
     * Asks the player to set the volume (not currently used by UI).
     * @param {number} volume
     * @return {!Promise}
     */
    requestVolume(volume) {
      return this.simidProtocol.sendMessage(CreativeMessage.REQUEST_VOLUME, { volume: volume });
    }

    /**
     * Handles the player INIT handshake and returns creative metadata.
     * @param {!Object} eventData
     */
    onInit(eventData) {
      this.updateInternalOnInit(eventData);
      this.simidProtocol.resolve(eventData, {
        creativeVersion: '1.0.0'
      });
    }

    /**
     * Handles the player START and requests initial media state.
     * @param {!Object} eventData
     */
    onStart(eventData) {
      this.simidProtocol.resolve(eventData, {});
      this.fetchMediaState();
    }

    /**
     * Syncs the play/pause toggle after a media state response.
     * @param {!Object} data
     */
    onGetMediaStateResolve(data) {
      super.onGetMediaStateResolve(data);
      var paused = data && typeof data.paused === 'boolean' ? data.paused : this.videoState.paused;
      if (this.controls_) {
        this.controls_.setPlayState(!paused);
      }
    }

    /**
     * Reflects SIMID play events in the UI.
     */
    onPlay() {
      super.onPlay();
      if (this.controls_) {
        this.controls_.setPlayState(true);
      }
    }

    /**
     * Reflects SIMID playing events in the UI.
     */
    onPlaying() {
      super.onPlaying();
      if (this.controls_) {
        this.controls_.setPlayState(true);
      }
    }

    /**
     * Reflects SIMID pause events in the UI.
     */
    onPause() {
      super.onPause();
      if (this.controls_) {
        this.controls_.setPlayState(false);
      }
    }

    /**
     * Dumps player log messages to the console for debugging.
     * @param {!Object} data
     */
    onReceivePlayerLog(data) {
      var logMessage = data && data.args ? data.args.message : '';
      if (typeof console !== 'undefined' && console.log) {
        console.log('[SIMID Creative] ' + logMessage);
      }
    }
  }

  var creative = new SimidCreative();
  creative.ready();
  window.simidCreative = creative;
})();
