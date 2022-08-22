<template>
    <div>
        <div style="text-align: center;">
            <div style="position:relative; display: inline-block; ">
                <vue-audio-mixer
                    :config="config"
                    size="medium"
                    theme="dark"
                    @loaded="loadedChange"
                    @input="setConfig"
                    :showPan="true"
                    :showTotalTime="true"
                />
            </div>
        </div>

    </div>
</template>

<script>
import VueAudioMixer from '../src/components/Mixer.vue';
import '../src/scss/main.scss';

export default {
    name: 'app',
    components: {
        VueAudioMixer,
    },
    data() {
    return {
      is_loaded:false,
      newconfig:{},
      config: {
       "tracks": [
          {
            "title": "Bass",
            "url": "/tracks/Blues For Alice 160bpm_Bass.mp3",
            "pan": 0,
            "gain": 1,
            "muted": false,
            "hidden": false
          },
          {
            "title": "Click",
            "url": "/tracks/Blues For Alice 160bpm_Click.mp3",
            "pan": 0,
            "gain": 0.2,
            "muted": false,
            "hidden": false
          },
          {
            "title": "Count In",
            "url": "/tracks/Blues For Alice 160bpm_Count In.mp3",
            "pan": 0,
            "gain": 1,
            "muted": false,
            "hidden": false
          },
          {
            "title": "Drums",
            "url": "/tracks/Blues For Alice 160bpm_Drums.mp3",
            "pan": 0,
            "gain": 1,
            "muted": false,
            "hidden": false
          },
          {
            "title": "Keys",
            "url": "/tracks/Blues For Alice 160bpm_Keys.mp3",
            "pan": 0,
            "gain": 1,
            "muted": false,
            "hidden": false
          },
          {
            "title": "Trumpet",
            "url": "/tracks/Blues For Alice 160bpm_Trumpet.mp3",
            "pan": 0,
            "gain": 1,
            "muted": false,
            "hidden": false
          },
          {
            "title": "Master",
            "url": "/tracks/Blues For Alice 160bpm_MASTER.mp3",
            "pan": 0,
            "gain": 1,
            "muted": false,
            "hidden": false
          }
        ],
        "master":{
            "pan":0,
            "gain":1,
            "muted":false,
            "value": 5
        }
      }
    }
  },

    created() {
        this.newConfig = this.config;
    },

    beforeDestroy() {},
    methods: {
        loadedChange(loaded) {
            this.is_loaded = loaded;
        },

        setConfig(newVal) {
            this.newConfig = newVal;
        },

        // accepts json string
        // returns pretyyprinted json
        syntaxHighlight(json) {
            if (typeof json != 'string') {
                json = JSON.stringify(json, undefined, 2);
            }
            json = json
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
            return json.replace(
                /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
                function(match) {
                    var cls = 'number';
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            cls = 'key';
                        } else {
                            cls = 'string';
                        }
                    } else if (/true|false/.test(match)) {
                        cls = 'boolean';
                    } else if (/null/.test(match)) {
                        cls = 'null';
                    }
                    return '<span class="' + cls + '">' + match + '</span>';
                }
            );
        },
    },

    computed: {},
};
</script>

<style>
pre {
    outline: 1px solid #ccc;
    padding: 5px;
    margin: 5px;
}
.string {
    color: green;
}
.number {
    color: darkorange;
}
.boolean {
    color: blue;
}
.null {
    color: magenta;
}
.key {
    color: red;
}
</style>
