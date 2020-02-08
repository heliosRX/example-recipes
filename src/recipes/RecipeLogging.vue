<template>
  <div class="">
    <div class="button btns">
      <button class="btn" @click="log()">LOG</button>
      <button class="btn" @click="enableDebugOutput()">Enable Trace</button>
      <button class="btn" @click="enableAll(true)">Enable All</button>
      <button class="btn" @click="enableAll(false)">Disable All</button>
    </div>
    <div class="button btns">
      <button class="btn" @click="enableWarningDefineUnknownProp(true)">Enable specific Warnings</button>
      <button class="btn" @click="enableWarningDefineUnknownProp(false)">Disable specific Warnings</button>
    </div>

    <li v-for="(log, name) in loggerLevels" :key="log.key">
      <code style="display: inline-block; width: 300px">{{name}}</code>
      <span style="display: inline-block; width: 300px">{{log.key}}</span>
      {{levels[ log.level ]}}
      <button class="" @click="enableChannel(log.key, true)">Enable</button>
      <button class="" @click="enableChannel(log.key, false)">Disable</button>
    </li>

    <pre>loggerGlobalLevel: {{loggerGlobalLevel}}</pre>
    <!-- <pre>channels: {{channels}}</pre> -->
    <pre>levels: {{levels}}</pre>
    <!-- <pre>loggerLevels: {{loggerLevels}}</pre> -->
  </div>
</template>

<script>
import Vue from 'vue'
import { heliosLogger } from 'heliosRX'

export default {
  title: "Recipe Logging",
  description: "Configure heliosRX loggers",
  hide: false,
  index: 3,
  data: () => ({
    loggerLevels: {}
  }),
  created() {
    this.updateLoggerLevels();
  },
  computed: {
    channels() {
      return Object.keys(heliosLogger.channels);
    },
    levels() {
      return Object.keys(heliosLogger.levels);
    },
    loggerGlobalLevel() {
      return heliosLogger.getLevel();
    },
  },
  methods: {
    updateLoggerLevels() {
      let result = {}
      this.channels.slice(0).sort().forEach(channel => {
        let key = heliosLogger.channels[channel];
        let logger = heliosLogger.getLogger( key )
        Vue.set( this.loggerLevels, channel, { level: logger.getLevel(), key: key })
      })
    },
    log() {
      heliosLogger.getLogger( heliosLogger.channels.INFO_COMMON ).info("COMMON INFO")
    },
    printCurrentLevel( id = null ) {
      let logger = heliosLogger;
      if ( id ) {
        logger = heliosLogger.getLogger( id )
      }
      console.log("level =", this.levels[ logger.getLevel() ])
    },
    enableAll( enable ) {
      if ( enable ) {
        heliosLogger.enableAll();
      } else {
        heliosLogger.disableAll();
      }
      this.printCurrentLevel();
      this.updateLoggerLevels();
    },
    enableChannel( id, enable ) {
      if ( enable ) {
        heliosLogger
          .getLogger( id )
          // .setLevel('warn')
          .setLevel('trace')
      } else {
        heliosLogger
          .getLogger( id )
          .setLevel('silent')
      }
      this.printCurrentLevel( id );
      this.updateLoggerLevels();
    },
    enableWarningDefineUnknownProp( enable ) {
      if ( enable ) {
        heliosLogger
          .getLogger( heliosLogger.channels.WARNING_DEFINE_UNKNOWN_PROP )
          .setLevel('info') // trace
      } else {
        heliosLogger
          .getLogger( heliosLogger.channels.WARNING_DEFINE_UNKNOWN_PROP )
          .setLevel('silent')
      }
      this.printCurrentLevel( heliosLogger.channels.WARNING_DEFINE_UNKNOWN_PROP );
      this.updateLoggerLevels();
    },
    enableDebugOutput() {
      heliosLogger
        .getLogger( heliosLogger.channels.INFO_COMMON )
        .setLevel('trace')
      this.printCurrentLevel( heliosLogger.channels.INFO_COMMON );
      this.updateLoggerLevels();
    }
  }
}
</script>

<style>
</style>
