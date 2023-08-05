/*! flmml-on-html5 v2.0.2 | (c) 2015, argentum384 (c) 2007, Takeshi OKUBO | BSD-3-Clause | https://github.com/argentum384/flmml-on-html5 */
!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var s=t();for(var o in s)("object"==typeof exports?exports:e)[o]=s[o]}}(self,(function(){return(()=>{var e={587:(e,t,s)=>{var o;void 0===(o=function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.MsgTypes=t.SAMPLE_RATE=void 0,t.SAMPLE_RATE=44100,t.MsgTypes={BOOT:1,PLAY:2,STOP:3,PAUSE:4,COMPCOMP:6,BUFRING:7,COMPLETE:8,SYNCINFO:9,PLAYSOUND:10,STOPSOUND:11,EXPORT:12}}.apply(t,[s,t]))||(e.exports=o)},581:(e,t,s)=>{var o;void 0===(o=function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FlMMLAudioExportError=void 0;class s extends Error{constructor(...e){super(...e),this.name="FlMMLAudioExportError"}}t.FlMMLAudioExportError=s}.apply(t,[s,t]))||(e.exports=o)},643:function(e,t,s){var o,i,r=this&&this.__awaiter||function(e,t,s,o){return new(s||(s=Promise))((function(i,r){function n(e){try{u(o.next(e))}catch(e){r(e)}}function a(e){try{u(o.throw(e))}catch(e){r(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(n,a)}u((o=o.apply(e,t||[])).next())}))};o=[s,t,s(587),s(581),s(158)],void 0===(i=function(e,t,s,o,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FlMMLonHTML5=t.FlMMLAudioExportError=t.FlMML=void 0,Object.defineProperty(t,"FlMMLAudioExportError",{enumerable:!0,get:function(){return o.FlMMLAudioExportError}});const n="flmml-on-html5.worker.js";class a{constructor(e=n){this.booted=!1,this.volume=100,this.events={},this.workletModuleLoaded=!1,this.totalMSec=0,this.totalTimeStr="00:00",this.warnings="",this.metaTitle="",this.metaComment="",this.metaArtist="",this.metaCoding="",this._isPlaying=!1,this._isPaused=!1,this.nowMSec=0,this.nowTimeStr="00:00",this.voiceCount=0,"string"==typeof e&&(e={workerURL:e});const t=e.workerURL||n,s=e.infoInterval>=0?e.infoInterval:125;this.bufferSize=e.bufferSize>=128?Math.floor(e.bufferSize-e.bufferSize%128):8192,this.bufferMultiple=e.bufferMultiple>=1?Math.floor(e.bufferMultiple):32,this.lamejsURL=e.lamejsURL;(this.worker=new Worker(e.crossOriginWorker?URL.createObjectURL(new Blob([`importScripts("${t}")`],{type:"application/javascript"})):t)).addEventListener("message",(e=>{this.onMessage(e)})),this.setInfoInterval(s)}static initWebAudio(){const e=a.audioCtx=new AudioContext({sampleRate:s.SAMPLE_RATE}),t=e.createBufferSource();t.connect(e.destination),t.start(0),e.resume(),t.stop()}static hookInitWebAudio(e){const t=document.querySelectorAll(e);t.forEach((e=>{e.addEventListener("click",(function e(){a.audioCtx||a.initWebAudio(),t.forEach((t=>{t.removeEventListener("click",e,!0)}))}),!0)}))}static prepare(e){"loading"===document.readyState?document.addEventListener("DOMContentLoaded",(()=>{a.hookInitWebAudio(e)})):a.hookInitWebAudio(e)}onMessage(e){const t=e.data;switch(t.type){case s.MsgTypes.COMPCOMP:this.totalMSec=t.info.totalMSec,this.totalTimeStr=t.info.totalTimeStr,this.warnings=t.info.warnings,this.metaTitle=t.info.metaTitle,this.metaComment=t.info.metaComment,this.metaArtist=t.info.metaArtist,this.metaCoding=t.info.metaCoding,this.oncompilecomplete&&this.oncompilecomplete(),this.trigger("compilecomplete");break;case s.MsgTypes.BUFRING:this.onbuffering&&this.onbuffering(t),this.trigger("buffering",{progress:t.progress});break;case s.MsgTypes.COMPLETE:this.oncomplete&&this.oncomplete(),this.trigger("complete");break;case s.MsgTypes.SYNCINFO:this._isPlaying=t.info._isPlaying,this._isPaused=t.info._isPaused,this.nowMSec=t.info.nowMSec,this.nowTimeStr=t.info.nowTimeStr,this.voiceCount=t.info.voiceCount,this.onsyncinfo&&this.onsyncinfo(),this.trigger("syncinfo");break;case s.MsgTypes.PLAYSOUND:this.playSound();break;case s.MsgTypes.STOPSOUND:this.stopSound();break;case s.MsgTypes.EXPORT:t.data?this.completeAudioExport(t.data):this.errorAudioExport(t.errorMsg)}}boot(){this.worker.postMessage({type:s.MsgTypes.BOOT,bufferSize:this.bufferSize,bufferMultiple:this.bufferMultiple,lamejsURL:this.lamejsURL}),this.booted=!0}playSound(){if(this.gainNode||this.workletNode)return;const e=a.audioCtx,t=this.gainNode=e.createGain();t.gain.value=this.volume/127,t.connect(e.destination),(()=>{r(this,void 0,void 0,(function*(){this.workletModuleLoaded||(yield new Promise((t=>{const s=new FileReader;s.onload=s=>{e.audioWorklet.addModule(s.target.result).then(t)},s.readAsDataURL(new Blob([i.FlMMLWorkletScript],{type:"application/javascript"}))})),this.workletModuleLoaded=!0);const o=this.workletNode=new AudioWorkletNode(e,"flmml-worklet-processor",{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[2]});o.connect(t),this.worker.postMessage({type:s.MsgTypes.PLAYSOUND,workletPort:o.port},[o.port])}))})()}stopSound(){this.gainNode&&(this.gainNode.disconnect(),this.gainNode=null),this.workletNode&&(this.workletNode.disconnect(),this.workletNode=null),this.worker.postMessage({type:s.MsgTypes.STOPSOUND})}trigger(e,t){const s=this.events[e];if(!s)return;const o={};for(let e in t)o[e]=t[e];for(let e=0,t=s.length;e<t;e++)s[e]&&s[e].call(this,o)}exportAudio(e,t,i={}){return a.audioCtx||a.initWebAudio(),this.booted||this.boot(),new Promise(((r,n)=>{this.audioExportResolve?n(new o.FlMMLAudioExportError("Another process is already running")):(this.worker.postMessage(Object.assign({type:s.MsgTypes.EXPORT,mml:e,format:t},i)),this.audioExportResolve=r,this.audioExportReject=n)}))}completeAudioExport(e){this.audioExportResolve&&(this.audioExportResolve(e),this.audioExportResolve=null,this.audioExportReject=null)}errorAudioExport(e){this.audioExportReject&&(this.audioExportReject(new o.FlMMLAudioExportError(e)),this.audioExportResolve=null,this.audioExportReject=null)}play(e){a.audioCtx||a.initWebAudio(),this.booted||this.boot(),this.worker.postMessage({type:s.MsgTypes.PLAY,mml:e})}stop(){this.worker.postMessage({type:s.MsgTypes.STOP})}pause(){this.worker.postMessage({type:s.MsgTypes.PAUSE})}exportWav(e){return this.exportAudio(e,"wav")}exportMp3(e,t){return this.exportAudio(e,"mp3",{bitrate:t})}setMasterVolume(e){this.volume=e,this.gainNode&&(this.gainNode.gain.value=this.volume/127)}isPlaying(){return this._isPlaying}isPaused(){return this._isPaused}getWarnings(){return this.warnings}getTotalMSec(){return Math.floor(this.totalMSec)}getTotalTimeStr(){return this.totalTimeStr}getNowMSec(){return Math.floor(this.nowMSec)}getNowTimeStr(){return this.nowTimeStr}getVoiceCount(){return this.voiceCount}getMetaTitle(){return this.metaTitle}getMetaComment(){return this.metaComment}getMetaArtist(){return this.metaArtist}getMetaCoding(){return this.metaCoding}setInfoInterval(e){this.worker.postMessage({type:s.MsgTypes.SYNCINFO,interval:e})}syncInfo(){this.worker.postMessage({type:s.MsgTypes.SYNCINFO,interval:null})}addEventListener(e,t){let s=this.events[e];s||(s=this.events[e]=[]);for(let e=s.length;e--;)if(s[e]===t)return!1;return s.push(t),!0}removeEventListener(e,t){const s=this.events[e];if(!s)return!1;for(let e=s.length;e--;)if(s[e]===t)return s.splice(e,1),!0;return!1}release(){this.stopSound(),this.worker.terminate()}}t.FlMML=a,t.FlMMLonHTML5=a}.apply(t,o))||(e.exports=i)},158:(e,t,s)=>{"use strict";s.r(t),s.d(t,{FlMMLWorkletScript:()=>o});const o='registerProcessor("flmml-worklet-processor",class extends AudioWorkletProcessor{constructor(...s){super(...s),this.buffer=null,this.backBuffer=null,this.bufferId=1,this.offset=0,this.reqTimes=0,this.reqCount=0,this.release=!1,this.port.addEventListener("message",(s=>this.onMessage(s))),this.port.start()}process(s,e,t){if(this.buffer){if(e[0][0].set(this.buffer[0].subarray(this.offset,this.offset+128)),e[0][1].set(this.buffer[1].subarray(this.offset,this.offset+128)),this.offset+=128,this.offset>=this.buffer[0].length){const s=this.buffer;this.backBuffer?(this.buffer=this.backBuffer,this.backBuffer=null):this.buffer=null,this.offset=0,this.port.postMessage({bufferId:this.bufferId,retBuf:s},[s[0].buffer,s[1].buffer])}}else e[0][0].fill(0),e[0][1].fill(0),++this.reqCount>=1<<this.reqTimes&&(this.port.postMessage({bufferId:this.bufferId,retBuf:null}),this.reqTimes<10&&this.reqTimes++,this.reqCount=0);return!this.release}onMessage(s){const e=s.data;e.buffer&&(this.bufferId++,this.buffer?this.backBuffer=e.buffer:(this.buffer=e.buffer,this.reqTimes=0,this.reqCount=0,this.port.postMessage({bufferId:this.bufferId,retBuf:null}))),e.release&&(this.release=!0)}});'}},t={};function s(o){var i=t[o];if(void 0!==i)return i.exports;var r=t[o]={exports:{}};return e[o].call(r.exports,r,r.exports,s),r.exports}return s.d=(e,t)=>{for(var o in t)s.o(t,o)&&!s.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s(643)})()}));