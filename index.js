const stream = require('stream');
const waveheader = require('waveheader');
module.exports = class PCM2WAV {
  constructor(options) {
    var pcm2wav = new stream.Transform(),
        options = options || {};
    options.size = options.size || 0;
    options.channels = options.channels || 1;
    options.sampleRate = options.sampleRate || 16000;
    pcm2wav._transform = function(chunk, encoding, done) {
      if (!this._initialized) {
        this.push(waveheader(options.size, {
  				channels: options.channels,
  				sampleRate: options.sampleRate
  			}));
        this._initialized = true;
      }
      this.push(chunk);
      done();
    }
    return pcm2wav;
  }
}
