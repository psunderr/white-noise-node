(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.WhiteNoiseNode = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var noiseData = new Float32Array(48000 * 5);
var noiseBuffer = null;

for (var i = 0, imax = noiseData.length; i < imax; i++) {
  noiseData[i] = Math.random() * 2 - 1;
}

function WhiteNoiseNode(audioContext) {
  if (noiseBuffer === null) {
    noiseBuffer = audioContext.createBuffer(1, noiseData.length, audioContext.sampleRate);
    noiseBuffer.getChannelData(0).set(noiseData);
  }
  var bufferSource = audioContext.createBufferSource();

  bufferSource.buffer = noiseBuffer;
  bufferSource.loop = true;

  return bufferSource;
}

WhiteNoiseNode.install = function(audioContext) {
  Object.defineProperty(audioContext.prototype, "createWhiteNoise", {
    value: function() {
      return new WhiteNoiseNode(this);
    },
    enumerable: false, writable: false, configurable: true
  });
};

module.exports = WhiteNoiseNode;

},{}]},{},[1])(1)
});
